/**
 *  DashUI
 *  https://github.com/GermanBluefox/DashUI/
 *
 *  Copyright (c) 2013 Bluefox https://github.com/GermanBluefox
 *  MIT License (MIT)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 *  documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 *  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 *  permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 *  the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 *  THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
 // duiEdit - the DashUI Editor Wizard

dui = $.extend(true, dui, {
	hm2Widget: {
		'tplHqButton' : {findImage: false, hssType: ['HM-LC-Sw1-Pl', 'HM-LC-Sw1-FM']},
		'tplHqLowbat' : {findImage: true,  hssType: ['HM-PB-4-WM', 'HM-PB-2-WM', 'HM-PB-4Dis-WM', 'HM-SCI-3-FM'], point: "LOWBAT"}
	},
	hmDeviceToWidget: function (device) {
		for (var w in dui.hm2Widget) {
			for (var j = 0; j < dui.hm2Widget[w].hssType.length; j++) {
				if (dui.hm2Widget[w].hssType[j] == device) {
					return w;
				}
			}
		}
		return null;
	},
	wizardGetFunction : function (channel) {
		var hm_id = channel;
		var func = null;
		while (hm_id && homematic.regaObjects[hm_id]) {
			for (var t = 0; t < homematic.regaIndex["ENUM_FUNCTIONS"].length; t++) {
				var list = homematic.regaObjects[homematic.regaIndex["ENUM_FUNCTIONS"][t]];
				for (var z = 0; z < list['Channels'].length; z++) {
					if (list['Channels'][z] == hm_id) {
						func = list.Name;
						break;
					}
				}
				if (func)
					break;
			}
			if (func)
				break;
				
			hm_id = homematic.regaObjects[hm_id]['Parent'];
		}
		return func;
	},
	// Try to find point for wirget
	wizardGetPoint: function (widgetName, channel) {
		if (dui.hm2Widget[widgetName].point) {
			for (var p in homematic.regaObjects[channel]["DPs"]) {
				if (p == dui.hm2Widget[widgetName].point) {
					return homematic.regaObjects[channel]["DPs"][p];
				}
			}
			var parent = homematic.regaObjects[channel]["Parent"];
			if (homematic.regaObjects[parent]["Channels"]) {
				for (var i = 0; i < homematic.regaObjects[parent]["Channels"].length; i++) {
					var chn = homematic.regaObjects[homematic.regaObjects[parent]["Channels"][i]];
					if (channel == homematic.regaObjects[parent]["Channels"][i]) {
						continue;
					}
					for (var p in chn["DPs"]) {
						if (p == dui.hm2Widget[widgetName].point) {
							return chn["DPs"][p];
						}
					}
				}
			}
		}
		return channel;
	},
	wizardCreateWidget: function (view, roomID, func, widgetName, devID, channel, point, pos) {
		var field = null;
		if (pos) {
			field = {x: pos.left, y: pos.top, width: 500};
		}
	
		// Find empty position for new widget
		var style = dui.findFreePosition (view, null, field, hqWidgets.gOptions.gBtWidth, hqWidgets.gOptions.gBtHeight);
		
		// Find function of the widget for filter key
		func = func || dui.wizardGetFunction (channel);
		
		// get device description
		var title = hmSelect._convertName(homematic.regaObjects[channel].Name);                                        
		// Remove ROOM from device name
		if (title.length > homematic.regaObjects[roomID]["Name"].length && title.substring(0, homematic.regaObjects[roomID]["Name"].length) == homematic.regaObjects[roomID]["Name"])
			title = title.substring(homematic.regaObjects[roomID]["Name"].length);
		// Remove the leading dot
		if (title.length > 0 && title[0] == '.')
			title = title.substring(1);
		
		// Get default settings
		var hqoptions = dui.binds.hqWidgetsExt.hqEditDefault(widgetName);
		hqoptions = $.extend(hqoptions, {"x": style.left,"y": style.top, "title": title, "hm_id": point, "room": homematic.regaObjects[roomID]["Name"]});
		
		// Set image of widget
		if (dui.hm2Widget[widgetName].findImage) {
			hqoptions['iconName'] = hmSelect._getImage(homematic.regaObjects[devID].HssType);
		}
		
		var data = {"filterkey":func, "hqoptions": JSON.stringify (hqoptions)};
		return dui.addWidget (widgetName, data, style, null, view);
	},
	wizardRunOneRoom: function (view, roomID, funcs, widgets) {
		// Find first created element belongs to this room
		var pos = null;
		
		for (var w in dui.views[view].widgets) {
			var wObj = dui.views[view].widgets[w];
			if (wObj.data.hqoptions && 
			    wObj.data.hqoptions.indexOf ('"room":"'+homematic.regaObjects[roomID]["Name"]+'"') != -1) {
				if (pos == null) {
					pos = {left: wObj.style.left, top: wObj.style.top};
				} else {
					if (pos.left > wObj.style.left) {
						pos.left = wObj.style.left;
					}
					if (pos.top > wObj.style.top) {
						pos.top = wObj.style.top;
					}
				}	
				break;
			}
		}

		// Find all HM Devices belongs to this room
		var elems = homematic.regaObjects[roomID]["Channels"];
		for (var i = 0; i < elems.length; i++) {
			var devID = homematic.regaObjects[elems[i]]["Parent"];
			var widgetName = dui.hmDeviceToWidget (homematic.regaObjects[devID]["HssType"]);
			if (widgetName) {
				// filter out not selected widgets
				if (widgets && widgetName != widgets) {
					continue;
				}
			
				var isFound = false;
				var func = null;
				var hm_id = dui.wizardGetPoint(widgetName, elems[i]);
				
				// Check if this widget exists
				for (var w in dui.views[view].widgets) {
					if (dui.views[view].widgets[w].data.hqoptions) {
						var btn = hqWidgets.Get (w);
						if (btn) {
							var opt = btn.GetSettings();
							if (elems[i] == opt["hm_id"] || opt["hm_id"] == hm_id) {
								isFound = true;
								break;
							}
						}
					}
				}
				// Check function
				if (funcs) {
					func = dui.wizardGetFunction (elems[i]);
					if (funcs != func) {
						continue;
					}
				}
								
				if (!isFound) {
					// Create this widget
					var widgetId = dui.wizardCreateWidget (view, roomID, func, widgetName, devID, elems[i], hm_id, pos);
					if (pos == null) {
						return widgetId;
					}
				}
			}
		}
		return null;
	},
	wizardRun: function (view) {
		var room = $('#wizard_rooms').val();
		var widgetIds = [];
		if (!room) {
			var elems = homematic.regaIndex['ENUM_ROOMS'];// IDs of all ROOMS
			for (var r in elems) {
				var wid = dui.wizardRunOneRoom (view, elems[r], $('#wizard_funcs').val(), $('#wizard_widgets').val());
				if (wid) {
					widgetIds[widgetIds.length] = wid;
				}
			}		
		} else {
			var wid = dui.wizardRunOneRoom (view, room, $('#wizard_funcs').val(), $('#wizard_widgets').val());
			if (wid) {
				widgetIds[widgetIds.length] = wid;
			}
		}
		if (widgetIds.length) {
			window.alert ("Place following widget to the room and start wizard again");
			for (var i = 0; i < widgetIds.length; i++) {
				dui.actionNewWidget (widgetIds[i]);
			}
			dui.inspectWidget(widgetIds[widgetIds.length - 1]);
		}
	},
	fillWizard: function () {
		var elems = homematic.regaIndex['ENUM_ROOMS'];// IDs of all ROOMS
		var jSelect = $('#wizard_rooms').html("").addClass('dashui-edit-select');
		jSelect.append('<option value="">'+dui.translate("All")+'</option>');
		for (var r in elems) {
			jSelect.append("<option value='"+elems[r]+"'>"+homematic.regaObjects[elems[r]]["Name"]+"</option>\n");
		}
		elems = homematic.regaIndex['ENUM_FUNCTIONS'];// IDs of all ROOMS
		jSelect = $('#wizard_funcs').html("").addClass('dashui-edit-select');
		jSelect.append('<option value="">'+dui.translate("All")+'</option>');
		for (var r in elems) {
			jSelect.append("<option value='"+elems[r]+"'>"+homematic.regaObjects[elems[r]]["Name"]+"</option>\n");
		}
		jSelect = $('#wizard_widgets').html("").addClass('dashui-edit-select');
		jSelect.append('<option value="">'+dui.translate("All")+'</option>');
		for (var r in dui.hm2Widget) {
			for (var i = 0; i < dui.widgetSets.length; i++) {
				var name = dui.widgetSets[i].name || dui.widgetSets[i];
				$(".dashui-tpl[data-dashui-set='" + name + "']").each(function () {
					if (r == $(this).attr("id")) {
						$('#wizard_widgets').append("<option value='"+$(this).attr("id")+"'>"+$(this).attr("data-dashui-name")+"</option>\n");
					}
				});	
			}
		}
		$( "#wizard_run" ).bind( "click", function() {
			dui.wizardRun(dui.activeView);
		});
	}
});