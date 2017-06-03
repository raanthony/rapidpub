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

function doResizable() {
    if ($(".selectedElement").hasClass("typeFond") || $(".selectedElement").hasClass("typeForme")) var e = !1;
    else var e = !0;
    $(".resizable").each(function() {
        $(this).resizable({
            containment: "parent",
            alsoResize: $(this).find(".elemContent"),
            aspectRatio: e,
            handles: "se",
            minHeight: 2,
            minWidth: 2,
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
                        url: "../rapidpubapp/ajax/banderoles_size.php",
                        dataType: "json",
                        data: {
                            action: "getsize",
                            prodID: productID,
                            id: $.data(document.body, "currentID"),
                            elemWidth: $(".selectedElement").width() + 2,
                            elemHeight: $(".selectedElement").height() + 2,
                            ratio: $.data(document.body, "ratioCfg"),
                            vitWidthpx: $("#banderole_content").width(),
                            vitHeightpx: $("#banderole_content").height(),
                            vitWidthcm: $("#longueur").val(),
                            vitHeightcm: $("#hauteur").val(),
                            vitType: $.data(document.body, "typebanderole"),
                            vitroType: $.data(document.body, "typebanderoleVitro"),
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
$(function() {
    var couleurVar = '#000000',
        textColor = '#000000',
        banderoleColor = 'transparent',
        setCfg = false,
        zIndex = 2,
        fixation = null,
        selected = null,
        dwnloading = false,
        fontName = $('#police').find(':selected').val(),
        theme = 'divers',
        dimensionsp,
        showDim = true,
        nbrElements = 0;
    $.data(document.body, 'resizable', false);
    $.data(document.body, 'ratioCfg', 0);
    $.data(document.body, 'draggable', false);
    $.data(document.body, 'rotatable', false);
    $.data(document.body, 'currentID', false);
    $.data(document.body, 'startCfg', false);
    $.data(document.body, 'vWidth', 0);
    $.data(document.body, 'vHeight', 0);
    $.data(document.body, 'currentImage', false);
    $.data(document.body, 'typeBanderole', false);
    $.data(document.body, 'showColors', false);
    $.data(document.body, 'colorSetting', false);
    $.data(document.body, 'selfHeight', false);
    $.data(document.body, 'textEdit', false);
    $.data(document.body, 'typeBanderoleVitro', false);
    $.data(document.body, 'firstElem', false);
    $("input[type='text']").click(function() {
        $(this).select();
    });

    function showfirstElem() {
        if (!$.data(document.body, 'firstElem')) {
            Lobibox.notify('info', {
                msg: 'Utilisez les flèches de votre clavier pour déplacer l\'élément séléctionné et la touche Suppr. pour le supprimer.',
                img: 'img/keyboard.png',
                title: 'Raccourcis clavier',
                showClass: 'fadeInDown',
                hideClass: 'fadeUpDown',
                delay: 10000,
                sound: false
            });
            $.data(document.body, 'firstElem', true);
        }
    }
    jQuery(window).on('beforeunload', function() {
        return 'Vous perdrez votre travail si vous quittez cette page !';
    }).unload(function() {
        $.ajax({
            type: "POST",
            async: false,
            url: "ajax/saveSession.php"
        });
        /**html2canvas( $( "#banderole_bg" ), {
            onrendered: function( canvas ) {
                var imgCanvas = canvas.toDataURL();
                $.ajax({
                    type: "POST",
                    async: false,
                    url: "ajax/postScrn.php",
                    data: {
                        imageCanvas: imgCanvas
                    }
                });
            }
        });**/
    });
    $('#drawRect').click(function(e) {
        e.preventDefault();
        var supportWidth = $('#longueur').val();
        var supportHeight = $('#hauteur').val();
        if (setCfg == false) {
            swal({
                title: "Attention",
                text: "Vous devez saisir les dimensions de votre banderole avant de pouvoir continuer !",
                type: "warning",
                closeOnConfirm: true
            }, function() {
                $('#longueur').effect('highlight', {
                    color: '#c70077'
                }, 1500);
                $('input#longueur').focus();
            });
            return false;
        }
        $('#textecfg').val('');
        $.ajax({
            type: "POST",
            url: "../rapidpubapp/ajax/banderoles_forme.php",
            dataType: "json",
            data: {
                action: 'update',
                couleur: '#000000',
                ratio: $.data(document.body, 'ratioCfg'),
                width: supportWidth,
                height: supportHeight,
                type: 'fond'
            },
            success: function(result) {
                $('.selectedElement').removeClass('selectedElement');
                $('#banderole_content').append('<div class="elementContainer typeForme resizable draggable rotatable" id="' + result['id'] + '" style="max-height:100%;position:absolute"><div class="reset_rotate ctrlElem" title="Réinitialiser la position de l\'élement"></div><div class="ctrlElem seresizer ui-resizable-handle ui-resizable-se"></div><div class="ctrlElem delete-element" title="Supprimer l\'élément"></div></div>');
                $('#' + result['id']).addClass('selectedElement');
                showfirstElem();
                $('input.elemSize').prop('disabled', false);
                $('.ctrlElem, .imgL, .imgH').hide();
                $('.selectedElement').css({
                    'width': '50%',
                    'height': '5%',
                    'position': 'absolute'
                });
                $('.selectedElement').css('background-color', '#000');
                setTimeout(function() {
                    var maxWidth = $('#banderole_content').width() - 50;
                    var maxHeight = $('#banderole_content').height() - 50;
                    var ratio = 0;
                    var width = $('#' + result['id']).width();
                    var height = $('#' + result['id']).height();
                    if (width > maxWidth) {
                        ratio = maxWidth / width;
                        $('.selectedElement').css("width", maxWidth);
                        $('.selectedElement').css("height", height * ratio);
                        height = height * ratio;
                        width = width * ratio;
                    }
                    if (height > maxHeight) {
                        ratio = maxHeight / height;
                        $('.selectedElement').css("height", maxHeight);
                        $('.selectedElement').css("width", width * ratio);
                        width = width * ratio;
                        height = height * ratio;
                    }
                    $('.selectedElement').center(true);
                }, 10);
                $('#colorpicker-element').stop(true).animate({
                    height: 205
                }, 200);
                $('.selectedElement').attr('data-colorcode', '#000000');
                $('#elemColor').colpickSetColor('#000000');
                $('.selectedElement div.ctrlElem').show();
                $('.selectedElement div.reset_rotate').hide();
                var nbrLayers = $('ul#calques li').length;
                var newLayer = parseInt(nbrLayers) + 1;
                zIndex = zIndex + 1;
                $('.selectedElement').css('z-index', zIndex);
                $('ul#calques').prepend('<li data-zindex="' + zIndex + '" data-object-id="' + result['id'] + '" class="ui-state-default"><span class="text">Forme</span><span class="layer">calque ' + newLayer + '</span></li>');
                $('ul#calques').sortable('refresh');
                doDraggable();
                doResizable();
                doRotatable();
                $.data(document.body, 'currentID', result['id']);
                setTimeout(function() {
                    $.ajax({
                        type: "POST",
                        url: "http://rapidpub.synapdev.fr/rapidpubapp/ajax/banderoles_size.php",
                        dataType: "json",
                        data: {
                            action: 'getsize',
                            id: result['id'],
                            elemWidth: parseInt($('.selectedElement').css('width'), 10),
                            elemHeight: parseInt($('.selectedElement').css('height'), 10),
                            ratio: $.data(document.body, 'ratioCfg'),
                            vitWidthpx: $('#banderole_content').width(),
                            vitHeightpx: $('#banderole_content').height(),
                            vitWidthcm: $('#longueur').val(),
                            vitHeightcm: $('#hauteur').val(),
                            type: 'forme'
                        },
                        success: function(resultx) {
                            //$('#' + result['id']).append('<img class="imgL" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                            $('#' + result['id']).append('<img class="imgL" data-elemSize="' + resultx['longueur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" data-elemSize="' + resultx['hauteur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                            var thiscmHeight = $('#' + result['id']).find('img.imgH').attr('data-elemsize'),
                                thiscmWidth = $('#' + result['id']).find('img.imgL').attr('data-elemsize');
                            $('#elem_width').val(thiscmWidth);
                            $('#elem_height').val(thiscmHeight);
                        }
                    });
                }, 100);
            }
        });
    });
    var tour = {
        id: "start-tour",
        showPrevButton: true,
        scrollTopMargin: 100,
        i18n: {
            nextBtn: "Suivant",
            prevBtn: "Précedent",
            doneBtn: "Terminé",
            skipBtn: "Passer",
            closeTooltip: "Fermer"
        },
        steps: [{
            title: "Dimensions",
            content: "Saisissez les dimensions (longueur/hauteur) de votre banderole en centimètres. Cette étape est importante car elle nous permet de vous proposer un tarif sur mesure",
            target: document.querySelector("#block_right"),
            placement: "left"
        }, {
            title: "Texte et police d'écriture",
            content: "Ajoutez des textes sur votre banderole. Cliquez sur Ok ou appuyez sur la touche Entrée de votre clavier pour valider votre saisie.",
            target: document.querySelector("#block_right2"),
            placement: "left"
        }, {
            title: "Pictogrammes",
            content: "Vous pouvez choisir l'un des pictogrammes que nous vous proposons.",
            target: document.querySelector("#motifs_container"),
            placement: "left"
        }, {
            title: "Ajouter votre propre image",
            content: "Vous pouvez aussi télécharger et insérer votre propre image.",
            target: document.querySelector("#uploadFile"),
            placement: "left"
        }, {
            title: "Dessiner une forme",
            content: "Ce bouton sert à dessiner des formes carrés ou rectangulaires sur votre banderole. Vous pouvez utiliser la combinaison 'MAJ + redimensionnement souris' pour conserver les proportions.",
            target: document.querySelector("#drawRect"),
            placement: "left"
        }, {
            title: "Couleurs, calques, fonds...",
            content: "Cette partie vous permet de modifier la couleur d'un élément sélectionné (entouré en rouge sur l'aperçu), la couleur et les dimensions du fond et aussi de modifier l'ordre de supperposition des calques.",
            target: document.querySelector("#block_right4"),
            placement: "left"
        }, {
            title: "Aligner, déplacer, dupliquer, pivoter...",
            content: "Ces boutons de contrôles vous permettent d'interagir avec l'élement sélectioné (entouré en rouge sur l'aperçu), vous pouvez le déplacer, le centrer sur votre banderole, le dupliquer ou même le faire pivoter.",
            target: document.querySelector("#block_right4_2"),
            placement: "left"
        }]
    };
    hopscotch.startTour(tour);
    $('#longueur, #hauteur').numeric();
    $('#banderole_content, #banderole_bg').click(function(e) {
        e.preventDefault();
        if ($.data(document.body, 'rotatable') == false && $.data(document.body, 'draggable') == false && $.data(document.body, 'resizable') == false) {
            $('.selectedElement div.ctrlElem, .selectedElement .imgL, .selectedElement .imgH').hide();
            $('.selectedElement').removeClass('selectedElement');
            $('input.elemSize').prop('disabled', true).val('');
            $('#colorpicker-element').stop(true).animate({
                height: 0
            }, 200);
            $('#textecfg').val('');
        }
    });
    $('#duplicate').click(function(e) {
        e.preventDefault();
        var thisElem = $('.selectedElement');
        if ($('.selectedElement').hasClass('typeFond') || $('.selectedElement').hasClass('typeForme')) {
            var thisElemID = thisElem.attr('id');
        } else {
            var thisElemID = thisElem.find('.elemContent').attr('id');
        }
        var thisLayer = $('*[data-object-id="' + thisElemID + '"]');
        if ($('.selectedElement')[0]) {
            var newElem = thisElem.clone();
            var typeElem;
            $('.ctrlElem, .imgL, .imgH').hide();
            $('.selectedElement').removeClass('selectedElement');
            $('#banderole_content').append(newElem);
            newElem.addClass('selectedElement');
            $('input.elemSize').prop('disabled', false);
            $('.selectedElement').css({
                left: '+=5px',
                top: '+=5px'
            });
            $('.selectedElement').find('.imgL, .imgH').show();
            doDraggable();
            doResizable();
            doRotatable();
            if (thisElem.hasClass('typeMotif')) {
                typeElem = 'motif';
            } else if (thisElem.hasClass('typeText')) {
                typeElem = 'text';
            } else if (thisElem.hasClass('typeImage')) {
                typeElem = 'image';
            } else if (thisElem.hasClass('typeFond')) {
                typeElem = 'fond';
            } else if (thisElem.hasClass('typeForme')) {
                typeElem = 'forme';
            }
            $.ajax({
                type: "POST",
                url: "../rapidpubapp/ajax/cloneElem.php",
                dataType: "json",
                data: {
                    action: 'clone',
                    prodID: productID,
                    id: thisElemID,
                    type: typeElem,
                },
                success: function(resultx) {
                    if (resultx) {
                        var newid = resultx.id;
                        $.data(document.body, 'currentID', newid);
                        if (typeElem == 'fond') {
                            $('.selectedElement').attr('id', newid);
                        } else {
                            if (typeElem == 'forme') {
                                $('.selectedElement').attr('id', newid);
                            } else {
                                $('.selectedElement').find('.banderole_element').attr('id', newid);
                            }
                            zIndex = zIndex + 1;
                            $('.selectedElement').css('z-index', zIndex);
                            var nbrLayers = $('ul#calques li').length;
                            var newLayer = parseInt(nbrLayers) + 1;
                            if (thisElem.hasClass('typeMotif')) {
                                $('ul#calques').prepend('<li data-zindex="' + zIndex + '" data-object-id="' + newid + '" class="ui-state-default"><img style="width:25px" data-src-code="' + resultx.code + '" src="' + resultx.motif + '" alt="' + resultx.motif + '" /> <span class="layer">calque ' + newLayer + '</span></li>');
                            } else if (thisElem.hasClass('typeText')) {
                                $('ul#calques').prepend('<li data-zindex="' + zIndex + '" data-object-id="' + newid + '" class="ui-state-default"><span class="text">' + resultx.text + '</span><span class="layer">calque ' + newLayer + '</span></li>');
                            } else if (thisElem.hasClass('typeImage')) {
                                $('ul#calques').prepend('<li data-zindex="' + zIndex + '" data-object-id="' + newid + '" class="ui-state-default"><img style="width:25px;max-height:100%" src="' + resultx.imgPath + '" alt="' + resultx.imgPath + '" /> <span class="layer">calque ' + newLayer + '</span></li>');
                            } else if (thisElem.hasClass('typeForme')) {
                                $('ul#calques').prepend('<li data-zindex="' + zIndex + '" data-object-id="' + newid + '" class="ui-state-default"><span class="text">Forme</span><span class="layer">calque ' + newLayer + '</span></li>');
                            }
                        }
                        $('ul#calques').sortable('refresh');
                    }
                }
            });
        }
    });
    $('#uploadFile').click(function(e) {
        e.preventDefault();
        if (setCfg == false) {
            swal({
                title: "Attention",
                text: "Vous devez saisir les dimensions de votre banderole avant de pouvoir continuer !",
                type: "warning",
                closeOnConfirm: true
            }, function() {
                $('#longueur').effect('highlight', {
                    color: '#c70077'
                }, 1500);
                $('input#longueur').focus();
            });
            return false;
        } else {
            $.fancybox({
                href: '#uploadFileContent'
            });
        }
    });
    $('.download').click(function(e) {
        e.preventDefault();
        if (!dwnloading) {
            $('#fileinput').val('');
            $('#fileinput').trigger('click');
        }
    });
    $("#progressbar").progressbar({
        value: 0,
        max: 100
    });
    $('#fileinput').change(function() {
        dwnloading = true;
        var fileData = $(this).prop('files')[0];
        var formData = new FormData();
        formData.append('imageupload', fileData);
        $('a.download').html('Téléchargement en cours <img src="../rapidpubapp/img/ajax-loader.gif" alt="" />');
        $("#progressbar").show();
        $.ajax({
            url: '../rapidpubapp/ajax/imageUploadOP.php',
            dataType: 'json',
            contentType: false,
            processData: false,
            data: formData,
            prodID: productID,
            type: 'POST',
            xhr: function() {
                var xhr = $.ajaxSettings.xhr();
                xhr.upload.onprogress = function(evt) {
                    var uploadVal = evt.loaded / evt.total * 100;
                    $("#progressbar").progressbar("value", uploadVal).children('.ui-progressbar-value').html(uploadVal.toPrecision(3) + '%').css("display", "block");
                };
                xhr.upload.onload = function() {
                    console.log('File downloaded...');
                };
                return xhr;
            },
            success: function(result) {
                $.data(document.body, 'currentImage', result.id);
                if (result.success == true) {
                    if (result.dpi < 150 && result.dpi != 0) {
                        var msgContent = "<img style='max-width:100%;max-height:100px' src='" + result.imgPathOp + "' alt'' /><br><br>La qualité de votre image (<strong>" + result.dpi + " PPP</strong>) est insuffisante, nous recommandons d'utiliser des images avec une qualité de <strong>150 PPP</strong> (points par pouce) minimum pour obtenir un résultat d'impression optimal.";
                        var typeContent = "warning";
                        var confirmColor = "#DD6B55";
                        var confirmText = "Continuer";
                        var showCancel = true;
                    } else if (result.dpi > 150) {
                        var msgContent = "<img style='max-width:100%;max-height:100px' src='" + result.imgPathOp + "' alt'' /><br><br>La qualité de votre image (<strong>" + result.dpi + " PPP</strong>) est satisfaisante, le rendu d'impression sera optimal.";
                        var typeContent = "success";
                        var confirmColor = "#A5DC86";
                        var confirmText = "Ok";
                        var showCancel = false;
                    } else {
                        var msgContent = "<img style='max-width:100%;max-height:100px' src='" + result.imgPathOp + "' alt'' /><br><br>Nous n'avons pas pu déterminer la qualité de votre image, nous ne pouvons par conséquent pas garantir le rendu d'impression. Nous vous conseillons vivement de choisir une autre image.";
                        var typeContent = "warning";
                        var confirmColor = "#DD6B55";
                        var confirmText = "Continuer";
                        var showCancel = true;
                    }
                    swal({
                        title: "Qualité de l'image",
                        text: msgContent,
                        type: typeContent,
                        showCancelButton: showCancel,
                        confirmButtonColor: confirmColor,
                        confirmButtonText: confirmText,
                        cancelButtonText: "Changer d'image",
                        closeOnConfirm: true,
                        closeOnCancel: true,
                        html: true
                    }, function(isConfirm) {
                        if (isConfirm) {
                            $('#banderole_content').append('<div class="elementContainer typeImage resizable draggable rotatable" style="max-height:100%;position:absolute"><div class="reset_rotate ctrlElem" title="Réinitialiser la position de l\'élement"></div><img class="elemContent banderole_element" style="max-height:100%" src="' + result.imgPathOp + '" alt="' + result.imgPathOp + '" id="' + result.id + '" /><div class="ctrlElem seresizer ui-resizable-handle ui-resizable-se"></div><div class="ctrlElem delete-element" title="Supprimer l\'élément"></div></div>');
                            setTimeout(function() {
                                var maxWidth = $('#banderole_content').width() - 50;
                                var maxHeight = $('#banderole_content').height() - 50;
                                var ratio = 0;
                                var width = $('.selectedElement img.elemContent').width();
                                var height = $('.selectedElement img.elemContent').height();
                                if (width > maxWidth) {
                                    ratio = maxWidth / width;
                                    $('.selectedElement, .selectedElement img.elemContent').css("width", maxWidth);
                                    $('.selectedElement, .selectedElement img.elemContent').css("height", height * ratio);
                                    height = height * ratio;
                                    width = width * ratio;
                                }
                                if (height > maxHeight) {
                                    ratio = maxHeight / height;
                                    $('.selectedElement, .selectedElement img.elemContent').css("height", maxHeight);
                                    $('.selectedElement, .selectedElement img.elemContent').css("width", width * ratio);
                                    width = width * ratio;
                                    height = height * ratio;
                                }
                                $('.selectedElement').center(true);
                            }, 10);
                            $('.selectedElement').removeClass('selectedElement');
                            $('#' + result['id']).parent('div').addClass('selectedElement');
                            showfirstElem();
                            $('input.elemSize').prop('disabled', false);
                            $('#colorpicker-element').stop(true).animate({
                                height: 0
                            }, 200);
                            var nbrLayers = $('ul#calques li').length;
                            var newLayer = parseInt(nbrLayers) + 1;
                            zIndex = zIndex + 1;
                            $('.selectedElement').css('z-index', zIndex);
                            $('ul#calques').prepend('<li data-zindex="' + zIndex + '" data-object-id="' + result.id + '" class="ui-state-default"><img style="width:25px;max-height: 100%;" src="' + result.imgPath + '" alt="' + result.imgPath + '" /> <span class="layer">calque ' + newLayer + '</span></li>');
                            $('ul#calques').sortable('refresh');
                            $('.ctrlElem').hide();
                            $('.selectedElement div.ctrlElem').show();
                            $('.selectedElement div.reset_rotate').hide();
                            doDraggable();
                            doResizable();
                            doRotatable();
                            $.data(document.body, 'currentID', result.id);
                            setTimeout(function() {
                                $.ajax({
                                    type: "POST",
                                    url: "../rapidpubapp/ajax/banderoles_size.php",
                                    dataType: "json",
                                    data: {
                                        action: 'getsize',
                                        id: result.id,
                                        elemWidth: parseInt($('.selectedElement').css('width'), 10),
                                        elemHeight: parseInt($('.selectedElement').css('height'), 10),
                                        ratio: $.data(document.body, 'ratioCfg'),
                                        vitWidthpx: $('#banderole_content').width(),
                                        vitHeightpx: $('#banderole_content').height(),
                                        vitWidthcm: $('#longueur').val(),
                                        vitHeightcm: $('#hauteur').val(),
                                        type: 'image'
                                    },
                                    success: function(resultx) {
                                        //$('#' + result.id).parent('div.elementContainer').append('<img class="imgL" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                                        $('#' + result['id']).parent('div.elementContainer').append('<img class="imgL" data-elemSize="' + resultx['longueur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" data-elemSize="' + resultx['hauteur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                                        var thiscmHeight = $('#' + result['id']).parent('div.elementContainer').find('img.imgH').attr('data-elemsize'),
                                            thiscmWidth = $('#' + result['id']).parent('div.elementContainer').find('img.imgL').attr('data-elemsize');
                                        $('#elem_width').val(thiscmWidth);
                                        $('#elem_height').val(thiscmHeight);
                                    }
                                });
                            }, 100);
                            $.fancybox.close();
                        } else {
                            $.ajax({
                                type: "POST",
                                url: "../rapidpubapp/ajax/imageCancel.php",
                                dataType: "json",
                                data: {
                                    action: 'cancel',
                                    prodID: productID,
                                    id: $.data(document.body, 'currentImage'),
                                    type: 'image'
                                }
                            });
                            return false;
                        }
                    });
                    $("#progressbar").hide();
                    $("#progressbar").progressbar("value", 0).children('.ui-progressbar-value').html(0 + '%').css("display", "block");
                } else {
                    swal({
                        title: "Attention",
                        text: result.msg,
                        type: "warning",
                        closeOnConfirm: true
                    });
                }
                dwnloading = false;
                $('a.download').html('Télécharger');
            }
        });
    });
    var typingTimer;
    var doneTypingInterval = 2000; //ms
    $('.dimensions_banderole').keyup(function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping($(this)), doneTypingInterval);
    });
    $('.dimensions_banderole').keydown(function() {
        clearTimeout(typingTimer);
    });

    function doneTyping(e) {
        var typeSel = e.val();
        $('.oeilletsAdd').remove();
        if (isNumber(typeSel)) {
            if ($('#hauteur').val() > 200 && $('#longueur').val() > 200) {
                swal({
                    title: "Attention",
                    html: true,
                    text: "<p style='text-align:justify'>Nous ne pouvons imprimer que des banderoles rectangulaires où le plus petit côté <strong>ne doit pas excéder 200 cm</strong>.<br>Exemple: 1000 x 200 pour une banderole horizontale ou 200 x 1000 pour une banderole verticale.</p>",
                    type: "error",
                    closeOnConfirm: true
                }, function() {
                    $('#longueur').effect('highlight', {
                        color: '#c70077'
                    }, 1500);
                    $('input#longueur').focus();
                });
                var rectVal = Math.min($('#hauteur').val(), $('#longueur').val());
                var rectElem = $('input').filter(function() {
                    return this.value == rectVal
                });
                var rectElemId = rectElem.attr('id');
                $('#' + rectElemId).val(200);
            }
            $.data(document.body, 'vWidth', $('#longueur').val());
            $.data(document.body, 'vHeight', $('#hauteur').val());
            var longueur = parseInt($('#longueur').val()),
                hauteur = parseInt($('#hauteur').val());
            if (longueur > hauteur) {
                var ratio = hauteur / longueur;
                $.data(document.body, 'ratioCfg', ratio);
                var newHeight = parseInt(750) * ratio;
                if (newHeight <= 500) $('#banderole_content').width(750).height(newHeight);
                else $('#banderole_content').width(500 / ratio).height(500);
            } else if (hauteur > longueur) {
                var ratio = longueur / hauteur;
                $.data(document.body, 'ratioCfg', ratio);
                var newWidth = parseInt(500) * ratio;
                if (newWidth <= 750) $('#banderole_content').height(500).width(500 * ratio);
                else $('#banderole_content').height(750 / ratio).width(750);
            } else if (hauteur == longueur) {
                $('#banderole_content').height(500).width(500);
            }
            $('#banderole_content').center(true);
            if (isNumber($('#longueur').val()) && isNumber($('#hauteur').val())) {
                setCfg = true;
                var left = 50;
                var largeVal = Math.max($('#hauteur').val(), $('#longueur').val());
                var smallVal = Math.min($('#hauteur').val(), $('#longueur').val());
                var largeElem = $('input').filter(function() {
                    return this.value == largeVal
                });
                var largeElemId = largeElem.attr('id');
                if (largeVal > 100) {
                    var nbrOeillets = parseInt(largeVal / 100);
                    if (nbrOeillets == 1) var leftD = 50;
                    else var leftD = 100 / parseInt(nbrOeillets + 1);
                    var iterate = leftD;
                    for (i = 0; i < nbrOeillets; i++) {
                        if (largeElemId == 'longueur') $('#oeillets').append('<div class="oeilletsAdd oeilletA oeillet" style="display: block;left:' + leftD + '%"></div><div class="oeilletsAdd oeilletB oeillet" style="display: block;left:' + leftD + '%"></div>');
                        else $('#oeillets').append('<div class="oeilletsAdd oeilletA oeillet" style="display: block;top:' + leftD + '%"></div><div class="oeilletsAdd oeilletC oeillet" style="display: block;top:' + leftD + '%"></div>');
                        leftD += iterate;
                    }
                }
                if (smallVal > 100 && smallVal != 200) {
                    if (largeElemId == 'longueur') $('#oeillets').append('<div class="oeilletsAdd oeilletA oeillet" style="display: block;top:48%"></div><div class="oeilletsAdd oeilletC oeillet" style="display: block;top:48%"></div>');
                    else $('#oeillets').append('<div class="oeilletsAdd oeilletA oeillet" style="display: block;left:48%"></div><div class="oeilletsAdd oeilletB oeillet" style="display: block;left:48%"></div>');
                } else if (smallVal == 200) {
                    var leftX = 33;
                    for (i = 0; i < 2; i++) {
                        if (largeElemId == 'longueur') $('#oeillets').append('<div class="oeilletsAdd oeilletA oeillet" style="display: block;top:' + leftX + '%"></div><div class="oeilletsAdd oeilletC oeillet" style="display: block;top:' + leftX + '%"></div>');
                        else $('#oeillets').append('<div class="oeilletsAdd oeilletA oeillet" style="display: block;left:' + leftX + '%"></div><div class="oeilletsAdd oeilletB oeillet" style="display: block;left:' + leftX + '%"></div>');
                        leftX += leftX;
                    }
                }
                $('.oeillet').show();
                var vitWidth = $('#banderole_content').width(),
                    vitHeight = $('#banderole_content').height();
                $('#banderole_height').html('<span style="color:#ff0000;font-size:10px;">' + hauteur + '</span>').css('height', vitHeight);
                $('#banderole_width').html('<span style="color:#ff0000;font-size:10px;">' + longueur + '</span>').css('width', vitWidth);
                var banderolexy = $('#banderole_content').offset();
                $('#banderole_width').css({
                    top: -15,
                    left: 0
                });
                $('#banderole_height').css({
                    top: 0,
                    left: -20
                });
            }
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "../rapidpubapp/ajax/banderolePrix.php",
                data: {
                    bLong: longueur,
                    bHaut: hauteur,
                },
                success: function(result) {
                    var prixHT = parseFloat(result.prixHT).toFixed(2);
                    var tva = (Math.round(parseFloat(result.prixHT)) / 100) * 20;
                    var prixTTC = parseFloat(prixHT) + parseFloat(tva);
                    $('#prix_ht span').html(Number(prixHT).toFixed(2));
                    $('#prix_ttc span').html(Number(prixTTC).toFixed(2));
                }
            });
        } else {
            e.val('');
            $('.oeillet').hide();
            setCfg = false;
            return false;
        }
    }
    $('#textecfg').pressEnter(function() {
        $('#add_text').click();
    });
    $('#conftabs').tabs();
    $('#themes').ddlist({
        width: 150,
        onSelected: function(index, value, text) {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "../rapidpubapp/ajax/motifs.php",
                data: {
                    motifs: value,
                    prodID: productID,
                    ratio: $.data(document.body, 'ratioCfg')
                },
                success: function(result) {
                    theme = value;
                    $('#motifs_container').html('');
                    $.each(result, function(i, item) {
                        $('#motifs_container').append('<div title="Ajouter un motif sur votre banderole" class="motif" id="' + item['code'] + '" style="background-size:100%;background-image: url(' + item['path'] + ');"></div>');
                    });
                    var width = 0;
                    $('#motifs_container div.motif').each(function() {
                        width += $(this).outerWidth(true);
                    });
                    $('#motifs_container').css('width', width + 'px');
                }
            });
        }
    });
    $('#police').ddlist({
        width: 200,
        onSelected: function(index, value, text) {
            fontName = value;
            if ($('.selectedElement').hasClass('typeText')) {
                var elementChange = $('.selectedElement').find('.elemContent');
                var idCode = elementChange.attr('id');
                var altCode = elementChange.attr('alt');
                var elemWidth = $('.selectedElement').width();
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "../rapidpubapp/ajax/banderoles_text.php",
                    data: {
                        action: 'update',
                        text: encodeURIComponent(altCode),
                        couleur: couleurVar,
                        font: fontName,
                        id: idCode,
                        ratio: $.data(document.body, 'ratioCfg')
                    },
                    success: function(result) {
                        elementChange.attr('src', 'data:image/png;base64,' + result['image']);
                        $('.selectedElement').css({
                            'height': 'auto',
                            'width': elemWidth
                        });
                        $('.selectedElement').find('.elemContent').css({
                            'height': 'auto',
                            'width': 'auto'
                        });
                        setTimeout(function() {
                            $.ajax({
                                type: "POST",
                                url: "../rapidpubapp/ajax/banderoles_size.php",
                                dataType: "json",
                                data: {
                                    action: 'getsize',
                                    id: idCode,
                                    elemWidth: parseInt($('.selectedElement').css('width'), 10),
                                    elemHeight: parseInt($('.selectedElement').css('height'), 10),
                                    ratio: $.data(document.body, 'ratioCfg'),
                                    vitWidthpx: $('#banderole_content').width(),
                                    vitHeightpx: $('#banderole_content').height(),
                                    vitWidthcm: $('#longueur').val(),
                                    vitHeightcm: $('#hauteur').val(),
                                    type: 'text'
                                },
                                success: function(resultx) {
                                    $('#' + idCode).parent('div.elementContainer').children('.imgL, .imgH').remove();
                                    //$('#' + idCode).parent('div.elementContainer').append('<img class="imgL" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                                    $('#' + idCode).parent('div.elementContainer').append('<img class="imgL" data-elemSize="' + resultx['longueur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" data-elemSize="' + resultx['hauteur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                                    var thiscmHeight = $('#' + idCode).parent('div.elementContainer').find('img.imgH').attr('data-elemsize'),
                                        thiscmWidth = $('#' + idCode).parent('div.elementContainer').find('img.imgL').attr('data-elemsize');
                                    $('#elem_width').val(thiscmWidth);
                                    $('#elem_height').val(thiscmHeight);
                                }
                            });
                        }, 100);
                    }
                });
            }
        }
    });
    var width = 0;
    $('#motifs_container div.motif').each(function() {
        width += $(this).outerWidth(true);
    });
    $('#motifs_container').css('width', width + 'px');
    $('body').on('click', '.reset_rotate', function(e) {
        e.preventDefault();
        var parentDiv = $(this).parent('div');
        parentDiv.center(true).css({
            '-moz-transform': 'rotate(0deg)',
            '-webkit-transform': 'rotate(0deg)',
            '-o-transform': 'rotate(0deg)',
            '-ms-transform': 'rotate(0deg)',
            'transform': 'rotate(0deg)'
        });
    });
    var hideResetBtn = true;
    $('body').on({
        mouseenter: function(e) {
            var elem = $(this).siblings('.reset_rotate');
            elem.fadeIn();
            e.stopImmediatePropagation();
            e.preventDefault();
        },
        mouseleave: function(e) {
            var elem = $(this).siblings('.reset_rotate');
            setTimeout(function() {
                if (hideResetBtn) elem.fadeOut();
            }, 1000);
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }, '.ui-rotatable-handle');
    $('body').on({
        mouseenter: function(e) {
            hideResetBtn = false;
            e.stopImmediatePropagation();
            e.preventDefault();
        },
        mouseleave: function(e) {
            $('.reset_rotate').fadeOut();
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }, '.reset_rotate');
    $('body').on('click', '.draggable', function(e) {
        e.preventDefault();
        $('.ctrlElem').hide();
        $('.selectedElement').removeClass('selectedElement');
        $(this).addClass('selectedElement');
        var thiscmHeight = $(this).find('img.imgH').attr('data-elemsize'),
            thiscmWidth = $(this).find('img.imgL').attr('data-elemsize');
        $('#elem_width').val(thiscmWidth);
        $('#elem_height').val(thiscmHeight);
        $('input.elemSize').prop('disabled', false);
        $('.selectedElement div.ctrlElem, .selectedElement .imgL, .selectedElement .imgH').show();
        if ($(this).hasClass('typeText')) {
            $.data(document.body, 'currentID', $(this).find('.banderole_element').attr('id'));
            var attrVal = $(this).find('.elemContent').attr('alt');
            $('#textecfg').val(attrVal).focus();
            $('#colorpicker-element').stop(true).animate({
                height: 205
            }, 200);
            $('#elemColor').colpickSetColor($(this).find('.elemContent').attr('data-colorcode'));
        } else if ($(this).hasClass('typeMotif')) {
            $.data(document.body, 'currentID', $(this).find('.banderole_element').attr('id'));
            $('#textecfg').val('');
            $('#colorpicker-element').stop(true).animate({
                height: 205
            }, 200);
            $('#elemColor').colpickSetColor($(this).find('.elemContent').attr('data-colorcode'));
        } else if ($(this).hasClass('typeImage')) {
            $.data(document.body, 'currentID', $(this).find('.banderole_element').attr('id'));
            $('#textecfg').val('');
            $('#colorpicker-element').stop(true).animate({
                height: 0
            }, 200);
        } else if ($(this).hasClass('typeFond') || $(this).hasClass('typeForme')) {
            $.data(document.body, 'currentID', $(this).attr('id'));
            $('#textecfg').val('');
            $('#colorpicker-element').stop(true).animate({
                height: 205
            }, 200);
            $('#elemColor').colpickSetColor($(this).attr('data-colorcode'));
        }
        $('.ui-tabs-nav a[href="#element"]').trigger('click');
    });
    $('body').on('click', '.delete-element', function(e) {
        e.preventDefault();
        var elemSel = $(this);
        var attrID = $(this).parent('div').find('.elemContent').attr('id');
        if ($(this).parent('div').hasClass('typeText')) {
            var type = 'text';
        } else if ($(this).parent('div').hasClass('typeMotif')) {
            var type = 'motif';
        } else if ($(this).parent('div').hasClass('typeImage')) {
            var type = 'image';
        } else if ($(this).parent('div').hasClass('typeFond')) {
            var attrID = $(this).parent('div').attr('id');
            var type = 'fond';
        } else if ($(this).parent('div').hasClass('typeForme')) {
            var attrID = $(this).parent('div').attr('id');
            var type = 'forme';
        }
        setTimeout(function() {
            $.ajax({
                type: "POST",
                url: "../rapidpubapp/ajax/delete.php",
                data: {
                    action: 'delete',
                    prodID: productID,
                    typedel: type,
                    id: attrID,
                },
                success: function(result) {
                    elemSel.parent('div').remove();
                    $('input.elemSize').prop('disabled', true).val('');
                    $('*[data-object-id="' + attrID + '"]').remove();
                    if ($.data(document.body, 'showColors')) {
                        $('#colorpicker-element').stop(true).animate({
                            height: 205
                        }, 200);
                        $.data(document.body, 'showColors', false);
                    } else {
                        $('#colorpicker-element').stop(true).animate({
                            height: 0
                        }, 200);
                    }
                    $('#textecfg').val('');
                    $('ul#calques').sortable('refreshPositions');
                }
            });
        }, 100);
    });
    $('ul#calques').sortable({
        update: function(event, ui) {
            var result = $(this).sortable('toArray', {
                attribute: 'data-object-id'
            });
            result.reverse();
            var newZindex = 2;
            result.forEach(function(entry) {
                if ($('#' + entry).get(0).tagName == 'DIV') {
                    $('#' + entry).css('z-index', newZindex);
                } else {
                    $('#' + entry).parent('.elementContainer').css('z-index', newZindex);
                }
                newZindex++;
            });
            $(this).sortable('refreshPositions');
        }
    });
    $('#longueur, #hauteur').on('input', function() {
        var elemCount = $('#banderole_content > .elementContainer').length;
        if (elemCount >= 1 && setCfg) {
            swal({
                title: "Attention",
                text: "Vous perdrez votre travail si vous changez les dimensions de la banderole et vous devrez recommencer votre création",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Recommencer",
                cancelButtonText: "Annuler",
                closeOnConfirm: true,
                closeOnCancel: true
            }, function(isConfirm) {
                if (isConfirm) {
                    /*$('#calques > li').remove();
                    $('#banderole_content .elementContainer').remove();
                    $.post('../rapidpubapp/ajax/reset.php', function(data) {
                        $('#prix_ht span').html('0.00');
                        $('#prix_ttc span').html('0.00');
                    });
                    nbrElements = 0;
                    $.data(document.body, 'vWidth', 0);
                    $.data(document.body, 'vHeight', 0);*/
                    $(window).unbind();
                    location.reload(true);
                   // return false;
                } else {
                    $('#longueur').val($.data(document.body, 'vWidth'));
                    $('#hauteur').val($.data(document.body, 'vHeight'));
                    //return false;
                }
            });
        }
    });
    $('#sizes').change(function() {
        if (this.checked) {
            $('.imgL, .imgH').css('display', 'block');
            showDim = true;
        } else {
            $('.imgL, .imgH').css('display', 'none');
            showDim = false;
        }
    });
    $('#add_text').click(function(e) {
        e.preventDefault();
        var textVal = $('#textecfg').val();
        var dimensionssel = dimensionsp;
        var parentSize = $('#banderole_content').css('width');
        var supportWidth = $('#longueur').val();
        var supportHeight = $('#hauteur').val();
        if (textVal == '') {
            swal({
                title: "Attention",
                text: "Vous devez saisir au moins un caractère avant de pouvoir continuer !",
                type: "warning",
                closeOnConfirm: true
            });
            return false;
        } else if (setCfg == false) {
            swal({
                title: "Attention",
                text: "Vous devez saisir les dimensions de votre banderole avant de pouvoir continuer !",
                type: "warning",
                closeOnConfirm: true
            }, function() {
                $('#longueur').effect('highlight', {
                    color: '#c70077'
                }, 1500);
                $('input#longueur').focus();
            });
            return false;
        } else {
            var selElemWidth = $('.selectedElement').width();
            var selElemHeight = $('.selectedElement').height();
            if ($('.selectedElement').hasClass('typeText')) {
                $.data(document.body, 'textEdit', true);
                couleurVar = $('.selectedElement').find('img.elemContent').attr('data-ccode');
            } else {
                couleurVar = '#000000';
            }
            $.ajax({
                type: "POST",
                url: "../rapidpubapp/ajax/banderoles_text.php",
                dataType: "json",
                data: {
                    action: 'update',
                    text: encodeURIComponent(textVal),
                    dimensions: dimensionssel,
                    couleur: couleurVar,
                    font: fontName,
                    ratio: $.data(document.body, 'ratioCfg'),
                    width: supportWidth,
                    height: supportHeight,
                },
                success: function(result) {
                    if ($('.selectedElement').hasClass('typeText')) {
                        var selHeight = $('.selectedElement').height();
                        $.data(document.body, 'selfHeight', selHeight);
                        $('.selectedElement').find('.delete-element').trigger('click');
                        $.data(document.body, 'showColors', true);
                    }
                    $('.selectedElement').removeClass('selectedElement');
                    $('#banderole_content').append('<div class="elementContainer typeText resizable draggable rotatable" style="position:absolute"><div class="reset_rotate ctrlElem" title="Réinitialiser la position de l\'élement"></div><img class="banderole_element elemContent" src="data:image/png;base64,' + result['image'] + '" data-ccode="' + couleurVar + '" alt="' + result['text'] + '" id="' + result['id'] + '" /><div class="ctrlElem seresizer ui-resizable-handle ui-resizable-se"></div><div class="delete-element ctrlElem" title="Supprimer l\'élément"></div></div>');
                    $('#elemColor').colpickSetColor('#000000');
                    $('#colorpicker-element').stop(true).animate({
                        height: 205
                    }, 200);
                    $('#' + result['id']).parent('div').addClass('selectedElement');
                    showfirstElem();
                    $('.selectedElement').find('.elemContent').attr('data-colorcode', '#000000');
                    $('input.elemSize').prop('disabled', false);
                    setTimeout(function() {
                        var maxWidth = $('#banderole_content').width() - 50;
                        var maxHeight = $('#banderole_content').height() - 50;
                        var ratio = 0;
                        var width = $('.selectedElement .elemContent').width();
                        var height = $('.selectedElement .elemContent').height();
                        if (width > maxWidth) {
                            ratio = maxWidth / width;
                            $('.selectedElement, .selectedElement .elemContent').css("width", maxWidth);
                            $('.selectedElement, .selectedElement .elemContent').css("height", height * ratio);
                            height = height * ratio;
                            width = width * ratio;
                        }
                        if (height > maxHeight) {
                            ratio = maxHeight / height;
                            $('.selectedElement, .selectedElement .elemContent').css("height", maxHeight);
                            $('.selectedElement, .selectedElement .elemContent').css("width", width * ratio);
                            width = width * ratio;
                            height = height * ratio;
                        }
                        $('.selectedElement').center(true);
                    }, 10);
                    if (textVal.length <= 10 && textVal.length > 1) {
                        var newSize = parseInt(parentSize) / 4;
                    } else if (textVal.length > 10 && textVal.length <= 20) {
                        var newSize = parseInt(parentSize) / 2;
                    } else if (textVal.length > 21) {
                        var newSize = parseInt(parentSize) / 1.3;
                    } else if (textVal.length == 1) {
                        var newSize = 110;
                    }
                    $('.selectedElement').height('auto').width(newSize);
                    var nbrLayers = $('ul#calques li').length;
                    var newLayer = parseInt(nbrLayers) + 1;
                    zIndex = zIndex + 1;
                    $('.selectedElement').css('z-index', zIndex);
                    $('ul#calques').prepend('<li data-zindex="' + zIndex + '" data-object-id="' + result['id'] + '" class="ui-state-default"><span class="text">' + textVal + '</span><span class="layer">calque ' + newLayer + '</span></li>');
                    $('#textecfg').val(textVal);
                    $('ul#calques').sortable('refresh');
                    $('.ctrlElem, .imgL, .imgH').hide();
                    $('.selectedElement div.ctrlElem').show();
                    $('.selectedElement div.reset_rotate').hide();
                    doDraggable();
                    doResizable();
                    doRotatable();
                    if (!$.data(document.body, 'textEdit')) $('#' + result['id']).parent('div').center(true);
                    $.data(document.body, 'currentID', result['id']);
                    setTimeout(function() {
                        $.ajax({
                            type: "POST",
                            url: "../rapidpubapp/ajax/banderoles_size.php",
                            dataType: "json",
                            data: {
                                action: 'getsize',
                                id: result['id'],
                                elemWidth: $('.selectedElement').width(),
                                elemHeight: $('.selectedElement').height(),
                                ratio: $.data(document.body, 'ratioCfg'),
                                vitWidthpx: $('#banderole_content').width(),
                                vitHeightpx: $('#banderole_content').height(),
                                vitWidthcm: $('#longueur').val(),
                                vitHeightcm: $('#hauteur').val(),
                                type: 'text'
                            },
                            success: function(resultx) {
                                $.data(document.body, 'currentID', result['id']);
                                //$('#' + result['id']).parent('div.elementContainer').append('<img class="imgL" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                                $('#' + result['id']).parent('div.elementContainer').append('<img class="imgL" data-elemSize="' + resultx['longueur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" data-elemSize="' + resultx['hauteur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                                var thiscmHeight = $('#' + result['id']).parent('div.elementContainer').find('img.imgH').attr('data-elemsize'),
                                    thiscmWidth = $('#' + result['id']).parent('div.elementContainer').find('img.imgL').attr('data-elemsize');
                                $('#elem_width').val(thiscmWidth);
                                $('#elem_height').val(thiscmHeight);
                            }
                        });
                    }, 100);
                }
            });
            $.data(document.body, 'textEdit', false);
        }
    });
    $('body').on('click', '.motif', function() {
        var supportWidth = $('#longueur').val();
        var supportHeight = $('#hauteur').val();
        var motifUrl = $(this).attr('id');
        if (setCfg == false) {
            swal({
                title: "Attention",
                text: "Vous devez saisir les dimensions de votre banderole avant de pouvoir continuer !",
                type: "warning",
                closeOnConfirm: true
            }, function() {
                $('#longueur').effect('highlight', {
                    color: '#c70077'
                }, 1500);
                $('input#longueur').focus();
            });
            return false;
        }
        $('#textecfg').val('');
        $.ajax({
            type: "POST",
            url: "../rapidpubapp/ajax/banderoles_motif.php",
            dataType: "json",
            data: {
                action: 'update',
                motif: motifUrl,
                folder: theme,
                couleur: couleurVar,
                ratio: $.data(document.body, 'ratioCfg'),
                width: supportWidth,
                height: supportHeight,
            },
            success: function(result) {
                $('.selectedElement').removeClass('selectedElement');
                $('#banderole_content').append('<div class="elementContainer typeMotif resizable draggable rotatable" style="position:absolute"><div class="reset_rotate ctrlElem" title="Réinitialiser la position de l\'élement"></div><img class="elemContent banderole_element" data-src-code="' + result['code'] + '" src="data:image/png;base64,' + result['imgMotif'] + '" alt="' + result['motif'] + '" id="' + result['id'] + '" /><div class="ctrlElem seresizer ui-resizable-handle ui-resizable-se"></div><div class="ctrlElem delete-element" title="Supprimer l\'élément"></div></div>');
                $('#' + result['id']).parent('div').addClass('selectedElement');
                showfirstElem();
                $('#elemColor').colpickSetColor('#000000');
                $('.selectedElement').find('.elemContent').attr('data-colorcode', '#000000');
                $('input.elemSize').prop('disabled', false);
                setTimeout(function() {
                    var maxWidth = $('#banderole_content').width() - 50;
                    var maxHeight = $('#banderole_content').height() - 50;
                    var ratio = 0;
                    var width = $('.selectedElement img.elemContent').width();
                    var height = $('.selectedElement img.elemContent').height();
                    if (width > maxWidth) {
                        ratio = maxWidth / width;
                        $('.selectedElement, .selectedElement img.elemContent').css("width", maxWidth);
                        $('.selectedElement, .selectedElement img.elemContent').css("height", height * ratio);
                        height = height * ratio;
                        width = width * ratio;
                    }
                    if (height > maxHeight) {
                        ratio = maxHeight / height;
                        $('.selectedElement, .selectedElement img.elemContent').css("height", maxHeight);
                        $('.selectedElement, .selectedElement img.elemContent').css("width", width * ratio);
                        width = width * ratio;
                        height = height * ratio;
                    }
                    $('.selectedElement').center(true);
                }, 10);
                $('#colorpicker-element').stop(true).animate({
                    height: 205
                }, 200);
                var nbrLayers = $('ul#calques li').length;
                var newLayer = parseInt(nbrLayers) + 1;
                zIndex = zIndex + 1;
                $('.selectedElement').css('z-index', zIndex);
                $('ul#calques').prepend('<li data-zindex="' + zIndex + '" data-object-id="' + result['id'] + '" class="ui-state-default"><img style="width:25px" data-src-code="' + result['code'] + '" src="' + result['motif'] + '" alt="' + result['motif'] + '" /> <span class="layer">calque ' + newLayer + '</span></li>');
                $('ul#calques').sortable('refresh');
                $('.ctrlElem, .imgL, .imgH').hide();
                $('.selectedElement div.ctrlElem').show();
                $('.selectedElement div.reset_rotate').hide();
                doDraggable();
                doResizable();
                doRotatable();
                $('#' + result['id']).parent('div').center(true);
                $.data(document.body, 'currentID', result['id']);
                setTimeout(function() {
                    $.ajax({
                        type: "POST",
                        url: "http://rapidpub.synapdev.fr/rapidpubapp/ajax/banderoles_size.php",
                        dataType: "json",
                        data: {
                            action: 'getsize',
                            id: result['id'],
                            elemWidth: parseInt($('.selectedElement').css('width'), 10),
                            elemHeight: parseInt($('.selectedElement').css('height'), 10),
                            ratio: $.data(document.body, 'ratioCfg'),
                            vitWidthpx: $('#banderole_content').width(),
                            vitHeightpx: $('#banderole_content').height(),
                            vitWidthcm: $('#longueur').val(),
                            vitHeightcm: $('#hauteur').val(),
                            type: 'motif'
                        },
                        success: function(resultx) {
                            //$('#' + result['id']).parent('div.elementContainer').append('<img class="imgL" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                            $('#' + result['id']).parent('div.elementContainer').append('<img class="imgL" data-elemSize="' + resultx['longueur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" data-elemSize="' + resultx['hauteur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                            var thiscmHeight = $('#' + result['id']).parent('div.elementContainer').find('img.imgH').attr('data-elemsize'),
                                thiscmWidth = $('#' + result['id']).parent('div.elementContainer').find('img.imgL').attr('data-elemsize');
                            $('#elem_width').val(thiscmWidth);
                            $('#elem_height').val(thiscmHeight);
                        }
                    });
                }, 100);
            }
        });
    });
    $(document).keydown(function(e) {
        if ($('.selectedElement')[0]) {
            var elemZ = $('.selectedElement'),
                parentZ = $('#banderole_content'),
                elemPosition = elemZ.position(),
                parentPosition = parentZ.position(),
                elemWidth = elemZ.width() + 2,
                elemHeight = elemZ.height() + 2,
                parentWidth = parentZ.width(),
                parentHeight = parentZ.height();
            switch (e.which) {
                case 37: // left
                    if (elemPosition.left > 2) $('.selectedElement').css('left', '-=2px');
                    break;
                case 38: // up
                    if (elemPosition.top > 2) $('.selectedElement').css('top', '-=2px')
                    break;
                case 39: // right
                    var positionRight = elemPosition.left + elemWidth;
                    if (positionRight < (parentWidth - 4)) $('.selectedElement').css('left', '+=2px')
                    break;
                case 40: // down
                    var positionBottom = elemPosition.top + elemHeight;
                    if (positionBottom < (parentHeight - 4)) $('.selectedElement').css('top', '+=2px')
                    break;
                case 46: // delete
                    var elemSel = $('.selectedElement');
                    var attrID = $('.selectedElement').find('.elemContent').attr('id');
                    if ($('.selectedElement').hasClass('typeText')) {
                        var type = 'text';
                    } else if ($('.selectedElement').hasClass('typeMotif')) {
                        var type = 'motif';
                    } else if ($('.selectedElement').hasClass('typeImage')) {
                        var type = 'image';
                    } else if ($('.selectedElement').hasClass('typeFond')) {
                        var attrID = $('.selectedElement').attr('id');
                        var type = 'fond';
                    } else if ($('.selectedElement').hasClass('typeForme')) {
                        var attrID = $('.selectedElement').attr('id');
                        var type = 'forme';
                    }
                    setTimeout(function() {
                        $.ajax({
                            type: "POST",
                            url: "../rapidpubapp/ajax/delete.php",
                            data: {
                                action: 'delete',
                                prodID: productID,
                                typedel: type,
                                id: attrID
                            },
                            success: function(result) {
                                $('.selectedElement').remove();
                                $('input.elemSize').prop('disabled', true).val('');
                                $('*[data-object-id="' + attrID + '"]').remove();
                                if ($.data(document.body, 'showColors')) {
                                    $('#colorpicker-element').stop(true).animate({
                                        height: 130
                                    }, 200);
                                    $.data(document.body, 'showColors', false);
                                } else {
                                    $('#colorpicker-element').stop(true).animate({
                                        height: 0
                                    }, 200);
                                }
                                $('#textecfg').val('');
                                $('ul#calques').sortable('refreshPositions');
                            }
                        });
                    }, 100);
                    break;
                default:
                    return;
            }
            e.preventDefault();
        }
    });
    $('.alignmove').repeatedclick(function(e) {
        e.preventDefault();
        var elemZ = $('.selectedElement'),
            parentZ = $('#banderole_content'),
            elemPosition = elemZ.position(),
            parentPosition = parentZ.position(),
            elemWidth = elemZ.width() + 2,
            elemHeight = elemZ.height() + 2,
            parentWidth = parentZ.width(),
            parentHeight = parentZ.height();
        switch ($(this).attr('id')) {
            case 'flip_vertical':
                if (!$('.selectedElement').hasClass('typeFond')) {
                    if ($('.selectedElement .elemContent').hasClass('flipVertical')) $('.selectedElement .elemContent').removeClass('flipVertical');
                    else $('.selectedElement .elemContent').addClass('flipVertical');
                }
                break;
            case 'center_h':
                $('.selectedElement').centerH(true);
                break;
            case 'center_v':
                $('.selectedElement').centerV(true);
                break;
            case 'center':
                $('.selectedElement').center(true);
                break;
            case 'move_left':
                if (elemPosition.left > 2) $('.selectedElement').css('left', '-=2px');
                break;
            case 'move_right':
                var positionRight = elemPosition.left + elemWidth;
                if (positionRight < (parentWidth - 4)) $('.selectedElement').css('left', '+=2px')
                break;
            case 'move_top':
                if (elemPosition.top > 2) $('.selectedElement').css('top', '-=2px')
                break;
            case 'move_bottom':
                var positionBottom = elemPosition.top + elemHeight;
                if (positionBottom < (parentHeight - 4)) $('.selectedElement').css('top', '+=2px')
                break;
            case 'flip_vertical':
                $('.selectedElement').animate({
                    rotate: 180
                });
                break;
            case 'flip_horizontal':
                if ($('.selectedElement .elemContent').hasClass('flipHorizontal')) $('.selectedElement .elemContent').removeClass('flipHorizontal');
                else $('.selectedElement .elemContent').addClass('flipHorizontal');
                break;
        }
    }, {
        duration: 100,
        speed: 0.8,
        min: 500
    });
    $('.colorblock').click(function() {
        var color = $(this).attr('data-hexcolor');
        $('#elemColor').colpickSetColor(color);
        couleurVar = color;
        var supportWidth = $('#longueur').val();
        var supportHeight = $('#hauteur').val();
        if ($('.selectedElement').hasClass('typeMotif')) {
            var elementChange = $('.selectedElement').find('.elemContent');
            var srcCode = elementChange.attr('data-src-code');
            var idCode = elementChange.attr('id');
            $.ajax({
                type: "POST",
                url: "../rapidpubapp/ajax/color2png.php",
                data: {
                    fileName: srcCode,
                    prodID: productID,
                    folder: theme,
                    fileColor: color,
                    id: idCode,
                    ratio: $.data(document.body, 'ratioCfg'),
                    width: supportWidth,
                    height: supportHeight
                },
                success: function(result) {
                    var newSRC = 'data:image/gif;base64,' + result;
                    elementChange.attr('src', newSRC);
                    elementChange.attr('data-colorcode', color);
                }
            });
        } else if ($('.selectedElement').hasClass('typeText')) {
            var elementChange = $('.selectedElement').find('.elemContent');
            var idCode = elementChange.attr('id');
            var altCode = elementChange.attr('alt');
            var dimensionssel = $('#dimensionssel').val();
            $('.selectedElement').find('img.elemContent').attr('data-ccode', color);
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "../rapidpubapp/ajax/banderoles_text.php",
                data: {
                    action: 'update',
                    text: encodeURIComponent(altCode),
                    dimensions: dimensionssel,
                    couleur: color,
                    font: fontName,
                    id: idCode,
                    ratio: $.data(document.body, 'ratioCfg'),
                    width: supportWidth,
                    height: supportHeight
                },
                success: function(result) {
                    elementChange.attr('src', 'data:image/png;base64,' + result['image']);
                    elementChange.attr('data-colorcode', color);
                }
            });
        } else if ($('.selectedElement').hasClass('typeFond')) {
            var elementChange = $('.selectedElement');
            var idCode = elementChange.attr('id');
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "../rapidpubapp/ajax/banderoles_fond.php",
                data: {
                    action: 'update',
                    couleur: color,
                    type: 'fond',
                    id: idCode,
                    ratio: $.data(document.body, 'ratioCfg'),
                    width: supportWidth,
                    height: supportHeight
                },
                success: function(result) {
                    $('.selectedElement').css('background-color', color);
                }
            });
        } else if ($('.selectedElement').hasClass('typeForme')) {
            var elementChange = $('.selectedElement');
            var idCode = elementChange.attr('id');
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "../rapidpubapp/ajax/banderoles_forme.php",
                data: {
                    action: 'update',
                    couleur: color,
                    type: 'forme',
                    id: idCode,
                    ratio: $.data(document.body, 'ratioCfg'),
                    width: supportWidth,
                    height: supportHeight
                },
                success: function(result) {
                    $('.selectedElement').css('background-color', color);
                }
            });
        }
    });
    $('#elemColor').colpick({
        flat: true,
        color: '000000',
        layout: 'hex',
        submit: 0,
        onChanged: function(hsb, hex, rgb, el, bySetColor) {
            if (!bySetColor) {
                var color = '#' + hex;
                couleurVar = color;
                var supportWidth = $('#longueur').val();
                var supportHeight = $('#hauteur').val();
                if ($('.selectedElement').hasClass('typeMotif')) {
                    var elementChange = $('.selectedElement').find('.elemContent');
                    var srcCode = elementChange.attr('data-src-code');
                    var idCode = elementChange.attr('id');
                    $.ajax({
                        type: "POST",
                        url: "../rapidpubapp/ajax/color2png.php",
                        data: {
                            fileName: srcCode,
                            folder: theme,
                            prodID: productID,
                            fileColor: color,
                            id: idCode,
                            ratio: $.data(document.body, 'ratioCfg'),
                            width: supportWidth,
                            height: supportHeight
                        },
                        success: function(result) {
                            var newSRC = 'data:image/gif;base64,' + result;
                            elementChange.attr('src', newSRC);
                            elementChange.attr('data-colorcode', color);
                        }
                    });
                } else if ($('.selectedElement').hasClass('typeText')) {
                    var elementChange = $('.selectedElement').find('.elemContent');
                    var idCode = elementChange.attr('id');
                    var altCode = elementChange.attr('alt');
                    var dimensionssel = $('#dimensionssel').val();
                    $('.selectedElement').find('img.elemContent').attr('data-ccode', color);
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "../rapidpubapp/ajax/banderoles_text.php",
                        data: {
                            action: 'update',
                            text: encodeURIComponent(altCode),
                            dimensions: dimensionssel,
                            couleur: color,
                            font: fontName,
                            id: idCode,
                            ratio: $.data(document.body, 'ratioCfg'),
                            width: supportWidth,
                            height: supportHeight
                        },
                        success: function(result) {
                            elementChange.attr('src', 'data:image/png;base64,' + result['image']);
                            elementChange.attr('data-colorcode', color);
                        }
                    });
                } else if ($('.selectedElement').hasClass('typeFond')) {
                    var elementChange = $('.selectedElement');
                    var idCode = elementChange.attr('id');
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "../rapidpubapp/ajax/banderoles_fond.php",
                        data: {
                            action: 'update',
                            couleur: color,
                            type: 'fond',
                            id: idCode,
                            ratio: $.data(document.body, 'ratioCfg'),
                            width: supportWidth,
                            height: supportHeight
                        },
                        success: function(result) {
                            $('.selectedElement').css('background-color', color);
                        }
                    });
                } else if ($('.selectedElement').hasClass('typeForme')) {
                    var elementChange = $('.selectedElement');
                    var idCode = elementChange.attr('id');
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "../rapidpubapp/ajax/banderoles_forme.php",
                        data: {
                            action: 'update',
                            couleur: color,
                            type: 'forme',
                            id: idCode,
                            ratio: $.data(document.body, 'ratioCfg'),
                            width: supportWidth,
                            height: supportHeight
                        },
                        success: function(result) {
                            $('.selectedElement').css('background-color', color);
                            elementChange.attr('data-colorcode', color);
                        }
                    });
                }
            } else {
                $(el).val(hex);
            }
        }
    }).keyup(function() {
        $(this).colpickSetColor(this.value);
    });
    $('#fondColor').colpick({
        flat: true,
        layout: 'hex',
        color: 'cccccc',
        submit: 0,
        onChange: function(hsb, hex, rgb, el, bySetColor) {
            $('#banderole_content').css('background-color', '#' + hex);
        }
    }).keyup(function() {
        $(this).colpickSetColor(this.value);
    });
    $('.colorfondblock').click(function() {
        var color = $(this).attr('data-hexcolor');
        $.data(document.body, 'couleurFond', color);
        $('#banderole_content').css('background-color', color);
        $('#fondColor').colpickSetColor(color);
    });
});