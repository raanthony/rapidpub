/** SCRIPTS JS APPLICATION ADHESIFS **/
$(function() {
    var couleurVar = '#0D5CA4';
    var fontName = 'Arial.ttf';
    var quantite = 1;
    var errorHeight = false;
    $('#couleur-rouge').trigger('click');
    $('#texte_adhesif').focus();

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
            title: "Saisie du texte",
            content: "Saisissez le texte de votre lettrage adhésif.",
            target: document.querySelector("#texte_adhesif"),
            placement: "right"
        },{
            title: "Dimensions",
            content: "Vous pouvez modifier les dimensions de votre lettrage. Si vous éditez la hauteur, la longueur se met à jour automatiquement et vice et versa.",
            target: document.querySelector("#dimension_height"),
            placement: "bottom" 
        },{
            title: "Couleur et finition",
            content: "Modifiez la couleur du texte, la finition de l'adhésif et le mode d'affichage. Le miroir est destiné à être posé sur une surface transparente pour être vu de l'autre côté. Le pochoir sert à peindre la forme du texte saisi.",
            target: document.querySelector("#bloc_couleurs"),
            placement: "right"
        },{
            title: "Police d'écriture",
            content: "Vous pouvez modifier la police d'écriture de votre texte en choisissant parmi celles que nous vous proposons.",
            target: document.querySelector("#bloc_fonts"),
            placement: "top"
        }]
    };

    hopscotch.startTour(tour);

    $('#dimension_height').keyup(function() {
        $('#dimension_width').val('');
    });
    $('#finition_select').change(function(e){
        e.preventDefault();
        var setVal = $(this).val();
        if ( setVal == 'mat' ) {
            $('#couleurs1').slideUp(100, function(){
                $('#couleurs2').slideDown();
            });
        } else {
            $('#couleurs2').slideUp(100, function(){
                $('#couleurs1').slideDown();
            });
        }
    });
    $('#bloc_fonts').on('click', '.minibloc_font', function() {
        fontName = $(this).attr('data-fontcode');
        $('.selectedFont').removeClass('.selectedFont');
        $(this).addClass('.selectedFont');
        var textVal = $('#texte_adhesif').val();
        var heightVal = $('#dimension_height').val();
        var widthVal = $('#dimension_width').val();
        if (textVal != '') {
            $.ajax({
                type: "POST",
                url: "../rapidpubapp/ajax/adhesifs.php",
                dataType: "json",
                data: {
                    action: 'update',
                    text: textVal,
                    width: widthVal,
                    height: heightVal,
                    couleur: couleurVar,
                    font: fontName,
                    nb: quantite
                },
                success: function(result) {
                    $('#apercu_texte').html('<img src="data:image/png;base64,' + result['image'] + '" alt="' + result['text'] + '" />');
                    $('#dimension_height').val(result['height']);
                    $('#dimension_width').val(result['width']);
                    $('#height_info').show().html(result['height'] + ' cm');
                    var width = $('#apercu_texte img').width();
                    var centerX = width / 2;
                    $('#width_info').show().css({
                        left: centerX,
                        top: '15px'
                    }).html(result['width'] + ' cm');
                }
            });
        }
    });
    $('#bloc_couleurs').on('click', '.minibloc_couleur', function() {
        couleurVar = $(this).attr('data-couleurcode');
        $('#nom_couleur').show();
        $('#id_couleur').html($(this).attr('id'));
        var textVal = $('#texte_adhesif').val();
        var heightVal = $('#dimension_height').val();
        var widthVal = $('#dimension_width').val();
        if ($('#pochoir').is(':checked')) {
            $('#pochoir').attr('checked', false);
            $('#miroir').attr('disabled', false);
        }
        if ($('#miroir').is(':checked')) {
            $('#miroir').attr('checked', false);
            $('#pochoir').attr('disabled', false);
        }
        if ( $(this).hasClass('hideset1') ) {
            $('#finition_options').hide();
        } else {
            $('#finition_options').show();
        }
        if ( $(this).hasClass('hideset2') ) {
            $('#finition_options #finitionpochoir').hide();
        } else {
            $('#finition_options #finitionpochoir').show();
        }
        if (textVal != '') {
            $.ajax({
                type: "POST",
                url: "../rapidpubapp/ajax/adhesifs.php",
                dataType: "json",
                data: {
                    action: 'update',
                    text: textVal,
                    width: widthVal,
                    height: heightVal,
                    couleur: couleurVar,
                    font: fontName,
                    nb: quantite
                },
                success: function(result) {
                    $('#apercu_texte').html('<img src="data:image/png;base64,' + result['image'] + '" alt="' + result['text'] + '" />');
                    $('#dimension_height').val(result['height']);
                    $('#dimension_width').val(result['width']);
                    $('#height_info').show().html(result['height'] + ' cm');
                    var width = $('#apercu_texte img').width();
                    var centerX = width / 2;
                    $('#width_info').show().css({
                        left: centerX,
                        top: '15px'
                    }).html(result['width'] + ' cm');
                }
            });
        }
    });
    $('#dimension_width').keyup(function() {
        $('#dimension_height').val('');
    });
    $('#dimension_width, #dimension_height').click(function() {
        $(this).select();
    });
    $('#texte_adhesif, #dimension_height, #dimension_width').keyup(function() {
        var textVal = $('#texte_adhesif').val();
        var heightVal = $('#dimension_height').val();
        var widthVal = $('#dimension_width').val();
        if (heightVal > 93) {
            $('<div title="Attention !"><p>Vous devez saisir une hauteur <strong>inférieure à 93 centimètres</strong>.</p></div>').dialog({
                buttons: {
                    'Ok': function() {
                        $(this).dialog('close');
                    }
                }
            });
            $('#dimension_height').val(93);
            errorHeight = true;
        }
        if ($(this).val() != '' && errorHeight == false) {
            $.ajax({
                type: "POST",
                url: "../rapidpubapp/ajax/adhesifs.php",
                dataType: "json",
                data: {
                    action: 'update',
                    text: textVal,
                    width: widthVal,
                    height: heightVal,
                    couleur: couleurVar,
                    font: fontName,
                    nb: quantite
                },
                success: function(result) {
                    $('#apercu_texte').html('<img src="data:image/png;base64,' + result['image'] + '" alt="' + result['text'] + '" />');
                    $('#dimension_height').val(result['height']);
                    $('#dimension_width').val(result['width']);
                    $('#height_info').show().html(result['height'] + ' cm');
                    var width = $('#apercu_texte img').width();
                    var centerX = width / 2;
                    $('#width_info').show().css({
                        left: centerX,
                        top: '15px'
                    }).html(result['width'] + ' cm');
                    $('#prix_unitaire').html(result['prix_unitaire'] + ' €');
                    $('#prix_ttc').html(result['prix'] + ' €');
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: "../rapidpubapp/ajax/adhesifs.php",
                dataType: "json",
                data: {
                    action: 'update',
                    text: textVal,
                    width: widthVal,
                    height: 93,
                    couleur: couleurVar,
                    font: fontName,
                    nb: quantite
                },
                success: function(result) {
                    $('#apercu_texte').html('<img src="data:image/png;base64,' + result['image'] + '" alt="' + result['text'] + '" />');
                    $('#dimension_height').val(result['height']);
                    $('#dimension_width').val(result['width']);
                    $('#height_info').show().html(result['height'] + ' cm');
                    var width = $('#apercu_texte img').width();
                    var centerX = width / 2;
                    $('#width_info').show().css({
                        left: centerX,
                        top: '15px'
                    }).html(result['width'] + ' cm');
                    $('#prix_unitaire').html(result['prix_unitaire'] + ' €');
                    $('#prix_ttc').html(result['prix'] + ' €');
                    errorHeight = false;
                }
            });
        }
    });
    $('.dimensions_input').keypress(function(e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
    });
    $('.jcarousel').jcarousel({
        // Options go here
    });
    /*
	Prev control initialization
	*/
    $('.jcarousel-control-prev').on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
    }).on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
    }).jcarouselControl({
        // Options go here
        target: '-=1'
    });
    /*
	Next control initialization
	*/
    $('.jcarousel-control-next').on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
    }).on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
    }).jcarouselControl({
        // Options go here
        target: '+=1'
    });
    $('#miroir').click(function() {
        if (this.checked) {
            $('#pochoir').attr('disabled', true);
            $('#apercu_texte img').addClass('mirror');
        } else {
            $('#pochoir').attr('disabled', false);
            $('#apercu_texte img').removeClass('mirror');
        }
    });
    $('#pochoir').click(function() {
        if (this.checked) {
            var textVal = $('#texte_adhesif').val();
            var heightVal = $('#dimension_height').val();
            var widthVal = $('#dimension_width').val();
            $('#miroir').attr('disabled', true);
            $('<div title="Info"><p>Les pochoirs adhésifs ne sont utilisables qu\'une seule fois !</div>').dialog({
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
            $.ajax({
                type: "POST",
                url: "../rapidpubapp/ajax/adhesifs.php",
                dataType: "json",
                data: {
                    action: 'update',
                    text: textVal,
                    width: widthVal,
                    height: heightVal,
                    couleur: '#ffffff',
                    font: fontName,
                    nb: quantite
                },
                success: function(result) {
                    $('#apercu_texte').html('<img style="background:#333;padding:10px;margin-top:-10px" src="data:image/png;base64,' + result['image'] + '" alt="' + result['text'] + '" />');
                    $('#dimension_height').val(result['height']);
                    $('#dimension_width').val(result['width']);
                    $('#height_info').show().html(result['height'] + ' cm');
                    var width = $('#apercu_texte img').width();
                    var centerX = width / 2;
                    $('#width_info').show().css({
                        left: centerX,
                        top: '5px'
                    }).html(result['width'] + ' cm');
                    $('#prix_unitaire').html(result['prix_unitaire'] + ' €');
                    $('#prix_ttc').html(result['prix'] + ' €');
                }
            });
        } else {
            var textVal = $('#texte_adhesif').val();
            var heightVal = $('#dimension_height').val();
            var widthVal = $('#dimension_width').val();
            $('.ui-dialog-content').dialog('close');
            $('#miroir').attr('disabled', false);
            $.ajax({
                type: "POST",
                url: "../rapidpubapp/ajax/adhesifs.php",
                dataType: "json",
                data: {
                    action: 'update',
                    text: textVal,
                    width: widthVal,
                    height: heightVal,
                    couleur: couleurVar,
                    font: fontName,
                    nb: quantite
                },
                success: function(result) {
                    $('#apercu_texte').html('<img src="data:image/png;base64,' + result['image'] + '" alt="' + result['text'] + '" />');
                    $('#dimension_height').val(result['height']);
                    $('#dimension_width').val(result['width']);
                    $('#height_info').show().html(result['height'] + ' cm');
                    var width = $('#apercu_texte img').width();
                    var centerX = width / 2;
                    $('#width_info').show().css({
                        left: centerX,
                        top: '15px'
                    }).html(result['width'] + ' cm');
                    $('#prix_unitaire').html(result['prix_unitaire'] + ' €');
                    $('#prix_ttc').html(result['prix'] + ' €');
                }
            });
        }
    });
    $('#spinner').bind('keyup change click', function(e) {
        if (!$(this).data("previousValue") || $(this).data("previousValue") != $(this).val()) {
            $(this).data("previousValue", $(this).val());
            quantite = $(this).data("previousValue");
            var textVal = $('#texte_adhesif').val();
            var heightVal = $('#dimension_height').val();
            var widthVal = $('#dimension_width').val();
            if (textVal != '') {
                $.ajax({
                    type: "POST",
                    url: "../rapidpubapp/ajax/adhesifs.php",
                    dataType: "json",
                    data: {
                        action: 'update',
                        text: textVal,
                        width: widthVal,
                        height: heightVal,
                        couleur: couleurVar,
                        font: fontName,
                        nb: quantite
                    },
                    success: function(result) {
                        $('#apercu_texte').html('<img src="data:image/png;base64,' + result['image'] + '" alt="' + result['text'] + '" />');
                        $('#dimension_height').val(result['height']);
                        $('#dimension_width').val(result['width']);
                        $('#height_info').show().html(result['height'] + ' cm');
                        var width = $('#apercu_texte img').width();
                        var centerX = width / 2;
                        $('#width_info').show().css({
                            left: centerX,
                            top: '15px'
                        }).html(result['width'] + ' cm');
                        $('#prix_unitaire').html(result['prix_unitaire'] + ' €');
                        $('#prix_ttc').html(result['prix'] + ' €');
                    }
                });
            }
        }
    });
    $('#spinner').each(function() {
        $(this).data("previousValue", $(this).val());
    });
});