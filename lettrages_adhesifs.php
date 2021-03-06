<?php
header('Content-Type: text/html; charset=utf-8');
session_start();

require_once( 'includes/connexion.php' );
require_once( 'includes/functions.php' );

function random_color_part() {
    return str_pad( dechex( mt_rand( 0, 255 ) ), 2, '0', STR_PAD_LEFT);
}
function random_color() {
    return random_color_part() . random_color_part() . random_color_part();
}
$statement = $db->prepare("SELECT * FROM couleurs ORDER BY nom ASC");
$statement->execute();
$couleurs = $statement->fetchAll();

$statement2 = $db->prepare("SELECT * FROM couleurs ORDER BY nom ASC LIMIT 20");
$statement2->execute();
$couleurs2 = $statement2->fetchAll();

$productID = md5( uniqid( rand(), true ) );
?>
<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/blitzer/jquery-ui.css" />
<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="./css/hopscotch.min.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/adhesifs.css?<?php echo mt_rand(); ?>" type="text/css" media="all" />
<div id="lettrages_adhesifs_config">
	<div id="etape01"> <!-- ETAPE01 START -->
		<div class="input_container_left">
			<div class="text_left" title="Saisissez le texte qui doit apparaître sur votre adhésif"></div>
			<input type="text" id="texte_adhesif" class="hovereffect" placeholder="Votre texte ici" value="" />
		</div>
		<div class="input_container_right">
			<div class="text_left" title="Dimensions du texte"><span style="font-size:9px">Dimensions en cm</span></div>
			<input type="text" id="dimension_height" class="dimensions_input" maxlength="4" placeholder="Hauteur" value="2" style="margin:0 10px 0 5px" />
			<span style="display:block;float:left;margin:5px 10px 0 2px">x</span>
			<input type="text" id="dimension_width" class="dimensions_input" maxlength="4" placeholder="Largeur" value="" />
		</div>
	</div> <!-- ETAPE01 END -->
	<div id="etape02"> <!-- ETAPE02 START -->
		<div class="apercu_container">
			<div id="height_info"></div>
			<div id="width_info"></div>
			<div id="apercu_texte"></div>
		</div>
	</div> <!-- ETAPE02 END -->
	<div id="etape03"> <!-- ETAPE03 START -->
		<div id="bloc_couleurs">
			<div id="couleurs1">
				<?php
					foreach ( $couleurs AS $color ) {
						echo '<div data-couleurcode="' . $color['hexa'] . '" class="minibloc_couleur" title="' . $color['nom'] . '" style="background-color:' . $color['hexa'] . '"></div>';
					}
					echo '<div class="minibloc_couleur hideset1" data-couleurcode="#ff00fa" id="#ff00fa" style="background:#ff00fa;clear:both"></div>';
					echo '<div class="minibloc_couleur hideset1" data-couleurcode="#ffff00" id="#ffff00" style="background:#ffff00"></div>';
					echo '<div class="minibloc_couleur hideset1" data-couleurcode="#ffbf00" id="#ffbf00" style="background:#ffbf00"></div>';
					echo '<div class="minibloc_couleur hideset1" data-couleurcode="#505559" id="#505559" style="background:#505559"></div>';
					echo '<div class="minibloc_couleur hideset1" data-couleurcode="#E4E4E4" id="#E4E4E4" style="background:#E4E4E4"></div>';
					echo '<div class="minibloc_couleur hideset2" data-couleurcode="#E5C487" id="#E5C487" style="background:#E5C487"></div>';
					echo '<div class="minibloc_couleur hideset2" data-couleurcode="#A08C69" id="#A08C69" style="background:#A08C69"></div>';
				?>
			</div>
			<div id="couleurs2">
				<?php
					foreach ( $couleurs2 AS $color ) {
						echo '<div data-couleurcode="' . $color['hexa'] . '" class="minibloc_couleur" title="' . $color['nom'] . '" style="background-color:' . $color['hexa'] . '"></div>';
					}
				?>
			</div>
			<div id="finition_couleur">
				<label for="finition_select">Finition</label>
				<select id="finition_select">
					<option value="brillant">Brillant</option>
					<option value="mat">Mat</option>
				</select>	
			</div>
		</div>
		<div id="bloc_autre">
			<div id="finition_options">
				<div id="finitionmiroir"><input type="checkbox" id="miroir" /><label for="miroir">Miroir</label></div>
				<div id="finitionpochoir"><input type="checkbox" id="pochoir" /><label for="pochoir">Pochoir</label></div>
			</div>
		</div>
	</div><!-- ETAPE03 END -->
	<div id="etape04"> <!-- ETAPE04 START -->
		<div id="bloc_fonts" class="jcarousel-wrapper">
			<div id="bloc_subfonts" class="jcarousel">
				<ul style="width: 1200px;position:relative;list-style:none;margin:0;padding:0;">
				<?php
					if ( $handle = opendir( './fonts' ) ) {
						while ( false !== ( $entry = readdir( $handle ) ) ) {
							if ( $entry != "." && $entry != ".." ) {
								$fontname = explode( '.', $entry );
								$im = imagecreatetruecolor(100, 30);
								$white = imagecolorallocate($im, 255, 255, 255);
								$grey = imagecolorallocate($im, 128, 128, 128);
								$black = imagecolorallocate($im, 0, 0, 0);
								imagefilledrectangle($im, 0, 0, 99, 29, $white);
								imagettftext($im, 10, 0, 11, 21, $grey, './fonts/' . $entry, str_replace( '_', ' ', $fontname[0] ) );
								imagettftext($im, 10, 0, 10, 20, $black, './fonts/' . $entry, str_replace( '_', ' ', $fontname[0] ) );
								ob_start();
								imagepng( $im );
								$img = ob_get_clean();
								echo '<li class="minibloc_font" title="' . str_replace( '_', ' ', $fontname[0] ) . '" data-fontcode="' .$entry . '"><img src="data:image/png;base64,' . base64_encode( $img ) . '" /></li>';
								imagedestroy( $im );
							}
						}
						closedir( $handle );
					}
				?>
				</ul>
			</div>
			<a href="#" class="jcarousel-control-prev"><img src="./img/arrow_left.png" alt="left" /></a>
			<a href="#" class="jcarousel-control-next"><img src="./img/arrow_right.png" alt="right" /></a>
		</div>
	</div><!-- ETAPE04 END -->
	<div id="etape05"><!-- ETAPE05 START -->
		<div id="part_01">
			<span style="text-transform:uppercase;font-size:14px;color:#70ad24;font-weight:bold">Expédition prévue le <?php echo date( 'd/m/Y', strtotime( "+2 days" ) ); ?></span>
		</div>
		<div id="part_02">
			<span>Quantité: <input style="text-align:center;width:50px;font-weight:bold;color:red" min="1" id="spinner" name="quantite" type="number" value="1"></span>
		</div>
		<div id="part_03">
			<span style="font-size:16px;">Total TTC<span id="prix_ttc" style="float:right;font-weight:bold;font-size:16px;color:red">0.00€</span></span>
			<br><span style="font-size:12px">Prix unitaire<span id="prix_unitaire" style="float:right;">0.00€</span></span>
		</div>
	</div><!-- ETAPE05 END -->
</div>
<script type="text/javascript">
var productID = "<?php echo $productID; $_SESSION['prodID'] = $productID; ?>";
</script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
<script src="./js/jquery.jcarousel.min.js"></script>
<script src="./js/jquery.jcarousel-control.min.js"></script>
<script src="./js/hopscotch.min.js"></script>
<script src="./js/functions.js?<?php echo mt_rand(); ?>"></script>
<script src="./js/adhesifs.js?<?php echo mt_rand(); ?>"></script>