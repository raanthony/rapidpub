$(function() {

    var couleurVar = '#000000',

        textColor = '#000000',

        plaqueColor = 'transparent',

        setCfg = false,

        zIndex = 2,

        fixation = null,

        selected = null,

        dwnloading = false,

        setcolorHeight = 0,

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

    $.data(document.body, 'typeplaque', false);

    $.data(document.body, 'showColors', false);

    $.data(document.body, 'colorSetting', false);

    $.data(document.body, 'imgDl', false);

    $.data(document.body, 'selfHeight', false);

    $.data(document.body, 'textEdit', false);

    $.data(document.body, 'typeplaqueVitro', false);

    $.data(document.body, 'matierePlaque', false);

    $.data(document.body, 'matiereVal', false);

    $.data(document.body, 'taillePlaque', 1);

    $.data(document.body, 'firstElem', false);

    $.data(document.body, 'epaisseur', 3);

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

    $( '.epaisseur' ).iCheck({

        checkboxClass: 'icheckbox_flat',

        radioClass: 'iradio_flat-red'

    });

    $( 'input' ).on('ifChecked', function(event){

        var epaisseur = $(this).attr('data-epaisseur');

        $.data(document.body, 'epaisseur', epaisseur);

        $.post( "ajax/updateThickness.php", { thickness: epaisseur } );



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

        if ($('#plaque_content #bordure').length != 0 && isNumber(distance) && distance >= 0) {

            /*var maxWidth = $('#plaque_content').width();

            var maxHeight = $('#plaque_content').height();

            var bordureWidth = $('#bordure').width();

            var bordureHeight = $('#bordure').width();

            $('#bordure').css({'width': bordureWidth-distance, 'height': bordureHeight-distance}).center(true);*/

        }

    });

    $('#matiere').ddlist({

        width: 200,

        onSelected: function(index, value, text) {

            var thisVal = value;

            var elemCount = $('#plaque_content .elementContainer').length;

            if (thisVal == '') return false;
            console.log("content length matiere change : "+ elemCount);
            if (elemCount >= 1) {

                swal({

                    title: "Attention",

                    text: "Vous perdrez votre travail si vous changez la matière de votre plaque et vous devrez recommencer votre création",

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

                        $('#plaque_content .elementContainer').remove();

                        $.post('../rapidpubapp/ajax/reset.php', function(data) {

                            $('#prix_ht span').html('0.00');

                            $('#prix_ttc span').html('0.00');

                        });

                        nbrElements = 0;

                        $('#matiere').ddlist('select', { value: $.data(document.body, 'matiereVal') });

                        $('#matiere').ddlist('select', { value: thisVal });

                        return false;

                    } else {

                        $('#matiere').ddlist('select', { value: $.data(document.body, 'matiereVal') });

                        return false;

                    }

                });

                return false;

            }

            $.data(document.body, 'matiereVal', thisVal);
            console.log("id plaque : " + value);
            switch(value){

                case '1':

                    $('#plaque_content').css({'backgroundColor': 'transparent', 'backgroundImage': 'url(img/alu-brosse.jpg)'});

                    $('#showcolorpicker2, #hidecolorpicker1').hide();

                    $('#hidecolorpicker2, #showcolorpicker1').show();

                    $('#apercu_content').css('background-color', '#fff');

                    $.data(document.body, 'matierePlaque', false);

                    $.data(document.body, 'imgDl', false);

                    $('#colorpicker-element').stop(true).animate({height: 0}, 200);

                    $('#plaque_bg').css({'backgroundColor': 'transparent', 'backgroundImage': 'none', 'padding': 0});

                    $('.epaisseur').slideUp();

                    $('#fix1,#adhesifs').show(); $('#fix2').hide(); $('#fix1').click();

                    $('#color40').hide(100, function(){

                        setcolorHeight = 130;

                        $('#elemColor').hide();

                        $('#color60').show();

                    });

                    couleurVar = '#000';

                    textColor = '#000';



                break;

                case '2':

                    $('#plaque_content').css({'backgroundColor': 'transparent', 'backgroundImage': 'url(img/laiton-brosse.png)'});

                    $('#showcolorpicker2, #showcolorpicker1').hide();

                    $('#hidecolorpicker2, #hidecolorpicker1').show();

                    $('#apercu_content').css('background-color', '#fff');

                    $.data(document.body, 'matierePlaque', false);

                    $.data(document.body, 'imgDl', false);

                    $('#colorpicker-element').stop(true).animate({height: 0}, 200);

                    $('#plaque_bg').css({'backgroundColor': 'transparent', 'backgroundImage': 'none', 'padding': 0});

                    $('.epaisseur').slideUp();

                    $('#fix1').hide(); $('#fix2').show(); $('#fix2').click();

                    $('#black-col').show(); $('#gold-col, #white-col').hide();

                    $('#color60').hide(100, function(){

                        setcolorHeight = 205;

                        $('#elemColor').show();

                        $('#color40').show();

                    });

                    couleurVar = '#000';

                    textColor = '#000';

                break;

                case '3':

                    $.data(document.body, 'matierePlaque', 'plexi');

                    var taille = $.data(document.body, 'taillePlaque');
                    /** to disable fond couleur **/ 
                    $('#showcolorpicker2, #hidecolorpicker1').hide();  

                    $('#hidecolorpicker2, #showcolorpicker1').show();   
                    /** to disable fond couleur **/

                    $('#plaque_content').css({'backgroundColor': 'transparent', 'backgroundImage': 'url(img/plexi-' + taille + '.png)'});

                    $('#apercu_content').css('background-color', '#fff');

                    $.data(document.body, 'imgDl', true);

                    $('#colorpicker-element').stop(true).animate({height: 0}, 200);

                    $('#plaque_bg').css({'backgroundColor': 'transparent', 'backgroundImage': 'none', 'padding': 0});

                    $('.epaisseur').slideDown();

                    $('#fix1,#fix2').show(); $('#adhesifs').hide(); $('#fix1').click();

                    $('#color60').hide(100, function(){

                        setcolorHeight = 205;

                        $('#elemColor').show();

                        $('#color40').show();

                    });

                    couleurVar = '#000';

                    textColor = '#000';

                break;

                case '6':
                
                     /** to disable fond couleur **/ 
                    $('#showcolorpicker2, #hidecolorpicker1').hide();  

                    $('#hidecolorpicker2, #showcolorpicker1').show();   
                    /** to disable fond couleur **/

                    $('#plaque_content').css({'backgroundColor': 'transparent', 'backgroundImage': 'url(img/depoli-argent.jpg)'});

                    $('#apercu_content').css('background-color', '#fff');

                    $.data(document.body, 'imgDl', false);

                    $('#colorpicker-element').stop(true).animate({height: 0}, 200);

                    $('#plaque_bg').css({'backgroundColor': 'transparent', 'backgroundImage': 'none', 'padding': 0});

                    $('.epaisseur').slideDown();

                    $('#fix1,#fix2,#adhesifs').show(); $('#fix1').click();

                    $('#color60').hide(100, function(){

                        setcolorHeight = 205;

                        $('#elemColor').show();

                        $('#color40').show();

                    });

                    couleurVar = '#000';

                    textColor = '#000';

                break;

                case '7':

                    $('#showcolorpicker2, #showcolorpicker1').show();

                    $('#hidecolorpicker2, #hidecolorpicker1').hide();

                    $('#plaque_content').css({'backgroundColor': '#fff', 'backgroundImage': 'none'});

                    $('#apercu_content').css('background-color', '#565656');

                    $.data(document.body, 'imgDl', true);

                    $('#colorpicker-element').stop(true).animate({height: 0}, 200);

                    $('#plaque_bg').css({'backgroundColor': 'transparent', 'backgroundImage': 'none', 'padding': 0});

                    $('.epaisseur').slideUp();

                    $('#fix1,#fix2,#adhesifs').hide(); $('#aucune').click();

                    $('#color60').hide(100, function(){

                        setcolorHeight = 205;

                        $('#elemColor').show();

                        $('#color40').show();

                    });

                    couleurVar = '#000';

                    textColor = '#000';

                break;

                case '8':

                    $('#showcolorpicker2, #hidecolorpicker1').hide();

                    $('#hidecolorpicker2, #showcolorpicker1').show();

                    $('#plaque_content').css({'backgroundColor': 'transparent', 'backgroundImage': 'url(img/plaque-inox.jpg)'});

                    $('#apercu_content').css('background-color', '#fff');

                    $.data(document.body, 'matierePlaque', false);

                    $.data(document.body, 'imgDl', false);

                    $('#colorpicker-element').stop(true).animate({height: 0}, 200);

                    $('#plaque_bg').css({'backgroundColor': 'transparent', 'backgroundImage': 'none', 'padding': 0});

                    $('.epaisseur').slideUp();

                    $('#fix1,#aucune,#adhesifs').show(); $('#fix2').hide(); $('#fix1').click();

                    $('#color60').hide(100, function(){

                        setcolorHeight = 205;

                        $('#elemColor').show();

                        $('#color40').show();

                    });

                    couleurVar = '#000';

                    textColor = '#000';

                break;

                case '9':

                    $('#showcolorpicker2, #hidecolorpicker1').hide();

                    $('#hidecolorpicker2, #showcolorpicker1').show();

                    $('#plaque_content').css({'backgroundColor': 'transparent', 'backgroundImage': 'url(img/plaque-inox-brosse.jpg)'});

                    $('#apercu_content').css('background-color', '#fff');

                    $.data(document.body, 'matierePlaque', false);

                    $.data(document.body, 'imgDl', false);

                    $('#colorpicker-element').stop(true).animate({height: 0}, 200);

                    $('#plaque_bg').css({'backgroundColor': 'transparent', 'backgroundImage': 'none', 'padding': 0});

                    $('.epaisseur').slideUp();

                    $('#fix1,#aucune,#adhesifs').show(); $('#fix2').hide(); $('#fix1').click();

                    $('#color60').hide(100, function(){

                        setcolorHeight = 205;

                        $('#elemColor').show();

                        $('#color40').show();

                    });

                    couleurVar = '#000';

                    textColor = '#000';

                break;

                case '12':

                    /*
                     $('#showcolorpicker2, #showcolorpicker1').show();

                     $('#hidecolorpicker2, #hidecolorpicker1').hide();
                     */
                    $('#showcolorpicker2, #showcolorpicker1').hide();

                    $('#hidecolorpicker2, #hidecolorpicker1').show();

                    $('#plaque_content').css({'backgroundColor': 'transparent', 'backgroundImage': 'url(img/depoli-or.jpg)'});

                    $('#apercu_content').css('background-color', '#fff');

                    $.data(document.body, 'imgDl', false);

                    $('#colorpicker-element').stop(true).animate({height: 0}, 200);

                    $('#plaque_bg').css({'backgroundColor': 'transparent', 'backgroundImage': 'none', 'padding': 0});

                    $('.epaisseur').slideDown();

                    $('#fix1,#fix2,#adhesifs').show(); $('#fix2').click();

                    $('#color60').hide(100, function(){

                        setcolorHeight = 205;

                        $('#elemColor').show();

                        $('#color40').show();

                    });

                    couleurVar = '#000';

                    textColor = '#000';

                break;

                case '13':

                    $('#showcolorpicker2, #showcolorpicker1').hide();

                    $('#hidecolorpicker2, #hidecolorpicker1').show();

                    $('#plaque_content').css({'backgroundColor': '#000', 'backgroundImage': 'none'});

                    $('#apercu_content').css('background-color', '#fff');

                    $.data(document.body, 'imgDl', false);

                    $('#colorpicker-element').stop(true).animate({height: 0}, 200);

                    $('#plaque_bg').css({'backgroundColor': 'transparent', 'backgroundImage': 'none', 'padding': 0});

                    $('.epaisseur').slideUp();

                    $('#fix1,#fix2,#adhesifs').show(); $('#fix1').click();

                    $('#gold-col, #white-col').show(); $('#black-col').hide();

                    $('#color60').hide(100, function(){

                        setcolorHeight = 205;

                        $('#elemColor').show();

                        $('#color40').show();

                    });

                    couleurVar = '#d5b36a';

                    textColor = '#d5b36a';

                break;

                case '14':

                    $('#showcolorpicker2, #showcolorpicker1').hide();

                    $('#hidecolorpicker2, #hidecolorpicker1').show();

                    $('#plaque_content').css({'backgroundColor': '#d5b36a', 'backgroundImage': 'none'});

                    $('#apercu_content').css('background-color', '#fff');

                    $.data(document.body, 'imgDl', false);

                    $('#colorpicker-element').stop(true).animate({height: 0}, 200);

                    $('#plaque_bg').css({'backgroundColor': 'transparent', 'backgroundImage': 'none', 'padding': 0});

                    $('.epaisseur').slideUp();

                    $('#fix1,#fix2,#adhesifs').show(); $('#fix2').click();

                    $('#black-col').show(); $('#gold-col, #white-col').hide();

                    $('#color60').hide(100, function(){

                        setcolorHeight = 205;

                        $('#elemColor').show();

                        $('#color40').show();

                    });

                    couleurVar = '#000';

                    textColor = '#000';

                break;

                case '15':

                    var taille = $.data(document.body, 'taillePlaque');

                    $('#showcolorpicker2, #hidecolorpicker1').hide();

                    $('#hidecolorpicker2, #showcolorpicker1').show();

                    $('#plaque_content').css({'backgroundColor': 'transparent', 'backgroundImage': 'url(img/plexi-' + taille + '.png)'});

                    $('#plaque_bg').css({'backgroundColor': 'transparent', 'backgroundImage': 'url(img/double-plaques-or-brosse.jpg)', 'padding': '3px'});

                    $('#apercu_content').css('background-color', '#fff');

                    $.data(document.body, 'imgDl', false);

                    $('#colorpicker-element').stop(true).animate({height: 0}, 200);

                    $('.epaisseur').slideDown();

                    $('#fix1,#fix2,#adhesifs').show(); $('#fix2').click();

                    $('#color60').hide(100, function(){

                        setcolorHeight = 205;

                        $('#elemColor').show();

                        $('#color40').show();

                    });

                    couleurVar = '#000';

                    textColor = '#000';

                break;

                case '16':

                    var taille = $.data(document.body, 'taillePlaque');

                    $('#showcolorpicker2, #hidecolorpicker1').hide();

                    $('#hidecolorpicker2, #showcolorpicker1').show();

                    $('#plaque_content').css({'backgroundColor': 'transparent', 'backgroundImage': 'url(img/plexi-' + taille + '.png)'});

                    $('#plaque_bg').css({'backgroundColor': 'transparent', 'backgroundImage': 'url(img/double-plaques-alu-brosse.jpg)', 'padding': '3px'});

                    $('#apercu_content').css('background-color', '#fff');

                    $.data(document.body, 'imgDl', false);

                    $('#colorpicker-element').stop(true).animate({height: 0}, 200);

                    $('.epaisseur').slideDown();

                    $('#fix1,#fix2,#adhesifs').show(); $('#fix1').click();

                    $('#color60').hide(100, function(){

                        setcolorHeight = 205;

                        $('#elemColor').show();

                        $('#color40').show();

                    });

                    couleurVar = '#000';

                    textColor = '#000';

                break;

                default: 

                    $('#plaque_content').css("background-image", "transparent");

                    $('#colorpicker-element').stop(true).animate({height: 0}, 200);

                    $('#plaque_bg').css({'backgroundColor': 'transparent', 'backgroundImage': 'none', 'padding': 0});

                    $('#apercu_content').css('background-color', '#fff');

                    if( value == 17 ){
                        $('.epaisseur').slideDown();
                    }else{
                        $('.epaisseur').slideUp();
                    }

                    $('#fix1,#fix2,#adhesifs').show(); $('#fix1').click();

                    $('#color60').hide(100, function(){

                        setcolorHeight = 205;

                        $('#elemColor').show();

                        $('#color40').show();

                    });

                    couleurVar = '#000';

                    textColor = '#000';

            }

        }

    });

    $('#dimensionssel').ddlist({

        width: 125,

        onSelected: function(index, value, text) {

            if (value == '') return false;

            var elemCount = $('#plaque_content .elementContainer').length;
            console.log("content length dimension change : "+ elemCount);
            if (elemCount >= 1) {

                swal({

                    title: "Attention",

                    text: "Vous perdrez votre travail si vous changez les dimensions de votre plaque et vous devrez recommencer votre création",

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

                        $('#plaque_content .elementContainer').remove();

                        $.post('../rapidpubapp/ajax/reset.php', function(data) {

                            $('#prix_ht span').html('0.00');

                            $('#prix_ttc span').html('0.00');

                        });

                        nbrElements = 0;

                        return false;

                    } else {

                        return false;

                    }
                });
                /** stop ajax **/
                return false;
            }

            $.data(document.body, 'taillePlaque', value);

            if( $.data(document.body, 'matierePlaque') == 'plexi' ) {

                $('#plaque_content').css("background-image", "url(img/plexi-" + value + ".png)");

            }
            
            $.ajax({

                type: "POST",

                dataType: "json",

                url: "../rapidpubapp/ajax/plaquespro_tailles.php",

                data: {

                    id: value,

                    size: $.data(document.body, 'taillePlaque'),

                },

                success: function(result) {

                    $('#prix_ht span').html(result['prix']);

                    $('#prix_constate').html(result['prix_constate']);

                    var eSize = result['dimensions'].split('x');

                    var elongueur = eSize[0],

                        ehauteur = eSize[1];

                    if (elongueur > ehauteur) {

                        var ratio = ehauteur / elongueur;

                        $.data(document.body, 'ratioCfg', ratio);

                        var newHeight = parseInt(750) * ratio;

                        if (newHeight <= 500) $('#plaque_bg, #plaque_content').width(750).height(newHeight);

                        else $('#plaque_bg, #plaque_content').width(500 / ratio).height(500);

                    } else if (ehauteur > elongueur) {

                        var ratio = elongueur / ehauteur;

                        $.data(document.body, 'ratioCfg', ratio);

                        var newWidth = parseInt(500) * ratio;

                        if (newWidth <= 750) $('#plaque_bg, #plaque_content').height(500).width(500 * ratio);

                        else $('#plaque_bg, #plaque_content').height(750 / ratio).width(750);

                    } else if (ehauteur == elongueur) {

                        $('#plaque_bg, #plaque_content').height(500).width(500);

                    }

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

                    $('.fixation, .fixation2').show();

                    $('#plaque_bg').center(true);

                    if ( $.data(document.body, 'matiereVal') == false ){
                        $('#matiere').ddlist('select', { value: 3 });

                    }else{
                        $('#matiere').ddlist('select', { value: $.data(document.body, 'matiereVal') });
                    }
                }

            });

            if (value != '') {

                    setCfg = true;

                    $('.fixation, .fixation2').show();

                } else {

                    setCfg = false;

                     $('.fixation, .fixation2').hide();

                }

            }

    });

    $('.selectfixation').click(function(e) {

        e.preventDefault();

        $('div#fixations .selected').removeClass('selected');

        $(this).addClass('selected');

        var fixID = $(this).attr('id');

        switch (fixID) {

            case 'fix1':

                $('.fixation, .fixation2').css('background-image', 'url(./img/fix1.png)');

                break;

            case 'fix2':

                $('.fixation, .fixation2').css('background-image', 'url(./img/fix2.png)');

                break;

            case 'aucune':

                $('.fixation, .fixation2').css('background-image', 'none');

                break;

            case 'adhesifs':

                $('.fixation, .fixation2').css('background-image', 'none');

                break;

        }

    });

    /*jQuery(window).on('beforeunload', function() {

        return 'Vous perdrez votre travail si vous quittez cette page !';

    }).unload(function() {

        $.ajax({

            type: "POST",

            async: false,

            url: "ajax/saveSession.php"

        });

        /**html2canvas( $( "#plaque_bg" ), {

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

    //});

    $('#drawRect').click(function(e) {

        e.preventDefault();

        if (setCfg == false) {

            swal({

                title: "Attention",

                text: "Vous devez sélectionner les dimensions de votre plaque avant de pouvoir continuer !",

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

            url: "../rapidpubapp/ajax/plaquespro_forme.php",

            dataType: "json",

            data: {

                action: 'update',

                couleur: textColor,

                ratio: $.data(document.body, 'ratioCfg'),

                size: $.data(document.body, 'taillePlaque'),

                type: 'fond'

            },

            success: function(result) {

                $('.selectedElement').removeClass('selectedElement');

                $('#plaque_content').append('<div class="elementContainer typeForme resizable draggable rotatable" id="' + result['id'] + '" style="max-height:100%;position:absolute"><div class="reset_rotate ctrlElem" title="Réinitialiser la position de l\'élement"></div><div class="ctrlElem seresizer ui-resizable-handle ui-resizable-se"></div><div class="ctrlElem delete-element" title="Supprimer l\'élément"></div></div>');

                $('#' + result['id']).addClass('selectedElement');

                showfirstElem();

                $('input.elemSize').prop('disabled', false);

                $('.ctrlElem, .imgL, .imgH').hide();

                $('.selectedElement').css({

                    'width': '50%',

                    'height': '5%',

                    'position': 'absolute'

                });

                $('.selectedElement').css('background-color', textColor);

                setTimeout(function() {

                    var maxWidth = $('#plaque_content').width() - 50;

                    var maxHeight = $('#plaque_content').height() - 50;

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

                    height: setcolorHeight

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

                        url: "http://rapidpub.synapdev.fr/rapidpubapp/ajax/plaquespro_size.php",

                        dataType: "json",

                        data: {

                            action: 'getsize',

                            id: result['id'],

                            elemWidth: parseInt($('.selectedElement').css('width'), 10),

                            elemHeight: parseInt($('.selectedElement').css('height'), 10),

                            ratio: $.data(document.body, 'ratioCfg'),

                            vitWidthpx: $('#plaque_content').width(),

                            vitHeightpx: $('#plaque_content').height(),

                            size: $.data(document.body, 'taillePlaque'),

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

            content: "Sélectionnez les dimensions (longueur/hauteur) de votre plaque en centimètres. Cette étape est importante car elle nous permet de vous proposer un tarif sur mesure",

            target: document.querySelector("#block_right"),

            placement: "left"

        }, {

            title: "Texte et police d'écriture",

            content: "Ajoutez des textes sur votre plaque. Cliquez sur Ok ou appuyez sur la touche Entrée de votre clavier pour valider votre saisie.",

            target: document.querySelector("#block_right2"),

            placement: "left"

        }, {

            title: "Pictogrammes",

            content: "Vous pouvez choisir l'un des pictogrammes que nous vous proposons.",

            target: document.querySelector("#motifs_container"),

            placement: "left"

        }, {

            title: "Ajouter votre propre image",

            content: "Vous pouvez aussi télécharger et insérer votre propre image (en fonction de la matière sélectionnée).",

            target: document.querySelector("#uploadFile"),

            placement: "left"

        }, {

            title: "Dessiner une forme",

            content: "Ce bouton sert à dessiner des formes carrés ou rectangulaires sur votre plaque. Vous pouvez utiliser la combinaison 'MAJ + redimensionnement souris' pour conserver les proportions.",

            target: document.querySelector("#drawRect"),

            placement: "left"

        }, {

            title: "Couleurs, calques, fonds...",

            content: "Cette partie vous permet de modifier la couleur d'un élément sélectionné (entouré en rouge sur l'aperçu), la couleur et les dimensions du fond et aussi de modifier l'ordre de supperposition des calques.",

            target: document.querySelector("#block_right4"),

            placement: "left"

        }, {

            title: "Aligner, déplacer, dupliquer, pivoter...",

            content: "Ces boutons de contrôles vous permettent d'interagir avec l'élement sélectioné (entouré en rouge sur l'aperçu), vous pouvez le déplacer, le centrer sur votre plaque, le dupliquer ou même le faire pivoter.",

            target: document.querySelector("#block_right4_2"),

            placement: "left"

        }]

    };

    hopscotch.startTour(tour);

    $('#longueur, #hauteur').numeric();

    $('#plaque_content, #plaque_bg').click(function(e) {

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

            $('#plaque_content').append(newElem);

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

                                $('.selectedElement').find('.plaque_element').attr('id', newid);

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

                text: "Vous devez sélectionner les dimensions de votre plaque avant de pouvoir continuer !",

                type: "warning",

                closeOnConfirm: true

            }, function() {

                $('#longueur').effect('highlight', {

                    color: '#c70077'

                }, 1500);

                $('input#longueur').focus();

            });

            return false;

        } else if (!$.data(document.body, 'imgDl')) {

            swal({

                title: "Attention",

                text: "La matière sélectionnée ne permet pas de télécharger d'image !",

                type: "error",

                closeOnConfirm: true

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

                            $('#plaque_content').append('<div class="elementContainer typeImage resizable draggable rotatable" style="max-height:100%;position:absolute"><div class="reset_rotate ctrlElem" title="Réinitialiser la position de l\'élement"></div><img class="elemContent plaque_element" style="max-height:100%" src="' + result.imgPathOp + '" alt="' + result.imgPathOp + '" id="' + result.id + '" /><div class="ctrlElem seresizer ui-resizable-handle ui-resizable-se"></div><div class="ctrlElem delete-element" title="Supprimer l\'élément"></div></div>');

                            setTimeout(function() {

                                var maxWidth = $('#plaque_content').width() - 50;

                                var maxHeight = $('#plaque_content').height() - 50;

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

                                    url: "../rapidpubapp/ajax/plaquespro_size.php",

                                    dataType: "json",

                                    data: {

                                        action: 'getsize',

                                        id: result.id,

                                        elemWidth: parseInt($('.selectedElement').css('width'), 10),

                                        elemHeight: parseInt($('.selectedElement').css('height'), 10),

                                        ratio: $.data(document.body, 'ratioCfg'),

                                        vitWidthpx: $('#plaque_content').width(),

                                        vitHeightpx: $('#plaque_content').height(),

                                        size: $.data(document.body, 'taillePlaque'),

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

    $('.dimensions_plaque').keyup(function() {

        clearTimeout(typingTimer);

        typingTimer = setTimeout(doneTyping($(this)), doneTypingInterval);

    });

    $('.dimensions_plaque').keydown(function() {

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

                    text: "<p style='text-align:justify'>Nous ne pouvons imprimer que des plaques rectangulaires où le plus petit côté <strong>ne doit pas excéder 200 cm</strong>.<br>Exemple: 1000 x 200 pour une plaque horizontale ou 200 x 1000 pour une plaque verticale.</p>",

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

                if (newHeight <= 500) $('#plaque_content').width(750).height(newHeight);

                else $('#plaque_content').width(500 / ratio).height(500);

            } else if (hauteur > longueur) {

                var ratio = longueur / hauteur;

                $.data(document.body, 'ratioCfg', ratio);

                var newWidth = parseInt(500) * ratio;

                if (newWidth <= 750) $('#plaque_content').height(500).width(500 * ratio);

                else $('#plaque_content').height(750 / ratio).width(750);

            } else if (hauteur == longueur) {

                $('#plaque_content').height(500).width(500);

            }

            $('#plaque_content').center(true);

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

                var vitWidth = $('#plaque_content').width(),

                    vitHeight = $('#plaque_content').height();

                $('#plaque_height').html('<span style="color:#ff0000;font-size:10px;">' + hauteur + '</span>').css('height', vitHeight);

                $('#plaque_width').html('<span style="color:#ff0000;font-size:10px;">' + longueur + '</span>').css('width', vitWidth);

                var plaquexy = $('#plaque_content').offset();

                $('#plaque_width').css({

                    top: -15,

                    left: 0

                });

                $('#plaque_height').css({

                    top: 0,

                    left: -20

                });

            }

            $.ajax({

                type: "POST",

                dataType: "json",

                url: "../rapidpubapp/ajax/plaquePrix.php",

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

                    url: "../rapidpubapp/ajax/plaquespro_text.php",

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

                                url: "../rapidpubapp/ajax/plaquespro_size.php",

                                dataType: "json",

                                data: {

                                    action: 'getsize',

                                    id: idCode,

                                    elemWidth: parseInt($('.selectedElement').css('width'), 10),

                                    elemHeight: parseInt($('.selectedElement').css('height'), 10),

                                    ratio: $.data(document.body, 'ratioCfg'),

                                    vitWidthpx: $('#plaque_content').width(),

                                    vitHeightpx: $('#plaque_content').height(),

                                    size: $.data(document.body, 'taillePlaque'),

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

            $.data(document.body, 'currentID', $(this).find('.plaque_element').attr('id'));

            var attrVal = $(this).find('.elemContent').attr('alt');

            $('#textecfg').val(attrVal).focus();

            $('#colorpicker-element').stop(true).animate({

                height: setcolorHeight

            }, 200);

            $('#elemColor').colpickSetColor($(this).find('.elemContent').attr('data-colorcode'));

        } else if ($(this).hasClass('typeMotif')) {

            $.data(document.body, 'currentID', $(this).find('.plaque_element').attr('id'));

            $('#textecfg').val('');

            $('#colorpicker-element').stop(true).animate({

                height: setcolorHeight

            }, 200);

            $('#elemColor').colpickSetColor($(this).find('.elemContent').attr('data-colorcode'));

        } else if ($(this).hasClass('typeImage')) {

            $.data(document.body, 'currentID', $(this).find('.plaque_element').attr('id'));

            $('#textecfg').val('');

            $('#colorpicker-element').stop(true).animate({

                height: 0

            }, 200);

        } else if ($(this).hasClass('typeFond') || $(this).hasClass('typeForme')) {

            $.data(document.body, 'currentID', $(this).attr('id'));

            $('#textecfg').val('');

            $('#colorpicker-element').stop(true).animate({

                height: setcolorHeight

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

                            height: setcolorHeight

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

        var elemCount = $('#plaque_content > .elementContainer').length;

        if (elemCount >= 1 && setCfg) {

            swal({

                title: "Attention",

                text: "Vous perdrez votre travail si vous changez les dimensions de la plaque et vous devrez recommencer votre création",

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

                    $('#plaque_content .elementContainer').remove();

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

        var parentSize = $('#plaque_content').css('width');

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

                text: "Vous devez sélectionner les dimensions de votre plaque avant de pouvoir continuer !",

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

            }

            $.ajax({

                type: "POST",

                url: "../rapidpubapp/ajax/plaquespro_text.php",

                dataType: "json",

                data: {

                    action: 'update',

                    text: encodeURIComponent(textVal),

                    dimensions: dimensionssel,

                    couleur: couleurVar,

                    font: fontName,

                    ratio: $.data(document.body, 'ratioCfg'),

                    size: $.data(document.body, 'taillePlaque'),

                },

                success: function(result) {

                    if ($('.selectedElement').hasClass('typeText')) {

                        var selHeight = $('.selectedElement').height();

                        $.data(document.body, 'selfHeight', selHeight);

                        $('.selectedElement').find('.delete-element').trigger('click');

                        $.data(document.body, 'showColors', true);

                    }

                    $('.selectedElement').removeClass('selectedElement');

                    $('#plaque_content').append('<div class="elementContainer typeText resizable draggable rotatable" style="position:absolute"><div class="reset_rotate ctrlElem" title="Réinitialiser la position de l\'élement"></div><img class="plaque_element elemContent" src="data:image/png;base64,' + result['image'] + '" data-ccode="' + couleurVar + '" alt="' + result['text'] + '" id="' + result['id'] + '" /><div class="ctrlElem seresizer ui-resizable-handle ui-resizable-se"></div><div class="delete-element ctrlElem" title="Supprimer l\'élément"></div></div>');

                    $('#elemColor').colpickSetColor('#000000');

                    $('#colorpicker-element').stop(true).animate({

                        height: setcolorHeight

                    }, 200);

                    $('#' + result['id']).parent('div').addClass('selectedElement');

					var $oSelectedElement = $(".selectedElement");
                    showfirstElem();
                    $oSelectedElement.hide();
                    $('.selectedElement').find('.elemContent').attr('data-colorcode', '#000000');

                    $('input.elemSize').prop('disabled', false);

                    setTimeout(function() {

                        var maxWidth = $('#plaque_content').width() - 50;

                        var maxHeight = $('#plaque_content').height() - 50;

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
					
					var $textDimensionCalculation = $(".textDimensionCalculation");
                    var policeName = $("#police").val().split('.')[0];
                    $textDimensionCalculation.html(textVal);
                    $textDimensionCalculation.css({
                        'font-family' :  policeName
                    });

                    setTimeout(function(){
                        var newWidth = $textDimensionCalculation.outerWidth();
                        var newHeight = $textDimensionCalculation.outerHeight();
                        console.warn("w:" + newWidth);
                        console.warn("h:" + newHeight);
                        $oSelectedElement.width(newWidth);
                        $oSelectedElement.height('auto');
                        $oSelectedElement.center(true);
                        $oSelectedElement.show();
                    },200)

                    /**
                     * @todo remove after test
                     * **/
                    //return;

                    //$('.selectedElement').width(newWidth);
                    //$('.selectedElement').height(newSize).width('auto');

                    //$('.selectedElement').height('auto').width(newSize);

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

                            url: "../rapidpubapp/ajax/plaquespro_size.php",

                            dataType: "json",

                            data: {

                                action: 'getsize',

                                id: result['id'],

                                elemWidth: $('.selectedElement').width(),

                                elemHeight: $('.selectedElement').height(),

                                ratio: $.data(document.body, 'ratioCfg'),

                                vitWidthpx: $('#plaque_content').width(),

                                vitHeightpx: $('#plaque_content').height(),

                                size: $.data(document.body, 'taillePlaque'),

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

                text: "Vous devez sélectionner les dimensions de votre plaque avant de pouvoir continuer !",

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

            url: "../rapidpubapp/ajax/plaquespro_motif.php",

            dataType: "json",

            data: {

                action: 'update',

                motif: motifUrl,

                folder: theme,

                couleur: couleurVar,

                ratio: $.data(document.body, 'ratioCfg'),

                size: $.data(document.body, 'taillePlaque'),

            },

            success: function(result) {

                $('.selectedElement').removeClass('selectedElement');

                $('#plaque_content').append('<div class="elementContainer typeMotif resizable draggable rotatable" style="position:absolute"><div class="reset_rotate ctrlElem" title="Réinitialiser la position de l\'élement"></div><img class="elemContent plaque_element" data-src-code="' + result['code'] + '" src="data:image/png;base64,' + result['imgMotif'] + '" alt="' + result['motif'] + '" id="' + result['id'] + '" /><div class="ctrlElem seresizer ui-resizable-handle ui-resizable-se"></div><div class="ctrlElem delete-element" title="Supprimer l\'élément"></div></div>');

                $('#' + result['id']).parent('div').addClass('selectedElement');

                showfirstElem();

                $('#elemColor').colpickSetColor('#000000');

                $('.selectedElement').find('.elemContent').attr('data-colorcode', '#000000');

                $('input.elemSize').prop('disabled', false);

                setTimeout(function() {

                    var maxWidth = $('#plaque_content').width() - 50;

                    var maxHeight = $('#plaque_content').height() - 50;

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

                    height: setcolorHeight

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

                        url: "http://rapidpub.synapdev.fr/rapidpubapp/ajax/plaquespro_size.php",

                        dataType: "json",

                        data: {

                            action: 'getsize',

                            id: result['id'],

                            elemWidth: parseInt($('.selectedElement').css('width'), 10),

                            elemHeight: parseInt($('.selectedElement').css('height'), 10),

                            ratio: $.data(document.body, 'ratioCfg'),

                            vitWidthpx: $('#plaque_content').width(),

                            vitHeightpx: $('#plaque_content').height(),

                            size: $.data(document.body, 'taillePlaque'),

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

                parentZ = $('#plaque_content'),

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

            parentZ = $('#plaque_content'),

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

        if( $(this).hasClass('colorblock-fond') ){
            $("#fondColor").colpickSetColor(color);
            $('#plaque_content').css('background-color', '#' + color);
            return true;
        }

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

                    size: $.data(document.body, 'taillePlaque'),

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

                url: "../rapidpubapp/ajax/plaquespro_text.php",

                data: {

                    action: 'update',

                    text: encodeURIComponent(altCode),

                    dimensions: dimensionssel,

                    couleur: color,

                    font: fontName,

                    id: idCode,

                    ratio: $.data(document.body, 'ratioCfg'),

                    size: $.data(document.body, 'taillePlaque'),

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

                url: "../rapidpubapp/ajax/plaquespro_fond.php",

                data: {

                    action: 'update',

                    couleur: color,

                    type: 'fond',

                    id: idCode,

                    ratio: $.data(document.body, 'ratioCfg'),

                    size: $.data(document.body, 'taillePlaque'),

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

                url: "../rapidpubapp/ajax/plaquespro_forme.php",

                data: {

                    action: 'update',

                    couleur: color,

                    type: 'forme',

                    id: idCode,

                    ratio: $.data(document.body, 'ratioCfg'),

                    size: $.data(document.body, 'taillePlaque'),

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

                            size: $.data(document.body, 'taillePlaque'),

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

                        url: "../rapidpubapp/ajax/plaquespro_text.php",

                        data: {

                            action: 'update',

                            text: encodeURIComponent(altCode),

                            dimensions: dimensionssel,

                            couleur: color,

                            font: fontName,

                            id: idCode,

                            ratio: $.data(document.body, 'ratioCfg'),

                            size: $.data(document.body, 'taillePlaque'),

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

                        url: "../rapidpubapp/ajax/plaquespro_fond.php",

                        data: {

                            action: 'update',

                            couleur: color,

                            type: 'fond',

                            id: idCode,

                            ratio: $.data(document.body, 'ratioCfg'),

                            size: $.data(document.body, 'taillePlaque'),

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

                        url: "../rapidpubapp/ajax/plaquespro_forme.php",

                        data: {

                            action: 'update',

                            couleur: color,

                            type: 'forme',

                            id: idCode,

                            ratio: $.data(document.body, 'ratioCfg'),

                            size: $.data(document.body, 'taillePlaque'),

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

            $('#plaque_content').css('background-color', '#' + hex);

        }

    }).keyup(function() {

        $(this).colpickSetColor(this.value);

    });

    $('.colorfondblock').click(function() {

        var color = $(this).attr('data-hexcolor');

        $.data(document.body, 'couleurFond', color);

        $('#plaque_content').css('background-color', color);

        $('#fondColor').colpickSetColor(color);

    });

});