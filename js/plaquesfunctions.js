function doDraggable() {
    $(".draggable").draggable({
        containment: "parent",
        start: function() {
            $(".reset_rotate").fadeOut(), $.data(document.body, "draggable", !0)
        },
        stop: function() {
            setTimeout(function() {
                $.data(document.body, "draggable", !1)
            }, 100)
        }
    })
}
function sleep(miliseconds) {
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) {}
}
function doResizable() {
    if ($(".selectedElement").hasClass("typeFond") || $(".selectedElement").hasClass("typeForme")) var e = !1;
    else var e = !0;
    $(".resizable").each(function() {
        $(this).resizable({
            containment: "parent",
            alsoResize: $(this).find(".elemContent"),
            aspectRatio: e,
            minHeight: 2,
            minWidth: 2,
            handles: "se",
            start: function() {
                $(".reset_rotate").fadeOut(), $.data(document.body, "resizable", !0)
            },
            stop: function() {
                $("#longueur").val(), $("#hauteur").val();
                if ($(".selectedElement").hasClass("typeText")) var e = "text";
                else if ($(".selectedElement").hasClass("typeMotif")) var e = "motif";
                else if ($(".selectedElement").hasClass("typeImage")) var e = "image";
                else if ($(".selectedElement").hasClass("typeFond")) var e = "fond";
                else if ($(".selectedElement").hasClass("typeForme")) var e = "forme";
                setTimeout(function() {
                    $.data(document.body, "resizable", !1), $.ajax({
                        type: "POST",
                        url: "../rapidpubapp/ajax/plaquespro_size.php",
                        dataType: "json",
                        data: {
                            action: "getsize",
                            prodID: productID,
                            id: $.data(document.body, "currentID"),
                            elemWidth: $(".selectedElement").width() + 2,
                            elemHeight: $(".selectedElement").height() + 2,
                            ratio: $.data(document.body, "ratioCfg"),
                            vitWidthpx: $("#plaque_content").width(),
                            vitHeightpx: $("#plaque_content").height(),
                            vitWidthcm: $("#longueur").val(),
                            vitHeightcm: $("#hauteur").val(),
                            vitType: $.data(document.body, "typeplaque"),
                            vitroType: $.data(document.body, "typeplaqueVitro"),
                            size: $.data(document.body, 'taillePlaque'),
                            type: e
                        },
                        success: function(e) {
                            $(".selectedElement > .imgH, .selectedElement > .imgL").remove(), $(".selectedElement").append('<img class="imgL" data-elemSize="' + e.longueur + '" style="position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + e.imgL + '" style="" /><img class="imgH" data-elemSize="' + e.hauteur + '" style="position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + e.imgH + '" style="" />');
                            var t = $(".selectedElement").find("img.imgH").attr("data-elemsize"),
                                n = $(".selectedElement").find("img.imgL").attr("data-elemsize");
                        }
                    })
                }, 100);
            }
        })
    })
}
function doRotatable() {
    $(".rotatable").each(function() {
        $(this).rotatable({
            start: function() {
                $.data(document.body, "rotatable", !0), $(".reset_rotate").fadeOut()
            },
            stop: function() {
                setTimeout(function() {
                    $.data(document.body, "rotatable", !1), $(".reset_rotate").fadeOut()
                }, 100)
            }
        })
    })
}
function isNumber(e) {
    return !isNaN(parseFloat(e)) && isFinite(e)
}
function getRandomColor() {
    for (var e = "0123456789ABCDEF".split(""), t = "#", n = 0; 6 > n; n++) t += e[Math.floor(16 * Math.random())];
    return t
}
$.fn.verticalAlign = function() {
    return this.css("margin-top", ($(this).parent().height() - $(this).height()) / 2 + "px")
}, $.fn.center = function(e) {
    return e = e ? this.parent() : window, this.css({
        position: "absolute",
        top: ($(e).height() - this.outerHeight()) / 2 + $(e).scrollTop() + "px",
        left: ($(e).width() - this.outerWidth()) / 2 + $(e).scrollLeft() + "px"
    }), this
}, $.fn.centerV = function(e) {
    return e = e ? this.parent() : window, this.css({
        position: "absolute",
        top: ($(e).height() - this.outerHeight()) / 2 + $(e).scrollTop() + "px"
    }), this
}, $.fn.centerH = function(e) {
    return e = e ? this.parent() : window, this.css({
        position: "absolute",
        left: ($(e).width() - this.outerWidth()) / 2 + $(e).scrollLeft() + "px"
    }), this
}, $.fn.pressEnter = function(e) {
    return this.each(function() {
        $(this).bind("enterPress", e), $(this).keyup(function(e) {
            13 == e.keyCode && $(this).trigger("enterPress")
        })
    })
}, ! function(e) {
    e.fn.numeric = function(t, n) {
        "boolean" == typeof t && (t = {
            decimal: t,
            negative: !0,
            decimalPlaces: -1
        }), t = t || {}, "undefined" == typeof t.negative && (t.negative = !0);
        var i = t.decimal === !1 ? "" : t.decimal || ".",
            a = t.negative === !0 ? !0 : !1,
            r = "undefined" == typeof t.decimalPlaces ? -1 : t.decimalPlaces;
        return n = "function" == typeof n ? n : function() {}, this.data("numeric.decimal", i).data("numeric.negative", a).data("numeric.callback", n).data("numeric.decimalPlaces", r).keypress(e.fn.numeric.keypress).keyup(e.fn.numeric.keyup).blur(e.fn.numeric.blur)
    }, e.fn.numeric.keypress = function(t) {
        var n = e.data(this, "numeric.decimal"),
            i = e.data(this, "numeric.negative"),
            a = e.data(this, "numeric.decimalPlaces"),
            r = t.charCode ? t.charCode : t.keyCode ? t.keyCode : 0;
        if (13 == r && "input" == this.nodeName.toLowerCase()) return !0;
        if (13 == r) return !1;
        var s = !1;
        if (t.ctrlKey && 97 == r || t.ctrlKey && 65 == r) return !0;
        if (t.ctrlKey && 120 == r || t.ctrlKey && 88 == r) return !0;
        if (t.ctrlKey && 99 == r || t.ctrlKey && 67 == r) return !0;
        if (t.ctrlKey && 122 == r || t.ctrlKey && 90 == r) return !0;
        if (t.ctrlKey && 118 == r || t.ctrlKey && 86 == r || t.shiftKey && 45 == r) return !0;
        if (48 > r || r > 57) {
            var l = e(this).val();
            if (0 !== e.inArray("-", l.split("")) && i && 45 == r && (0 === l.length || 0 === parseInt(e.fn.getSelectionStart(this), 10))) return !0;
            n && r == n.charCodeAt(0) && -1 != e.inArray(n, l.split("")) && (s = !1), 8 != r && 9 != r && 13 != r && 35 != r && 36 != r && 37 != r && 39 != r && 46 != r ? s = !1 : "undefined" != typeof t.charCode && (t.keyCode == t.which && 0 !== t.which ? (s = !0, 46 == t.which && (s = !1)) : 0 !== t.keyCode && 0 === t.charCode && 0 === t.which && (s = !0)), n && r == n.charCodeAt(0) && (s = -1 == e.inArray(n, l.split("")) ? !0 : !1)
        } else if (s = !0, n && a > 0) {
            var c = e.inArray(n, e(this).val().split(""));
            c >= 0 && e(this).val().length > c + a && (s = !1)
        }
        return s
    }, e.fn.numeric.keyup = function() {
        var t = e(this).val();
        if (t && t.length > 0) {
            var n = e.fn.getSelectionStart(this),
                i = e.fn.getSelectionEnd(this),
                a = e.data(this, "numeric.decimal"),
                r = e.data(this, "numeric.negative"),
                s = e.data(this, "numeric.decimalPlaces");
            if ("" !== a && null !== a) {
                var l = e.inArray(a, t.split(""));
                0 === l && (this.value = "0" + t, n++, i++), 1 == l && "-" == t.charAt(0) && (this.value = "-0" + t.substring(1), n++, i++), t = this.value
            }
            for (var c = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "-", a], o = t.length, u = o - 1; u >= 0; u--) {
                var d = t.charAt(u);
                0 !== u && "-" == d ? t = t.substring(0, u) + t.substring(u + 1) : 0 !== u || r || "-" != d || (t = t.substring(1));
                for (var h = !1, m = 0; m < c.length; m++)
                    if (d == c[m]) {
                        h = !0;
                        break
                    }
                h && " " != d || (t = t.substring(0, u) + t.substring(u + 1))
            }
            var f = e.inArray(a, t.split(""));
            if (f > 0)
                for (var p = o - 1; p > f; p--) {
                    var g = t.charAt(p);
                    g == a && (t = t.substring(0, p) + t.substring(p + 1))
                }
            if (a && s > 0) {
                var l = e.inArray(a, t.split(""));
                l >= 0 && (t = t.substring(0, l + s + 1), i = Math.min(t.length, i))
            }
            this.value = t, e.fn.setSelection(this, [n, i])
        }
    }, e.fn.numeric.blur = function() {
        var t = e.data(this, "numeric.decimal"),
            n = e.data(this, "numeric.callback"),
            i = e.data(this, "numeric.negative"),
            a = this.value;
        if ("" !== a) {
            var r = new RegExp(i ? "-?" : "^\\d+$|^\\d*" + t + "\\d+$");
            r.exec(a) || n.apply(this)
        }
    }, e.fn.removeNumeric = function() {
        return this.data("numeric.decimal", null).data("numeric.negative", null).data("numeric.callback", null).data("numeric.decimalPlaces", null).unbind("keypress", e.fn.numeric.keypress).unbind("keyup", e.fn.numeric.keyup).unbind("blur", e.fn.numeric.blur)
    }, e.fn.getSelectionStart = function(e) {
        if ("number" === e.type) return void 0;
        if (e.createTextRange && document.selection) {
            var t = document.selection.createRange().duplicate();
            return t.moveEnd("character", e.value.length), "" == t.text ? e.value.length : Math.max(0, e.value.lastIndexOf(t.text))
        }
        try {
            return e.selectionStart
        } catch (n) {
            return 0
        }
    }, e.fn.getSelectionEnd = function(e) {
        if ("number" === e.type) return void 0;
        if (e.createTextRange && document.selection) {
            var t = document.selection.createRange().duplicate();
            return t.moveStart("character", -e.value.length), t.text.length
        }
        return e.selectionEnd
    }, e.fn.setSelection = function(e, t) {
        if ("number" == typeof t && (t = [t, t]), t && t.constructor == Array && 2 == t.length)
            if ("number" === e.type) e.focus();
            else if (e.createTextRange) {
            var n = e.createTextRange();
            n.collapse(!0), n.moveStart("character", t[0]), n.moveEnd("character", t[1] - t[0]), n.select()
        } else {
            e.focus();
            try {
                e.setSelectionRange && e.setSelectionRange(t[0], t[1])
            } catch (i) {}
        }
    }
}(jQuery), jQuery.fn.repeatedclick = function(e, t) {
    var n = {
            duration: 350,
            speed: .85,
            min: 50
        },
        i = jQuery.extend(n, t);
    "undefined" == typeof jQuery.repeatedEvents && (jQuery.repeatedEvents = []), jQuery.repeatedEvents.push(e);
    var a, r, s = jQuery.repeatedEvents.length - 1;
    return this.each(function() {
        a = function(e, t, n) {
            var s = this;
            jQuery.repeatedEvents[e].call(s, n), r = setTimeout(function() {
                a.call(s, e, t > i.min ? t * i.speed : t, n)
            }, t)
        }, jQuery(this).mousedown(function(e) {
            a.call(this, s, i.duration, e)
        });
        var e = function() {
            "undefined" != typeof r && clearInterval(r)
        };
        jQuery(this).mouseout(e), jQuery(this).mouseup(e)
    })
};