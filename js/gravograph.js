$(function() {
    var couleurVar = '#000000',
        textColor = '#000000',
        gravographColor = 'transparent',
        colorSet = false,
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
    $.data(document.body, 'typegravograph', false);
    $.data(document.body, 'showColors', false);
    $.data(document.body, 'selfHeight', false);
    $.data(document.body, 'textEdit', false);
    $.data(document.body, 'typegravographVitro', false);
    $("input[type='text']").click(function() {
        $(this).select();
    });
    $('#textmoins').click(function(){
        var textWidth = $('.selectedElement').width(),
            textHeight = $('.selectedElement').height();
        console.log( textWidth + ' - ' + textHeight );
        $('.selectedElement').resizable("resizeTo", { height: textHeight-1, width: textWidth-1 });
    });
    $('#textplus').click(function(){
        var textWidth = $('.selectedElement').width(),
            textHeight = $('.selectedElement').height();
        console.log( textWidth + ' - ' + textHeight );
        $('.selectedElement').resizable("resizeTo", { height: textHeight+1, width: textWidth+1 });
    });
    $('.colorcontainer').click(function(){
        var bgcolor = $(this).attr('data-bgcolor'),
            gcolor = $(this).attr('data-gcolor');
        if (setCfg == false) {
            swal({
                title: "Attention",
                text: "Vous devez saisir les dimensions de votre plaque gravée",
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
        if (colorSet == true) {
            var elemCount = $('#gravograph_content > .elementContainer').length;
            if (elemCount >= 1 && setCfg) {
                $('#gravograph_content > .elementContainer').each(function(){
                    var thisID = $(this).find('.elemContent').attr('id');
                    if ( $(this).hasClass('typeMotif') )
                        var type = 'motif';
                    else if ( $(this).hasClass('typeText') )
                        var type = 'texte';
                    $.ajax({
                        type: "POST",
                        url: "../rapidpubapp/ajax/gravograph_update.php",
                        data: {
                            action: 'update',
                            couleur: gcolor,
                            id: thisID,
                            ratio: $.data(document.body, 'ratioCfg'),
                            type: type
                        },
                        success: function(result) {
                            $('#'+thisID).attr('src', 'data:image/png;base64,'+result);
                        }
                    });
                });
            }
        }
        $('#gravograph_content').css('background-color', bgcolor);
        couleurVar = gcolor;
        textColor = gcolor;
        colorSet = true;
    });
    /*jQuery(window).on('beforeunload', function(){
        return 'Vous perdrez votre travail si vous quittez cette page !';
    }).unload(function(){
        $.ajax({
            type: "POST",
            async: false,
            url: "ajax/saveSession.php"
        });
        /*html2canvas( $( "#gravograph_bg" ), {
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
        });*/
    //});
    $('#drawRect').click(function(e) {
        e.preventDefault();
        var supportWidth = $('#longueur').val();
        var supportHeight = $('#hauteur').val();
        if (setCfg == false) {
            swal({
                title: "Attention",
                text: "Vous devez saisir les dimensions de la zone de décoration de votre gravograph avant de pouvoir continuer !",
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
            url: "../rapidpubapp/ajax/gravograph_forme.php",
            dataType: "json",
            data: {
                action: 'update',
                couleur: '#000000',
                ratio: $.data(document.body, 'ratioCfg'),
                width: supportWidth,
                height: supportHeight,
                vitType: $.data(document.body, 'typegravograph'),
                vitroType: $.data(document.body, 'typegravographVitro'),
                type: 'fond'
            },
            success: function(result) {
                $('.selectedElement').removeClass('selectedElement');
                $('#gravograph_content').append('<div class="elementContainer typeForme resizable draggable rotatable" id="' + result['id'] + '" style="max-height:100%;position:absolute"><div class="reset_rotate ctrlElem" title="Réinitialiser la position de l\'élement"></div><div class="ctrlElem seresizer ui-resizable-handle ui-resizable-se"></div><div class="ctrlElem delete-element" title="Supprimer l\'élément"></div></div>');
                $('#' + result['id']).addClass('selectedElement');
                $('input.elemSize').prop('disabled', false);
                $('.ctrlElem, .imgL, .imgH').hide();
                $('.selectedElement').css({
                    'width': '50%',
                    'height': '20%',
                    'position': 'absolute',
                    'opacity': 0.85
                });
                $('.selectedElement').css('background-color', '#000');
                setTimeout(function() {
                    var maxWidth = $('#gravograph_content').width() - 50;
                    var maxHeight = $('#gravograph_content').height() - 50;
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
                    height: 130
                }, 200);
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
                        url: "http://rapidpub.synapdev.fr/rapidpubapp/ajax/gravograph_size.php",
                        dataType: "json",
                        data: {
                            action: 'getsize',
                            id: result['id'],
                            elemWidth: parseInt($('.selectedElement').css('width'), 10)+2,
                            elemHeight: parseInt($('.selectedElement').css('height'), 10)+2,
                            ratio: $.data(document.body, 'ratioCfg'),
                            vitWidthpx: $('#gravograph_content').width(),
                            vitHeightpx: $('#gravograph_content').height(),
                            vitWidthcm: $('#longueur').val(),
                            vitHeightcm: $('#hauteur').val(),
                            vitType: $.data(document.body, 'typegravograph'),
                            vitroType: $.data(document.body, 'typegravographVitro'),
                            type: 'forme'
                        },
                        success: function(resultx) {
                            //$('#' + result['id']).append('<img class="imgL" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                            $('#' + result['id']).append('<img class="imgL" data-elemSize="' + resultx['longueur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" data-elemSize="' + resultx['hauteur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                            var thiscmHeight = $('#' + result['id']).find('img.imgH').attr('data-elemsize'),
                                thiscmWidth = $('#' + result['id']).find('img.imgL').attr('data-elemsize');
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
            content: "Saisissez les dimensions (longueur/hauteur) de votre plaque gravée en centimètres. Cette étape est importante car elle nous permet de vous proposer un tarif sur mesure",
            target: document.querySelector("#block_right"),
            placement: "left"
        }, {
            title: "Combinaisons de couleurs",
            content: "Sélectionnez les couleurs de votre plaque gravée. La couleur supérieure correspond à la couleur de la plaque, la couleur inférieure à celle de la gravure.",
            target: document.querySelector("#combinaisons"),
            placement: "left"
        }, {
            title: "Texte et police d'écriture",
            content: "Ajoutez des textes sur votre plaque gravée. Cliquez sur Ok ou appuyez sur la touche Entrée de votre clavier pour valider votre saisie.",
            target: document.querySelector("#block_right2"),
            placement: "left"
        }, {
            title: "Taille de l'élément",
            content: "Pour plus de précision, utilisez les boutons + et - pour modifier la taille de l'élément sélectionné (celui entouré de rouge).",
            target: document.querySelector("#textmoins"),
            placement: "bottom"
        }, {
            title: "Pictogrammes",
            content: "Vous pouvez choisir l'un des pictogrammes que nous vous proposons.",
            target: document.querySelector("#motifs_container"),
            placement: "left"
        }, {
            title: "Dessiner une forme",
            content: "Ce bouton sert à dessiner des formes carrés ou rectangulaires sur votre gravograph. Vous pouvez utiliser la combinaison 'MAJ + redimensionnement souris' pour conserver les proportions.",
            target: document.querySelector("#drawRect"),
            placement: "left"
        }, {
            title: "Aligner, déplacer, dupliquer, pivoter...",
            content: "Ces boutons de contrôles vous permettent d'interagir avec l'élement sélectioné (entouré en rouge sur l'aperçu), vous pouvez le déplacer, le centrer sur votre gravograph, le dupliquer ou même le faire pivoter.",
            target: document.querySelector("#block_right4_2"),
            placement: "left"
        }]
    };

    hopscotch.startTour(tour);

    $('#longueur, #hauteur').numeric();
    $('#gravograph_content, #gravograph_bg').click(function(e) {
        e.preventDefault();
        if ($.data(document.body, 'rotatable') == false && $.data(document.body, 'draggable') == false && $.data(document.body, 'resizable') == false) {
            $('.selectedElement div.ctrlElem, .selectedElement .imgL, .selectedElement .imgH').hide();
            $('.selectedElement').removeClass('selectedElement');
            $('input.elemSize').prop('disabled', true).val('');
            $('#colorpicker-element').stop(true).animate({
                height: 0
            }, 200);
            $('#textecfg').val('');
            $('#validSize').hide();
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
            $('#gravograph_content').append(newElem);
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
                    id: thisElemID,
                    type: typeElem,
                    vitType: $.data(document.body, 'typegravograph'),
                    vitroType: $.data(document.body, 'typegravographVitro')
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
                                $('.selectedElement').find('.gravograph_element').attr('id', newid);
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
                        $.post('../rapidpubapp/ajax/elemPrix.php', function(data) {
                            var prixHT = parseFloat(data).toFixed(2);
                            var tva = (Math.round(parseFloat(data)) / 100) * 20;
                            var prixTTC = parseFloat(prixHT) + parseFloat(tva);
                            $('#prix_ht span').html(Number(prixHT).toFixed(2));
                            $('#prix_ttc span').html(Number(prixTTC).toFixed(2));
                        });
                    }
                }
            });
        }
    });
    $('.dimensions_gravograph').keyup(function() {
        var typeSel = $(this).val();
        $('#gravograph_content').show();
        if (isNumber(typeSel)) {
            $.data(document.body, 'vWidth', $('#longueur').val());
            $.data(document.body, 'vHeight', $('#hauteur').val());
            /*var longueur = parseInt($('#longueur').val()),
                hauteur = parseInt($('#hauteur').val());
            if (longueur > hauteur) {
                var ratio = hauteur / longueur;
                $.data(document.body, 'ratioCfg', ratio);
                var newHeight = parseInt(750) * ratio;
                if (newHeight <= 500) $('#gravograph_content').width(750).height(newHeight);
                else $('#gravograph_content').width(500 / ratio).height(500);
            } else if (hauteur > longueur) {
                var ratio = longueur / hauteur;
                $.data(document.body, 'ratioCfg', ratio);
                var newWidth = parseInt(500) * ratio;
                if (newWidth <= 750) $('#gravograph_content').height(500).width(500 * ratio);
                else $('#gravograph_content').height(750 / ratio).width(750);
            } else if (hauteur == longueur) {
                $('#gravograph_content').height(500).width(500);
            }*/
            var cm2pix = '37.79527559055',
                width2pix = $('#longueur').val() * cm2pix,
                height2pix = $('#hauteur').val() * cm2pix;
            $('#gravograph_content').height(height2pix).width(width2pix);
            $('#gravograph_content').center(true);
            if (isNumber($('#longueur').val()) && isNumber($('#hauteur').val())) {
                setCfg = true;
                var vitWidth = $('#gravograph_content').width(),
                    vitHeight = $('#gravograph_content').height();
                $('#gravograph_height').html('<span style="color:#ff0000;font-size:10px;">' + $('#hauteur').val() + '</span>').css('height', vitHeight);
                $('#gravograph_width').html('<span style="color:#ff0000;font-size:10px;">' + $('#longueur').val() + '</span>').css('width', vitWidth);
                var gravographxy = $('#gravograph_content').offset();
                $('#gravograph_width').css({
                    top: -15,
                    left: 0
                });
                $('#gravograph_height').css({
                    top: 0,
                    left: -20
                });
            }
        } else {
            $(this).val('');
            setCfg = false;
            return false;
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
                    motifs: value,
                    ratio: $.data(document.body, 'ratioCfg'),
                    vitType: $.data(document.body, 'typegravograph'),
                    vitroType: $.data(document.body, 'typegravographVitro')
                },
                success: function(result) {
                    theme = value;
                    $('#motifs_container').html('');
                    $.each(result, function(i, item) {
                        $('#motifs_container').append('<div title="Ajouter un motif sur votre gravograph" class="motif" id="' + item['code'] + '" style="background-size:100%;background-image: url(' + item['path'] + ');"></div>');
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
                var elemWidth = $('.selectedElement').width()+2;
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "../rapidpubapp/ajax/gravograph_text.php",
                    data: {
                        action: 'update',
                        text: encodeURIComponent(altCode),
                        couleur: couleurVar,
                        font: fontName,
                        id: idCode,
                        vitType: $.data(document.body, 'typegravograph'),
                        vitroType: $.data(document.body, 'typegravographVitro'),
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
                                url: "../rapidpubapp/ajax/gravograph_size.php",
                                dataType: "json",
                                data: {
                                    action: 'getsize',
                                    id: idCode,
                                    elemWidth: parseInt($('.selectedElement').css('width'), 10)+2,
                                    elemHeight: parseInt($('.selectedElement').css('height'), 10)+2,
                                    ratio: $.data(document.body, 'ratioCfg'),
                                    vitWidthpx: $('#gravograph_content').width(),
                                    vitHeightpx: $('#gravograph_content').height(),
                                    vitWidthcm: $('#longueur').val(),
                                    vitHeightcm: $('#hauteur').val(),
                                    vitType: $.data(document.body, 'typegravograph'),
                                    vitroType: $.data(document.body, 'typegravographVitro'),
                                    type: 'text'
                                },
                                success: function(resultx) {
                                    $('#' + idCode).parent('div.elementContainer').children('.imgL, .imgH').remove();
                                    //$('#' + idCode).parent('div.elementContainer').append('<img class="imgL" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                                    $('#' + idCode).parent('div.elementContainer').append('<img class="imgL" data-elemSize="' + resultx['longueur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" data-elemSize="' + resultx['hauteur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                                    var thiscmHeight = $('#' + idCode).parent('div.elementContainer').find('img.imgH').attr('data-elemsize'),
                                        thiscmWidth = $('#' + idCode).parent('div.elementContainer').find('img.imgL').attr('data-elemsize');
                                    $('#' + idCode).parent('div.elementContainer').attr('elemratio', resultx['elemRatio']);
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
            $.data(document.body, 'currentID', $(this).find('.gravograph_element').attr('id'));
            var attrVal = $(this).find('.elemContent').attr('alt');
            $('#textecfg').val(attrVal).focus();
            $('#colorpicker-element').stop(true).animate({
                height: 130
            }, 200);
        } else if ($(this).hasClass('typeMotif')) {
            $.data(document.body, 'currentID', $(this).find('.gravograph_element').attr('id'));
            $('#textecfg').val('');
            $('#colorpicker-element').stop(true).animate({
                height: 130
            }, 200);
        } else if ($(this).hasClass('typeImage')) {
            $.data(document.body, 'currentID', $(this).find('.gravograph_element').attr('id'));
            $('#textecfg').val('');
            $('#colorpicker-element').stop(true).animate({
                height: 0
            }, 200);
        } else if ($(this).hasClass('typeFond') || $(this).hasClass('typeForme')) {
            $.data(document.body, 'currentID', $(this).attr('id'));
            $('#textecfg').val('');
            $('#colorpicker-element').stop(true).animate({
                height: 130
            }, 200);
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
                    typedel: type,
                    id: attrID,
                    vitType: $.data(document.body, 'typegravograph'),
                    vitroType: $.data(document.body, 'typegravographVitro')
                },
                success: function(result) {
                    elemSel.parent('div').remove();
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
        var elemCount = $('#gravograph_content > .elementContainer').length;
        if (elemCount >= 1 && setCfg) {
            swal({
                title: "Attention",
                text: "Vous perdrez votre travail si vous changez les dimensions de la gravograph et vous devrez recommencer votre création",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Recommencer",
                cancelButtonText: "Annuler",
                closeOnConfirm: true,
                closeOnCancel: true
            }, function(isConfirm) {
                if (isConfirm) {
                    $('#calques > li').remove();
                    $('#gravograph_content .elementContainer').remove();
                    $.post('../rapidpubapp/ajax/reset.php', function(data) {
                        $('#prix_ht span').html('0.00');
                        $('#prix_ttc span').html('0.00');
                    });
                    nbrElements = 0;
                    $.data(document.body, 'vWidth', 0);
                    $.data(document.body, 'vHeight', 0);
                    return false;
                } else {
                    $('#longueur').val($.data(document.body, 'vWidth'));
                    $('#hauteur').val($.data(document.body, 'vHeight'));
                    return false;
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
        var parentSize = $('#gravograph_content').css('width');
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
                text: "Vous devez saisir les dimensions de la zone de décoration de votre gravograph avant de pouvoir continuer !",
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
            var selElemWidth = $('.selectedElement').width()+2;
            var selElemHeight = $('.selectedElement').height()+2;
            if ($('.selectedElement').hasClass('typeText')) {
                $.data(document.body, 'textEdit', true);
                couleurVar = $('.selectedElement').find('img.elemContent').attr('data-ccode');
            }
            $.ajax({
                type: "POST",
                url: "../rapidpubapp/ajax/gravograph_text.php",
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
                    vitType: $.data(document.body, 'typegravograph'),
                    vitroType: $.data(document.body, 'typegravographVitro')
                },
                success: function(result) {
                    if ($('.selectedElement').hasClass('typeText')) {
                        var selHeight = $('.selectedElement').height();
                        $.data(document.body, 'selfHeight', selHeight);
                        $('.selectedElement').find('.delete-element').trigger('click');
                        $.data(document.body, 'showColors', true);
                    }
                    $('.selectedElement').removeClass('selectedElement');
                    $('#gravograph_content').append('<div class="elementContainer typeText resizable draggable rotatable" style="position:absolute"><div class="reset_rotate ctrlElem" title="Réinitialiser la position de l\'élement"></div><img class="gravograph_element elemContent" src="data:image/png;base64,' + result['image'] + '" data-ccode="' + couleurVar + '" alt="' + result['text'] + '" id="' + result['id'] + '" /><div class="ctrlElem seresizer ui-resizable-handle ui-resizable-se"></div><div class="delete-element ctrlElem" title="Supprimer l\'élément"></div></div>');
                    $('#colorpicker-element').stop(true).animate({
                        height: 130
                    }, 200);
                    $('#' + result['id']).parent('div').addClass('selectedElement');
                    $('input.elemSize').prop('disabled', false);
                    setTimeout(function() {
                        var maxWidth = $('#gravograph_content').width() - 50;
                        var maxHeight = $('#gravograph_content').height() - 50;
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
                            url: "../rapidpubapp/ajax/gravograph_size.php",
                            dataType: "json",
                            data: {
                                action: 'getsize',
                                id: result['id'],
                                elemWidth: $('.selectedElement').width()+2,
                                elemHeight: $('.selectedElement').height()+2,
                                ratio: $.data(document.body, 'ratioCfg'),
                                vitWidthpx: $('#gravograph_content').width(),
                                vitHeightpx: $('#gravograph_content').height(),
                                vitWidthcm: $('#longueur').val(),
                                vitHeightcm: $('#hauteur').val(),
                                vitType: $.data(document.body, 'typegravograph'),
                                vitroType: $.data(document.body, 'typegravographVitro'),
                                type: 'text'
                            },
                            success: function(resultx) {
                                $.data(document.body, 'currentID', result['id']);
                                //$('#' + result['id']).parent('div.elementContainer').append('<img class="imgL" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                                $('#' + result['id']).parent('div.elementContainer').attr('elemratio', resultx['elemRatio']);
                                $('#' + result['id']).parent('div.elementContainer').append('<img class="imgL" data-elemSize="' + resultx['longueur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" data-elemSize="' + resultx['hauteur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                                var thiscmHeight = $('#' + result['id']).parent('div.elementContainer').find('img.imgH').attr('data-elemsize'),
                                    thiscmWidth = $('#' + result['id']).parent('div.elementContainer').find('img.imgL').attr('data-elemsize');
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
                text: "Vous devez saisir les dimensions de la zone de décoration de votre gravograph avant de pouvoir continuer !",
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
            url: "../rapidpubapp/ajax/gravograph_motif.php",
            dataType: "json",
            data: {
                action: 'update',
                motif: motifUrl,
                folder: theme,
                couleur: couleurVar,
                ratio: $.data(document.body, 'ratioCfg'),
                width: supportWidth,
                height: supportHeight,
                vitType: $.data(document.body, 'typegravograph'),
                vitroType: $.data(document.body, 'typegravographVitro')
            },
            success: function(result) {
                $('.selectedElement').removeClass('selectedElement');
                $('#gravograph_content').append('<div class="elementContainer typeMotif resizable draggable rotatable" style="position:absolute"><div class="reset_rotate ctrlElem" title="Réinitialiser la position de l\'élement"></div><img class="elemContent gravograph_element" data-src-code="' + result['code'] + '" src="data:image/png;base64,' + result['imgMotif'] + '" alt="' + result['motif'] + '" id="' + result['id'] + '" /><div class="ctrlElem seresizer ui-resizable-handle ui-resizable-se"></div><div class="ctrlElem delete-element" title="Supprimer l\'élément"></div></div>');
                $('#' + result['id']).parent('div').addClass('selectedElement');
                $('input.elemSize').prop('disabled', false);
                setTimeout(function() {
                    var maxWidth = $('#gravograph_content').width() - 50;
                    var maxHeight = $('#gravograph_content').height() - 50;
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
                    height: 130
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
                        url: "http://rapidpub.synapdev.fr/rapidpubapp/ajax/gravograph_size.php",
                        dataType: "json",
                        data: {
                            action: 'getsize',
                            id: result['id'],
                            elemWidth: parseInt($('.selectedElement').css('width'), 10)+2,
                            elemHeight: parseInt($('.selectedElement').css('height'), 10)+2,
                            ratio: $.data(document.body, 'ratioCfg'),
                            vitWidthpx: $('#gravograph_content').width(),
                            vitHeightpx: $('#gravograph_content').height(),
                            vitWidthcm: $('#longueur').val(),
                            vitHeightcm: $('#hauteur').val(),
                            vitType: $.data(document.body, 'typegravograph'),
                            vitroType: $.data(document.body, 'typegravographVitro'),
                            type: 'motif'
                        },
                        success: function(resultx) {
                            //$('#' + result['id']).parent('div.elementContainer').append('<img class="imgL" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                            $('#' + result['id']).parent('div.elementContainer').append('<img class="imgL" data-elemSize="' + resultx['longueur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" data-elemSize="' + resultx['hauteur'] + '" style="' + ((!showDim) ? 'display:none;' : 'display:block;') + 'position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                            var thiscmHeight = $('#' + result['id']).parent('div.elementContainer').find('img.imgH').attr('data-elemsize'),
                                thiscmWidth = $('#' + result['id']).parent('div.elementContainer').find('img.imgL').attr('data-elemsize');
                            $('#' + result['id']).parent('div.elementContainer').attr('elemratio', resultx['elemRatio']);
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
        });
    });
    $(document).keydown(function(e) {
        if ($('.selectedElement')[0]) {
            var elemZ = $('.selectedElement'),
                parentZ = $('#gravograph_content'),
                elemPosition = elemZ.position(),
                parentPosition = parentZ.position(),
                elemWidth = elemZ.width()+2,
                elemHeight = elemZ.height()+2,
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
                                typedel: type,
                                id: attrID,
                                vitType: $.data(document.body, 'typegravograph'),
                                vitroType: $.data(document.body, 'typegravographVitro')
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
                    break;
                default:
                    return;
            }
            e.preventDefault();
        }
    });
    var editSize;
    /**
        Edition
    **/
    $('#validSize').click(function() {
        $('#validSize').hide();
        $('#elem_height, #elem_width').attr('disabled', false);
        var thisID = editSize,
            parentWidth = $('#gravograph_content').height()-10,
            parentHeight = $('#gravograph_content').width()-10,
            elemWidth = parseInt($('.selectedElement').css('width'), 10)+2,
            elemHeight = parseInt($('.selectedElement').css('height'), 10)+2,
            elemRatio = $('.selectedElement').attr('elemratio'),
            elemWidthCm = $('.selectedElement').find('.imgL').data('elemsize'),
            elemHeightCm = $('.selectedElement').find('.imgH').data('elemsize'),
            thisVal = $('#' + editSize).val();
        if (isNumber(thisVal)) {
            if (thisID == 'elem_width' && thisVal < parentWidth) {
                if (thisVal > elemWidthCm) {
                    var Ratio = elemWidthCm / thisVal;
                    var newHeightCm = elemHeightCm / Ratio;
                    var newHeight = elemHeight / Ratio;
                } else {
                    var Ratio = thisVal / elemWidthCm;
                    var newHeightCm = elemHeightCm * Ratio;
                    var newHeight = elemHeight * Ratio;
                }
                if (newHeight > parentHeight) return false;
                $('.selectedElement, .selectedElement > .elemContent').height(newHeight).width('auto');
            } else if (thisID == 'elem_height' && thisVal < parentHeight) {
                if (thisVal > elemHeightCm) {
                    var Ratio = elemHeightCm / thisVal;
                    var newWidthCm = elemWidthCm / Ratio;
                    var newWidth = elemWidth / Ratio;
                } else {
                    var Ratio = thisVal / elemHeightCm;
                    var newWidthCm = elemWidthCm * Ratio;
                    var newWidth = elemWidth * Ratio;
                }
                if (newWidth > parentWidth) return false;
                $('.selectedElement, .selectedElement > .elemContent').width(newWidth).height('auto');
            } else {
                return false;
            }
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
                /** Text Size **/
                $.ajax({
                    type: "POST",
                    url: "../rapidpubapp/ajax/gravograph_size.php",
                    dataType: "json",
                    data: {
                        action: 'getsize',
                        id: $.data(document.body, 'currentID'),
                        elemWidth: $('.selectedElement').width()+2,
                        elemHeight: $('.selectedElement').height()+2,
                        ratio: $.data(document.body, 'ratioCfg'),
                        vitWidthpx: $('#gravograph_content').width(),
                        vitHeightpx: $('#gravograph_content').height(),
                        vitWidthcm: $('#longueur').val(),
                        vitHeightcm: $('#hauteur').val(),
                        vitType: $.data(document.body, 'typegravograph'),
                        vitroType: $.data(document.body, 'typegravographVitro'),
                        type: elemType
                    },
                    success: function(resultx) {
                        $('.selectedElement > .imgH, .selectedElement > .imgL').remove();
                        //$('.selectedElement').append( '<img class="imgL" style="position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" style="position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />' );
                        $('.selectedElement').append('<img class="imgL" data-elemSize="' + resultx['longueur'] + '" style="position: absolute;bottom: -20px;left: 0;" src="data:image/png;base64,' + resultx['imgL'] + '" style="" /><img class="imgH" data-elemSize="' + resultx['hauteur'] + '" style="position: absolute;bottom: 0;left: -25px;" src="data:image/png;base64,' + resultx['imgH'] + '" style="" />');
                        $('.selectedElement').attr('elemratio', resultx['elemRatio']);
                        $('#elem_width').val(resultx['newWidth']);
                        $('#elem_height').val(resultx['newHeight']);
                        $.post('../rapidpubapp/ajax/elemPrix.php', function(data) {
                            var prixHT = parseFloat(data).toFixed(2);
                            var tva = (Math.round(parseFloat(data)) / 100) * 20;
                            var prixTTC = parseFloat(prixHT) + parseFloat(tva);
                            $('#prix_ht span').html(Number(prixHT).toFixed(2));
                            $('#prix_ttc span').html(Number(prixTTC).toFixed(2));
                        });
                    }
                });
            }, 10);
        }
    });
    $('.elemSize').click(function() {
        $('#validSize').show();
        var thisID = $(this).attr('id');
        editSize = thisID;
        if (thisID == 'elem_width') {
            $('#elem_width').attr('disabled', false);
            $('#elem_height').attr('disabled', true);
        } else {
            $('#elem_height').attr('disabled', false);
            $('#elem_width').attr('disabled', true);
        }
    });
    $('.alignmove').repeatedclick(function(e) {
        e.preventDefault();
        var elemZ = $('.selectedElement'),
            parentZ = $('#gravograph_content'),
            elemPosition = elemZ.position(),
            parentPosition = parentZ.position(),
            elemWidth = elemZ.width()+2,
            elemHeight = elemZ.height()+2,
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
                    fileColor: color,
                    id: idCode,
                    ratio: $.data(document.body, 'ratioCfg'),
                    width: supportWidth,
                    height: supportHeight,
                    vitType: $.data(document.body, 'typegravograph'),
                    vitroType: $.data(document.body, 'typegravographVitro')
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
            $('.selectedElement').find('img.elemContent').attr('data-ccode', color);
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "../rapidpubapp/ajax/gravograph_text.php",
                data: {
                    action: 'update',
                    text: encodeURIComponent(altCode),
                    dimensions: dimensionssel,
                    couleur: color,
                    font: fontName,
                    id: idCode,
                    ratio: $.data(document.body, 'ratioCfg'),
                    width: supportWidth,
                    height: supportHeight,
                    vitType: $.data(document.body, 'typegravograph'),
                    vitroType: $.data(document.body, 'typegravographVitro')
                },
                success: function(result) {
                    elementChange.attr('src', 'data:image/png;base64,' + result['image']);
                }
            });
        } else if ($('.selectedElement').hasClass('typeFond')) {
            var elementChange = $('.selectedElement');
            var idCode = elementChange.attr('id');
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "../rapidpubapp/ajax/gravograph_fond.php",
                data: {
                    action: 'update',
                    couleur: color,
                    type: 'fond',
                    id: idCode,
                    ratio: $.data(document.body, 'ratioCfg'),
                    width: supportWidth,
                    height: supportHeight,
                    vitType: $.data(document.body, 'typegravograph'),
                    vitroType: $.data(document.body, 'typegravographVitro')
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
                url: "../rapidpubapp/ajax/gravograph_forme.php",
                data: {
                    action: 'update',
                    couleur: color,
                    type: 'forme',
                    id: idCode,
                    ratio: $.data(document.body, 'ratioCfg'),
                    width: supportWidth,
                    height: supportHeight,
                    vitType: $.data(document.body, 'typegravograph'),
                    vitroType: $.data(document.body, 'typegravographVitro')
                },
                success: function(result) {
                    $('.selectedElement').css('background-color', color);
                }
            });
        }
    });
    $('#epaisseur').change(function() {
        var epaisseur = $(this).val();
        var parentWidth = $('#gravograph_content').width();
        if ($('#gravograph_content #bordure').length == 0) {
            $('#gravograph_content').append('<div id="bordure" style="width:100%;height:100%;"><div style="width:100%;height:100%;" id="bordure_interne" style="box-shadow: inset 0 0 0 ' + epaisseur + 'px #000000;"></div></div>');
        } else {
            $('#bordure_interne').css('box-shadow', 'inset 0 0 0 ' + epaisseur + 'px #000000');
        }
    });
    $('#distance').change(function() {
        var distance = $(this).val();
        if ($('#gravograph_content #bordure').length != 0) {
            $('#bordure').css('padding', distance + 'px');
        }
    });
});