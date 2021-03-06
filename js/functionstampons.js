var rotation = 0;
$.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};
var getPercent = function(elem) {
    var elemName = elem.attr("id"),
        width = elem.width(),
        parentWidth = elem.offsetParent().width(),
        percent = Math.round(100 * width / parentWidth);
    return percent;
};
$.widget("ui.resizable", $.ui.resizable, {
    resizeTo: function(newSize) {
        var start = new $.Event("mousedown", { pageX: 0, pageY: 0 });
        this._mouseStart(start);
        this.axis = 'se';
        var end = new $.Event("mouseup", {
            pageX: newSize.width - this.originalSize.width,
            pageY: newSize.height - this.originalSize.height
        });
        this._mouseDrag(end);
        this._mouseStop(end);
    }
});
$.fn.resizeContent = function(newHeight){
    var aspectRatio = $(this).data('aspectRatio'),
        setRatio = $.data(document.body, 'tamponPreviewWidth') / $.data(document.body, 'tamponWidth'),
        leftPos = $(this).position().left,
        topPos = $(this).position().top;
    $('.selectedElement').removeClass('selectedElement');
    $('.ctrlElem, .imgL, .imgH').hide();
    if (aspectRatio == undefined) {
        aspectRatio = $(this).width() / $(this).height();
        $(this).data('aspectRatio', aspectRatio);
    }
    $('#margin .elementContainer').each(function(){
        if ( $.data(document.body, 'preview') ) {
            //console.log('id: ' + $(this).attr('id') + ' - left: ' + $(this).position().left + ' - top: ' + $(this).position().top);
            var newLeft = $(this).position().left * setRatio;
            var newTop =  $(this).position().top * setRatio;
            var newWidth = $(this).width() * setRatio;
            $(this).css({left: newLeft, top: newTop});
        } else {
            $(this).css({left: leftPos, top: topPos});
        }
    });
    $(this).height(newHeight); 
    $(this).width(parseInt(newHeight * aspectRatio));
}
$.fn.verticalAlign = function() {
    return this.css("margin-top", ($(this).parent().height() - $(this).height()) / 2 + "px")
}
$.fn.center = function(e) {
    if (e) {
        e = this.parent()
    } else {
        e = window
    }
    this.css({
        position: "absolute",
        top: ($(e).height() - this.outerHeight()) / 2 + $(e).scrollTop() + "px",
        left: ($(e).width() - this.outerWidth()) / 2 + $(e).scrollLeft() + "px"
    });
    return this
}
$.fn.centerV = function(e) {
    if (e) {
        e = this.parent()
    } else {
        e = window
    }
    this.css({
        position: "absolute",
        top: ($(e).height() - this.outerHeight()) / 2 + $(e).scrollTop() + "px"
    });
    return this
}
$.fn.centerH = function(e) {
    if (e) {
        e = this.parent()
    } else {
        e = window
    }
    this.css({
        position: "absolute",
        left: ($(e).width() - this.outerWidth()) / 2 + $(e).scrollLeft() + "px"
    });
    return this
}
$.fn.pressEnter = function(e) {
    return this.each(function() {
        $(this).bind("enterPress", e);
        $(this).keyup(function(e) {
            if (e.keyCode == 13) {
                $(this).trigger("enterPress")
            }
        })
    })
}

function doDraggable() {
    $(".draggable").draggable({
        containment: "#tampon_content",
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

function doResizable() {
    if ($('.selectedElement').hasClass('typeFond') || $('.selectedElement').hasClass('typeForme')) {
        var aspect = false;
    } else {
        var aspect = !0;
    }
    $(".resizable").each(function() {
        $(this).resizable({
            containment: "#tampon_content",
            alsoResize: $(this).find(".elemContent"),
            aspectRatio: aspect,
            minHeight: 2,
            minWidth: 2,
            handles: "se",
            start: function() {
                $(".reset_rotate").fadeOut(), $.data(document.body, "resizable", !0)
            },
            stop: function() {
                var supportWidth = $('#longueur').val();
                var supportHeight = $('#hauteur').val();
                if ($('.selectedElement').hasClass('typeText')) {
                    var elemType = 'text';
                } else if ($('.selectedElement').hasClass('typeMotif')) {
                    var elemType = 'motif';
                } else if ($('.selectedElement').hasClass('typeImage')) {
                    var elemType = 'image';
                } else if ($('.selectedElement').hasClass('typeFond')) {
                    var elemType = 'fond';
                } else if ($('.selectedElement').hasClass('typeForme')) {
                    var elemType = 'forme';
                }
                setTimeout(function() {
                    $.data(document.body, "resizable", !1);
                    /** Text Size **/
                    $.ajax({
                        type: "POST",
                        url: "../rapidpubapp/ajax/tampons_size.php",
                        dataType: "json",
                        data: {
                            action: 'getsize',
                            id: $.data(document.body, 'currentID'),
                            elemWidth: $('.selectedElement').width()+2,
                            elemHeight: $('.selectedElement').height()+2,
                            ratio: $.data(document.body, 'ratioCfg'),
                            vitWidthpx: $('#tampon_content').width(),
                            vitHeightpx: $('#tampon_content').height(),
                            vitWidthcm: $('#longueur').val(),
                            vitHeightcm: $('#hauteur').val(),
                            vitType: $.data(document.body, 'typetampon'),
                            vitroType: $.data(document.body, 'typetamponVitro'),
                            type: elemType
                        },
                        success: function(resultx) {
                            $('.selectedElement > .imgH, .selectedElement > .imgL').remove();
                            //$('.selectedElement').append( '<img class="imgL" style="position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" style="position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />' );
                            $('.selectedElement').append('<img class="imgL" data-elemSize="' + resultx['longueur'] + '" style="position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" data-elemSize="' + resultx['hauteur'] + '" style="position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                            var thiscmHeight = $('.selectedElement').find('img.imgH').attr('data-elemsize'),
                                thiscmWidth = $('.selectedElement').find('img.imgL').attr('data-elemsize');
                            $('#elem_width').val(thiscmWidth);
                            $('#elem_height').val(thiscmHeight);
                            $.post('../rapidpubapp/ajax/elemPrix.php', function(data) {
                                var prixHT = parseFloat(data).toFixed(2);
                                var tva = (Math.round(parseFloat(data)) / 100) * 20;
                                var prixTTC = parseFloat(prixHT) + parseFloat(tva);
                                $('#prix_ht span').html(Number(prixHT).toFixed(2));
                                $('#prix_ttc span').html(Number(prixTTC).toFixed(2));
                            });
                        }
                    });
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

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}! function(e) {
    e.fn.numeric = function(t, n) {
        "boolean" == typeof t && (t = {
            decimal: t,
            negative: !0,
            decimalPlaces: -1
        }), t = t || {}, "undefined" == typeof t.negative && (t.negative = !0);
        var r = t.decimal === !1 ? "" : t.decimal || ".",
            i = t.negative === !0 ? !0 : !1,
            a = "undefined" == typeof t.decimalPlaces ? -1 : t.decimalPlaces;
        return n = "function" == typeof n ? n : function() {}, this.data("numeric.decimal", r).data("numeric.negative", i).data("numeric.callback", n).data("numeric.decimalPlaces", a).keypress(e.fn.numeric.keypress).keyup(e.fn.numeric.keyup).blur(e.fn.numeric.blur)
    }, e.fn.numeric.keypress = function(t) {
        var n = e.data(this, "numeric.decimal"),
            r = e.data(this, "numeric.negative"),
            i = e.data(this, "numeric.decimalPlaces"),
            a = t.charCode ? t.charCode : t.keyCode ? t.keyCode : 0;
        if (13 == a && "input" == this.nodeName.toLowerCase()) return !0;
        if (13 == a) return !1;
        var c = !1;
        if (t.ctrlKey && 97 == a || t.ctrlKey && 65 == a) return !0;
        if (t.ctrlKey && 120 == a || t.ctrlKey && 88 == a) return !0;
        if (t.ctrlKey && 99 == a || t.ctrlKey && 67 == a) return !0;
        if (t.ctrlKey && 122 == a || t.ctrlKey && 90 == a) return !0;
        if (t.ctrlKey && 118 == a || t.ctrlKey && 86 == a || t.shiftKey && 45 == a) return !0;
        if (48 > a || a > 57) {
            var u = e(this).val();
            if (0 !== e.inArray("-", u.split("")) && r && 45 == a && (0 === u.length || 0 === parseInt(e.fn.getSelectionStart(this), 10))) return !0;
            n && a == n.charCodeAt(0) && -1 != e.inArray(n, u.split("")) && (c = !1), 8 != a && 9 != a && 13 != a && 35 != a && 36 != a && 37 != a && 39 != a && 46 != a ? c = !1 : "undefined" != typeof t.charCode && (t.keyCode == t.which && 0 !== t.which ? (c = !0, 46 == t.which && (c = !1)) : 0 !== t.keyCode && 0 === t.charCode && 0 === t.which && (c = !0)), n && a == n.charCodeAt(0) && (c = -1 == e.inArray(n, u.split("")) ? !0 : !1)
        } else if (c = !0, n && i > 0) {
            var l = e.inArray(n, e(this).val().split(""));
            l >= 0 && e(this).val().length > l + i && (c = !1)
        }
        return c
    }, e.fn.numeric.keyup = function() {
        var t = e(this).val();
        if (t && t.length > 0) {
            var n = e.fn.getSelectionStart(this),
                r = e.fn.getSelectionEnd(this),
                i = e.data(this, "numeric.decimal"),
                a = e.data(this, "numeric.negative"),
                c = e.data(this, "numeric.decimalPlaces");
            if ("" !== i && null !== i) {
                var u = e.inArray(i, t.split(""));
                0 === u && (this.value = "0" + t, n++, r++), 1 == u && "-" == t.charAt(0) && (this.value = "-0" + t.substring(1), n++, r++), t = this.value
            }
            for (var l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "-", i], s = t.length, d = s - 1; d >= 0; d--) {
                var f = t.charAt(d);
                0 !== d && "-" == f ? t = t.substring(0, d) + t.substring(d + 1) : 0 !== d || a || "-" != f || (t = t.substring(1));
                for (var o = !1, h = 0; h < l.length; h++)
                    if (f == l[h]) {
                        o = !0;
                        break
                    }
                o && " " != f || (t = t.substring(0, d) + t.substring(d + 1))
            }
            var m = e.inArray(i, t.split(""));
            if (m > 0)
                for (var v = s - 1; v > m; v--) {
                    var y = t.charAt(v);
                    y == i && (t = t.substring(0, v) + t.substring(v + 1))
                }
            if (i && c > 0) {
                var u = e.inArray(i, t.split(""));
                u >= 0 && (t = t.substring(0, u + c + 1), r = Math.min(t.length, r))
            }
            this.value = t, e.fn.setSelection(this, [n, r])
        }
    }, e.fn.numeric.blur = function() {
        var t = e.data(this, "numeric.decimal"),
            n = e.data(this, "numeric.callback"),
            r = e.data(this, "numeric.negative"),
            i = this.value;
        if ("" !== i) {
            var a = new RegExp(r ? "-?" : "^\\d+$|^\\d*" + t + "\\d+$");
            a.exec(i) || n.apply(this)
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
            } catch (r) {}
        }
    }
}(jQuery);

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
jQuery.fn.repeatedclick = function(f, options) {
    var defaults = {
        duration: 350,
        speed: 0.85,
        min: 50
    };
    var opts = jQuery.extend(defaults, options);
    if (typeof jQuery.repeatedEvents === 'undefined') {
        jQuery.repeatedEvents = [];
    }
    jQuery.repeatedEvents.push(f);
    var eventNum = jQuery.repeatedEvents.length - 1;
    var repeatedEvent;
    var repeatedEventTimer;
    return this.each(function() {
        repeatedEvent = function(eventNum, duration, event) {
            var that = this;
            jQuery.repeatedEvents[eventNum].call(that, event);
            repeatedEventTimer = setTimeout(function() {
                repeatedEvent.call(that, eventNum, duration > opts.min ? duration * opts.speed : duration, event)
            }, duration);
        };
        jQuery(this).mousedown(function(e) {
            repeatedEvent.call(this, eventNum, opts.duration, e);
        });
        var clearRepeatedEvent = function() {
            if (typeof repeatedEventTimer !== 'undefined') {
                clearInterval(repeatedEventTimer);
            }
        };
        jQuery(this).mouseout(clearRepeatedEvent);
        jQuery(this).mouseup(clearRepeatedEvent);
    });
};