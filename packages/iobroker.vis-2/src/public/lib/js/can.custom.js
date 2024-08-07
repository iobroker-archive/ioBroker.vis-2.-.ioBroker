/*!
 * CanJS - 2.3.25
 * http://canjs.com/
 * Copyright (c) 2016 Bitovi
 * Sun, 14 Aug 2016 06:25:49 GMT
 * Licensed MIT

 * Includes: can/construct/construct,can/map/map,can/list/list,can/compute/compute,can/view/view,can/view/ejs/ejs
 * Download from: http://bitbuilder.herokuapp.com/can.custom.js?configuration=jquery&minify=true&plugins=can%2Fconstruct%2Fconstruct&plugins=can%2Fmap%2Fmap&plugins=can%2Flist%2Flist&plugins=can%2Fcompute%2Fcompute&plugins=can%2Fview%2Fview&plugins=can%2Fview%2Fejs%2Fejs
 */
/*[global-shim-start]*/
!function (exports, global) {
    var origDefine = global.define, get = function (e) {
            var o, l = e.split("."), n = global;
            for (o = 0; o < l.length && n; o++) n = n[l[o]];
            return n
        }, modules = global.define && global.define.modules || global._define && global._define.modules || {},
        ourDefine = global.define = function (e, o, l) {
            var n;
            "function" == typeof o && (l = o, o = []);
            var r, t = [];
            for (r = 0; r < o.length; r++) t.push(exports[o[r]] ? get(exports[o[r]]) : modules[o[r]] || get(o[r]));
            if (!o.length && l.length) {
                n = {exports: {}};
                var i = function (e) {
                    return exports[e] ? get(exports[e]) : modules[e]
                };
                t.push(i, n.exports, n)
            } else t[0] || "exports" !== o[0] ? t[0] || "module" !== o[0] || (t[0] = {id: e}) : (n = {exports: {}}, t[0] = n.exports, "module" === o[1] && (t[1] = n));
            global.define = origDefine;
            var a = l ? l.apply(null, t) : void 0;
            global.define = ourDefine, modules[e] = n && n.exports ? n.exports : a
        };
    global.define.orig = origDefine, global.define.modules = modules, global.define.amd = !0, ourDefine("@loader", [], function () {
        var noop = function () {
        };
        return {
            get: function () {
                return {prepareGlobal: noop, retrieveGlobal: noop}
            }, global: global, __exec: function (__load) {
                eval("(function() { " + __load.source + " \n }).call(global);")
            }
        }
    })
}({}, window);
/*can/util/can*/
define("can/util/can", [], function () {
    var e = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : global,
        n = {};
    ("undefined" == typeof GLOBALCAN || GLOBALCAN !== !1) && (e.can = n), n.global = e, n.k = function () {
    }, n.isDeferred = function (e) {
        return n.dev && n.dev.warn("can.isDeferred: this function is deprecated and will be removed in a future release. can.isPromise replaces the functionality of can.isDeferred."), e && "function" == typeof e.then && "function" == typeof e.pipe
    }, n.isPromise = function (e) {
        return !!e && (window.Promise && e instanceof Promise || n.isFunction(e.then) && (void 0 === n.List || !(e instanceof n.List)))
    }, n.isMapLike = function (e) {
        return n.Map && (e instanceof n.Map || e && e.___get)
    };
    var t = 0;
    n.cid = function (e, n) {
        return e._cid || (t++, e._cid = (n || "") + t), e._cid
    }, n.VERSION = "@EDGE", n.simpleExtend = function (e, n) {
        for (var t in n) e[t] = n[t];
        return e
    }, n.last = function (e) {
        return e && e[e.length - 1]
    }, n.isDOM = function (e) {
        return (e.ownerDocument || e) === n.global.document
    }, n.childNodes = function (e) {
        var n = e.childNodes;
        if ("length" in n) return n;
        for (var t = e.firstChild, o = []; t;) o.push(t), t = t.nextSibling;
        return o
    };
    var o = Function.prototype.bind;
    o ? n.proxy = function (e, n) {
        return o.call(e, n)
    } : n.proxy = function (e, n) {
        return function () {
            return e.apply(n, arguments)
        }
    }, n.frag = function (e, t) {
        var o, r = t || n.document || n.global.document;
        return e && "string" != typeof e ? 11 === e.nodeType ? e : "number" == typeof e.nodeType ? (o = r.createDocumentFragment(), o.appendChild(e), o) : "number" == typeof e.length ? (o = r.createDocumentFragment(), n.each(e, function (e) {
            o.appendChild(n.frag(e))
        }), n.childNodes(o).length || o.appendChild(r.createTextNode("")), o) : (o = n.buildFragment("" + e, r), n.childNodes(o).length || o.appendChild(r.createTextNode("")), o) : (o = n.buildFragment(null == e ? "" : "" + e, r), o.childNodes.length || o.appendChild(r.createTextNode("")), o)
    }, n.scope = n.viewModel = function (e, t, o) {
        e = n.$(e);
        var r = n.data(e, "scope") || n.data(e, "viewModel");
        switch (r || (r = new n.Map, n.data(e, "scope", r), n.data(e, "viewModel", r)), arguments.length) {
            case 0:
            case 1:
                return r;
            case 2:
                return r.attr(t);
            default:
                return r.attr(t, o), e
        }
    };
    var r = function (e) {
        var n = String(e).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        return n ? {
            href: n[0] || "",
            protocol: n[1] || "",
            authority: n[2] || "",
            host: n[3] || "",
            hostname: n[4] || "",
            port: n[5] || "",
            pathname: n[6] || "",
            search: n[7] || "",
            hash: n[8] || ""
        } : null
    };
    return n.joinURIs = function (e, n) {
        function t(e) {
            var n = [];
            return e.replace(/^(\.\.?(\/|$))+/, "").replace(/\/(\.(\/|$))+/g, "/").replace(/\/\.\.$/, "/../").replace(/\/?[^\/]*/g, function (e) {
                "/.." === e ? n.pop() : n.push(e)
            }), n.join("").replace(/^\//, "/" === e.charAt(0) ? "/" : "")
        }

        return n = r(n || ""), e = r(e || ""), n && e ? (n.protocol || e.protocol) + (n.protocol || n.authority ? n.authority : e.authority) + t(n.protocol || n.authority || "/" === n.pathname.charAt(0) ? n.pathname : n.pathname ? (e.authority && !e.pathname ? "/" : "") + e.pathname.slice(0, e.pathname.lastIndexOf("/") + 1) + n.pathname : e.pathname) + (n.protocol || n.authority || n.pathname ? n.search : n.search || e.search) + n.hash : null
    }, n["import"] = function (e, t) {
        var o = new n.Deferred;
        return "object" == typeof window.System && n.isFunction(window.System["import"]) ? window.System["import"](e, {name: t}).then(n.proxy(o.resolve, o), n.proxy(o.reject, o)) : window.define && window.define.amd ? window.require([e], function (e) {
            o.resolve(e)
        }) : window.steal ? steal.steal(e, function (e) {
            o.resolve(e)
        }) : window.require ? o.resolve(window.require(e)) : o.resolve(), o.promise()
    }, n.__observe = function () {
    }, n.isNode = "object" == typeof process && "[object process]" === {}.toString.call(process), n.isBrowserWindow = "undefined" != typeof window && "undefined" != typeof document && "undefined" == typeof SimpleDOM, n.isWebWorker = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope, n
});
/*can/util/attr/attr*/
define("can/util/attr/attr", ["can/util/can"], function (t) {
    var e = t.global.setImmediate || function (t) {
        return setTimeout(t, 0)
    }, r = {input: !0, textarea: !0, select: !0}, n = function (e, n) {
        return n in e || t.document && r[e.nodeName.toLowerCase()]
    }, a = {
        MutationObserver: t.global.MutationObserver || t.global.WebKitMutationObserver || t.global.MozMutationObserver,
        map: {
            "class": function (t, e) {
                return e = e || "", "http://www.w3.org/2000/svg" === t.namespaceURI ? t.setAttribute("class", e) : t.className = e, e
            },
            value: "value",
            innertext: "innerText",
            innerhtml: "innerHTML",
            textcontent: "textContent",
            "for": "htmlFor",
            checked: !0,
            disabled: !0,
            readonly: function (t, e) {
                return t.readOnly = e || "string" == typeof e ? !0 : !1, e
            },
            required: !0,
            src: function (t, e) {
                return null == e || "" === e ? (t.removeAttribute("src"), null) : (t.setAttribute("src", e), e)
            },
            style: function () {
                var e = t.global.document && document.createElement("div");
                return e && e.style && "cssText" in e.style ? function (t, e) {
                    return t.style.cssText = e || ""
                } : function (t, e) {
                    return t.setAttribute("style", e)
                }
            }()
        },
        defaultValue: ["input", "textarea"],
        setAttrOrProp: function (t, e, r) {
            e = e.toLowerCase();
            var n = a.map[e];
            n !== !0 || r ? this.set(t, e, r) : this.remove(t, e)
        },
        setSelectValue: function (t, e) {
            if (null != e) for (var r = t.getElementsByTagName("option"), n = 0; n < r.length; n++) if (e == r[n].value) return void (r[n].selected = !0);
            t.selectedIndex = -1
        },
        set: function (e, r, u) {
            var o = t.isDOM(e) && a.MutationObserver;
            r = r.toLowerCase();
            var i;
            o || (i = a.get(e, r));
            var s, l = a.map[r];
            "function" == typeof l ? s = l(e, u) : l === !0 && n(e, r) ? (s = e[r] = !0, "checked" === r && "radio" === e.type && t.inArray((e.nodeName + "").toLowerCase(), a.defaultValue) >= 0 && (e.defaultChecked = !0)) : "string" == typeof l && n(e, l) ? (s = u, (e[l] !== u || "OPTION" === e.nodeName.toUpperCase()) && (e[l] = u), "value" === l && t.inArray((e.nodeName + "").toLowerCase(), a.defaultValue) >= 0 && (e.defaultValue = u)) : a.setAttribute(e, r, u), o || s === i || a.trigger(e, r, i)
        },
        setAttribute: function () {
            var e = t.global.document;
            if (e && document.createAttribute) try {
                e.createAttribute("{}")
            } catch (r) {
                var n = {}, a = document.createElement("div");
                return function (t, e, r) {
                    var u, o, i = e.charAt(0);
                    "{" !== i && "(" !== i && "*" !== i || !t.setAttributeNode ? t.setAttribute(e, r) : (u = n[e], u || (a.innerHTML = "<div " + e + '=""></div>', u = n[e] = a.childNodes[0].attributes[0]), o = u.cloneNode(), o.value = r, t.setAttributeNode(o))
                }
            }
            return function (t, e, r) {
                t.setAttribute(e, r)
            }
        }(),
        trigger: function (r, n, a) {
            return t.data(t.$(r), "canHasAttributesBindings") ? (n = n.toLowerCase(), e(function () {
                t.trigger(r, {type: "attributes", attributeName: n, target: r, oldValue: a, bubbles: !1}, [])
            })) : void 0
        },
        get: function (t, e) {
            e = e.toLowerCase();
            var r = a.map[e];
            return "string" == typeof r && n(t, r) ? t[r] : r === !0 && n(t, e) ? t[e] : t.getAttribute(e)
        },
        remove: function (t, e) {
            e = e.toLowerCase();
            var r;
            a.MutationObserver || (r = a.get(t, e));
            var u = a.map[e];
            "function" == typeof u && u(t, void 0), u === !0 && n(t, e) ? t[e] = !1 : "string" == typeof u && n(t, u) ? t[u] = "" : t.removeAttribute(e), a.MutationObserver || null == r || a.trigger(t, e, r)
        },
        has: function () {
            var e = t.global.document && document.createElement("div");
            return e && e.hasAttribute ? function (t, e) {
                return t.hasAttribute(e)
            } : function (t, e) {
                return null !== t.getAttribute(e)
            }
        }()
    };
    return a
});
/*can/event/event*/
define("can/event/event", ["can/util/can"], function (t) {
    return t.addEvent = function (t, n) {
        var e = this.__bindEvents || (this.__bindEvents = {}), i = e[t] || (e[t] = []);
        return i.push({handler: n, name: t}), this
    }, t.listenTo = function (n, e, i) {
        var r = this.__listenToEvents;
        r || (r = this.__listenToEvents = {});
        var s = t.cid(n), o = r[s];
        o || (o = r[s] = {obj: n, events: {}});
        var a = o.events[e];
        a || (a = o.events[e] = []), a.push(i), t.bind.call(n, e, i)
    }, t.stopListening = function (n, e, i) {
        var r = this.__listenToEvents, s = r, o = 0;
        if (!r) return this;
        if (n) {
            var a = t.cid(n);
            if ((s = {})[a] = r[a], !r[a]) return this
        }
        for (var v in s) {
            var l, h = s[v];
            n = r[v].obj, e ? (l = {})[e] = h.events[e] : l = h.events;
            for (var u in l) {
                var d = l[u] || [];
                for (o = 0; o < d.length;) i && i === d[o] || !i ? (t.unbind.call(n, u, d[o]), d.splice(o, 1)) : o++;
                d.length || delete h.events[u]
            }
            t.isEmptyObject(h.events) && delete r[v]
        }
        return this
    }, t.removeEvent = function (t, n, e) {
        if (!this.__bindEvents) return this;
        for (var i, r = this.__bindEvents[t] || [], s = 0, o = "function" == typeof n; s < r.length;) i = r[s], (e ? e(i, t, n) : o && i.handler === n || !o && (i.cid === n || !n)) ? r.splice(s, 1) : s++;
        return this
    }, t.dispatch = function (t, n) {
        var e = this.__bindEvents;
        if (e) {
            var i;
            "string" == typeof t ? (i = t, t = {type: t}) : i = t.type;
            var r = e[i];
            if (r) {
                r = r.slice(0);
                var s = [t];
                n && s.push.apply(s, n);
                for (var o = 0, a = r.length; a > o; o++) r[o].handler.apply(this, s);
                return t
            }
        }
    }, t.one = function (n, e) {
        var i = function () {
            return t.unbind.call(this, n, i), e.apply(this, arguments)
        };
        return t.bind.call(this, n, i), this
    }, t.event = {
        on: function () {
            return 0 === arguments.length && t.Control && this instanceof t.Control ? t.Control.prototype.on.call(this) : t.addEvent.apply(this, arguments)
        },
        off: function () {
            return 0 === arguments.length && t.Control && this instanceof t.Control ? t.Control.prototype.off.call(this) : t.removeEvent.apply(this, arguments)
        },
        bind: t.addEvent,
        unbind: t.removeEvent,
        delegate: function (n, e, i) {
            return t.addEvent.call(this, e, i)
        },
        undelegate: function (n, e, i) {
            return t.removeEvent.call(this, e, i)
        },
        trigger: t.dispatch,
        one: t.one,
        addEvent: t.addEvent,
        removeEvent: t.removeEvent,
        listenTo: t.listenTo,
        stopListening: t.stopListening,
        dispatch: t.dispatch
    }, t.event
});
/*can/util/fragment*/
define("can/util/fragment", ["can/util/can"], function (e) {
    var t = /^\s*<(\w+)[^>]*>/, i = {}.toString, l = function (l, n, r) {
        void 0 === n && (n = t.test(l) && RegExp.$1), l && "[object Function]" === i.call(l.replace) && (l = l.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, "<$1></$2>"));
        var d = r.createElement("div"), a = r.createElement("div");
        "tbody" === n || "tfoot" === n || "thead" === n || "colgroup" === n ? (a.innerHTML = "<table>" + l + "</table>", d = 3 === a.firstChild.nodeType ? a.lastChild : a.firstChild) : "col" === n ? (a.innerHTML = "<table><colgroup>" + l + "</colgroup></table>", d = 3 === a.firstChild.nodeType ? a.lastChild : a.firstChild.firstChild) : "tr" === n ? (a.innerHTML = "<table><tbody>" + l + "</tbody></table>", d = 3 === a.firstChild.nodeType ? a.lastChild : a.firstChild.firstChild) : "td" === n || "th" === n ? (a.innerHTML = "<table><tbody><tr>" + l + "</tr></tbody></table>", d = 3 === a.firstChild.nodeType ? a.lastChild : a.firstChild.firstChild.firstChild) : "option" === n ? (a.innerHTML = "<select>" + l + "</select>", d = 3 === a.firstChild.nodeType ? a.lastChild : a.firstChild) : d.innerHTML = "" + l;
        var o = {}, h = e.childNodes(d);
        o.length = h.length;
        for (var c = 0; c < h.length; c++) o[c] = h[c];
        return [].slice.call(o)
    };
    return e.buildFragment = function (e, t) {
        if (e && 11 === e.nodeType) return e;
        t ? t.length && (t = t[0]) : t = document;
        for (var i = l(e, void 0, t), n = (t || document).createDocumentFragment(), r = 0, d = i.length; d > r; r++) n.appendChild(i[r]);
        return n
    }, function () {
        var t = "<-\n>", i = e.buildFragment(t, document);
        if (t !== i.firstChild.nodeValue) {
            var l = e.buildFragment;
            e.buildFragment = function (e, t) {
                var i = l(e, t);
                return 1 === i.childNodes.length && 3 === i.childNodes[0].nodeType && (i.childNodes[0].nodeValue = e), i
            }
        }
    }(), e
});
/*can/util/array/isArrayLike*/
define("can/util/array/isArrayLike", ["can/util/can"], function (n) {
    n.isArrayLike = function (n) {
        var e = n && "boolean" != typeof n && "number" != typeof n && "length" in n && n.length;
        return "function" != typeof arr && (0 === e || "number" == typeof e && e > 0 && e - 1 in n)
    }
});
/*can/util/array/each*/
define("can/util/array/each", ["can/util/can", "can/util/array/isArrayLike"], function (a) {
    return a.each = function (e, t, r) {
        var i, n, l, c = 0;
        if (e) if (a.isArrayLike(e)) if (a.List && e instanceof a.List) for (n = e.attr("length"); n > c && (l = e.attr(c), t.call(r || l, l, c, e) !== !1); c++) ; else for (n = e.length; n > c && (l = e[c], t.call(r || l, l, c, e) !== !1); c++) ; else if ("object" == typeof e) if (a.Map && e instanceof a.Map || e === a.route) {
            var f = a.Map.keys(e);
            for (c = 0, n = f.length; n > c && (i = f[c], l = e.attr(i), t.call(r || l, l, i, e) !== !1); c++) ;
        } else for (i in e) if (Object.prototype.hasOwnProperty.call(e, i) && t.call(r || e[i], e[i], i, e) === !1) break;
        return e
    }, a
});
/*can/util/inserted/inserted*/
define("can/util/inserted/inserted", ["can/util/can"], function (e) {
    e.inserted = function (n, r) {
        if (n.length) {
            n = e.makeArray(n);
            for (var i, t, a = r || n[0].ownerDocument || n[0], d = !1, o = e.$(a.contains ? a : a.body), s = 0; void 0 !== (t = n[s]); s++) {
                if (!d) {
                    if (!t.getElementsByTagName) continue;
                    if (!e.has(o, t).length) return;
                    d = !0
                }
                if (d && t.getElementsByTagName) {
                    i = e.makeArray(t.getElementsByTagName("*")), e.trigger(t, "inserted", [], !1);
                    for (var f, c = 0; void 0 !== (f = i[c]); c++) e.trigger(f, "inserted", [], !1)
                }
            }
        }
    }, e.appendChild = function (n, r, i) {
        var t;
        t = 11 === r.nodeType ? e.makeArray(e.childNodes(r)) : [r], n.appendChild(r), e.inserted(t, i)
    }, e.insertBefore = function (n, r, i, t) {
        var a;
        a = 11 === r.nodeType ? e.makeArray(e.childNodes(r)) : [r], n.insertBefore(r, i), e.inserted(a, t)
    }
});
/*can/util/jquery/jquery*/
define("can/util/jquery/jquery", ["jquery/dist/jquery", "can/util/can", "can/util/attr/attr", "can/event/event", "can/util/fragment", "can/util/array/each", "can/util/inserted/inserted"], function (t, e, n, r) {
    var i = function (t) {
        return t.nodeName && (1 === t.nodeType || 9 === t.nodeType) || t == window || t.addEventListener
    };
    t = t || window.jQuery, t.extend(e, t, {
        trigger: function (n, r, a, s) {
            i(n) ? t.event.trigger(r, a, n, !s) : n.trigger ? n.trigger(r, a) : ("string" == typeof r && (r = {type: r}), r.target = r.target || n, a && (a.length && "string" == typeof a ? a = [a] : a.length || (a = [a])), a || (a = []), e.dispatch.call(n, r, a))
        },
        event: e.event,
        addEvent: e.addEvent,
        removeEvent: e.removeEvent,
        buildFragment: e.buildFragment,
        $: t,
        each: e.each,
        bind: function (n, r) {
            return this.bind && this.bind !== e.bind ? this.bind(n, r) : i(this) ? t.event.add(this, n, r) : e.addEvent.call(this, n, r), this
        },
        unbind: function (n, r) {
            return this.unbind && this.unbind !== e.unbind ? this.unbind(n, r) : i(this) ? t.event.remove(this, n, r) : e.removeEvent.call(this, n, r), this
        },
        delegate: function (n, r, a) {
            return this.delegate ? this.delegate(n, r, a) : i(this) ? t(this).delegate(n, r, a) : e.bind.call(this, r, a), this
        },
        undelegate: function (n, r, a) {
            return this.undelegate ? this.undelegate(n, r, a) : i(this) ? t(this).undelegate(n, r, a) : e.unbind.call(this, r, a), this
        },
        proxy: e.proxy,
        attr: n
    }), e.on = e.bind, e.off = e.unbind, t.each(["append", "filter", "addClass", "remove", "data", "get", "has"], function (t, n) {
        e[n] = function (t) {
            return t[n].apply(t, e.makeArray(arguments).slice(1))
        }
    });
    var a = t.cleanData;
    t.cleanData = function (n) {
        t.each(n, function (t, n) {
            n && e.trigger(n, "removed", [], !1)
        }), a(n)
    };
    var s, u = t.fn.domManip;
    t.fn.domManip = function (t, e, n) {
        for (var r = 1; r < arguments.length; r++) if ("function" == typeof arguments[r]) {
            s = r;
            break
        }
        return u.apply(this, arguments)
    }, t(document.createElement("div")).append(document.createElement("div"));
    var d = function (t) {
        var n = t.childNodes;
        if ("length" in n) return e.makeArray(n);
        for (var r = t.firstChild, i = []; r;) i.push(r), r = r.nextSibling;
        return i
    };
    void 0 === s ? (t.fn.domManip = u, e.each(["after", "prepend", "before", "append", "replaceWith"], function (n) {
        var r = t.fn[n];
        t.fn[n] = function () {
            var t = [], n = e.makeArray(arguments);
            null != n[0] && ("string" == typeof n[0] && (n[0] = e.buildFragment(n[0])), t = 11 === n[0].nodeType ? d(n[0]) : e.isArrayLike(n[0]) ? e.makeArray(n[0]) : [n[0]]);
            var i = r.apply(this, n);
            return e.inserted(t), i
        }
    })) : t.fn.domManip = 2 === s ? function (t, n, r) {
        return u.call(this, t, n, function (t) {
            var n;
            11 === t.nodeType && (n = e.makeArray(e.childNodes(t)));
            var i = r.apply(this, arguments);
            return e.inserted(n ? n : [t]), i
        })
    } : function (t, n) {
        return u.call(this, t, function (t) {
            var r;
            11 === t.nodeType && (r = e.makeArray(e.childNodes(t)));
            var i = n.apply(this, arguments);
            return e.inserted(r ? r : [t]), i
        })
    };
    var l = t.attr;
    t.attr = function (t, n) {
        if (e.isDOM(t) && e.attr.MutationObserver) return l.apply(this, arguments);
        var r, i;
        arguments.length >= 3 && (r = l.call(this, t, n));
        var a = l.apply(this, arguments);
        return arguments.length >= 3 && (i = l.call(this, t, n)), i !== r && e.attr.trigger(t, n, r), a
    };
    var o = t.removeAttr;
    return t.removeAttr = function (t, n) {
        if (e.isDOM(t) && e.attr.MutationObserver) return o.apply(this, arguments);
        var r = l.call(this, t, n), i = o.apply(this, arguments);
        return null != r && e.attr.trigger(t, n, r), i
    }, t.event.special.attributes = {
        setup: function () {
            if (e.isDOM(this) && e.attr.MutationObserver) {
                var t = this, n = new e.attr.MutationObserver(function (n) {
                    n.forEach(function (n) {
                        var r = e.simpleExtend({}, n);
                        e.trigger(t, r, [])
                    })
                });
                n.observe(this, {attributes: !0, attributeOldValue: !0}), e.data(e.$(this), "canAttributesObserver", n)
            } else e.data(e.$(this), "canHasAttributesBindings", !0)
        }, teardown: function () {
            e.isDOM(this) && e.attr.MutationObserver ? (e.data(e.$(this), "canAttributesObserver").disconnect(), t.removeData(this, "canAttributesObserver")) : t.removeData(this, "canHasAttributesBindings")
        }
    }, t.event.special.inserted = {}, t.event.special.removed = {}, e
});
/*can/util/util*/
define("can/util/util", ["can/util/jquery/jquery"], function (u) {
    return u
});
/*can/util/string/string*/
define("can/util/string/string", ["can/util/util"], function (e) {
    var r = /_|-/, n = /\=\=/, t = /([A-Z]+)([A-Z][a-z])/g, a = /([a-z\d])([A-Z])/g, u = /([a-z\d])([A-Z])/g,
        i = /\{([^\}]+)\}/g, c = /"/g, o = /'/g, l = /-+(.)?/g, p = /[a-z][A-Z]/g, f = function (e, r, n) {
            var t = e[r];
            return void 0 === t && n === !0 && (t = e[r] = {}), t
        }, g = function (e) {
            return /^f|^o/.test(typeof e)
        }, d = function (e) {
            var r = null === e || void 0 === e || isNaN(e) && "" + e == "NaN";
            return "" + (r ? "" : e)
        };
    return e.extend(e, {
        esc: function (e) {
            return d(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(c, "&#34;").replace(o, "&#39;")
        }, getObject: function (r, n, t) {
            var a, u, i, c, o = r ? r.split(".") : [], l = o.length, p = 0;
            if (n = e.isArray(n) ? n : [n || window], c = n.length, !l) return n[0];
            for (p; c > p; p++) {
                for (a = n[p], i = void 0, u = 0; l > u && g(a); u++) i = a, a = f(i, o[u]);
                if (void 0 !== i && void 0 !== a) break
            }
            if (t === !1 && void 0 !== a && delete i[o[u - 1]], t === !0 && void 0 === a) for (a = n[0], u = 0; l > u && g(a); u++) a = f(a, o[u], !0);
            return a
        }, capitalize: function (e, r) {
            return e.charAt(0).toUpperCase() + e.slice(1)
        }, camelize: function (e) {
            return d(e).replace(l, function (e, r) {
                return r ? r.toUpperCase() : ""
            })
        }, hyphenate: function (e) {
            return d(e).replace(p, function (e, r) {
                return e.charAt(0) + "-" + e.charAt(1).toLowerCase()
            })
        }, underscore: function (e) {
            return e.replace(n, "/").replace(t, "$1_$2").replace(a, "$1_$2").replace(u, "_").toLowerCase()
        }, sub: function (r, n, t) {
            var a = [];
            return r = r || "", a.push(r.replace(i, function (r, u) {
                var i = e.getObject(u, n, t === !0 ? !1 : void 0);
                return void 0 === i || null === i ? (a = null, "") : g(i) && a ? (a.push(i), "") : "" + i
            })), null === a ? a : a.length <= 1 ? a[0] : a
        }, replacer: i, undHash: r
    }), e
});
/*can/construct/construct*/
define("can/construct/construct", ["can/util/string/string"], function (t) {
    var n, e = 0;
    try {
        Object.getOwnPropertyDescriptor({}), n = !0
    } catch (r) {
        n = !1
    }
    var o = function (t, n) {
        var e = Object.getOwnPropertyDescriptor(t, n);
        return e && (e.get || e.set) ? e : null
    }, s = function (n, e, r) {
        r = r || n;
        var s;
        for (var i in n) (s = o(n, i)) ? this._defineProperty(r, e, i, s) : t.Construct._overwrite(r, e, i, n[i])
    }, i = function (n, e, r) {
        r = r || n;
        for (var o in n) t.Construct._overwrite(r, e, o, n[o])
    };
    return t.Construct = function () {
        return arguments.length ? t.Construct.extend.apply(t.Construct, arguments) : void 0
    }, t.extend(t.Construct, {
        constructorExtends: !0, newInstance: function () {
            var t, n = this.instance();
            return n.setup && (n.__inSetup = !0, t = n.setup.apply(n, arguments), delete n.__inSetup), n.init && n.init.apply(n, t || arguments), n
        }, _inherit: n ? s : i, _defineProperty: function (t, n, e, r) {
            Object.defineProperty(t, e, r)
        }, _overwrite: function (t, n, e, r) {
            t[e] = r
        }, setup: function (n, e) {
            this.defaults = t.extend(!0, {}, n.defaults, this.defaults)
        }, instance: function () {
            e = 1;
            var t = new this;
            return e = 0, t
        }, extend: function (n, r, o) {
            function s() {
                return e ? void 0 : this.constructor !== a && arguments.length && a.constructorExtends ? a.extend.apply(a, arguments) : a.newInstance.apply(a, arguments)
            }

            var i = n, u = r, c = o;
            "string" != typeof i && (c = u, u = i, i = null), c || (c = u, u = null), c = c || {};
            var a, p, f, l, h, d, y, m, g, v = this, _ = this.prototype;
            g = this.instance(), t.Construct._inherit(c, _, g), i ? (p = i.split("."), y = p.pop()) : u && u.shortName ? y = u.shortName : this.shortName && (y = this.shortName), "undefined" == typeof constructorName && (a = function () {
                return s.apply(this, arguments)
            });
            for (d in v) v.hasOwnProperty(d) && (a[d] = v[d]);
            t.Construct._inherit(u, v, a), i && (f = t.getObject(p.join("."), window, !0), m = f, l = t.underscore(i.replace(/\./g, "_")), h = t.underscore(y), f[y] = a), t.extend(a, {
                constructor: a,
                prototype: g,
                namespace: m,
                _shortName: h,
                fullName: i,
                _fullName: l
            }), void 0 !== y && (a.shortName = y), a.prototype.constructor = a;
            var w = [v].concat(t.makeArray(arguments)), C = a.setup.apply(a, w);
            return a.init && a.init.apply(a, C || w), a
        }
    }), t.Construct.prototype.setup = function () {
    }, t.Construct.prototype.init = function () {
    }, t.Construct
});
/*can/util/bind/bind*/
define("can/util/bind/bind", ["can/util/util"], function (i) {
    return i.bindAndSetup = function () {
        return i.addEvent.apply(this, arguments), this.__inSetup || (this._bindings ? this._bindings++ : (this._bindings = 1, this._bindsetup && this._bindsetup())), this
    }, i.unbindAndTeardown = function (n, t) {
        if (!this.__bindEvents) return this;
        var s = this.__bindEvents[n] || [], d = s.length;
        return i.removeEvent.apply(this, arguments), null === this._bindings ? this._bindings = 0 : this._bindings = this._bindings - (d - s.length), !this._bindings && this._bindteardown && this._bindteardown(), this
    }, i
});
/*can/map/bubble*/
define("can/map/bubble", ["can/util/util"], function (n) {
    var i = n.bubble = {
        bind: function (n, e) {
            if (!n.__inSetup) {
                var b, t = i.events(n, e), r = t.length;
                n._bubbleBindings || (n._bubbleBindings = {});
                for (var u = 0; r > u; u++) b = t[u], n._bubbleBindings[b] ? n._bubbleBindings[b]++ : (n._bubbleBindings[b] = 1, i.childrenOf(n, b))
            }
        }, unbind: function (e, b) {
            for (var t, r = i.events(e, b), u = r.length, d = 0; u > d; d++) t = r[d], e._bubbleBindings && e._bubbleBindings[t]--, e._bubbleBindings && !e._bubbleBindings[t] && (delete e._bubbleBindings[t], i.teardownChildrenFrom(e, t), n.isEmptyObject(e._bubbleBindings) && delete e._bubbleBindings)
        }, add: function (e, b, t) {
            if (b instanceof n.Map && e._bubbleBindings) for (var r in e._bubbleBindings) e._bubbleBindings[r] && (i.teardownFromParent(e, b, r), i.toParent(b, e, t, r))
        }, addMany: function (n, e) {
            for (var b = 0, t = e.length; t > b; b++) i.add(n, e[b], b)
        }, remove: function (e, b) {
            if (b instanceof n.Map && e._bubbleBindings) for (var t in e._bubbleBindings) e._bubbleBindings[t] && i.teardownFromParent(e, b, t)
        }, removeMany: function (n, e) {
            for (var b = 0, t = e.length; t > b; b++) i.remove(n, e[b])
        }, set: function (e, b, t, r) {
            return n.isMapLike(t) && i.add(e, t, b), n.isMapLike(r) && i.remove(e, r), t
        }, events: function (n, i) {
            return n.constructor._bubbleRule(i, n)
        }, toParent: function (i, e, b, t) {
            n.listenTo.call(e, i, t, function () {
                var r = n.makeArray(arguments), u = r.shift();
                r[0] = (n.List && e instanceof n.List ? e.indexOf(i) : b) + (r[0] ? "." + r[0] : ""), u.triggeredNS = u.triggeredNS || {}, u.triggeredNS[e._cid] || (u.triggeredNS[e._cid] = !0, n.trigger(e, u, r), "change" === t && n.trigger(e, r[0], [r[2], r[3]]))
            })
        }, childrenOf: function (n, e) {
            n._each(function (b, t) {
                b && b.bind && i.toParent(b, n, t, e)
            })
        }, teardownFromParent: function (i, e, b) {
            e && e.unbind && n.stopListening.call(i, e, b)
        }, teardownChildrenFrom: function (n, e) {
            n._each(function (b) {
                i.teardownFromParent(n, b, e)
            })
        }, isBubbling: function (n, i) {
            return n._bubbleBindings && n._bubbleBindings[i]
        }
    };
    return i
});
/*can/util/object/isplain/isplain*/
define("can/util/object/isplain/isplain", ["can/util/can"], function (t) {
    var n = Object.prototype.hasOwnProperty, r = function (t) {
        return null !== t && t == t.window
    }, o = function (t) {
        if (!t || "object" != typeof t || t.nodeType || r(t)) return !1;
        try {
            if (t.constructor && !n.call(t, "constructor") && !n.call(t.constructor.prototype, "isPrototypeOf")) return !1
        } catch (o) {
            return !1
        }
        var c;
        for (c in t) ;
        return void 0 === c || n.call(t, c)
    };
    return t.isPlainObject = o, t
});
/*can/map/map_helpers*/
define("can/map/map_helpers", ["can/util/util", "can/util/object/isplain/isplain"], function (n) {
    var t = {
        attrParts: function (n, t) {
            return t ? [n] : "object" == typeof n ? n : ("" + n).split(".")
        }, canMakeObserve: function (t) {
            return t && !n.isPromise(t) && (n.isArray(t) || n.isPlainObject(t))
        }, serialize: function () {
            var e = null;
            return function (i, r, a) {
                var u = n.cid(i), c = !1;
                return e || (c = !0, e = {attr: {}, serialize: {}}), e[r][u] = a, i.each(function (u, c) {
                    var o, d = n.isMapLike(u), l = d && e[r][n.cid(u)];
                    o = l ? l : i["___" + r] ? i["___" + r](c, u) : t.getValue(i, c, u, r), void 0 !== o && (a[c] = o)
                }), c && (e = null), a
            }
        }(), getValue: function (t, e, i, r) {
            return n.isMapLike(i) ? i[r]() : i
        }, define: null, addComputedAttr: function (n, t, e) {
            n._computedAttrs[t] = {
                compute: e, count: 0, handler: function (e, i, r) {
                    n._triggerChange(t, "set", i, r, e.batchNum)
                }
            }
        }, addToMap: function (t, r) {
            var a;
            e || (a = i, e = {});
            var u = t._cid, c = n.cid(t);
            return e[c] || (e[c] = {obj: t, instance: r, added: !u}), a
        }, getMapFromObject: function (n) {
            return e && e[n._cid] && e[n._cid].instance
        }
    }, e = null, i = function () {
        for (var n in e) e[n].added && delete e[n].obj._cid;
        e = null
    };
    return t
});
/*can/util/batch/batch*/
define("can/util/batch/batch", ["can/util/can"], function (t) {
    var a = 1, n = 0, c = null, e = null, s = [], u = !1;
    t.batch = {
        start: function (t) {
            if (n++, 1 === n) {
                var c = {events: [], callbacks: [], number: a++};
                s.push(c), t && c.callbacks.push(t), e = c
            }
        }, stop: function (a, l) {
            if (a ? n = 0 : n--, 0 === n) {
                e = null;
                var h;
                if (u === !1) {
                    u = !0;
                    for (var r, i = []; h = s.shift();) {
                        var b = h.events;
                        i.push.apply(i, h.callbacks), c = h, t.batch.batchNum = h.number;
                        var p;
                        for (l && t.batch.start(), r = 0, p = b.length; p > r; r++) t.dispatch.apply(b[r][0], b[r][1]);
                        t.batch._onDispatchedEvents(h.number), c = null, t.batch.batchNum = void 0
                    }
                    for (r = i.length - 1; r >= 0; r--) i[r]();
                    u = !1
                }
            }
        }, _onDispatchedEvents: function () {
        }, trigger: function (a, n, c) {
            a.__inSetup || (n = "string" == typeof n ? {type: n} : n, e ? (n.batchNum = e.number, e.events.push([a, [n, c]])) : n.batchNum ? t.dispatch.call(a, n, c) : s.length ? (t.batch.start(), n.batchNum = e.number, e.events.push([a, [n, c]]), t.batch.stop()) : t.dispatch.call(a, n, c))
        }, afterPreviousEvents: function (a) {
            var n = t.last(s);
            if (n) {
                var c = {};
                t.bind.call(c, "ready", a), n.events.push([c, [{type: "ready"}, []]])
            } else a({})
        }, after: function (t) {
            var a = e || c;
            a ? a.callbacks.push(t) : t({})
        }
    }
});
/*can/compute/get_value_and_bind*/
define("can/compute/get_value_and_bind", ["can/util/util"], function (e) {
    function t(t, n, r) {
        this.newObserved = {}, this.oldObserved = null, this.func = t, this.context = n, this.compute = r, this.onDependencyChange = e.proxy(this.onDependencyChange, this), this.depth = null, this.childDepths = {}, this.ignore = 0, this.inBatch = !1, this.ready = !1, r.observedInfo = this, this.setReady = e.proxy(this._setReady, this)
    }

    e.simpleExtend(t.prototype, {
        getPrimaryDepth: function () {
            return this.compute._primaryDepth
        }, _setReady: function () {
            this.ready = !0
        }, getDepth: function () {
            return null !== this.depth ? this.depth : this.depth = this._getDepth()
        }, _getDepth: function () {
            var e = 0, t = this.childDepths;
            for (var n in t) t[n] > e && (e = t[n]);
            return e + 1
        }, addEdge: function (e) {
            e.obj.bind(e.event, this.onDependencyChange), e.obj.observedInfo && (this.childDepths[e.obj._cid] = e.obj.observedInfo.getDepth(), this.depth = null)
        }, removeEdge: function (e) {
            e.obj.unbind(e.event, this.onDependencyChange), e.obj.observedInfo && (delete this.childDepths[e.obj._cid], this.depth = null)
        }, dependencyChange: function (e) {
            this.bound && this.ready && (void 0 !== e.batchNum ? e.batchNum !== this.batchNum && (t.registerUpdate(this), this.batchNum = e.batchNum) : this.updateCompute(e.batchNum))
        }, onDependencyChange: function (e, t, n) {
            this.dependencyChange(e, t, n)
        }, updateCompute: function (e) {
            if (this.bound) {
                var t = this.value;
                this.getValueAndBind(), this.compute.updater(this.value, t, e)
            }
        }, getValueAndBind: function () {
            this.bound = !0, this.oldObserved = this.newObserved || {}, this.ignore = 0, this.newObserved = {}, this.ready = !1, h.push(this), this.value = this.func.call(this.context), h.pop(), this.updateBindings(), e.batch.afterPreviousEvents(this.setReady)
        }, updateBindings: function () {
            var e, t, n = this.newObserved, r = this.oldObserved;
            for (e in n) t = n[e], r[e] ? r[e] = null : this.addEdge(t);
            for (e in r) t = r[e], t && this.removeEdge(t)
        }, teardown: function () {
            this.bound = !1;
            for (var e in this.newObserved) {
                var t = this.newObserved[e];
                this.removeEdge(t)
            }
            this.newObserved = {}
        }
    });
    var n, r = [], i = 1 / 0, s = 0;
    t.registerUpdate = function (e, t) {
        var n = e.getDepth() - 1, h = e.getPrimaryDepth();
        i = Math.min(h, i), s = Math.max(h, s);
        var o = r[h] || (r[h] = {observeInfos: [], current: 1 / 0, max: 0}),
            a = o.observeInfos[n] || (o.observeInfos[n] = []);
        a.push(e), o.current = Math.min(n, o.current), o.max = Math.max(n, o.max)
    }, t.updateUntil = function (e) {
        for (var t; ;) {
            if (!(s >= i)) return;
            var h = r[i];
            if (h && h.current <= h.max) {
                var o = h.observeInfos[h.current];
                if (o && (t = o.pop())) {
                    if (t.updateCompute(n), t === e) return
                } else h.current++
            } else i++
        }
    }, t.batchEnd = function (e) {
        var t;
        for (n = e; ;) {
            if (!(s >= i)) return r = [], i = 1 / 0, void (s = 0);
            var h = r[i];
            if (h && h.current <= h.max) {
                var o = h.observeInfos[h.current];
                o && (t = o.pop()) ? t.updateCompute(e) : h.current++
            } else i++
        }
    };
    var h = [];
    return e.__observe = function (e, t) {
        var n = h[h.length - 1];
        if (n && !n.ignore) {
            var r = t + "", i = e._cid + "|" + r;
            n.traps ? n.traps.push({obj: e, event: r, name: i}) : n.newObserved[i] || (n.newObserved[i] = {
                obj: e,
                event: r
            })
        }
    }, e.__reading = e.__observe, e.__trapObserves = function () {
        if (h.length) {
            var e = h[h.length - 1], t = e.traps = [];
            return function () {
                return e.traps = null, t
            }
        }
        return function () {
            return []
        }
    }, e.__observes = function (e) {
        var t = h[h.length - 1];
        if (t) for (var n = 0, r = e.length; r > n; n++) {
            var i = e[n], s = i.name;
            t.newObserved[s] || (t.newObserved[s] = i)
        }
    }, e.__isRecordingObserves = function () {
        var e = h.length, t = h[e - 1];
        return e && 0 === t.ignore && t
    }, e.__notObserve = function (e) {
        return function () {
            if (h.length) {
                var t = h[h.length - 1];
                t.ignore++;
                var n = e.apply(this, arguments);
                return t.ignore--, n
            }
            return e.apply(this, arguments)
        }
    }, e.batch._onDispatchedEvents = t.batchEnd, t
});
/*can/map/map*/
define("can/map/map", ["can/util/util", "can/util/bind/bind", "can/map/bubble", "can/map/map_helpers", "can/construct/construct", "can/util/batch/batch", "can/compute/get_value_and_bind"], function (t, e, i, n) {
    var r = {constructor: !0}, s = t.Map = t.Construct.extend({
        setup: function () {
            if (t.Construct.setup.apply(this, arguments), this._computedPropertyNames = [], t.Map) {
                this.defaults || (this.defaults = {});
                for (var e in this.prototype) "define" !== e && "constructor" !== e && ("function" != typeof this.prototype[e] || this.prototype[e].prototype instanceof t.Construct) ? this.defaults[e] = this.prototype[e] : this.prototype[e].isComputed && this._computedPropertyNames.push(e);
                n.define && n.define(this)
            }
            !t.List || this.prototype instanceof t.List || (this.List = s.List.extend({Map: this}, {}))
        }, shortName: "Map", _bubbleRule: function (t) {
            return "change" === t || t.indexOf(".") >= 0 ? ["change"] : []
        }, bind: t.bindAndSetup, unbind: t.unbindAndTeardown, id: "id", keys: function (e) {
            var i = [];
            t.__observe(e, "__keys");
            for (var n in e._data) i.push(n);
            return i
        }
    }, {
        setup: function (e) {
            e instanceof t.Map && (e = e.serialize()), this._data = {}, t.cid(this, ".map"), this._setupComputedProperties();
            var i = e && n.addToMap(e, this), r = this._setupDefaults(e), s = t.extend(t.extend(!0, {}, r), e);
            this.attr(s), i && i()
        }, _setupComputedProperties: function () {
            this._computedAttrs = {};
            for (var t = this.constructor._computedPropertyNames, e = 0, i = t.length; i > e; e++) {
                var r = t[e];
                n.addComputedAttr(this, r, this[r].clone(this))
            }
        }, _setupDefaults: function () {
            return this.constructor.defaults || {}
        }, attr: function (attr, val) {
            var type = typeof attr;
            if(attr === undefined) {
                return this._getAttrs();
            } else if (type !== "string" && type !== "number") {
                // Get or set multiple attributes.
                return this._setAttrs(attr, val);
            }
            else if (arguments.length === 1) {
                // Get a single attribute.
                return this._get(attr+"");
            } else {
                // Set an attribute.
                this._set(attr+"", val);
                return this;
            }
        }, _get: function (e) {
            var i = e.indexOf(".");
            if (i >= 0) {
                var n = this.___get(e);
                if (void 0 !== n) return t.__observe(this, e), n;
                var r = e.substr(0, i), s = e.substr(i + 1), o = this.__get(r);
                return o && o._get ? o._get(s) : void 0
            }
            return this.__get(e)
        }, __get: function (e) {
            return r[e] || this._computedAttrs[e] || t.__observe(this, e), this.___get(e)
        }, ___get: function (t) {
            if (void 0 !== t) {
                var e = this._computedAttrs[t];
                return e && e.compute ? e.compute() : this._data.hasOwnProperty(t) ? this._data[t] : void 0
            }
            return this._data
        }, _set: function (e, i, n) {
            var r, s = e.indexOf(".");
            if (s >= 0 && !n) {
                var o = e.substr(0, s), a = e.substr(s + 1);
                if (r = this.__inSetup ? void 0 : this.___get(o), !t.isMapLike(r)) throw new Error("can.Map: Object does not exist");
                r._set(a, i)
            } else r = this.__inSetup ? void 0 : this.___get(e), this.__convert && (i = this.__convert(e, i)), this.__set(e, this.__type(i, e), r)
        }, __type: function (e, i) {
            if ("object" == typeof e && !(e instanceof t.Map) && n.canMakeObserve(e)) {
                var r = n.getMapFromObject(e);
                if (r) return r;
                if (t.isArray(e)) {
                    var s = t.List;
                    return new s(e)
                }
                var o = this.constructor.Map || t.Map;
                return new o(e)
            }
            return e
        }, __set: function (t, e, n) {
            if (e !== n) {
                var r = this._computedAttrs[t],
                    s = r || void 0 !== n || this.___get().hasOwnProperty(t) ? "set" : "add";
                this.___set(t, "object" == typeof e ? i.set(this, t, e, n) : e), r && r.count || this._triggerChange(t, s, e, n), "object" == typeof n && i.teardownFromParent(this, n)
            }
        }, ___set: function (t, e) {
            var i = this._computedAttrs[t];
            i && i.compute ? i.compute(e) : this._data[t] = e, "function" == typeof this.constructor.prototype[t] || i || (this[t] = e)
        }, removeAttr: function (t) {
            return this._remove(t)
        }, _remove: function (t) {
            var e = n.attrParts(t), i = e.shift(), r = this.___get(i);
            return e.length && r ? r.removeAttr(e) : ("string" == typeof t && ~t.indexOf(".") && (i = t), this.__remove(i, r), r)
        }, __remove: function (t, e) {
            t in this._data && (this.___remove(t), this._triggerChange(t, "remove", void 0, e))
        }, ___remove: function (t) {
            delete this._data[t], t in this.constructor.prototype || delete this[t]
        }, ___serialize: function (t, e) {
            return n.getValue(this, t, e, "serialize")
        }, _getAttrs: function () {
            return n.serialize(this, "attr", {})
        }, _setAttrs: function (e, i) {
            e = t.simpleExtend({}, e);
            var r, s, o = this;
            t.batch.start(), this._each(function (r, a) {
                if ("_cid" !== a) {
                    if (s = e[a], void 0 === s) return void (i && o.removeAttr(a));
                    o.__convert && (s = o.__convert(a, s)), t.isMapLike(r) && n.canMakeObserve(s) ? r.attr(s, i) : r !== s && o.__set(a, o.__type(s, a), r), delete e[a]
                }
            });
            for (r in e) "_cid" !== r && (s = e[r], this._set(r, s, !0));
            return t.batch.stop(), this
        }, serialize: function () {
            return n.serialize(this, "serialize", {})
        }, _triggerChange: function (e, n, r, s, o) {
            i.isBubbling(this, "change") && t.batch.trigger(this, {
                type: "change",
                target: this,
                batchNum: o
            }, [e, n, r, s]), t.batch.trigger(this, {
                type: e,
                target: this,
                batchNum: o
            }, [r, s]), ("remove" === n || "add" === n) && t.batch.trigger(this, {
                type: "__keys",
                target: this,
                batchNum: o
            })
        }, _bindsetup: function () {
        }, _bindteardown: function () {
        }, one: t.one, bind: function (e, n) {
            var r = this._computedAttrs && this._computedAttrs[e];
            return r && r.compute && (r.count ? r.count++ : (r.count = 1, r.compute.bind("change", r.handler))), i.bind(this, e), t.bindAndSetup.apply(this, arguments)
        }, unbind: function (e, n) {
            var r = this._computedAttrs && this._computedAttrs[e];
            return r && (1 === r.count ? (r.count = 0, r.compute.unbind("change", r.handler)) : r.count--), i.unbind(this, e), t.unbindAndTeardown.apply(this, arguments)
        }, compute: function (e) {
            if (t.isFunction(this.constructor.prototype[e])) return t.compute(this[e], this);
            var i = t.compute.read.reads(e), n = i.length - 1;
            return t.compute(function (e) {
                return arguments.length ? void t.compute.read(this, i.slice(0, n)).value.attr(i[n].key, e) : t.compute.read(this, i, {args: []}).value
            }, this)
        }, each: function () {
            return t.each.apply(void 0, [this].concat(t.makeArray(arguments)))
        }, _each: function (t) {
            var e = this.___get();
            for (var i in e) e.hasOwnProperty(i) && t(e[i], i)
        }, dispatch: t.dispatch
    });
    return s.prototype.on = s.prototype.bind, s.prototype.off = s.prototype.unbind, s.on = s.bind, s.off = s.unbind, s
});
/*can/list/list*/
define("can/list/list", ["can/util/util", "can/map/map", "can/map/bubble", "can/map/map_helpers"], function (t, e, i, r) {
    var s = [].splice, n = function () {
        var t = {0: "a", length: 1};
        return s.call(t, 0, 1), !t[0]
    }(), h = e.extend({Map: e}, {
        setup: function (e, i) {
            this.length = 0, t.cid(this, ".map"), this._setupComputedProperties(), e = e || [];
            var s;
            t.isPromise(e) ? this.replace(e) : (s = e.length && r.addToMap(e, this), this.push.apply(this, t.makeArray(e || []))), s && s(), t.simpleExtend(this, i)
        }, _triggerChange: function (i, r, s, n) {
            e.prototype._triggerChange.apply(this, arguments);
            var h = +i;
            ~("" + i).indexOf(".") || isNaN(h) || ("add" === r ? (t.batch.trigger(this, r, [s, h]), t.batch.trigger(this, "length", [this.length])) : "remove" === r ? (t.batch.trigger(this, r, [n, h]), t.batch.trigger(this, "length", [this.length])) : t.batch.trigger(this, r, [s, h]))
        }, ___get: function (t) {
            if (t) {
                var e = this._computedAttrs[t];
                return e && e.compute ? e.compute() : this[t]
            }
            return this
        }, __set: function (e, i, r) {
            if (e = isNaN(+e) || e % 1 ? e : +e, "number" == typeof e && e > this.length - 1) {
                var s = new Array(e + 1 - this.length);
                return s[s.length - 1] = i, this.push.apply(this, s), s
            }
            return t.Map.prototype.__set.call(this, "" + e, i, r)
        }, ___set: function (t, e) {
            this[t] = e, +t >= this.length && (this.length = +t + 1)
        }, __remove: function (t, e) {
            isNaN(+t) ? (delete this[t], this._triggerChange(t, "remove", void 0, e)) : this.splice(t, 1)
        }, _each: function (t) {
            for (var e = this.___get(), i = 0; i < e.length; i++) t(e[i], i)
        }, serialize: function () {
            return r.serialize(this, "serialize", [])
        }, splice: function (e, r) {
            var h, a, o, c = t.makeArray(arguments), l = [], u = c.length > 2;
            for (e = e || 0, h = 0, a = c.length - 2; a > h; h++) o = h + 2, c[o] = this.__type(c[o], o), l.push(c[o]), this[h + e] !== c[o] && (u = !1);
            if (u && this.length <= l.length) return l;
            void 0 === r && (r = c[1] = this.length - e);
            var p = s.apply(this, c);
            if (!n) for (h = this.length; h < p.length + this.length; h++) delete this[h];
            return t.batch.start(), r > 0 && (i.removeMany(this, p), this._triggerChange("" + e, "remove", void 0, p)), c.length > 2 && (i.addMany(this, l), this._triggerChange("" + e, "add", l, p)), t.batch.stop(), p
        }, _getAttrs: function () {
            return r.serialize(this, "attr", [])
        }, _setAttrs: function (e, i) {
            e = t.makeArray(e), t.batch.start(), this._updateAttrs(e, i), t.batch.stop()
        }, _updateAttrs: function (e, i) {
            for (var s = Math.min(e.length, this.length), n = 0; s > n; n++) {
                var h = this[n], a = e[n];
                t.isMapLike(h) && r.canMakeObserve(a) ? h.attr(a, i) : h !== a && this._set(n + "", a)
            }
            e.length > this.length ? this.push.apply(this, e.slice(this.length)) : e.length < this.length && i && this.splice(e.length)
        }
    }), a = function (e) {
        return e[0] && t.isArray(e[0]) ? e[0] : t.makeArray(e)
    };
    return t.each({push: "length", unshift: 0}, function (e, r) {
        var s = [][r];
        h.prototype[r] = function () {
            t.batch.start();
            for (var r, n, h = [], a = e ? this.length : 0, o = arguments.length; o--;) n = arguments[o], h[o] = i.set(this, o, this.__type(n, o));
            return r = s.apply(this, h), (!this.comparator || h.length) && this._triggerChange("" + a, "add", h, void 0), t.batch.stop(), r
        }
    }), t.each({pop: "length", shift: 0}, function (e, r) {
        h.prototype[r] = function () {
            if (!this.length) return void 0;
            var s = a(arguments), n = e && this.length ? this.length - 1 : 0, h = [][r].apply(this, s);
            return t.batch.start(), this._triggerChange("" + n, "remove", void 0, [h]), h && h.unbind && i.remove(this, h), t.batch.stop(), h
        }
    }), t.extend(h.prototype, {
        indexOf: function (e, i) {
            return t.__observe(this, "length"), t.inArray(e, this, i)
        }, join: function () {
            return t.__observe(this, "length"), [].join.apply(this, arguments)
        }, reverse: function () {
            var e = [].reverse.call(t.makeArray(this));
            return this.replace(e)
        }, slice: function () {
            t.__observe(this, "length");
            var e = Array.prototype.slice.apply(this, arguments);
            return new this.constructor(e)
        }, concat: function () {
            var e = [];
            return t.each(t.makeArray(arguments), function (i, r) {
                e[r] = i instanceof t.List ? i.serialize() : i
            }), new this.constructor(Array.prototype.concat.apply(this.serialize(), e))
        }, forEach: function (e, i) {
            return t.each(this, e, i || this)
        }, replace: function (e) {
            if (t.isPromise(e)) {
                this._promise && (this._promise.__isCurrentPromise = !1);
                var i = this._promise = e;
                i.__isCurrentPromise = !0;
                var r = this;
                e.then(function (t) {
                    i.__isCurrentPromise && r.replace(t)
                })
            } else this.splice.apply(this, [0, this.length].concat(t.makeArray(e || [])));
            return this
        }, filter: function (t, e) {
            var i, r = new this.constructor, s = this;
            return this.each(function (n, h, a) {
                i = t.call(e | s, n, h, s), i && r.push(n)
            }), r
        }, map: function (e, i) {
            var r = new t.List, s = this;
            return this.each(function (t, n, h) {
                var a = e.call(i | s, t, n, s);
                r.push(a)
            }), r
        }
    }), t.List = e.List = h, t.List
});
/*can/compute/read*/
define("can/compute/read", ["can/util/util"], function (e) {
    var t = function (e, r, a) {
        a = a || {};
        for (var o, s, i = {foundObservable: !1}, u = n(e, 0, r, a, i), d = r.length, v = 0; d > v;) {
            s = u;
            for (var l = 0, f = t.propertyReaders.length; f > l; l++) {
                var c = t.propertyReaders[l];
                if (c.test(u)) {
                    u = c.read(u, r[v], v, a, i);
                    break
                }
            }
            if (v += 1, u = n(u, v, r, a, i, s), o = typeof u, v < r.length && (null === u || "function" !== o && "object" !== o)) return a.earlyExit && a.earlyExit(s, v - 1, u), {
                value: void 0,
                parent: s
            }
        }
        return void 0 === u && a.earlyExit && a.earlyExit(s, v - 1), {value: u, parent: s}
    }, r = function (e, t) {
        var r = t[e - 1];
        return r && r.at
    }, n = function (e, r, n, a, o, s) {
        var i;
        do {
            i = !1;
            for (var u = 0, d = t.valueReaders.length; d > u; u++) t.valueReaders[u].test(e, r, n, a) && (e = t.valueReaders[u].read(e, r, n, a, o, s))
        } while (i);
        return e
    };
    t.valueReaders = [{
        name: "compute", test: function (e, t, n, a) {
            return e && e.isComputed && !r(t, n)
        }, read: function (t, r, n, a, o) {
            return a.readCompute === !1 && r === n.length ? t : (!o.foundObservable && a.foundObservable && (a.foundObservable(t, r), o.foundObservable = !0), t instanceof e.Compute ? t.get() : t())
        }
    }, {
        name: "function", test: function (t, r, n, a) {
            var o = typeof t;
            return !("function" !== o || t.isComputed || e.Construct && t.prototype instanceof e.Construct || e.route && t === e.route)
        }, read: function (t, n, a, o, s, i) {
            return r(n, a) ? n === a.length ? e.proxy(t, i) : t : o.callMethodsOnObservables && e.isMapLike(i) ? t.apply(i, o.args || []) : o.isArgument && n === a.length ? o.proxyMethods !== !1 ? e.proxy(t, i) : t : t.apply(i, o.args || [])
        }
    }], t.propertyReaders = [{
        name: "map", test: e.isMapLike, read: function (e, t, r, n, a) {
            !a.foundObservable && n.foundObservable && (n.foundObservable(e, r), a.foundObservable = !0);
            var o = e.attr(t.key);
            return void 0 !== o ? o : e[t.key]
        }
    }, {
        name: "promise", test: function (t) {
            return e.isPromise(t)
        }, read: function (t, r, n, a, o) {
            !o.foundObservable && a.foundObservable && (a.foundObservable(t, n), o.foundObservable = !0);
            var s = t.__observeData;
            return t.__observeData || (s = t.__observeData = {
                isPending: !0,
                state: "pending",
                isResolved: !1,
                isRejected: !1,
                value: void 0,
                reason: void 0
            }, e.cid(s), e.simpleExtend(s, e.event), t.then(function (e) {
                s.isPending = !1, s.isResolved = !0, s.value = e, s.state = "resolved", s.dispatch("state", ["resolved", "pending"])
            }, function (e) {
                s.isPending = !1, s.isRejected = !0, s.reason = e, s.state = "rejected", s.dispatch("state", ["rejected", "pending"])
            })), e.__observe(s, "state"), r.key in s ? s[r.key] : t[r.key]
        }
    }, {
        name: "object", test: function () {
            return !0
        }, read: function (e, t) {
            return null == e ? void 0 : t.key in e ? e[t.key] : t.at && a[t.key] && "@" + t.key in e ? (t.at = !1, e["@" + t.key]) : void 0
        }
    }];
    var a = {index: !0, key: !0, event: !0, element: !0, viewModel: !0};
    return t.write = function (t, r, n, a) {
        return a = a || {}, e.isMapLike(t) ? !a.isArgument && t._data && t._data[r] && t._data[r].isComputed ? t._data[r](n) : t.attr(r, n) : t[r] && t[r].isComputed ? t[r](n) : void ("object" == typeof t && (t[r] = n))
    }, t.reads = function (e) {
        var t = [], r = 0, n = !1;
        "@" === e.charAt(0) && (r = 1, n = !0);
        for (var a = "", o = r; o < e.length; o++) {
            var s = e.charAt(o);
            "." === s || "@" === s ? "\\" !== e.charAt(o - 1) ? (t.push({
                key: a,
                at: n
            }), n = "@" === s, a = "") : a = a.substr(0, a.length - 1) + "." : a += s
        }
        return t.push({key: a, at: n}), t
    }, t
});
/*can/compute/proto_compute*/
define("can/compute/proto_compute", ["can/util/util", "can/util/bind/bind", "can/compute/read", "can/compute/get_value_and_bind", "can/util/batch/batch"], function (t, e, n, i) {
    t.Compute = function (e, n, i, s) {
        t.cid(this, "compute");
        for (var u = [], o = 0, a = arguments.length; a > o; o++) u[o] = arguments[o];
        var h = typeof u[1];
        "function" == typeof u[0] ? this._setupGetterSetterFn(u[0], u[1], u[2], u[3]) : u[1] ? "string" === h ? this._setupProperty(u[0], u[1], u[2]) : "function" === h ? this._setupSetter(u[0], u[1], u[2]) : u[1] && u[1].fn ? this._setupAsyncCompute(u[0], u[1]) : this._setupSettings(u[0], u[1]) : this._setupSimpleValue(u[0]), this._args = u, this._primaryDepth = 0, this.isComputed = !0
    }, t.simpleExtend(t.Compute.prototype, {
        setPrimaryDepth: function (t) {
            this._primaryDepth = t
        }, _setupGetterSetterFn: function (e, n, i) {
            this._set = n ? t.proxy(e, n) : e, this._get = n ? t.proxy(e, n) : e, this._canObserve = i === !1 ? !1 : !0;
            var s = u(this, e, n || this);
            t.simpleExtend(this, s)
        }, _setupProperty: function (e, n, i) {
            var s, u = t.isMapLike(e), o = this;
            u ? (s = function (t, e, n) {
                o.updater(e, n, t.batchNum)
            }, this.hasDependencies = !0, this._get = function () {
                return e.attr(n)
            }, this._set = function (t) {
                e.attr(n, t)
            }) : (s = function () {
                o.updater(o._get(), o.value)
            }, this._get = function () {
                return t.getObject(n, [e])
            }, this._set = function (i) {
                var s = n.split("."), u = s.pop(), o = t.getObject(s.join("."), [e]);
                o[u] = i
            }), this._on = function (u) {
                t.bind.call(e, i || n, s), this.value = this._get()
            }, this._off = function () {
                return t.unbind.call(e, i || n, s)
            }
        }, _setupSetter: function (e, n, i) {
            this.value = e, this._set = n, t.simpleExtend(this, i)
        }, _setupSettings: function (t, e) {
            if (this.value = t, this._set = e.set || this._set, this._get = e.get || this._get, !e.__selfUpdater) {
                var n = this, i = this.updater;
                this.updater = function () {
                    i.call(n, n._get(), n.value)
                }
            }
            this._on = e.on ? e.on : this._on, this._off = e.off ? e.off : this._off
        }, _setupAsyncCompute: function (e, n) {
            var i = this;
            this.value = e, this._setUpdates = !0, this.lastSetValue = new t.Compute(e), this._set = function (t) {
                return t === i.lastSetValue.get() ? this.value : i.lastSetValue.set(t)
            }, this._get = function () {
                return o.call(n.context, i.lastSetValue.get())
            };
            var s, o = n.fn;
            if (0 === o.length) s = u(this, o, n.context); else if (1 === o.length) s = u(this, function () {
                return o.call(n.context, i.lastSetValue.get())
            }, n); else {
                var a = this.updater, h = function (t) {
                    a.call(i, t, i.value)
                };
                this.updater = function (t) {
                    a.call(i, t, i.value)
                }, s = u(this, function () {
                    var t = o.call(n.context, i.lastSetValue.get(), h);
                    return void 0 !== t ? t : this.value
                }, this)
            }
            t.simpleExtend(this, s)
        }, _setupSimpleValue: function (t) {
            this.value = t
        }, _bindsetup: t.__notObserve(function () {
            this.bound = !0, this._on(this.updater)
        }), _bindteardown: function () {
            this._off(this.updater), this.bound = !1
        }, bind: t.bindAndSetup, unbind: t.unbindAndTeardown, clone: function (e) {
            return e && "function" == typeof this._args[0] ? this._args[1] = e : e && (this._args[2] = e), new t.Compute(this._args[0], this._args[1], this._args[2], this._args[3])
        }, _on: t.k, _off: t.k, get: function () {
            var e = t.__isRecordingObserves();
            return e && this._canObserve !== !1 && (t.__observe(this, "change"), this.bound || t.Compute.temporarilyBind(this)), this.bound ? (e && this.getDepth && this.getDepth() >= e.getDepth() && i.updateUntil(this.readInfo), this.value) : this._get()
        }, _get: function () {
            return this.value
        }, set: function (t) {
            var e = this.value, n = this._set(t, e);
            return this._setUpdates ? this.value : this.hasDependencies ? this._get() : (void 0 === n ? this.value = this._get() : this.value = n, s(this, this.value, e), this.value)
        }, _set: function (t) {
            return this.value = t
        }, updater: function (t, e, n) {
            this.value = t, s(this, t, e, n)
        }, toFunction: function () {
            return t.proxy(this._computeFn, this)
        }, _computeFn: function (t) {
            return arguments.length ? this.set(t) : this.get()
        }
    });
    var s = function (e, n, i, s) {
        var u = n !== i && !(n !== n && i !== i);
        u && t.batch.trigger(e, {type: "change", batchNum: s}, [n, i])
    }, u = function (e, n, s) {
        var u = new i(n, s, e);
        return {
            readInfo: u, _on: function () {
                u.getValueAndBind(), e.value = u.value, e.hasDependencies = !t.isEmptyObject(u.newObserved)
            }, _off: function () {
                u.teardown()
            }, getDepth: function () {
                return u.getDepth()
            }
        }
    };
    t.Compute.temporarilyBind = function (e) {
        var n = e.computeInstance || e;
        n.bind("change", t.k), o || (o = [], setTimeout(a, 10)), o.push(n)
    };
    var o, a = function () {
        for (var e = 0, n = o.length; n > e; e++) o[e].unbind("change", t.k);
        o = null
    };
    return t.Compute.async = function (e, n, i) {
        return new t.Compute(e, {fn: n, context: i})
    }, t.Compute.truthy = function (e) {
        return new t.Compute(function () {
            var t = e.get();
            return "function" == typeof t && (t = t.get()), !!t
        })
    }, t.Compute.read = n, t.Compute.set = n.write, t.Compute
});
/*can/compute/compute*/
define("can/compute/compute", ["can/util/util", "can/util/bind/bind", "can/util/batch/batch", "can/compute/proto_compute"], function (t, n) {
    return t.compute = function (n, e, u, o) {
        var c = new t.Compute(n, e, u, o), r = c.bind, i = c.unbind, p = function (t) {
            return arguments.length ? c.set(t) : c.get()
        }, m = t.cid(p, "compute"), a = "__handler" + m;
        return p.bind = function (t, n) {
            var e = n && n[a];
            return n && !e && (e = n[a] = function () {
                n.apply(p, arguments)
            }), r.call(c, t, e)
        }, p.unbind = function (t, n) {
            var e = n && n[a];
            return e ? (delete n[a], c.unbind(t, e)) : i.apply(c, arguments)
        }, p.isComputed = c.isComputed, p.clone = function (u) {
            return "function" == typeof n && (e = u), t.compute(n, e, u, o)
        }, p.computeInstance = c, p
    }, t.compute.truthy = function (n) {
        return t.compute(function () {
            var t = n();
            return "function" == typeof t && (t = t()), !!t
        })
    }, t.compute.async = function (n, e, u) {
        return t.compute(n, {fn: e, context: u})
    }, t.compute.read = t.Compute.read, t.compute.set = t.Compute.set, t.compute.temporarilyBind = t.Compute.temporarilyBind, t.compute
});
/*can/view/view*/
define("can/view/view", ["can/util/util"], function (e) {
    var r = e.isFunction, n = e.makeArray, t = 1, i = function (e) {
        var r = function () {
            return s.frag(e.apply(this, arguments))
        };
        return r.render = function () {
            return e.apply(e, arguments)
        }, r
    }, u = function (e, r) {
        if (!e.length) throw new Error("can.view: No template or empty template:" + r)
    }, o = function (n, t) {
        if (r(n)) {
            var i = e.Deferred();
            return i.resolve(n)
        }
        var o, a, c, d = "string" == typeof n ? n : n.url, f = n.engine && "." + n.engine || d.match(/\.[\w\d]+$/);
        if (d.match(/^#/) && (d = d.substr(1)), (a = document.getElementById(d)) && (f = "." + a.type.match(/\/(x\-)?(.+)/)[2]), f || s.cached[d] || (d += f = s.ext), e.isArray(f) && (f = f[0]), c = s.toId(d), d.match(/^\/\//) && (d = d.substr(2), d = window.steal ? steal.config().root.mapJoin("" + steal.id(d)) : d), window.require && require.toUrl && (d = require.toUrl(d)), o = s.types[f], s.cached[c]) return s.cached[c];
        if (a) return s.registerView(c, a.innerHTML, o);
        var p = new e.Deferred;
        return e.ajax({
            async: t, url: d, dataType: "text", error: function (e) {
                u("", d), p.reject(e)
            }, success: function (e) {
                u(e, d), s.registerView(c, e, o, p)
            }
        }), p
    }, a = function (r) {
        var n = [];
        if (e.isPromise(r)) return [r];
        for (var t in r) e.isPromise(r[t]) && n.push(r[t]);
        return n
    }, c = function (r) {
        return e.isArray(r) && "success" === r[1] ? r[0] : r
    }, s = e.view = e.template = function (e, n, t, i) {
        return r(t) && (i = t, t = void 0), s.renderAs("fragment", e, n, t, i)
    };
    return e.extend(s, {
        frag: function (e, r) {
            return s.hookup(s.fragment(e), r)
        }, fragment: function (r) {
            return e.frag(r, document)
        }, toId: function (r) {
            return e.map(r.toString().split(/\/|\./g), function (e) {
                return e ? e : void 0
            }).join("_")
        }, toStr: function (e) {
            return null == e ? "" : "" + e
        }, hookup: function (r, n) {
            var t, i, u = [];
            return e.each(r.childNodes ? e.makeArray(r.childNodes) : r, function (r) {
                1 === r.nodeType && (u.push(r), u.push.apply(u, e.makeArray(r.getElementsByTagName("*"))))
            }), e.each(u, function (e) {
                e.getAttribute && (t = e.getAttribute("data-view-id")) && (i = s.hookups[t]) && (i(e, n, t), delete s.hookups[t], e.removeAttribute("data-view-id"))
            }), r
        }, hookups: {}, hook: function (e) {
            return s.hookups[++t] = e, " data-view-id='" + t + "'"
        }, cached: {}, cachedRenderers: {}, cache: !0, register: function (r) {
            this.types["." + r.suffix] = r, e[r.suffix] = s[r.suffix] = function (e, n) {
                var t, u;
                if (!n) return u = function () {
                    return t || (t = r.fragRenderer ? r.fragRenderer(null, e) : i(r.renderer(null, e))), t.apply(this, arguments)
                }, u.render = function () {
                    var n = r.renderer(null, e);
                    return n.apply(n, arguments)
                }, u;
                var o = function () {
                    return t || (t = r.fragRenderer ? r.fragRenderer(e, n) : r.renderer(e, n)), t.apply(this, arguments)
                };
                return r.fragRenderer ? s.preload(e, o) : s.preloadStringRenderer(e, o)
            }
        }, types: {}, ext: ".ejs", registerScript: function (e, r, n) {
            return "can.view.preloadStringRenderer('" + r + "'," + s.types["." + e].script(r, n) + ");"
        }, preload: function (r, n) {
            var t = s.cached[r] = (new e.Deferred).resolve(function (e, r) {
                return n.call(e, e, r)
            });
            return t.__view_id = r, s.cachedRenderers[r] = n, n
        }, preloadStringRenderer: function (e, r) {
            return this.preload(e, i(r))
        }, render: function (r, n, t, i, u) {
            return e.view.renderAs("string", r, n, t, i, u)
        }, renderTo: function (e, r, n, t, i) {
            return ("string" === e && r.render ? r.render : r)(n, t, i)
        }, renderAs: function (t, i, u, d, f, p) {
            void 0 !== f && "string" == typeof f.expression && (p = f, f = void 0), r(d) && (f = d, d = void 0);
            var l, h, v, g, m = a(u);
            if (m.length) return l = new e.Deferred, h = e.extend({}, u), m.push(o(i, !0)), e.when.apply(e, m).then(function (r) {
                var i, o = n(arguments), a = o.pop();
                if (e.isPromise(u)) h = c(r); else for (var s in u) e.isPromise(u[s]) && (h[s] = c(o.shift()));
                i = e.view.renderTo(t, a, h, d, p), l.resolve(i, h), f && f(i, h)
            }, function () {
                l.reject.apply(l, arguments)
            }), l;
            if (v = r(f), l = e.__notObserve(o)(i, v), v) g = l, l.then(function (r) {
                f(u ? e.view.renderTo(t, r, u, d, p) : r)
            }); else {
                if ("resolved" === l.state() && l.__view_id) {
                    var w = s.cachedRenderers[l.__view_id];
                    return u ? e.view.renderTo(t, w, u, d, p) : w
                }
                l.then(function (r) {
                    g = u ? e.view.renderTo(t, r, u, d, p) : r
                })
            }
            return g
        }, registerView: function (r, n, t, u) {
            var o, a = "object" == typeof t ? t : s.types[t || s.ext];
            return o = a.fragRenderer ? a.fragRenderer(r, n) : i(a.renderer(r, n)), u = u || new e.Deferred, s.cache && (s.cached[r] = u, u.__view_id = r, s.cachedRenderers[r] = o), u.resolve(o)
        }, simpleHelper: function (r) {
            return function () {
                var n = [], t = arguments;
                return e.each(t, function (e, r) {
                    if (r <= t.length) {
                        for (; e && e.isComputed;) e = e();
                        n.push(e)
                    }
                }), r.apply(this, n)
            }
        }
    }), e
});
/*can/view/elements*/
define("can/view/elements", ["can/util/util", "can/view/view"], function (e) {
    var t = "undefined" != typeof document ? document : null, n = t && function () {
        return 1 === e.$(document.createComment("~")).length
    }(), o = {
        tagToContentPropMap: {
            option: t && "textContent" in document.createElement("option") ? "textContent" : "innerText",
            textarea: "value"
        },
        attrMap: e.attr.map,
        attrReg: /([^\s=]+)[\s]*=[\s]*/,
        defaultValue: e.attr.defaultValue,
        tagMap: {
            "": "span",
            colgroup: "col",
            table: "tbody",
            tr: "td",
            ol: "li",
            ul: "li",
            tbody: "tr",
            thead: "tr",
            tfoot: "tr",
            select: "option",
            optgroup: "option"
        },
        reverseTagMap: {col: "colgroup", tr: "tbody", option: "select", td: "tr", th: "tr", li: "ul"},
        selfClosingTags: {col: !0},
        getParentNode: function (e, t) {
            return t && 11 === e.parentNode.nodeType ? t : e.parentNode
        },
        setAttr: e.attr.set,
        getAttr: e.attr.get,
        removeAttr: e.attr.remove,
        contentText: function (e) {
            return "string" == typeof e ? e : e || 0 === e ? "" + e : ""
        },
        after: function (t, n) {
            var o = t[t.length - 1];
            o.nextSibling ? e.insertBefore(o.parentNode, n, o.nextSibling, e.document) : e.appendChild(o.parentNode, n, e.document)
        },
        replace: function (t, r) {
            var a, l = t[0].parentNode;
            "SELECT" === l.nodeName.toUpperCase() && l.selectedIndex >= 0 && (a = l.value), o.after(t, r), e.remove(e.$(t)).length < t.length && !n && e.each(t, function (e) {
                8 === e.nodeType && e.parentNode.removeChild(e)
            }), void 0 !== a && (l.value = a)
        }
    };
    return e.view.elements = o, o
});
/*can/view/callbacks/callbacks*/
define("can/view/callbacks/callbacks", ["can/util/util", "can/view/view"], function (t) {
    var e = t.view.attr = function (t, e) {
        if (!e) {
            var i = a[t];
            if (!i) for (var n = 0, l = r.length; l > n; n++) {
                var o = r[n];
                if (o.match.test(t)) {
                    i = o.handler;
                    break
                }
            }
            return i
        }
        "string" == typeof t ? a[t] = e : r.push({match: t, handler: e})
    }, a = {}, r = [], i = /[-\:]/, n = t.view.tag = function (e, a) {
        if (!a) {
            var r = l[e.toLowerCase()];
            return !r && i.test(e) && (r = function () {
            }), r
        }
        t.global.html5 && (t.global.html5.elements += " " + e, t.global.html5.shivDocument()), l[e.toLowerCase()] = a
    }, l = {};
    return t.view.callbacks = {
        _tags: l,
        _attributes: a,
        _regExpAttributes: r,
        tag: n,
        attr: e,
        tagHandler: function (e, a, r) {
            var i, n = r.options.get("tags." + a, {proxyMethods: !1}), o = n || l[a], s = r.scope;
            if (i = o ? t.__notObserve(o)(e, r) : s, i && r.subtemplate) {
                s !== i && (s = s.add(i));
                var c = r.subtemplate(s, r.options), v = "string" == typeof c ? t.view.frag(c) : c;
                t.appendChild(e, v)
            }
        }
    }, t.view.callbacks
});
/*can/view/scanner*/
define("can/view/scanner", ["can/view/view", "can/view/elements", "can/view/callbacks/callbacks"], function (can, elements, viewCallbacks) {
    var newLine = /(\r|\n)+/g, notEndTag = /\//, clean = function (t) {
            return t.split("\\").join("\\\\").split("\n").join("\\n").split('"').join('\\"').split("	").join("\\t")
        }, getTag = function (t, e, n) {
            if (t) return t;
            for (; n < e.length;) {
                if ("<" === e[n] && !notEndTag.test(e[n + 1])) return elements.reverseTagMap[e[n + 1]] || "span";
                n++
            }
            return ""
        }, bracketNum = function (t) {
            return --t.split("{").length - --t.split("}").length
        }, myEval = function (script) {
            eval(script)
        }, attrReg = /([^\s]+)[\s]*=[\s]*$/, startTxt = "var ___v1ew = [];", finishTxt = "return ___v1ew.join('')",
        put_cmd = "___v1ew.push(\n", insert_cmd = put_cmd, htmlTag = null, quote = null, beforeQuote = null,
        rescan = null, getAttrName = function () {
            var t = beforeQuote.match(attrReg);
            return t && t[1]
        }, status = function () {
            return quote ? "'" + getAttrName() + "'" : htmlTag ? 1 : 0
        }, top = function (t) {
            return t[t.length - 1]
        }, Scanner;
    return can.view.Scanner = Scanner = function (t) {
        can.extend(this, {
            text: {},
            tokens: []
        }, t), this.text.options = this.text.options || "", this.tokenReg = [], this.tokenSimple = {
            "<": "<",
            ">": ">",
            '"': '"',
            "'": "'"
        }, this.tokenComplex = [], this.tokenMap = {};
        for (var e, n = 0; e = this.tokens[n]; n++) e[2] ? (this.tokenReg.push(e[2]), this.tokenComplex.push({
            abbr: e[1],
            re: new RegExp(e[2]),
            rescan: e[3]
        })) : (this.tokenReg.push(e[1]), this.tokenSimple[e[1]] = e[0]), this.tokenMap[e[0]] = e[1];
        this.tokenReg = new RegExp("(" + this.tokenReg.slice(0).concat(["<", ">", '"', "'"]).join("|") + ")", "g")
    }, Scanner.prototype = {
        helpers: [], scan: function (t, e) {
            var n = [], s = 0, a = this.tokenSimple, r = this.tokenComplex;
            t = t.replace(newLine, "\n"), this.transform && (t = this.transform(t)), t.replace(this.tokenReg, function (e, i) {
                var o = arguments[arguments.length - 2];
                if (o > s && n.push(t.substring(s, o)), a[e]) n.push(e); else for (var u, c = 0; u = r[c]; c++) if (u.re.test(e)) {
                    n.push(u.abbr), u.rescan && n.push(u.rescan(i));
                    break
                }
                s = o + i.length
            }), s < t.length && n.push(t.substr(s));
            var i, o, u, c, l = "", p = [startTxt + (this.text.start || "")], h = function (t, e) {
                    p.push(put_cmd, '"', clean(t), '"' + (e || "") + ");")
                }, g = [], f = null, m = !1, k = {attributeHookups: [], tagHookups: [], lastTagHookup: ""},
                b = function () {
                    k.lastTagHookup = k.tagHookups.pop() + k.tagHookups.length
                }, v = "", x = [], w = !1, T = !1, d = 0, _ = this.tokenMap;
            for (htmlTag = quote = beforeQuote = null; void 0 !== (u = n[d++]);) {
                if (null === f) switch (u) {
                    case _.left:
                    case _.escapeLeft:
                    case _.returnLeft:
                        m = htmlTag && 1;
                    case _.commentLeft:
                        f = u, l.length && h(l), l = "";
                        break;
                    case _.escapeFull:
                        m = htmlTag && 1, rescan = 1, f = _.escapeLeft, l.length && h(l), rescan = n[d++], l = rescan.content || rescan, rescan.before && h(rescan.before), n.splice(d, 0, _.right);
                        break;
                    case _.commentFull:
                        break;
                    case _.templateLeft:
                        l += _.left;
                        break;
                    case"<":
                        0 !== n[d].indexOf("!--") && (htmlTag = 1, m = 0), l += u;
                        break;
                    case">":
                        htmlTag = 0;
                        var H = "/" === l.substr(l.length - 1) || "--" === l.substr(l.length - 2), N = "";
                        if (k.attributeHookups.length && (N = "attrs: ['" + k.attributeHookups.join("','") + "'], ", k.attributeHookups = []), v + k.tagHookups.length !== k.lastTagHookup && v === top(k.tagHookups)) H && (l = l.substr(0, l.length - 1)), p.push(put_cmd, '"', clean(l), '"', ",can.view.pending({tagName:'" + v + "'," + N + "scope: " + (this.text.scope || "this") + this.text.options), H ? (p.push("}));"), l = "/>", b()) : "<" === n[d] && n[d + 1] === "/" + v ? (p.push("}));"), l = u, b()) : (p.push(",subtemplate: function(" + this.text.argNames + "){\n" + startTxt + (this.text.start || "")), l = ""); else if (m || !w && elements.tagToContentPropMap[x[x.length - 1]] || N) {
                            var R = ",can.view.pending({" + N + "scope: " + (this.text.scope || "this") + this.text.options + '}),"';
                            H ? h(l.substr(0, l.length - 1), R + '/>"') : h(l, R + '>"'), l = "", m = 0
                        } else l += u;
                        (H || w) && (x.pop(), v = x[x.length - 1], w = !1), k.attributeHookups = [];
                        break;
                    case"'":
                    case'"':
                        if (htmlTag) if (quote && quote === u) {
                            quote = null;
                            var L = getAttrName();
                            if (viewCallbacks.attr(L) && k.attributeHookups.push(L), T) {
                                l += u, h(l), p.push(finishTxt, "}));\n"), l = "", T = !1;
                                break
                            }
                        } else if (null === quote && (quote = u, beforeQuote = i, c = getAttrName(), "img" === v && "src" === c || "style" === c)) {
                            h(l.replace(attrReg, "")), l = "", T = !0, p.push(insert_cmd, "can.view.txt(2,'" + getTag(v, n, d) + "'," + status() + ",this,function(){", startTxt), h(c + "=" + u);
                            break
                        }
                    default:
                        if ("<" === i) {
                            v = "!--" === u.substr(0, 3) ? "!--" : u.split(/\s/)[0];
                            var S, y = !1;
                            0 === v.indexOf("/") && (y = !0, S = v.substr(1)), y ? (top(x) === S && (v = S, w = !0), top(k.tagHookups) === S && (h(l.substr(0, l.length - 1)), p.push(finishTxt + "}}) );"), l = "><", b())) : (v.lastIndexOf("/") === v.length - 1 && (v = v.substr(0, v.length - 1)), "!--" !== v && viewCallbacks.tag(v) && ("content" === v && elements.tagMap[top(x)] && (u = u.replace("content", elements.tagMap[top(x)])), k.tagHookups.push(v)), x.push(v))
                        }
                        l += u
                } else switch (u) {
                    case _.right:
                    case _.returnRight:
                        switch (f) {
                            case _.left:
                                o = bracketNum(l), 1 === o ? (p.push(insert_cmd, "can.view.txt(0,'" + getTag(v, n, d) + "'," + status() + ",this,function(){", startTxt, l), g.push({
                                    before: "",
                                    after: finishTxt + "}));\n"
                                })) : (s = g.length && -1 === o ? g.pop() : {after: ";"}, s.before && p.push(s.before), p.push(l, ";", s.after));
                                break;
                            case _.escapeLeft:
                            case _.returnLeft:
                                o = bracketNum(l), o && g.push({before: finishTxt, after: "}));\n"});
                                for (var j = f === _.escapeLeft ? 1 : 0, C = {
                                    insert: insert_cmd,
                                    tagName: getTag(v, n, d),
                                    status: status(),
                                    specialAttribute: T
                                }, q = 0; q < this.helpers.length; q++) {
                                    var E = this.helpers[q];
                                    if (E.name.test(l)) {
                                        l = E.fn(l, C), E.name.source === /^>[\s]*\w*/.source && (j = 0);
                                        break
                                    }
                                }
                                "object" == typeof l ? l.startTxt && l.end && T ? p.push(insert_cmd, "can.view.toStr( ", l.content, "() ) );") : (l.startTxt ? p.push(insert_cmd, "can.view.txt(\n" + ("string" == typeof status() || (null != l.escaped ? l.escaped : j)) + ",\n'" + v + "',\n" + status() + ",\nthis,\n") : l.startOnlyTxt && p.push(insert_cmd, "can.view.onlytxt(this,\n"), p.push(l.content), l.end && p.push("));")) : T ? p.push(insert_cmd, l, ");") : p.push(insert_cmd, "can.view.txt(\n" + ("string" == typeof status() || j) + ",\n'" + v + "',\n" + status() + ",\nthis,\nfunction(){ " + (this.text.escape || "") + "return ", l, o ? startTxt : "}));\n"), rescan && rescan.after && rescan.after.length && (h(rescan.after.length), rescan = null)
                        }
                        f = null, l = "";
                        break;
                    case _.templateLeft:
                        l += _.left;
                        break;
                    default:
                        l += u
                }
                i = u
            }
            l.length && h(l), p.push(";");
            var M = p.join(""), A = {out: (this.text.outStart || "") + M + " " + finishTxt + (this.text.outEnd || "")};
            return myEval.call(A, "this.fn = (function(" + this.text.argNames + "){" + A.out + "});\r\n//# sourceURL=" + e + ".js"), A
        }
    }, can.view.pending = function (t) {
        var e = can.view.getHooks();
        return can.view.hook(function (n) {
            can.each(e, function (t) {
                t(n)
            }), t.templateType = "legacy", t.tagName && viewCallbacks.tagHandler(n, t.tagName, t), can.each(t && t.attrs || [], function (e) {
                t.attributeName = e;
                var s = viewCallbacks.attr(e);
                s && s(n, t)
            })
        })
    }, can.view.tag("content", function (t, e) {
        return e.scope
    }), can.view.Scanner = Scanner, Scanner
});
/*can/view/node_lists/node_lists*/
define("can/view/node_lists/node_lists", ["can/util/util", "can/view/elements"], function (e) {
    var n = !0;
    try {
        document.createTextNode("")._ = 0
    } catch (r) {
        n = !1
    }
    var t = {}, i = {}, a = "ejs_" + Math.random(), s = 0, u = function (e, r) {
        var t = r || i, u = l(e, t);
        return u ? u : n || 3 !== e.nodeType ? (++s, e[a] = (e.nodeName ? "element_" : "obj_") + s) : (++s, t["text_" + s] = e, "text_" + s)
    }, l = function (e, r) {
        if (n || 3 !== e.nodeType) return e[a];
        for (var t in r) if (r[t] === e) return t
    }, p = [].splice, c = [].push, d = function (e) {
        for (var n = 0, r = 0, t = e.length; t > r; r++) {
            var i = e[r];
            i.nodeType ? n++ : n += d(i)
        }
        return n
    }, o = function (e, n) {
        for (var r = {}, t = 0, i = e.length; i > t; t++) {
            var a = h.first(e[t]);
            r[u(a, n)] = e[t]
        }
        return r
    }, f = function (e, n, r) {
        for (var t in n) r[t] || e.newDeepChildren.push(n[t])
    }, h = {
        id: u, update: function (n, r) {
            var t = h.unregisterChildren(n);
            r = e.makeArray(r);
            var i = n.length;
            return p.apply(n, [0, i].concat(r)), n.replacements ? (h.nestReplacements(n), n.deepChildren = n.newDeepChildren, n.newDeepChildren = []) : h.nestList(n), t
        }, nestReplacements: function (e) {
            for (var n = 0, r = {}, t = o(e.replacements, r), i = e.replacements.length, a = {}; n < e.length && i;) {
                var s = e[n], u = l(s, r), p = t[u];
                p && (e.splice(n, d(p), p), a[u] = !0, i--), n++
            }
            i && f(e, t, a), e.replacements = []
        }, nestList: function (e) {
            for (var n = 0; n < e.length;) {
                var r = e[n], i = t[u(r)];
                i ? i !== e && e.splice(n, d(i), i) : t[u(r)] = e, n++
            }
        }, last: function (e) {
            var n = e[e.length - 1];
            return n.nodeType ? n : h.last(n)
        }, first: function (e) {
            var n = e[0];
            return n.nodeType ? n : h.first(n)
        }, flatten: function (e) {
            for (var n = [], r = 0; r < e.length; r++) {
                var t = e[r];
                t.nodeType ? n.push(t) : n.push.apply(n, h.flatten(t))
            }
            return n
        }, register: function (n, r, t, i) {
            return e.cid(n), n.unregistered = r, n.parentList = t, n.nesting = t && "undefined" != typeof t.nesting ? t.nesting + 1 : 0, t ? (n.deepChildren = [], n.newDeepChildren = [], n.replacements = [], t !== !0 && (i ? t.replacements.push(n) : t.newDeepChildren.push(n))) : h.nestList(n), n
        }, unregisterChildren: function (n) {
            var r = [];
            return e.each(n, function (e) {
                e.nodeType ? (n.replacements || delete t[u(e)], r.push(e)) : c.apply(r, h.unregister(e, !0))
            }), e.each(n.deepChildren, function (e) {
                h.unregister(e, !0)
            }), r
        }, unregister: function (e, n) {
            var r = h.unregisterChildren(e, !0);
            if (e.unregistered) {
                var t = e.unregistered;
                if (e.replacements = e.unregistered = null, !n) {
                    var i = e.parentList && e.parentList.deepChildren;
                    if (i) {
                        var a = i.indexOf(e);
                        -1 !== a && i.splice(a, 1)
                    }
                }
                t()
            }
            return r
        }, nodeMap: t
    };
    return e.view.nodeLists = h, h
});
/*can/view/parser/parser*/
define("can/view/parser/parser", [], function () {
    function t(t, e) {
        for (var a = 0; a < t.length; a++) e(t[a], a)
    }

    function e(e) {
        var a = {}, r = e.split(",");
        return t(r, function (t) {
            a[t] = !0
        }), a
    }

    function a(t, e) {
        for (var a = 0, r = t.length; r > a; a++) {
            var n = t[a];
            e[n.tokenType].apply(e, n.args)
        }
        return t
    }

    var r = "A-Za-z0-9", n = "-:_" + r, o = "[^=>\\s\\/]+", i = "\\s*=\\s*", l = "\\{[^\\}\\{]\\}",
        s = "\\{\\{[^\\}]\\}\\}\\}?",
        u = "(?:" + i + "(?:(?:" + s + ")|(?:" + l + ")|(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?",
        f = "\\{\\{[^\\}]*\\}\\}\\}?", c = "\\{\\{([^\\}]*)\\}\\}\\}?",
        g = new RegExp("^<([" + r + "][" + n + "]*)((?:\\s*(?:(?:(?:" + o + ")?" + u + ")|(?:" + f + ")+))*)\\s*(\\/?)>"),
        p = new RegExp("^<\\/([" + n + "]+)[^>]*>"), m = new RegExp(c, "g"), d = /<|\{\{/, h = /\s/,
        b = e("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"),
        v = e("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),
        S = e("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
        k = e("altGlyph,altGlyphDef,altGlyphItem,animateColor,animateMotion,animateTransform,clipPath,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,foreignObject,glyphRef,linearGradient,radialGradient,textPath"),
        F = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), y = e("script"),
        V = "start,end,close,attrStart,attrEnd,attrValue,chars,comment,special,done".split(","), x = function () {
        }, E = function (e, r, n) {
            function o(t, e, a, n) {
                if (e = k[e] ? e : e.toLowerCase(), v[e] && !S[e]) for (var o = C.last(); o && S[o] && !v[o];) i("", o), o = C.last();
                F[e] && C.last() === e && i("", e), n = b[e] || !!n, r.start(e, n), n || C.push(e), E.parseAttrs(a, r), r.end(e, n)
            }

            function i(t, e) {
                var a;
                if (e) for (e = k[e] ? e : e.toLowerCase(), a = C.length - 1; a >= 0 && C[a] !== e; a--) ; else a = 0;
                if (a >= 0) {
                    for (var n = C.length - 1; n >= a; n--) r.close && r.close(C[n]);
                    C.length = a
                }
            }

            function l(t, e) {
                r.special && r.special(e)
            }

            if ("object" == typeof e) return a(e, r);
            var s = [];
            r = r || {}, n && t(V, function (t) {
                var e = r[t] || x;
                r[t] = function () {
                    e.apply(this, arguments) !== !1 && s.push({tokenType: t, args: [].slice.call(arguments, 0)})
                }
            });
            var u, f, c, h = function () {
                A && r.chars && r.chars(A), A = ""
            }, C = [], N = e, A = "";
            for (C.last = function () {
                return this[this.length - 1]
            }; e;) {
                if (f = !0, C.last() && y[C.last()]) e = e.replace(new RegExp("([\\s\\S]*?)</" + C.last() + "[^>]*>"), function (t, e) {
                    return e = e.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), r.chars && r.chars(e), ""
                }), i("", C.last()); else if (0 === e.indexOf("<!--") ? (u = e.indexOf("-->"), u >= 0 && (h(), r.comment && r.comment(e.substring(4, u)), e = e.substring(u + 3), f = !1)) : 0 === e.indexOf("</") ? (c = e.match(p), c && (h(), e = e.substring(c[0].length), c[0].replace(p, i), f = !1)) : 0 === e.indexOf("<") ? (c = e.match(g), c && (h(), e = e.substring(c[0].length), c[0].replace(g, o), f = !1)) : 0 === e.indexOf("{{") && (c = e.match(m), c && (h(), e = e.substring(c[0].length), c[0].replace(m, l))), f) {
                    u = e.search(d), 0 === u && e === N && (A += e.charAt(0), e = e.substr(1), u = e.search(d));
                    var q = 0 > u ? e : e.substring(0, u);
                    e = 0 > u ? "" : e.substring(u), q && (A += q)
                }
                if (e === N) throw new Error("Parse Error: " + e);
                N = e
            }
            return h(), i(), r.done(), s
        }, C = function (t, e, a, r) {
            t.attrStart = r.substring("number" == typeof t.nameStart ? t.nameStart : e, e), a.attrStart(t.attrStart), t.inName = !1
        }, N = function (t, e, a, r) {
            void 0 !== t.valueStart && t.valueStart < e ? a.attrValue(r.substring(t.valueStart, e)) : !t.inValue, a.attrEnd(t.attrStart), t.attrStart = void 0, t.valueStart = void 0, t.inValue = !1, t.inName = !1, t.lookingForEq = !1, t.inQuote = !1, t.lookingForName = !0
        };
    return E.parseAttrs = function (t, e) {
        if (t) {
            for (var a, r = 0, n = {
                inDoubleCurly: !1,
                inName: !1,
                nameStart: void 0,
                inValue: !1,
                valueStart: void 0,
                inQuote: !1,
                attrStart: void 0,
                lookingForName: !0,
                lookingForValue: !1,
                lookingForEq: !1
            }; r < t.length;) {
                a = r;
                var o = t.charAt(r), i = t.charAt(r + 1), l = t.charAt(r + 2);
                if (r++, "{" === o && "{" === i) n.inValue && a > n.valueStart ? e.attrValue(t.substring(n.valueStart, a)) : n.inName && n.nameStart < a ? (C(n, a, e, t), N(n, a, e, t)) : n.lookingForValue ? n.inValue = !0 : n.lookingForEq && n.attrStart && N(n, a, e, t), n.inDoubleCurly = !0, n.doubleCurlyStart = a + 2, r++; else if (n.inDoubleCurly) {
                    if ("}" === o && "}" === i) {
                        var s = "}" === l ? 1 : 0;
                        e.special(t.substring(n.doubleCurlyStart, a)), n.inDoubleCurly = !1, n.inValue && (n.valueStart = a + 2 + s), r += 1 + s
                    }
                } else n.inValue ? n.inQuote ? o === n.inQuote && N(n, a, e, t) : h.test(o) && N(n, a, e, t) : "=" === o && (n.lookingForEq || n.lookingForName || n.inName) ? (n.attrStart || C(n, a, e, t), n.lookingForValue = !0, n.lookingForEq = !1, n.lookingForName = !1) : n.inName ? h.test(o) && (C(n, a, e, t), n.lookingForEq = !0) : n.lookingForName ? h.test(o) || (n.attrStart && N(n, a, e, t), n.nameStart = a, n.inName = !0) : n.lookingForValue && (h.test(o) || (n.lookingForValue = !1, n.inValue = !0, "'" === o || '"' === o ? (n.inQuote = o, n.valueStart = a + 1) : n.valueStart = a))
            }
            n.inName ? (C(n, a + 1, e, t), N(n, a + 1, e, t)) : n.lookingForEq ? N(n, a + 1, e, t) : n.inValue && N(n, a + 1, e, t)
        }
    }, E
});
/*can/util/array/diff*/
define("can/util/array/diff", [], function () {
    var e = [].slice;
    return function (n, t) {
        for (var i = 0, r = 0, l = n.length, u = t.length, s = []; l > i && u > r;) {
            var d = n[i], f = t[r];
            if (d !== f) if (u > r + 1 && t[r + 1] === d) s.push({
                index: r,
                deleteCount: 0,
                insert: [t[r]]
            }), i++, r += 2; else {
                if (!(l > i + 1 && n[i + 1] === f)) return s.push({
                    index: r,
                    deleteCount: l - i,
                    insert: e.call(t, r)
                }), s;
                s.push({index: r, deleteCount: 1, insert: []}), i += 2, r++
            } else i++, r++
        }
        return r === u && i === l ? s : (s.push({index: r, deleteCount: l - i, insert: e.call(t, r)}), s)
    }
});
/*can/view/live/live*/
define("can/view/live/live", ["can/util/util", "can/view/elements", "can/view/view", "can/view/node_lists/node_lists", "can/view/parser/parser", "can/util/array/diff"], function (t, e, n, r, a, i) {
    e = e || t.view.elements, r = r || t.view.NodeLists, a = a || t.view.parser;
    var o = function (e, n, r) {
        var a = !1, i = function () {
            return a || (a = !0, r(o), t.unbind.call(e, "removed", i)), !0
        }, o = {
            teardownCheck: function (t) {
                return t ? !1 : i()
            }
        };
        return t.bind.call(e, "removed", i), n(o), o
    }, c = function (t) {
        var e = t.childNodes;
        if ("length" in e) return e;
        for (var n = t.firstChild, r = []; n;) r.push(n), n = n.nextSibling;
        return r
    }, l = function (t, e, n) {
        return o(t, function () {
            e.computeInstance.bind("change", n)
        }, function (t) {
            e.computeInstance.unbind("change", n), t.nodeList && r.unregister(t.nodeList)
        })
    }, u = function (t) {
        var e, n = {};
        return a.parseAttrs(t, {
            attrStart: function (t) {
                n[t] = "", e = t
            }, attrValue: function (t) {
                n[e] += t
            }, attrEnd: function () {
            }
        }), n
    }, d = [].splice, s = function (t) {
        return t && t.nodeType
    }, f = function (t) {
        t.firstChild || t.appendChild(t.ownerDocument.createTextNode(""))
    }, p = function (e) {
        var n = "string" == typeof e, r = t.frag(e);
        return n ? t.view.hookup(r) : r
    }, v = function (e, n, a, i, o) {
        var l = [];
        n && (r.register(l, null, !0, !0), l.parentList = n, l.expression = "#each SUBEXPRESSION");
        var u = a.apply(i, o.concat([l])), d = p(u), s = t.makeArray(c(d));
        return n ? (r.update(l, s), e.push(l)) : e.push(r.register(s)), d
    }, h = function (e, n, a) {
        var i = e.splice(n + 1, a), o = [];
        return t.each(i, function (t) {
            var e = r.unregister(t);
            [].push.apply(o, e)
        }), o
    }, b = function (t, n, r, a) {
        if (n && 0 === t.length) {
            var i = [], o = v(i, a, n, t, [t]);
            e.after([r[0]], o), r.push(i[0])
        }
    }, g = {}, C = {
        registerChildMutationCallback: function (t, e) {
            return e ? void (g[t] = e) : g[t]
        }, callChildMutationCallback: function (t) {
            var e = t && g[t.nodeName.toLowerCase()];
            e && e(t)
        }, list: function (n, a, c, l, u, s, f) {
            var p, g = s || [n], m = [], k = !1, w = !1, N = function (n, a, i) {
                if (k) {
                    var o = x.ownerDocument.createDocumentFragment(), u = [], f = [];
                    t.each(a, function (e, n) {
                        var r = t.compute(n + i), a = v(u, s, c, l, [e, r]);
                        o.appendChild(a), f.push(r)
                    });
                    var p = i + 1;
                    if (!m.length) {
                        var b = h(g, 0, g.length - 1);
                        t.remove(t.$(b))
                    }
                    if (g[p]) {
                        var w = r.first(g[p]);
                        t.insertBefore(w.parentNode, o, w)
                    } else e.after(1 === p ? [x] : [r.last(g[p - 1])], o);
                    d.apply(g, [p, 0].concat(u)), d.apply(m, [i, 0].concat(f));
                    for (var N = i + f.length, y = m.length; y > N; N++) m[N](N);
                    n.callChildMutationCallback !== !1 && C.callChildMutationCallback(x.parentNode)
                }
            }, y = function (t, e, n) {
                A({}, {length: 1}, n, !0), N({}, [e], n)
            }, A = function (e, n, a, i, o) {
                if (k && (i || !S.teardownCheck(x.parentNode))) {
                    0 > a && (a = m.length + a);
                    var c = h(g, a, n.length);
                    m.splice(a, n.length);
                    for (var l = a, u = m.length; u > l; l++) m[l](l);
                    o ? r.unregister(g) : (b(p, f, g, s), t.remove(t.$(c)), e.callChildMutationCallback !== !1 && C.callChildMutationCallback(x.parentNode))
                }
            }, M = function (e, n, a, i) {
                if (k) {
                    a += 1, i += 1;
                    var o, c = g[a], l = t.frag(r.flatten(g[i]));
                    o = a > i ? r.last(c).nextSibling : r.first(c);
                    var u = g[0].parentNode;
                    u.insertBefore(l, o);
                    var d = g[i];
                    [].splice.apply(g, [i, 1]), [].splice.apply(g, [a, 0, d]), a -= 1, i -= 1;
                    var s = m[i];
                    [].splice.apply(m, [i, 1]), [].splice.apply(m, [a, 0, s]);
                    var f = Math.min(i, a), p = m.length;
                    for (p; p > f; f++) m[f](f);
                    e.callChildMutationCallback !== !1 && C.callChildMutationCallback(x.parentNode)
                }
            }, x = n.ownerDocument.createTextNode(""), _ = function (t) {
                p && p.unbind && p.unbind("add", N).unbind("set", y).unbind("remove", A).unbind("move", M), A({callChildMutationCallback: !!t}, {length: g.length - 1}, 0, !0, t)
            }, P = function (e, n, r) {
                if (!w) {
                    if (k = !0, n && r) {
                        p = n || [];
                        var a = i(r, n);
                        r.unbind && r.unbind("add", N).unbind("set", y).unbind("remove", A).unbind("move", M);
                        for (var o = 0, c = a.length; c > o; o++) {
                            var l = a[o];
                            l.deleteCount && A({callChildMutationCallback: !1}, {length: l.deleteCount}, l.index, !0), l.insert.length && N({callChildMutationCallback: !1}, l.insert, l.index)
                        }
                    } else r && _(), p = n || [], N({callChildMutationCallback: !1}, p, 0), b(p, f, g, s);
                    C.callChildMutationCallback(x.parentNode), k = !1, p.bind && p.bind("add", N).bind("set", y).bind("remove", A).bind("move", M), t.batch.afterPreviousEvents(function () {
                        k = !0
                    })
                }
            };
            u = e.getParentNode(n, u);
            var S = o(u, function () {
                t.isFunction(a) && a.bind("change", P)
            }, function () {
                t.isFunction(a) && a.unbind("change", P), _(!0)
            });
            s ? (e.replace(g, x), r.update(g, [x]), s.unregistered = function () {
                S.teardownCheck(), w = !0
            }) : C.replace(g, x, S.teardownCheck), P({}, t.isFunction(a) ? a() : a)
        }, html: function (n, a, i, o) {
            var u;
            i = e.getParentNode(n, i), u = l(i, a, function (t, e, n) {
                var a = r.first(d).parentNode;
                a && p(e);
                var i = r.first(d).parentNode;
                u.teardownCheck(i), C.callChildMutationCallback(i)
            });
            var d = o || [n], p = function (n) {
                var a = "function" == typeof n, o = s(n), l = t.frag(a ? "" : n), u = t.makeArray(d);
                f(l), o || a || (l = t.view.hookup(l, i)), u = r.update(d, c(l)), a && n(l.firstChild), e.replace(u, l)
            };
            u.nodeList = d, o ? o.unregistered = u.teardownCheck : r.register(d, u.teardownCheck), p(a())
        }, replace: function (n, a, i) {
            var o = n.slice(0), l = t.frag(a);
            return r.register(n, i), "string" == typeof a && (l = t.view.hookup(l, n[0].parentNode)), r.update(n, c(l)), e.replace(o, l), n
        }, text: function (n, a, i, o) {
            var c = e.getParentNode(n, i), u = l(c, a, function (e, n, r) {
                "unknown" != typeof d.nodeValue && (d.nodeValue = t.view.toStr(n)), u.teardownCheck(d.parentNode)
            }), d = n.ownerDocument.createTextNode(t.view.toStr(a()));
            o ? (o.unregistered = u.teardownCheck, u.nodeList = o, r.update(o, [d]), e.replace([n], d)) : u.nodeList = C.replace([n], d, u.teardownCheck)
        }, setAttributes: function (e, n) {
            var r = u(n);
            for (var a in r) t.attr.set(e, a, r[a])
        }, attributes: function (n, r, a) {
            var i = {}, o = function (r) {
                var a, o = u(r);
                for (a in o) {
                    var c = o[a], l = i[a];
                    c !== l && t.attr.set(n, a, c), delete i[a]
                }
                for (a in i) e.removeAttr(n, a);
                i = o
            };
            l(n, r, function (t, e) {
                o(e)
            }), arguments.length >= 3 ? i = u(a) : o(r())
        }, attributePlaceholder: "__!!__", attributeReplace: /__!!__/g, attribute: function (n, r, a) {
            l(n, a, function (t, a) {
                e.setAttr(n, r, c.render())
            });
            var i, o = t.$(n);
            i = t.data(o, "hooks"), i || t.data(o, "hooks", i = {});
            var c, u = String(e.getAttr(n, r)), d = u.split(C.attributePlaceholder), s = [];
            s.push(d.shift(), d.join(C.attributePlaceholder)), i[r] ? i[r].computes.push(a) : i[r] = {
                render: function () {
                    var t = 0, n = u ? u.replace(C.attributeReplace, function () {
                        return e.contentText(c.computes[t++]())
                    }) : e.contentText(c.computes[t++]());
                    return n
                }, computes: [a], batchNum: void 0
            }, c = i[r], s.splice(1, 0, a()), e.setAttr(n, r, s.join(""))
        }, specialAttribute: function (t, n, r) {
            l(t, r, function (r, a) {
                e.setAttr(t, n, k(a))
            }), e.setAttr(t, n, k(r()))
        }, simpleAttribute: function (t, n, r) {
            l(t, r, function (r, a) {
                e.setAttr(t, n, a)
            }), e.setAttr(t, n, r())
        }
    };
    C.attr = C.simpleAttribute, C.attrs = C.attributes, C.getAttributeParts = u;
    var m = /(\r|\n)+/g, k = function (t) {
        var n = /^["'].*["']$/;
        return t = t.replace(e.attrReg, "").replace(m, ""), n.test(t) ? t.substr(1, t.length - 2) : t
    };
    return t.view.live = C, C
});
/*can/view/render*/
define("can/view/render", ["can/view/view", "can/view/elements", "can/view/live/live", "can/util/string/string"], function (n, t, e) {
    var i, r = [], u = function (n) {
        var e = t.tagMap[n] || "span";
        return "span" === e ? "@@!!@@" : "<" + e + ">" + u(e) + "</" + e + ">"
    }, o = function (t, e) {
        if ("string" == typeof t) return t;
        if (!t && 0 !== t) return "";
        var i = t.hookup && function (n, e) {
            t.hookup.call(t, n, e)
        } || "function" == typeof t && t;
        return i ? e ? "<" + e + " " + n.view.hook(i) + "></" + e + ">" : (r.push(i), "") : "" + t
    }, c = function (t, e) {
        return "string" == typeof t || "number" == typeof t ? n.esc(t) : o(t, e)
    }, s = !1, a = function () {
    };
    return n.extend(n.view, {
        live: e, setupLists: function () {
            var t, e = n.view.lists;
            return n.view.lists = function (n, e) {
                return t = {list: n, renderer: e}, Math.random()
            }, function () {
                return n.view.lists = e, t
            }
        }, getHooks: function () {
            var n = r.slice(0);
            return i = n, r = [], n
        }, onlytxt: function (n, t) {
            return c(t.call(n))
        }, txt: function (f, l, p, v, h) {
            var g, w, d, b, y = t.tagMap[l] || "span", k = !1, m = a;
            if (s) g = h.call(v); else {
                ("string" == typeof p || 1 === p) && (s = !0);
                var x = n.view.setupLists();
                m = function () {
                    d.unbind("change", a)
                }, d = n.compute(h, v, !1), d.bind("change", a), w = x(), g = d(), s = !1, k = d.computeInstance.hasDependencies
            }
            if (w) return m(), "<" + y + n.view.hook(function (n, t) {
                e.list(n, w.list, w.renderer, v, t)
            }) + "></" + y + ">";
            if (!k || "function" == typeof g) return m(), (s || 2 === f || !f ? o : c)(g, 0 === p && y);
            var M = t.tagToContentPropMap[l];
            if (0 !== p || M) return 1 === p ? (r.push(function (n) {
                e.attributes(n, d, d()), m()
            }), d()) : 2 === f ? (b = p, r.push(function (n) {
                e.specialAttribute(n, b, d), m()
            }), d()) : (b = 0 === p ? M : p, (0 === p ? i : r).push(function (n) {
                e.attribute(n, b, d), m()
            }), e.attributePlaceholder);
            var C = !!t.selfClosingTags[y];
            return "<" + y + n.view.hook(f && "object" != typeof g ? function (n, t) {
                e.text(n, d, t), m()
            } : function (n, t) {
                e.html(n, d, t), m()
            }) + (C ? "/>" : ">" + u(y) + "</" + y + ">")
        }
    }), n
});
/*can/view/ejs/ejs*/
define("can/view/ejs/ejs", ["can/util/util", "can/view/view", "can/util/string/string", "can/compute/compute", "can/view/scanner", "can/view/render"], function (t) {
    var e = t.extend, n = function (t) {
        if (this.constructor !== n) {
            var r = new n(t);
            return function (t, e) {
                return r.render(t, e)
            }
        }
        return "function" == typeof t ? void (this.template = {fn: t}) : (e(this, t), void (this.template = this.scanner.scan(this.text, this.name)))
    };
    return t.EJS = n, n.prototype.render = function (t, e) {
        return t = t || {}, this.template.fn.call(t, t, new n.Helpers(t, e || {}))
    }, e(n.prototype, {
        scanner: new t.view.Scanner({
            text: {
                outStart: "with(_VIEW) { with (_CONTEXT) {",
                outEnd: "}}",
                argNames: "_CONTEXT,_VIEW",
                context: "this"
            },
            tokens: [["templateLeft", "<%%"], ["templateRight", "%>"], ["returnLeft", "<%=="], ["escapeLeft", "<%="], ["commentLeft", "<%#"], ["left", "<%"], ["right", "%>"], ["returnRight", "%>"]],
            helpers: [{
                name: /\s*\(([\$\w]+)\)\s*->([^\n]*)/, fn: function (t) {
                    var e = /\s*\(([\$\w]+)\)\s*->([^\n]*)/, n = t.match(e);
                    return "can.proxy(function(__){var " + n[1] + "=can.$(__);" + n[2] + "}, this);"
                }
            }],
            transform: function (t) {
                return t.replace(/<%([\s\S]+?)%>/gm, function (t, e) {
                    var n, r, i = [];
                    e.replace(/[{}]/gm, function (t, e) {
                        i.push([t, e])
                    });
                    do for (n = !1, r = i.length - 2; r >= 0; r--) if ("{" === i[r][0] && "}" === i[r + 1][0]) {
                        i.splice(r, 2), n = !0;
                        break
                    } while (n);
                    if (i.length >= 2) {
                        var s, a = ["<%"], c = 0;
                        for (r = 0; s = i[r]; r++) a.push(e.substring(c, c = s[1])), "{" === s[0] && r < i.length - 1 || "}" === s[0] && r > 0 ? a.push("{" === s[0] ? "{ %><% " : " %><% }") : a.push(s[0]), ++c;
                        return a.push(e.substring(c), "%>"), a.join("")
                    }
                    return "<%" + e + "%>"
                })
            }
        })
    }), n.Helpers = function (t, n) {
        this._data = t, this._extras = n, e(this, n)
    }, n.Helpers.prototype = {
        list: function (e, n) {
            t.each(e, function (t, r) {
                n(t, r, e)
            })
        }, each: function (e, n) {
            t.isArray(e) ? this.list(e, n) : t.view.lists(e, n)
        }
    }, t.view.register({
        suffix: "ejs", script: function (t, e) {
            return "can.EJS(function(_CONTEXT,_VIEW) { " + new n({text: e, name: t}).template.out + " })"
        }, renderer: function (t, e) {
            return n({text: e, name: t})
        }
    }), t.ejs.Helpers = n.Helpers, t
});
/*[global-shim-end]*/
!function () {
    window._define = window.define, window.define = window.define.orig
}();