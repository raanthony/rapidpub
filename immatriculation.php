<?php
header('Content-Type: text/html; charset=utf-8');
session_start();
if ( isset( $_SESSION['rapidpub']) )
	session_unset( $_SESSION['rapidpub'] );
require_once( 'includes/connexion.php' );
require_once( 'includes/functions.php' );
function random_color_part() {
    return str_pad( dechex( mt_rand( 0, 255 ) ), 2, '0', STR_PAD_LEFT);
}
function random_color() {
    return random_color_part() . random_color_part() . random_color_part();
}
$arrayColors = array();
for ($i=0;$i<70;$i++) {
	$arrayColors[] = '#' . random_color();
}
$productID = md5( uniqid( rand(), true ) );
?>
<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/blitzer/jquery-ui.css" />
<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="./css/ddlist.jquery.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/immatriculation.css?<?php echo mt_rand(); ?>" type="text/css" media="all" />
<link rel="stylesheet" href="./css/jquery.mCustomScrollbar.min.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/jquery.qtip.min.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/spectrum.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/hopscotch.min.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/sweet-alert.css" type="text/css" media="all" />
<link rel="stylesheet" href="./fancybox/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
<div id="immatriculations_config">
	<div id="cfg_content">
		<div id="select_format">
			<div id="format_title" class="title"><h1>1) Choisissez votre format de plaque d'immatriculation</h1></div>
			<div class="format-select fade" id="select_car" title="Plaque d'immatriculation pour automobile">
				<span style="margin: 30px 0 0 35px;">Format auto</span>
				<img src="./img/plaque_auto.png" alt="" class="imgstyle">
			</div>
			<div class="format-select fade" id="select_moto" title="Plaque d'immatriculation pour moto">
				<span style="margin: 30px 0 0 40px;">Format moto</span>
				<img src="./img/plaque_moto.png" alt="" class="imgstyle">
			</div>
			<div class="format-select fade" id="select_scooter" title="Plaque d'immatriculation pour scooter et cyclo">
				<span style="margin: 30px 0 0 40px;">Format cyclo</span>
				<img src="./img/plaque_scooter.png" alt="" class="imgstyle">
			</div>
		</div>
		<div id="select_finition">
			<div id="finition_auto" class="finition-container">
				<div id="finition_title" class="title"><h1>2) Choisissez la finition de votre plaque</h1></div>
				<div class="finition-select finition-auto" id="select_aluminium_auto">
					<span>Plaque aluminium</span>
					<img src="./img/prix_alu.png" alt="">
				</div>
				<div class="finition-select finition-auto" id="select_plexiglass_auto">
					<span>Plaque plexiglass</span>
					<img src="./img/prix_plexi.png" alt="">
				</div>
				<div class="finition-select finition-auto" id="select_plexiglass_luxe_auto">
					<span>Plaque plexiglass luxe</span>
					<img src="./img/prix_plexi_luxe.png" alt="">
				</div>
				<div class="finition-select finition-auto" id="select_plexiglass_vierge_auto">
					<span>Plaque plexiglass vierge</span>
					<img src="./img/prix_plexi_vierge.png" alt="">
				</div>
			</div>
			<div id="finition_moto" class="finition-container">
				<div id="finition_title" class="title"><h1>2) Choisissez la finition de votre plaque</h1></div>
				<div class="finition-select" id="select_plexiglass_moto">
					<span>Plaque plexiglass</span>
					<img src="./img/prix_plexi_luxe.png" alt="">
				</div>
				<div class="finition-select" id="select_plexiglass_vierge_moto">
					<span>Plaque plexiglass vierge</span>
					<img src="./img/prix_plexi_vierge.png" alt="">
				</div>
			</div>
			<div id="finition_cyclo" class="finition-container">
				<div id="finition_title" class="title"><h1>2) Choisissez la finition de votre plaque</h1></div>
				<div class="finition-select" id="select_plexiglass_cyclo">
					<span>Plaque plexiglass</span>
					<img src="./img/prix_alu.png" alt="">
				</div>
			</div>
		</div>
		<div id="select_region">
			<div id="region_title" class="title" style="margin-left: -10px;"><h1>3) Choisissez votre région</h1></div>
			<?php
				$files = glob( 'img/regions/*.{png}', GLOB_BRACE );
				foreach( $files AS $file ) {
					echo '<div class="region fade" id="' . basename( $file ) . '" style="" title="' . ucfirst( substr( basename( $file ), 0, -4 ) ) . '"><img src="' . $file . '" alt="" /></div>';
				}
			?>
		</div>
		<div id="set_plaque">
			<div id="plaque_title" class="title"><h1>4) Saisissez votre numéro de plaque</h1></div>
			<div id="plaque_container">
				<textarea name="plaque_number" id="plaque_number" maxlength="9" cols="30" rows="10">AA-123-AA</textarea>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
var productID = "<?php echo $productID; $_SESSION['prodID'] = $productID; ?>";
</script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
<script src="./js/spectrum.js"></script>
<script src="./js/jquery.ui.rotatable.min.js"></script>
<script src="./js/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="./js/jquery.qtip.min.js"></script>
<script src="./js/functions.js?<?php echo mt_rand(); ?>"></script>
<script src="./js/ddlist.jquery.min.js"></script>
<script src="./js/hopscotch.min.js"></script>
<script type="text/javascript" src="./fancybox/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript" src="./fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
<script src="./js/sweet-alert.min.js"></script>
<script src="./js/jquery-collision.min.js"></script>
<script src="./js/html2canvas.js"></script>
<script src="./js/immatriculation.js?<?php echo mt_rand(); ?>"></script>
