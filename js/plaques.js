$(function() {
    var couleurVar = '#030303',
        plaqueColor = 'transparent',
        zIndex = 0,
        fixation = null,
        selected = null,
        fontName = $('#police').find(':selected').val(),
        theme = 'divers',
        dimensionsp,
        nbrElements = 0;
    $.data(document.body, 'resizable', false);
    $.data(document.body, 'draggable', false);
    $.data(document.body, 'rotatable', false);
    $('#plaque_content').click(function() {
        if ($.data(document.body, 'rotatable') == false && $.data(document.body, 'draggable') == false && $.data(document.body, 'resizable') == false) {
            $('.selectedElement div.ctrlElem').hide();
            $('.selectedElement').removeClass('selectedElement');
            $('#colorpicker-element').stop().hide();
            $('#textecfg').val('');
        }
    });
    $('#hauteur_plaque').focus();
    $('#matiere').ddlist({
        width: 200,
        onSelected: function(index, value, text) {
            console.log(value);
        }
    });
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
                    motifs: value
                },
                success: function(result) {
                    theme = value;
                    $('#motifs_container').html('');
                    $.each(result, function(i, item) {
                        $('#motifs_container').append('<div title="Ajouter un motif sur votre plaque" class="motif" id="' + item['code'] + '" style="background-size:100%;background-image: url(' + item['path'] + ');"></div>');
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
    $('#dimensionssel').ddlist({
        width: 100,
        onSelected: function(index, value, text) {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "../rapidpubapp/ajax/plaques_tailles.php",
                data: {
                    id: value
                },
                success: function(result) {
                    $('#prix_ht span').html(result['prix']);
                    $('#prix_constate').html(result['prix_constate']);
                    $('#plaque_bg, #plaque_content').width(result['width']).height(result['height']);
                    if (result['entretoises'] == 2) {
                        var distance_g = result['entretoise_gauche'].split('x');
                        var distance_d = result['entretoise_droite'].split('x');
                        var eg_haut = distance_g[0];
                        var eg_gauche = distance_g[1];
                        var ed_haut = distance_d[0];
                        var ed_droite = distance_d[1];
                        var fixationdiv = '<div class="fixation2 fixation_g" style="left:' + eg_gauche + ';top:' + eg_haut + '"></div><div class="fixation2 fixation_d" style="right:' + ed_droite + ';top:' + ed_haut + '"></div>';
                    } else {
                        var fixationdiv = '<div class="fixation fixation_hg"></div><div class="fixation fixation_hd"></div><div class="fixation fixation_bg"></div><div class="fixation fixation_bd"></div>';
                    }
                    $('#fixations_plaque').html(fixationdiv);
                    $('#plaque_bg').center(true);
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
                var dimensionssel = $('#dimensionssel').val();
                $('.selectedElement').css({
                    'height': 'auto',
                    'width': 'auto'
                });
                $('.selectedElement').find('.elemContent').css({
                    'height': 'auto',
                    'width': 'auto'
                });
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "../rapidpubapp/ajax/plaques_text.php",
                    data: {
                        action: 'update',
                        text: altCode,
                        dimensions: dimensionssel,
                        couleur: couleurVar,
                        font: fontName,
                        id: idCode
                    },
                    success: function(result) {
                        elementChange.attr('src', 'data:image/png;base64,' + result['image']);
                        var parentSize = $('#plaque_content').css('width');
                        if (altCode.length <= 10) {
                            var newSize = parseInt(parentSize) / 4;
                        } else if (altCode.length > 10 && altCode.length <= 20) {
                            var newSize = parseInt(parentSize) / 2;
                        } else if (altCode.length > 21) {
                            var newSize = parseInt(parentSize) / 1.3;
                        }
                        $('.selectedElement').height('auto').width(newSize);
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
    $('.selectfixation').click(function(e) {
        e.preventDefault();
        $('div#fixations .selected').removeClass('selected');
        $(this).addClass('selected');
        var fixID = $(this).attr('id');
        switch (fixID) {
            case 'fix1':
                $('.fixation').css('background-image', 'url(./img/fix1.png)');
                break;
            case 'fix2':
                $('.fixation').css('background-image', 'url(./img/fix2.png)');
                break;
            case 'aucune':
                $('.fixation').css('background-image', 'none');
                break;
            case 'adhesifs':
                $('.fixation').css('background-image', 'none');
                break;
        }
    });
    $('.couleur_fond').click(function() {
        var color = $(this).css('background-color');
        $('#plaque_bg').css('background-color', color);
        plaqueColor = color;
    });
    $('.couleur_element').click(function() {
        var color = $(this).attr('data-couleurcode');
        couleurVar = color;
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
                    fileColor: couleurVar,
                    id: idCode
                },
                success: function(result) {
                    var newSRC = 'data:image/gif;base64,' + result;
                    elementChange.attr('src', newSRC);
                }
            });
        } else if ($('.selectedElement').hasClass('typeText')) {
            var elementChange = $('.selectedElement').find('.elemContent');
            var idCode = elementChange.attr('id');
            var altCode = elementChange.attr('alt');
            var dimensionssel = $('#dimensionssel').val();
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "../rapidpubapp/ajax/plaques_text.php",
                data: {
                    action: 'update',
                    text: altCode,
                    dimensions: dimensionssel,
                    couleur: couleurVar,
                    font: fontName,
                    id: idCode
                },
                success: function(result) {
                    elementChange.attr('src', 'data:image/png;base64,' + result['image']);
                }
            });
        }
    });
    $('body').on('click', '.reset_rotate', function() {
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
    $('body').on('click', '.draggable', function() {
        $('.ctrlElem').hide();
        $('.selectedElement').removeClass('selectedElement');
        $(this).addClass('selectedElement');
        $('#colorpicker-element').stop().show();
        $('.selectedElement div.ctrlElem').show();
        if ($(this).hasClass('typeText')) {
            var attrVal = $(this).find('.elemContent').attr('alt');
            $('#textecfg').val(attrVal).focus();
        } else if ($(this).hasClass('typeMotif')) {
            $('#textecfg').val('');
        }
    });
    $('body').on('click', '.delete-element', function() {
        var elemSel = $(this);
        var attrID = $(this).parent('div').find('.elemContent').attr('id');
        if ($(this).parent('div').hasClass('typeText')) {
            var type = 'text';
        } else if ($(this).parent('div').hasClass('typeMotif')) {
            var type = 'motif';
        }
        $.ajax({
            type: "POST",
            url: "../rapidpubapp/ajax/delete.php",
            data: {
                action: 'delete',
                typedel: type,
                id: attrID
            },
            success: function(result) {
                elemSel.parent('div').remove();
                $('*[data-object-id="' + attrID + '"]').remove();
                $('#colorpicker-element').stop().hide();
            }
        });
    });
    $('ul#calques').sortable({
        update: function(event, ui) {
            var result = $(this).sortable('toArray', {
                attribute: 'data-object-id'
            });
            result.reverse();
            var newZindex = 0;
            result.forEach(function(entry) {
                $('#' + entry).parent('.elementContainer').css('z-index', newZindex);
                newZindex++;
            });
            $(this).sortable('refreshPositions');
        }
    });
    $('#add_text').click(function() {
        var textVal = $('#textecfg').val();
        var dimensionssel = dimensionsp;
        var parentSize = $('#plaque_content').css('width');
        if (textVal == '') {
            $('<div title="Attention !"><p>Vous devez saisir <strong>au moins un caractère</strong> avant de valider.</p></div>').dialog({
                buttons: {
                    'Ok': function() {
                        $(this).dialog('close');
                        $('#textecfg').effect('highlight', {
                            color: '#c70077'
                        }, 1500);
                        $('#textecfg').focus();
                    }
                }
            });
            return false;
        } else {
            $.ajax({
                type: "POST",
                url: "../rapidpubapp/ajax/plaques_text.php",
                dataType: "json",
                data: {
                    action: 'update',
                    text: textVal,
                    dimensions: dimensionssel,
                    couleur: couleurVar,
                    font: fontName
                },
                success: function(result) {
                    if ( $('.selectedElement').hasClass( 'typeText' ) ) {
                        $('.selectedElement').remove();
                    }
                    $('#plaque_content').append('<div class="elementContainer typeText resizable draggable rotatable" style="position:absolute"><div class="reset_rotate ctrlElem" title="Réinitialiser la position de l\'élement"></div><img class="plaque_element elemContent" src="data:image/png;base64,' + result['image'] + '" alt="' + result['text'] + '" id="' + result['id'] + '" /><div class="ctrlElem seresizer ui-resizable-handle ui-resizable-se"></div><div class="delete-element ctrlElem" title="Supprimer l\'élément"></div></div>');
                    $('.selectedElement').removeClass('selectedElement');
                    $('#' + result['id']).parent('div').addClass('selectedElement');
                    if (textVal.length <= 10 && textVal.length > 1 ) {
                        var newSize = parseInt(parentSize) / 4;
                    } else if (textVal.length > 10 && textVal.length <= 20) {
                        var newSize = parseInt(parentSize) / 2;
                    } else if (textVal.length > 21) {
                        var newSize = parseInt(parentSize) / 1.3;
                    } else if (textVal.length == 1) {
                        var newSize = 110;
                    }
                    $('.selectedElement').height('auto').width(newSize);
                    $('#colorpicker-element').stop().show();
                    var nbrLayers = $('ul#calques li').length;
                    var newLayer = parseInt(nbrLayers) + 1;
                    zIndex = zIndex + 1;
                    $('ul#calques').prepend('<li data-zindex="' + zIndex + '" data-object-id="' + result['id'] + '" class="ui-state-default"><span class="text">' + textVal + '</span><span class="layer">calque ' + newLayer + '</span></li>');
                    $('ul#calques').sortable('refresh');
                    $('.ctrlElem').hide();
                    $('.selectedElement div.ctrlElem').show();
                    $('.selectedElement div.reset_rotate').hide();
                    $('.selectedElement').css('z-index', zIndex);
                    doDraggable();
                    doResizable();
                    doRotatable();
                    $('#' + result['id']).parent('div').center(true);
                }
            });
        }
    });
    $('body').on('click', '.motif', function() {
        var widthVal = $('#longueur_plaque').val();
        var heightVal = $('#hauteur_plaque').val();
        var motifUrl = $(this).attr('id');
        $('#textecfg').val('');
        $.ajax({
            type: "POST",
            url: "../rapidpubapp/ajax/plaques_motif.php",
            dataType: "json",
            data: {
                action: 'update',
                motif: motifUrl,
                folder: theme,
                couleur: couleurVar
            },
            success: function(result) {
                $('#plaque_content').append('<div class="elementContainer typeMotif resizable draggable rotatable" style="position:absolute"><div class="reset_rotate ctrlElem" title="Réinitialiser la position de l\'élement"></div><img class="elemContent plaque_element" data-src-code="' + result['code'] + '" src="' + result['motif'] + '" alt="' + result['motif'] + '" id="' + result['id'] + '" /><div class="ctrlElem seresizer ui-resizable-handle ui-resizable-se"></div><div class="ctrlElem delete-element" title="Supprimer l\'élément"></div></div>');
                $('.selectedElement').removeClass('selectedElement');
                $('#' + result['id']).parent('div').addClass('selectedElement');
                $('#colorpicker-element').stop().show();
                var nbrLayers = $('ul#calques li').length;
                var newLayer = parseInt(nbrLayers) + 1;
                zIndex = zIndex + 1;
                $('ul#calques').prepend('<li data-zindex="' + zIndex + '" data-object-id="' + result['id'] + '" class="ui-state-default"><img style="width:25px" data-src-code="' + result['code'] + '" src="' + result['motif'] + '" alt="' + result['motif'] + '" /> <span class="layer">calque ' + newLayer + '</span></li>');
                $('ul#calques').sortable('refresh');
                $('.ctrlElem').hide();
                $('.selectedElement div.ctrlElem').show();
                $('.selectedElement div.reset_rotate').hide();
                $('.selectedElement').css('z-index', zIndex);
                doDraggable();
                doResizable();
                doRotatable();
                $('#' + result['id']).parent('div').center(true);
            }
        });
    });
    /*$('#textecfg').on('input', function() {
        var textVal = $(this).val();
        if ($('.selectedElement').hasClass('typeText') && textVal != '') {
            var elementChange = $('.selectedElement').find('.elemContent');
            var idCode = elementChange.attr('id');
            var altCode = elementChange.attr('alt');
            var dimensionssel = $('#dimensionssel').val();
            $.ajax({
                type: "POST",
                url: "../rapidpubapp/ajax/plaques_text.php",
                dataType: "json",
                data: {
                    action: 'update',
                    text: textVal,
                    dimensions: dimensionssel,
                    couleur: couleurVar,
                    font: fontName,
                    id: idCode
                },
                success: function(result) {
                    $('.selectedElement').css({
                        'height': 'auto',
                        'width': 'auto'
                    });
                    $('.selectedElement').find('.elemContent').css({
                        'height': 'auto',
                        'width': 'auto'
                    });
                    var newSRC = 'data:image/png;base64,' + result['image'];
                    $('.selectedElement > img.elemContent').attr('src', newSRC).attr('alt', textVal);
                    $('.ctrlElem').hide();
                    $('.selectedElement div.ctrlElem').show();
                    doDraggable();
                    doResizable();
                    doRotatable();
                }
            });
        }
    });*/
    $('.alignmove').click(function() {
        switch ($(this).attr('id')) {
            case 'flip_vertical':
                if ($('.selectedElement .elemContent').hasClass('flipVertical')) $('.selectedElement .elemContent').removeClass('flipVertical');
                else $('.selectedElement .elemContent').addClass('flipVertical');
                break;
            case 'center':
                $('.selectedElement').center(true);
                break;
            case 'move_left':
                $('.selectedElement').css('left', '-=5px')
                break;
            case 'move_right':
                $('.selectedElement').css('left', '+=5px')
                break;
            case 'move_top':
                $('.selectedElement').css('top', '-=5px')
                break;
            case 'move_bottom':
                $('.selectedElement').css('top', '+=5px')
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
    });
    $('#colorpicker1').spectrum({
        flat: true,
        preferredFormat: "hex",
        showInput: true,
        showButtons: false,
        showPalette: true,
        palette: [
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 154, 0)", "rgb(255, 254, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 155, 0)", "rgb(255, 253, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 156, 0)", "rgb(255, 252, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 157, 0)", "rgb(255, 251, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 158, 0)", "rgb(255, 250, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 159, 0)", "rgb(255, 249, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 160, 0)", "rgb(255, 248, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"]
        ]
    }).on("dragstop.spectrum", function(e, c) {
        var color = c.toHexString();
        couleurVar = color;
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
                    fileColor: couleurVar,
                    id: idCode
                },
                success: function(result) {
                    var newSRC = 'data:image/gif;base64,' + result;
                    elementChange.attr('src', newSRC);
                }
            });
        } else if ($('.selectedElement').hasClass('typeText')) {
            var elementChange = $('.selectedElement').find('.elemContent');
            var idCode = elementChange.attr('id');
            var altCode = elementChange.attr('alt');
            var dimensionssel = $('#dimensionssel').val();
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "../rapidpubapp/ajax/plaques_text.php",
                data: {
                    action: 'update',
                    text: altCode,
                    dimensions: dimensionssel,
                    couleur: couleurVar,
                    font: fontName,
                    id: idCode
                },
                success: function(result) {
                    elementChange.attr('src', 'data:image/png;base64,' + result['image']);
                }
            });
        }
    });
    $('#colorpicker2').spectrum({
        flat: true,
        preferredFormat: "hex",
        showInput: true,
        showButtons: false,
        showPalette: true,
        palette: [
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 154, 0)", "rgb(255, 254, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 155, 0)", "rgb(255, 253, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 156, 0)", "rgb(255, 252, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 157, 0)", "rgb(255, 251, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 158, 0)", "rgb(255, 250, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 159, 0)", "rgb(255, 249, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 160, 0)", "rgb(255, 248, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)"]
        ]
    }).on("dragstop.spectrum", function(e, c) {
        var color = c.toHexString();
        $('#plaque_bg').css('background-color', color);
        plaqueColor = color;
    });
    $('#nuancier-element').click(function() {
        $('#colorpicker-element').fadeToggle();
    });
    $('#nuancier-fond').click(function() {
        $('#colorpicker-fond').fadeToggle();
    });
    $('#epaisseur').change(function() {
        var epaisseur = $(this).val();
        var parentWidth = $('#plaque_content').width();
        if ($('#plaque_content #bordure').length == 0) {
            $('#plaque_content').append('<div id="bordure" style="width:100%;height:100%;"><div style="width:100%;height:100%;" id="bordure_interne" style="box-shadow: inset 0 0 0 ' + epaisseur + 'px #000000;"></div></div>');
        } else {
            $('#bordure_interne').css('box-shadow', 'inset 0 0 0 ' + epaisseur + 'px #000000');
        }
    });
    $('#distance').change(function() {
        var distance = $(this).val();
        if ($('#plaque_content #bordure').length != 0) {
            $('#bordure').css('padding', distance + 'px');
        }
    });
});