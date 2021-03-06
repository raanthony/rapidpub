$(function(){

	var cFace = '#FF0000',
		cChamp = '#FFFFFF',
		tFont = 'Arial.ttf',
		cursor = false;
	jQuery.data( document.body, 'thickness', thickness );
	jQuery.data( document.body, 'theight', 10 );
	jQuery.data( document.body, 'tperspective', false );

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
            title: "Matière",
            content: "Choisissez la matière de vos lettres. Certaines matières ne permettent pas de modifier la couleur.",
            target: document.querySelector("#productCfg"),
            placement: "right"
        },{
        	title: "Hauteur des lettres",
            content: "Sélectionnez la hauteur de vos lettres.",
            target: document.querySelector("#heightCfg"),
            placement: "bottom"	
        },{
        	title: "Épaisseur des lettres",
            content: "Certaines matières permettent de choisir une épaisseur de lettres.",
            target: document.querySelector("#thicknessCfg"),
            placement: "right"	
        },{
        	title: "Saisie du texte",
            content: "Saisissez le texte de vos lettres.",
            target: document.querySelector("#textCfg"),
            placement: "right"	
        },{
        	title: "Police d'écriture",
            content: "Vous pouvez changer la police d'écriture de vos lettres découpées.",
            target: document.querySelector("#fontCfg"),
            placement: "right"	
        },{
        	title: "Couleur des lettres",
            content: "Si vous avez sélectionné une matière qui permet de changer de couleur, cliquez sur celle qui vous intéresse pour modifier votre enseigne.",
            target: document.querySelector("#colorCfg"),
            placement: "right"
        },{
        	title: "Vue en relief",
            content: "Cette option vous permet de visualiser votre enseigne en perspective et de vous faire une idée du relief.",
            target: document.querySelector("#perspective"),
            placement: "top"
        },{
        	title: "Fond",
            content: "Vous pouvez modifier le fond de votre zone de travail afin de mieux visualiser votre création.",
            target: document.querySelector("#creation_fond"),
            placement: "bottom"
        }]
    };

    hopscotch.startTour(tour);

	$( '#texte' ).effect( 'shake' );
	$( '#hauteur_lettres' ).ddlist({
		width: 80,
		onSelected: function (index, value, text) {
			var textVal = $( '#texte' ).val();
			jQuery.data( document.body, 'theight', value );			
			if ( textVal != '' ) {
				$.ajax({
					type: "POST",
					url: "../rapidpubapp/ajax/reliefs_text.php",
					dataType: "json",
					data: { action: 'update', font: tFont, height: jQuery.data( document.body, 'theight' ), perspective: jQuery.data( document.body, 'tperspective' ), text: textVal, couleurFace: cFace, scrollbar: cursor, matiere: matiereSel, couleurChamp: cChamp, epaisseur: jQuery.data( document.body, 'thickness' ) },
					success: function( result ){
						$( '#apercu' ).html( '<img class="elemContent draggable" src="data:image/png;base64,' + result['image'] + '" />' );
						doDraggable();
						$( '#apercu img' ).center( true );
						$('#slongueur').html('<span style="color:red">Longueur:&nbsp;</span>' + result['widthCm'] + ' cm');
						$('#shauteur').html('<span style="color:red">Hauteur:&nbsp;</span>' + result['heightCm'] + ' cm');
						if ( cursor ) {
							$( '#apercu' ).css( 'overflow', 'auto' );
							$( '#apercu img' ).css( 'maxWidth', 'none' ).centerV( true );
						} else {
							$( '#apercu' ).css( 'overflow', 'hidden' ); 
							$( '#apercu img' ).css( 'maxWidth', '100%' );
						}
					}
				});
			}
		}
	});
	$( '.minibloc_font' ).click(function(){
		var selFont = $( this ).data( 'fontcode' );
		tFont = selFont;
	});
	$( '#uploadFile' ).click(function(e){
		e.preventDefault();
		$.fancybox({
			href: '#uploadFileContent'
		});
	});
	$( '#tperspective' ).change(function(){
		if ( this.checked ) {
			jQuery.data( document.body, 'tperspective', true );
		} else {
			jQuery.data( document.body, 'tperspective', false );
		}
		var textVal = $( '#texte' ).val();
		var nbrLetters = textVal.length;		
		if ( nbrLetters > 11 ) {
			cursor = true;
		} else {
			cursor = false;
		}
		if ( textVal != '' ) {
			$.ajax({
				type: "POST",
				url: "../rapidpubapp/ajax/reliefs_text.php",
				dataType: "json",
				data: { action: 'update', font: tFont, height: jQuery.data( document.body, 'theight' ), perspective: jQuery.data( document.body, 'tperspective' ), text: textVal, couleurFace: cFace, scrollbar: cursor, matiere: matiereSel, couleurChamp: cChamp, epaisseur: jQuery.data( document.body, 'thickness' ) },
				success: function( result ){
					$( '#apercu' ).html( '<img class="elemContent draggable" src="data:image/png;base64,' + result['image'] + '" />' );
					doDraggable();
					$( '#apercu img' ).center( true );
					$('#slongueur').html('<span style="color:red">Longueur:&nbsp;</span>' + result['widthCm'] + ' cm');
					$('#shauteur').html('<span style="color:red">Hauteur:&nbsp;</span>' + result['heightCm'] + ' cm');
					if ( cursor ) {
						$( '#apercu' ).css( 'overflow', 'auto' );
						$( '#apercu img' ).css( 'maxWidth', 'none' ).centerV( true );
					} else {
						$( '#apercu' ).css( 'overflow', 'hidden' ); 
						$( '#apercu img' ).css( 'maxWidth', '100%' );
					}
				}
			});
		}
	});
	$( '#matiere' ).ddlist({
		width: 220,
		onSelected: function (index, value, text) {
			matiereSel = value;
			$.ajax({
				type: "POST",
				url: "../rapidpubapp/ajax/epaisseurs_lettres.php",
				dataType: "json",
				data: { action: 'update', matiere: matiereSel },
				success: function( result ){
					var listRadio = '';
					$( '.epaisseur' ).iCheck( 'destroy' ); 
					$( '.radioContainer' ).html( '' );
					var i = 0;
					$.each(result, function(val, key) {
						if ( i == 0 ) {
							jQuery.data( document.body, 'thickness', key['taille'] );
							listRadio += '<input ' + (key['couleurs'] == 0 ? 'data-color="0"' : '"data-color="1"' ) + 'class="epaisseur" name="epaisseur_lettres" data-epaisseur="' + key['taille'] + '" type="radio" id="' + key['id'] + '" value="' + key['id'] + '" style="" checked>';
							if ( key['couleurs'] == 0 ) {
								$( '.minibloc_couleur' ).hide();
								$( '#MsgColors' ).show();
							} else {
								$( '.minibloc_couleur' ).show();
								$( '#MsgColors' ).hide();
							}
						} else {
							listRadio += '<input ' + (key['couleurs'] == 0 ? 'data-color="0"' : '"data-color="1"' ) + ' class="epaisseur" name="epaisseur_lettres" data-epaisseur="' + key['taille'] + '" type="radio" id="' + key['id'] + '" value="' + key['id'] + '" style="">';
						}
						listRadio += '<label for="' + key['id'] + '">' + key['nom'] + '</label>';
						i++;
					});
					$( '.radioContainer' ).html( listRadio );
					$( '.epaisseur' ).iCheck({
						checkboxClass: 'icheckbox_flat',
						radioClass: 'iradio_flat-red'
					});
					var textVal = $( '#texte' ).val();
					var nbrLetters = textVal.length;
					if ( nbrLetters > 11 ) {
						cursor = true;
					} else {
						cursor = false;
					}
					if ( textVal != '' ) {
						$.ajax({
							type: "POST",
							url: "../rapidpubapp/ajax/reliefs_text.php",
							dataType: "json",
							data: { action: 'update', height: jQuery.data( document.body, 'theight' ), perspective: jQuery.data( document.body, 'tperspective' ), font: tFont, text: textVal, couleurFace: cFace, scrollbar: cursor, matiere: matiereSel, couleurChamp: cChamp, epaisseur: jQuery.data( document.body, 'thickness' ) },
							success: function( result ){
								$( '#apercu' ).html( '<img class="elemContent draggable" src="data:image/png;base64,' + result['image'] + '" />' );
								doDraggable();
								$( '#apercu img' ).center( true );
								$('#slongueur').html('<span style="color:red">Longueur:&nbsp;</span>' + result['widthCm'] + ' cm');
								$('#shauteur').html('<span style="color:red">Hauteur:&nbsp;</span>' + result['heightCm'] + ' cm');
								if ( cursor ) {
									$( '#apercu' ).css( 'overflow', 'auto' );
									$( '#apercu img' ).css( 'maxWidth', 'none' ).centerV( true );
								} else {
									$( '#apercu' ).css( 'overflow', 'hidden' ); 
									$( '#apercu img' ).css( 'maxWidth', '100%' );
								}
							}
						});
					}
					$( 'input' ).on( 'ifChecked', function(event){
						jQuery.data( document.body, 'thickness', $( this ).attr( 'data-epaisseur' ) );
						if ( $( this ).attr( 'data-color' ) == 0 ) {
							$( '.minibloc_couleur' ).hide();
							$( '#MsgColors' ).show();
						} else {
							$( '.minibloc_couleur' ).show();
							$( '#MsgColors' ).hide();
						}
						var textVal = $( '#texte' ).val();
						var nbrLetters = textVal.length;		
						if ( nbrLetters > 11 ) {
							cursor = true;
						} else {
							cursor = false;
						}
						if ( textVal != '' ) {
							$.ajax({
								type: "POST",
								url: "../rapidpubapp/ajax/reliefs_text.php",
								dataType: "json",
								data: { action: 'update', height: jQuery.data( document.body, 'theight' ), perspective: jQuery.data( document.body, 'tperspective' ), font: tFont, text: textVal, couleurFace: cFace, scrollbar: cursor, matiere: matiereSel, couleurChamp: cChamp, epaisseur: jQuery.data( document.body, 'thickness' ) },
								success: function( result ){
									$( '#apercu' ).html( '<img class="elemContent draggable" src="data:image/png;base64,' + result['image'] + '" />' );
									doDraggable();
									$( '#apercu img' ).center( true );
									$('#slongueur').html('<span style="color:red">Longueur:&nbsp;</span>' + result['widthCm'] + ' cm');
									$('#shauteur').html('<span style="color:red">Hauteur:&nbsp;</span>' + result['heightCm'] + ' cm');
									if ( cursor ) {
										$( '#apercu' ).css( 'overflow', 'auto' );
										$( '#apercu img' ).css( 'maxWidth', 'none' ).centerV( true );
									} else {
										$( '#apercu' ).css( 'overflow', 'hidden' ); 
										$( '#apercu img' ).css( 'maxWidth', '100%' );
									}
								}
							});
						}
					});
				}
			});
		}

	});
	$( '.epaisseur' ).iCheck({
		checkboxClass: 'icheckbox_flat',
		radioClass: 'iradio_flat-red'
	});
	$( 'input' ).on( 'ifChecked', function(event){
		//if ( $( this ).attr( 'data-epaisseur' ) == 6   )
		jQuery.data( document.body, 'thickness', $( this ).attr( 'data-epaisseur' ) );
		if ( $( this ).attr( 'data-color' ) == 0 ) {
			$( '.minibloc_couleur' ).hide();
			$( '#MsgColors' ).show();
		} else {
			$( '.minibloc_couleur' ).show();
			$( '#MsgColors' ).hide();
		}
		var textVal = $( '#texte' ).val();
		var nbrLetters = textVal.length;		
		if ( nbrLetters > 11 ) {
			cursor = true;
		} else {
			cursor = false;
		}
		if ( textVal != '' ) {
			$.ajax({
				type: "POST",
				url: "../rapidpubapp/ajax/reliefs_text.php",
				dataType: "json",
				data: { action: 'update', height: jQuery.data( document.body, 'theight' ), font: tFont, perspective: jQuery.data( document.body, 'tperspective' ), text: textVal, couleurFace: cFace, scrollbar: cursor, matiere: matiereSel, couleurChamp: cChamp, epaisseur: jQuery.data( document.body, 'thickness' ) },
				success: function( result ){
					$( '#apercu' ).html( '<img class="elemContent draggable" src="data:image/png;base64,' + result['image'] + '" />' );
					doDraggable();
					$( '#apercu img' ).center( true );
					$('#slongueur').html('<span style="color:red">Longueur:&nbsp;</span>' + result['widthCm'] + ' cm');
					$('#shauteur').html('<span style="color:red">Hauteur:&nbsp;</span>' + result['heightCm'] + ' cm');
					if ( cursor ) {
						$( '#apercu' ).css( 'overflow', 'auto' );
						$( '#apercu img' ).css( 'maxWidth', 'none' ).centerV( true );
					} else {
						$( '#apercu' ).css( 'overflow', 'hidden' ); 
						$( '#apercu img' ).css( 'maxWidth', '100%' );
					}
				}
			});
		}
	});
	$( '#texte' ).focus();
	$('.jcarousel').jcarousel({
	});

	$('.jcarousel-control-prev') .on( 'jcarouselcontrol:active', function() {
		$(this).removeClass('inactive');
	}).on( 'jcarouselcontrol:inactive', function() {
		$(this).addClass('inactive');
	}).jcarouselControl({
		target: '-=1'
	});

	$('.jcarousel-control-next').on('jcarouselcontrol:active', function() {
		$(this).removeClass('inactive');
	}).on('jcarouselcontrol:inactive', function() {
		$(this).addClass('inactive');
	}).jcarouselControl({
		target: '+=1'
	});
	var typingTimer;
	var doneTypingInterval = 250; //ms
	$( '#texte' ).keyup(function(){
		clearTimeout(typingTimer);
		typingTimer = setTimeout(doneTyping, doneTypingInterval);
	});

	$( '#texte' ).keydown(function(){
		 clearTimeout(typingTimer);
	});

	function doneTyping(){
		var textVal = $( '#texte' ).val();
		var nbrLetters = textVal.length;		
		if ( nbrLetters > 11 ) {
			cursor = true;
		} else {
			cursor = false;
		}
		$.ajax({
			type: "POST",
			url: "../rapidpubapp/ajax/reliefs_text.php",
			dataType: "json",
			data: { action: 'update', font: tFont, height: jQuery.data( document.body, 'theight' ), perspective: jQuery.data( document.body, 'tperspective' ), text: textVal, couleurFace: cFace, scrollbar: cursor, matiere: matiereSel, couleurChamp: cChamp, epaisseur: jQuery.data( document.body, 'thickness' ) },
			success: function( result ){
				$( '#apercu' ).html( '<img class="elemContent draggable" src="data:image/png;base64,' + result['image'] + '" />' );
				doDraggable();
				$( '#apercu img' ).center( true );
				$('#slongueur').html('<span style="color:red">Longueur:&nbsp;</span>' + result['widthCm'] + ' cm');
				$('#shauteur').html('<span style="color:red">Hauteur:&nbsp;</span>' + result['heightCm'] + ' cm');
				if ( cursor ) {
					$( '#apercu' ).css( 'overflow', 'auto' );
					$( '#apercu img' ).css( 'maxWidth', 'none' ).centerV( true );
				} else {
					$( '#apercu' ).css( 'overflow', 'hidden' ); 
					$( '#apercu img' ).css( 'maxWidth', '100%' );
				}
			}
		});
	}

	$( '#bloc_couleurs .minibloc_couleur' ).click(function(){
		var textVal = $( '#texte' ).val();
		var color = $( this ).attr( 'data-couleurcode' );
		var nbrLetters = textVal.length;		
		if ( nbrLetters > 11 ) {
			cursor = true;
		} else {
			cursor = false;
		}
		cFace = color;
		if ( textVal != '' ) {
			$.ajax({
				type: "POST",
				url: "../rapidpubapp/ajax/reliefs_text.php",
				dataType: "json",
				data: { action: 'update', font: tFont, height: jQuery.data( document.body, 'theight' ), perspective: jQuery.data( document.body, 'tperspective' ), text: textVal, couleurFace: color, scrollbar: cursor, matiere: matiereSel, couleurChamp: cChamp, epaisseur: jQuery.data( document.body, 'thickness' ) },
				success: function( result ){
					$( '#apercu' ).html( '<img class="elemContent draggable" src="data:image/png;base64,' + result['image'] + '" />' );
					doDraggable();
					$( '#apercu img' ).center( true );
					$('#slongueur').html('<span style="color:red">Longueur:&nbsp;</span>' + result['widthCm'] + ' cm');
					$('#shauteur').html('<span style="color:red">Hauteur:&nbsp;</span>' + result['heightCm'] + ' cm');
					if ( cursor ) {
						$( '#apercu' ).css( 'overflow', 'auto' );
						$( '#apercu img' ).css( 'maxWidth', 'none' ).centerV( true );
					} else {
						$( '#apercu' ).css( 'overflow', 'hidden' ); 
						$( '#apercu img' ).css( 'maxWidth', '100%' );
					}
				}
			});
		}
	});

	$( '#bloc_couleurs2 .minibloc_couleur' ).click(function(){
		var textVal = $( '#texte' ).val();
		var color = $( this ).attr( 'data-couleurcode' );
		var nbrLetters = textVal.length;		
		if ( nbrLetters > 11 ) {
			cursor = true;
		} else {
			cursor = false;
		}
		cChamp = color;
		if ( textVal != '' ) {
			$.ajax({
				type: "POST",
				url: "../rapidpubapp/ajax/reliefs_text.php",
				dataType: "json",
				data: { action: 'update', font: tFont, height: jQuery.data( document.body, 'theight' ), perspective: jQuery.data( document.body, 'tperspective' ), text: textVal, couleurFace: cFace, scrollbar: cursor, matiere: matiereSel, couleurChamp: color, epaisseur: jQuery.data( document.body, 'thickness' ) },
				success: function( result ){
					$( '#apercu' ).html( '<img class="elemContent draggable" src="data:image/png;base64,' + result['image'] + '" />' );
					doDraggable();
					$( '#apercu img' ).center( true );
					$('#slongueur').html('<span style="color:red">Longueur:&nbsp;</span>' + result['widthCm'] + ' cm');
					$('#shauteur').html('<span style="color:red">Hauteur:&nbsp;</span>' + result['heightCm'] + ' cm');
					if ( cursor ) {
						$( '#apercu' ).css( 'overflow', 'auto' ); 
						$( '#apercu img' ).css( 'maxWidth', 'none' ).centerV( true );
					} else {
						$( '#apercu' ).css( 'overflow', 'hidden' ); 
						$( '#apercu img' ).css( 'maxWidth', '100%' );
					}
				}
			});
		}
	});

	$( '.minibloc_font' ).click(function(){
		var textVal = $( '#texte' ).val();
		var nbrLetters = textVal.length;
		var selFont = $( this ).data( 'fontcode' );
		tFont = selFont;
		if ( nbrLetters > 11 ) {
			cursor = true;
		} else {
			cursor = false;
		}
		if ( textVal != '' ) {
			$.ajax({
				type: "POST",
				url: "../rapidpubapp/ajax/reliefs_text.php",
				dataType: "json",
				data: { action: 'update', font: tFont, height: jQuery.data( document.body, 'theight' ), perspective: jQuery.data( document.body, 'tperspective' ), text: textVal, couleurFace: cFace, scrollbar: cursor, matiere: matiereSel, couleurChamp: cChamp, epaisseur: jQuery.data( document.body, 'thickness' ) },
				success: function( result ){
					$( '#apercu' ).html( '<img class="elemContent draggable" src="data:image/png;base64,' + result['image'] + '" />' );
					doDraggable();
					$( '#apercu img' ).center( true );
					$('#slongueur').html('<span style="color:red">Longueur:&nbsp;</span>' + result['widthCm'] + ' cm');
					$('#shauteur').html('<span style="color:red">Hauteur:&nbsp;</span>' + result['heightCm'] + ' cm');
					if ( cursor ) {
						$( '#apercu' ).css( 'overflow', 'auto' ); 
						$( '#apercu img' ).css( 'maxWidth', 'none' ).centerV( true );
					} else {
						$( '#apercu' ).css( 'overflow', 'hidden' ); 
						$( '#apercu img' ).css( 'maxWidth', '100%' );
					}
				}
			});
		}
	});
	$( '.carouselImages' ).slick({
		infinite: true,
		slidesToShow: 3,
  		slidesToScroll: 3,
	});
	$( '.carouselImages .slick-slide img' ).hover(
		function() {
			var altImg = $( this ).attr( 'data-altimg' );
			$( '.imgApercu img' ).attr( 'src', altImg );
			$( '.imgApercu').stop().fadeIn();
		},
		function(e) {
			$( '.imgApercu').stop().fadeOut();
		}
	);
	$( '#fond_apercu' ).change(function(){
		var selFond = $( this ).val();
		switch ( selFond ) {
			case 'blanc':
				$( '#apercu' ).css('background', '#fff');
				break;
			case 'noir':
				$( '#apercu' ).css('background', '#333');
				break;
			case 'mur':
				$( '#apercu' ).css('background-image', 'url(./img/briques.jpg)');
				break;
			case 'paysage':
				$( '#apercu' ).css('background-image', 'url(./img/paysage.jpg)');
				break;
		}
	});
});