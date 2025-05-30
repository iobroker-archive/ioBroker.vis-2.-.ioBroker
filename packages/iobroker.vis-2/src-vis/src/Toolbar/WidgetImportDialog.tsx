import React, { useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { Close as CloseIcon, ImportExport } from '@mui/icons-material';

import { I18n, type ThemeType } from '@iobroker/adapter-react-v5';
import { isGroup, getNewGroupId, getNewWidgetId, deepClone } from '@/Utils/utils';

import { store } from '@/Store';
import type { AnyWidgetId, GroupWidget, GroupWidgetId, Project, Widget } from '@iobroker/types-vis-2';
import CustomEditor from '../Components/CustomEditor';

interface WidgetImportDialogProps {
    changeProject: (project: Project) => void;
    onClose: () => void;
    themeType: ThemeType;
    selectedView: string;
    selectedGroup?: GroupWidgetId;
}

const WidgetImportDialog = (props: WidgetImportDialogProps): React.JSX.Element => {
    const [data, setData] = useState('');
    const [error, setError] = useState(false);

    const importWidgets = (): void => {
        const { visProject } = store.getState();
        const project = deepClone(visProject);
        const widgets: Widget[] = JSON.parse(data);
        const newWidgets: Record<string, Widget> = {};
        let groupOffset = 0;
        let widgetOffset = 0;

        for (const widget of widgets) {
            if (isGroup(widget)) {
                const newKey = getNewGroupId(visProject, groupOffset++);
                newWidgets[newKey] = widget;
                // find all widgets that belong to this group and change groupid
                let w;
                do {
                    w = widgets.find(item => item.groupid === widget._id);
                    if (w) {
                        w.groupid = newKey;
                    }
                } while (w);
            } else {
                const newKey = getNewWidgetId(visProject, widgetOffset++);
                newWidgets[newKey] = widget;
                if (widget.grouped && widget.groupid && newWidgets[widget.groupid]?.data?.members) {
                    // find group
                    const pos = (newWidgets[widget.groupid] as GroupWidget).data.members.indexOf(
                        widget._id as AnyWidgetId,
                    );
                    if (pos !== -1) {
                        (newWidgets[widget.groupid] as GroupWidget).data.members[pos] = newKey;
                    }
                }
            }
        }

        Object.keys(newWidgets).forEach(wid => {
            delete newWidgets[wid]._id;

            if (!isGroup(newWidgets[wid]) && props.selectedGroup !== undefined) {
                newWidgets[wid].grouped = true;
                newWidgets[wid].groupid = props.selectedGroup;
                project[props.selectedView].widgets[props.selectedGroup].data.members.push(wid as AnyWidgetId);
            }
        });

        project[props.selectedView].widgets = { ...project[props.selectedView].widgets, ...newWidgets };

        props.changeProject(project);
    };

    return (
        <Dialog
            onClose={props.onClose}
            fullWidth
            open={!0}
            maxWidth="lg"
        >
            <DialogTitle>{I18n.t('Import widgets')}</DialogTitle>
            <DialogContent>
                <CustomEditor
                    type="json"
                    error={error}
                    themeType={props.themeType}
                    value={data}
                    onChange={newValue => {
                        try {
                            newValue && JSON.parse(newValue);
                            setError(false);
                        } catch {
                            setError(true);
                        }
                        setData(newValue);
                    }}
                    height={300}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => {
                        importWidgets();
                        props.onClose();
                    }}
                    color="primary"
                    disabled={!data || error}
                    startIcon={<ImportExport />}
                >
                    {I18n.t('Import')}
                </Button>
                <Button
                    variant="contained"
                    color="grey"
                    onClick={props.onClose}
                    startIcon={<CloseIcon />}
                >
                    {I18n.t('Close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WidgetImportDialog;
