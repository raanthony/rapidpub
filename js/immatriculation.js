$(function() {
	var setVal = false;
    $('.format-select').hover(function(){
    	$(this).find('img').stop().fadeIn();
    }, function(){
    	$(this).find('img').stop().fadeOut();
    });

    $('.finition-select').hover(function(){
    	$(this).find('img').stop().rotate(20);
    }, function(){
    	$(this).find('img').stop().rotate(0);
    });

    $('.format-select').click(function(e){
    	e.preventDefault();
    	var thisID = $(this).attr('id');
    	if ( !$(this).hasClass('selected_format') ) {
    		$('.selected_format').removeClass('selected_format');
			$(this).addClass('selected_format');
			$('.finition-container').fadeOut();
			setTimeout(function(){
				switch(thisID){
					case 'select_car':
						$('#finition_auto').fadeIn();
					break;
					case 'select_moto':
						$('#finition_moto').fadeIn();
					break;
					case 'select_scooter':
						$('#finition_cyclo').fadeIn();
					break;
				}
			}, 300);
    	}
    });

    $('.finition-select').click(function(e){
    	e.preventDefault();
    	var thisID = $(this).attr('id');
    	switch ( thisID ) {
    		case 'select_aluminium_auto':
    			$('#set_plaque').fadeIn();
    			$('#select_region').slideDown(300);
    			$('#plaque_container').delay(300).css({ background: 'url("./img/plaque_auto_aluminium.png")', width: '593px', height: '137px' });
    			$('#plaque_number').css({ width: '395px'});
    		break;
    		case 'select_plexiglass_auto':
    		case 'select_plexiglass_luxe_auto':
    			$('#set_plaque').fadeIn();
    			$('#select_region').slideDown(300);
    			$('#plaque_container').delay(300).css({ background: 'url("./img/plaque_auto_plexiglass.png")', width: '593px', height: '137px' });
    			$('#plaque_number').css({ width: '395px'});
    		break;
    		case 'select_plexiglass_vierge_auto':
    			$('#select_region').fadeOut();
    			$('#set_plaque').fadeIn();
    			$('#plaque_container').delay(300).css({ background: 'url("./img/plaque_auto_plexi_vierge.png")', width: '593px', height: '137px' });
    		break;
    		case 'select_plexiglass_vierge_moto':
    			$('#select_region').fadeOut();
    			$('#set_plaque').fadeIn();
    			$('#plaque_container').delay(300).css({ background: 'url("./img/plaque_moto_plexiglass_vierge.png")', width: '330px', height: '221px' });
    			console.log('plexi_moto_vierge');
    		break;
    		case 'select_plexiglass_moto':
    			$('#select_region').fadeIn();
    			$('#set_plaque').fadeIn();
    			$('#plaque_container').delay(300).css({ background: 'url("./img/plaque_moto_plexiglass.png")', width: '330px', height: '221px' });
    			console.log('plexi_moto');
    		break;
    		case 'select_plexiglass_cyclo':
    			$('#select_region').fadeOut();
    			$('#set_plaque').fadeIn();
    			$('#plaque_container').delay(300).css({ background: 'url("./img/plaque_cyclo_plexiglass.png")', width: '272px', height: '232px' });
    		break;
    	}
    	if ( !$(this).hasClass('selected_finition') ) {
    		$('.selected_finition').removeClass('selected_finition');
    		$(this).addClass('selected_finition');
    	}
    });

    $('.region').click(function(e){
    	e.preventDefault();
    	if ( !$(this).hasClass('selected_region') ) {
    		$('.selected_region').removeClass('selected_region');
    		$(this).addClass('selected_region');
    	}
    	$('#set_plaque').fadeIn();
    });
	function check(s) {
		var toks = s.split('-');
		switch(toks.length){
			case 3:
				if (!/^[A-Za-z]{0,2}$/.test(toks[2].trim())) return false;
			case 2:
				if (!/^\d{0,3}$/.test(toks[1].trim())) return false;
			case 1:
			return /^[A-Za-z]{0,2}$/.test(toks[0].trim());
			default:
			return false;
		}  
	}
	var oldvalue = '';
	$('#plaque_number').keyup(function(){
		if (!check(this.value)) {
			this.value = oldvalue;
		} else {
			oldvalue = this.value;
		}
	});

});