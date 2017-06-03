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
<link rel="stylesheet" href="./css/ddlist.jquery.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/gravograph.css?<?php echo mt_rand(); ?>" type="text/css" media="all" />
<link rel="stylesheet" href="./css/jquery.mCustomScrollbar.min.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/jquery.qtip.min.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/spectrum.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/hopscotch.min.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/sweet-alert.css" type="text/css" media="all" />
<link rel="stylesheet" href="./fancybox/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
<div id="gravograph_config">
	<div class="container-left">
		<div id="block_left">
			<div id="text_content">
				<div class="img">
					
				</div>
				<div class="text">
					<h1>Gravograph</h1>
					<p class="mCustomScrollbar" data-mcs-theme="dark">
						Créez votre gravograph !<br>
						Vestibulum eu tempus arcu. Etiam porta felis ac risus dignissim faucibus et a leo. Cras scelerisque dolor non felis faucibus sodales. Nulla nec ullamcorper nunc. Nam hendrerit varius tempor. Proin consectetur lectus eu nulla accumsan dapibus vel id felis. Nunc id sollicitudin nisi. Aenean vitae bibendum lorem. Proin non blandit orci, aliquam posuere augue.
						Vestibulum eu tempus arcu. Etiam porta felis ac risus dignissim faucibus et a leo. Cras scelerisque dolor non felis faucibus sodales. Nulla nec ullamcorper nunc. Nam hendrerit varius tempor. Proin consectetur lectus eu nulla accumsan dapibus vel id felis. Nunc id sollicitudin nisi. Aenean vitae bibendum lorem. Proin non blandit orci, aliquam posuere augue.
					</p>
				</div>
			</div>
			<div id="cfg_content">
				<div style="width:325px;height:auto;margin:0 auto;float:left">Longueur : <input title="Cliquez sur un élément de votre création et modifiez ses dimensions ici" class="elemSize" type="text" id="elem_width" disabled / > - Hauteur : <input title="Cliquez sur un élément de votre création et modifiez ses dimensions ici" class="elemSize" type="text" id="elem_height" disabled / ></div><div style="float:left"><img src="img/valid.png" id="validSize" style="width:15px;height:auto" alt="" title="Valider les modifications"></div>
			</div>
			<div id="apercu_content">
				<div id="gravograph_bg">
					<div id="gravograph_content">
						<div id="gravograph_width"></div><div id="gravograph_height"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container-right">
		<div id="block_right">
			<div id="config_right">
				<div id="dimensions">
					<div class="step_container" style="margin-left:5px"><span class="step">1</span></div>
					<span class="dimensionstext">Dimensions <span class="small">(en cm)</span></span>
					<div id="longueur_cfg" style="position:relative">
						<img src="./img/longueur.png" class="dim_img" alt="" style="left:0">
						<input type="text" maxlength="5" id="longueur" placeholder="longueur" class="dimensions_gravograph" />
					</div>
					<div id="hauteur_cfg" style="position:relative;margin-left: 10px;">
						<img src="./img/hauteur.png" class="dim_img" alt="" style="left:0">
						<input type="text" maxlength="5" id="hauteur" placeholder="hauteur" class="dimensions_gravograph" />
					</div>
				</div>
			</div>
		</div>
		<div id="block_right4">
			<div class="step_container" style="width:190px;margin-bottom:5px;"><span class="step">2</span><span class="step_title">Combinaisons de couleurs</span></div>
			<div class="container-outer" id="combinaisons" style="width:375px;overflow-y:hidden;overflow-x:scroll;height:100px;">
				<div class="container-inner">
					<?php
						$couleurs = array(
							array("bg" => "#000000", "color" => "#D77511"),
							array("bg" => "#FFFFFF", "color" => "#ED691C"),
							array("bg" => "#000000", "color" => "#EDAF09"),
							array("bg" => "#000000", "color" => "#FFE400"),
							array("bg" => "#005191", "color" => "#FFE400"),
							array("bg" => "#DC0714", "color" => "#FFE400"),
							array("bg" => "#000000", "color" => "#F5EACF"),
							array("bg" => "#000000", "color" => "#FFFFFF"),
							array("bg" => "#005191", "color" => "#FFFFFF"),
							array("bg" => "#DC0714", "color" => "#FFFFFF"),
							array("bg" => "#FFFFFF", "color" => "#005191"),
							array("bg" => "#000000", "color" => "#0D92D2"),
							array("bg" => "#FFFFFF", "color" => "#0D92D2"),
							array("bg" => "#FFFFFF", "color" => "#005437"),
							array("bg" => "#FFFFFF", "color" => "#009B3E"),
							array("bg" => "#FFFFFF", "color" => "#7F62A2"),
							array("bg" => "#D0B15A", "color" => "#65163D"),
							array("bg" => "#FFFFFF", "color" => "#7E163D"),
							array("bg" => "#FFE400", "color" => "#DC0714"),
							array("bg" => "#FFFFFF", "color" => "#DC0714"),
							array("bg" => "#000000", "color" => "#F1F8F2"),
							array("bg" => "#005191", "color" => "#F1F8F2"),
							array("bg" => "#000000", "color" => "#D6D4DD"),
							array("bg" => "#000000", "color" => "#EBEEEB"),
							array("bg" => "#000000", "color" => "#AD8F6C"),
							array("bg" => "#FFFFFF", "color" => "#2C0A01"),
							array("bg" => "#FFFFFF", "color" => "#4F2C12"),
							array("bg" => "#D0B15A", "color" => "#1A1D56"),
							array("bg" => "#FFFFFF", "color" => "#1A1D56"),
							array("bg" => "#FFE400", "color" => "#005191"),
							array("bg" => "#D0B15A", "color" => "#1D1D1B"),
							array("bg" => "#FFE400", "color" => "#1D1D1B"),
							array("bg" => "#FFFFFF", "color" => "#1D1D1B"),
							array("bg" => "#000000", "color" => "#646363"),
							array("bg" => "#FFFFFF", "color" => "#646363"),
							array("bg" => "#000000", "color" => "#E6AF52"),
							array("bg" => "#000000", "color" => "#FCD1A0"),
							array("bg" => "#000000", "color" => "#F7D8A4"),
							array("bg" => "#000000", "color" => "#FBECD3"),
							array("bg" => "#000000", "color" => "#DADADA")
						);
						foreach ( $couleurs AS $couleur ) {
							echo '<div class="colorcontainer" data-bgcolor="' . $couleur['bg'] . '" data-gcolor="' . $couleur['color'] . '"><div class="graphcolor" style="background-color:' . $couleur['bg'] . '" title="Couleur de fond"></div><div class="graphcolor" style="background-color:' . $couleur['color'] . '" title="Couleur de gravure"></div></div>';
						}
					?>
				</div>
			</div>
		</div>
		<div id="block_right2">
			<div id="text_right">
                <div class="text_left"></div><input type="text" name="textecfg" id="textecfg" value="" placeholder="Insérer un texte" /><button id="add_text" title="Ajouter le texte saisi">ok</button>
                <div style="overflow:hidden;padding-top:5px"><div id="textmoins" class="cmoins" title="Réduire la taille du texte sélectionné"></div><div id="textplus" class="cplus" title="Augmenter la taille du texte  sélectionné"></div></div>
            </div>
			<div id="policecontainer">
				<select id="police" name="police">
					<?php
						$polices = array();
						if ( $handle = opendir( './fonts' ) ) {
							while ( false !== ( $entry = readdir( $handle ) ) ) {
								if ( $entry != "." && $entry != ".." ) {
									$polices[] = $entry;
								}
							}
							closedir( $handle );
							sort( $polices );
							foreach ( $polices as $police ) {
								$fontname = explode( '.', $police );
								$im = imagecreatetruecolor(100, 30);
								$white = imagecolorallocate( $im, 255, 255, 255);
								$grey = imagecolorallocate( $im, 128, 128, 128);
								$black = imagecolorallocate($im, 0, 0, 0);
								imagefilledrectangle($im, 0, 0, 99, 29, $white);
								imagettftext($im, 10, 0, 11, 21, $grey, './fonts/' . $police, str_replace( '_', ' ', $fontname[0] ) );
								imagettftext($im, 10, 0, 10, 20, $black, './fonts/' . $police, str_replace( '_', ' ', $fontname[0] ) );
								ob_start();
								imagepng( $im );
								$img = ob_get_clean();
								echo '<option value="' .$police . '">' . str_replace( '_', ' ', $fontname[0] ) . '</option>';
								imagedestroy( $im );
							}
						}
					?>
				</select>
			</div>
			<div class="step_container" style="width:145px"><span class="step">3</span><span class="step_title">Choisir une police</span></div>
		</div>
		<div id="block_right3" style="background-color:#F4F4F4">
			<div style="margin-bottom:10px;padding-top:5px">
				<div class="step_container" style="width:165px;margin-right: 45px;"><span class="step">4</span><span class="step_title">Insérer un pictogramme</span></div>
				<select id="themes" name="themes">
					<option value="divers" selected="selected">Divers</option>
					<option value="vehicules">Véhicules</option>
					<option value="personnages">Personnages</option>
					<option value="signes">Signes</option>
					<option value="outils">Outils</option>
				</select>
			</div>
			<div id="motifs_contain">
				<div id="motifs_container">
					<?php
						$files = glob( 'img/motifs/divers/*.{png}', GLOB_BRACE );
						foreach( $files AS $file ) {
							echo '<div title="Ajouter un motif sur votre plaque" class="motif" id="' . basename( $file ) . '" style="background-size:100%;background-image: url(' . $file . ');" title="' . $file . '"></div>';
						}
					?>
				</div>
			</div>
			<!--<div id="motif_custom">
				<button id="uploadFile" title="Ajouter une image">Télécharger une image</button>
				<button id="drawRect" title="Dessiner une forme">Dessiner une forme</button>
			</div>
			<div id="uploadFileContent">
				<div>
					<h1>Télécharger une image</h1>
					<p>Choisissez une image au format <strong>.gif</strong> ou <strong>.png</strong> sur fond transparent et sans bordure de préférence.<br>Si votre image dispose d'un fond (blanc ou de couleur) et d'une bordure, ceux-ci seront imprimés*.</p>
					<p>
						<div style="float:left;width:auto;margin-left:40px;">
							<span style="font-size:12px;font-weight:bold">Image sur fond transparent</span><br>
							<img style="border: 1px solid #ccc;" src="img/fond_transparent_small.jpg" alt="">
						</div>
						<div style="float:left;width:auto;margin-left:40px;">
							<span style="font-size:12px;font-weight:bold">Image sur fond plein</span><br>
							<img style="border: 1px solid #ccc;" src="img/fond_couleur_small.jpg" alt="">
						</div>
						<div style="clear:both"></div>
						<div id="progressbar" style="display:none" max="100" value="0"></div>
						<button class="dlbutton download" style="float:none;margin-top:10px">Télécharger</button>
					</p>
					<p><em style="font-size:10px">*Sous réserve de faisabilité</em></p>
					<div class="hiddenfile">
						<input name="imageupload" type="file" id="fileinput"/>
					</div>
				</div>
			</div>-->
		</div>
		<!--<div id="block_right4">
			<div id="conftabs" style="overflow: hidden;">
				<ul>
					<li><a href="#element">Couleurs</a></li>
					<li><a href="#fondmicroperfo">Fond</a></li>
					<li><a href="#calques">Calques</a></li>
				</ul>
				<div id="element">
					<p style="font-weight:bold;color:#c70077 !important">Couleur de l'élément sélectionné <em style="font-size:10px">(entouré en rouge sur l'aperçu)</em></p>
					<div id="colorpicker-element">
						<?php
							foreach ( $arrayColors AS $color ) {
								echo '<div data-hexcolor="' . $color . '" class="colorblock" style="background-color:' . $color . '" title="' . $color . '"></div>';
							}
						?>
					</div>
				</div>
				<div id="fondmicroperfo">
					<p style="font-weight:bold;color:#c70077 !important;font-size:12px">Fond <span id="styleFond"></span></p>
					<p style="font-size:12px">Vous pouvez dessiner le fond de votre gravograph en cliquant sur le bouton ci-desssous puis en sélectionnant la zone du fond voulu sur l'aperçu à gauche.</p>
					<button id="fondAdhesif">Dessiner un fond</button>
					<button id="fondAdhesifColor">Couleur du fond</button>
				</div>
				<div id="calques">
					<ul id="calques">

					</ul>
				</div>
			</div>
		</div>-->
		<div id="block_right4_2" style="position:relative;background-color:#F4F4F4">
			<div class="step_container" style="width:190px"><span class="step">5</span><span class="step_title">Dupliquer / Aligner / Inverser</span></div>
			<div id="align_container">
				<div id="duplicate" class="alignmove" title="Dupliquer l'élément"></div>
				<div id="center_h" class="alignmove" title="Centrer horizontalement"></div>
				<div id="center_v" class="alignmove" title="Centrer verticalement"></div>
				<div id="center" class="alignmove" title="Centrer horizontalement et verticalement"></div>
				<div id="move_left" class="alignmove" title="Déplacer à gauche"></div>
				<div id="move_right" class="alignmove" title="Déplacer à droite"></div>
				<div id="move_top" class="alignmove" title="Déplacer vers le haut"></div>
				<div id="move_bottom" class="alignmove" title="Déplacer vers le bas"></div>
				<div id="flip_vertical" class="alignmove" title="Rotation verticale"></div>
				<div id="flip_horizontal" class="alignmove" title="Rotation horizontale"></div>
			</div>
			<!--<div class="sizes" style="position: absolute;right: 0;top: 13px;">
				<label for="sizes" style="font-size:12px;cursor:pointer">Afficher les dimensions</label><input id="sizes" type="checkbox" checked style="cursor:pointer">
			</div>-->
		</div>
		<div id="block_right6">
			<div style="width:150px;position:relative;z-index:10;height:40px;margin:5px auto 0 auto;background:#70c007"><span style="display:block;padding-top:8px;color:#fff;font-size:18px">NOTRE PRIX</span></div>
			<div id="prix">
				<div id="prix_container">
					<span id="prix_ht"><span>0.00</span> € HT</span>
					<span id="prix_ttc">Soit <span>0.00</span> € TTC</span>
				</div>
			</div>
			<span style="text-transform:uppercase;font-size:14px;color:#70ad24;font-weight:bold">Expédition prévue le <?php echo date( 'd/m/Y', strtotime( "+2 days" ) ); ?></span>
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
<script src="./js/functionsgravograph.js?<?php echo mt_rand(); ?>"></script>
<script src="./js/ddlist.jquery.min.js"></script>
<script src="./js/hopscotch.min.js"></script>
<script type="text/javascript" src="./fancybox/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript" src="./fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
<script src="./js/sweet-alert.min.js"></script>
<script src="./js/jquery-collision.min.js"></script>
<script src="./js/html2canvas.js"></script>
<script src="./js/gravograph.js?<?php echo mt_rand(); ?>"></script>
