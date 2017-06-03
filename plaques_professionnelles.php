<?php
header('Content-Type: text/html; charset=utf-8');
session_start();
if ( isset( $_SESSION['rapidpub']) )
	session_unset( $_SESSION['rapidpub'] );
require_once( 'includes/connexion.php' );
$productID = md5( uniqid( rand(), true ) );
?>
<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/blitzer/jquery-ui.css" />
<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="./css/ddlist.jquery.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/plaques.css?<?php echo mt_rand(); ?>" type="text/css" media="all" />
<link rel="stylesheet" href="./css/jquery.mCustomScrollbar.min.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/jquery.qtip.min.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/spectrum.css" type="text/css" media="all" />
<div id="plaques_professionnelles_config">
	<div class="container-left">
		<div id="block_left">
			<div id="text_content">
				<div class="img">
					<img src="./img/img_left.jpg" alt="Créer plaque professionnelle en ligne" title="Produit préféré de nos clients" />
				</div>
				<div class="text">
					<h1>Plaques professionnelles en Plexiglass</h1>
					<p class="mCustomScrollbar" data-mcs-theme="dark">
						Plaques professionnelles et plaques de société en plexiglas transparent ou avec fond en couleur.<br>Grâce à ces plaques professionnelles et plaques de société design et modernes, l'entrée de votre cabinet ou de votre entreprise ne passera plus inaperçue !<br>
						Vestibulum eu tempus arcu. Etiam porta felis ac risus dignissim faucibus et a leo. Cras scelerisque dolor non felis faucibus sodales. Nulla nec ullamcorper nunc. Nam hendrerit varius tempor. Proin consectetur lectus eu nulla accumsan dapibus vel id felis. Nunc id sollicitudin nisi. Aenean vitae bibendum lorem. Proin non blandit orci, aliquam posuere augue.
					</p>
				</div>
			</div>
			<div id="apercu_content">
				<div id="plaque_bg">
					<div id="fixations_plaque">
						<div class="fixation fixation_hg"></div><div class="fixation fixation_hd"></div><div class="fixation fixation_bg"></div><div class="fixation fixation_bd"></div>
					</div>
					<div id="plaque_content"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="container-right">
		<div id="block_right">
			<div id="config_right">
				<div id="dimensions">
					<div class="step_container" style="margin-left:5px"><span class="step">1</span></div>
					<span class="dimensionstext">Dimensions <span class="small">en cm</span></span>
					<select id="dimensionssel" name="dimensionssel">
						<?php
							$statement = $db->prepare("select * from tarifs_plaques order by id");
							$statement->execute();
							$row = $statement->fetchAll();

							foreach ( $row AS $tarif ) {
								echo '<option value="' . $tarif['id'] . '">' . $tarif['dimensions']. '</option>';
							}
						?>
					</select>
				</div>
				<div id="matierecontainer">
					<div class="step_container" style="width:160px"><span class="step">2</span><span class="step_title">Choisir une matière</span></div>
					<select id="matiere" name="matiere">
						<?php
							$statement = $db->prepare("select * from matieres order by id");
							$statement->execute();
							$row = $statement->fetchAll();

							foreach ( $row AS $matiere ) {
								echo '<option value="' . $matiere['id'] . '">' . $matiere['nom']. '</option>';
							}
						?>
					</select>
				</div>
			</div>
		</div>
		<div id="block_right2">
			<div id="text_right">
				<div class="text_left"></div><input type="text" name="textecfg" id="textecfg" value="" placeholder="Insérer un texte" /><button id="add_text" title="Ajouter le texte saisi">ok</button>
			</div>
			<div id="policecontainer">
				<select id="police" name="police">
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
									echo '<option value="' .$entry . '">' . $fontname[0] . '</option>';
									imagedestroy( $im );
								}
							}
							closedir( $handle );
						}
					?>
				</select>
			</div>
			<div class="step_container" style="width:145px"><span class="step">3</span><span class="step_title">Choisir une police</span></div>
		</div>
		<div id="block_right3">
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
			<div id="motif_custom">
				<button id="ajouter_motif" title="Ajouter votre propre motif: +40.00€ HT"></button>
			</div>
		</div>
		<div id="block_right4">
			<div id="conftabs">
				<ul>
					<li><a href="#element">Élément</a></li>
					<li><a href="#fond">Fond</a></li>
					<li><a href="#bordure">Bordure</a></li>
					<li><a href="#calques">Calques</a></li>
				</ul>
				<div id="element">
					<p style="font-weight:bold;color:#c70077 !important">Couleur de l'élément sélectionné</p>
					<?php
						/*foreach ( $couleurs AS $couleur ) {
							echo '<div class="couleur_element" data-couleurcode="' . $couleur['code'] . '" id="couleur-' . str_replace( ' ', '_', $couleur['nom'] ) . '" title="' . ucfirst( $couleur['nom'] ) . '" style="background:' . $couleur['code'] . '"></div>';
						}*/
					?>
					<div id="colorpicker-element">
						<div id="colorpicker1" class="nuancier"></div>
					</div>
				</div>
				<div id="fond">
					<p style="font-weight:bold;color:#c70077 !important">Couleur de fond de votre plaque</p>
					<div id="colorpicker-fond">
						<div id="colorpicker2"></div>
					</div>
				</div>
				<div id="bordure">
					<p style="font-weight:bold;color:#c70077 !important">Bordure de plaque</p>
					<div id="bordure_cfg">
						<label for="epaisseur">Épaisseur de la bordure (en mm)</label><input id="epaisseur" type="number" value="0"/>
						<div class="spacer10"></div>
						<label for="distance">Distance du bord (en mm)</label><input id="distance" type="number" value="0"/><br>						
					</div>
				</div>
				<div id="calques">
					<ul id="calques">
						
					</ul>
				</div>
			</div>
		</div>
		<div id="block_right4_2">
			<div class="step_container" style="width:160px"><span class="step">6</span><span class="step_title">Inverser / Aligner</span></div>
			<div id="align_container">
				<div id="center" class="alignmove" title="Center"></div>
				<div id="move_left" class="alignmove" title="Déplacer à gauche"></div>
				<div id="move_right" class="alignmove" title="Déplacer à droite"></div>
				<div id="move_top" class="alignmove" title="Déplacer vers le haut"></div>
				<div id="move_bottom" class="alignmove" title="Déplacer vers le bas"></div>
				<div id="flip_vertical" class="alignmove" title="Rotation verticale"></div>
				<div id="flip_horizontal" class="alignmove" title="Rotation horizontale"></div>
			</div>
		</div>
		<div id="block_right5">
			<div class="step_container" style="width:160px"><span class="step">6</span><span class="step_title">Choisir les fixations</span></div>
			<div id="fixations">
				<a href="#" id="aucune" class="selectfixation" style="margin-left: 50px;"><span style="display:block;margin-top:13px">Aucune fixation</span></a>
				<a href="#" id="fix1" class="selectfixation selected"><img src="./img/fix1.png" alt="" style="margin-top:10px" /></a>
				<a href="#" id="fix2" class="selectfixation"><img src="./img/fix2.png" alt="" style="margin-top:10px" /></a>
				<a href="#" id="adhesifs" class="selectfixation"><span style="display:block;margin-top:23px">Adhésifs</span></a>
			</div>
		</div>
		<div id="block_right6">
			<?php
			$statement = $db->prepare("select * from tarifs_plaques order by id");
			$statement->execute();
			$row2 = $statement->fetch();
			?>
			<p style="margin: 0">Prix généralement constaté <span id="prix_constate"><?php echo $row2['prix_constate']  ?></span> € TTC</p>
			<div style="width:150px;position:relative;z-index:10;height:40px;margin:5px auto 0 auto;background:#70c007"><span style="display:block;padding-top:8px;color:#fff;font-size:18px">NOTRE PRIX</span></div>
			<div id="prix">
				<div id="prix_container">
					<span id="prix_ht"><span><?php echo $row2['prix']  ?></span> € HT</span>
					<span id="prix_ttc">Soit 00,00 € TTC</span>
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
<script src="./js/functions.js?<?php echo mt_rand(); ?>"></script>
<script src="./js/ddlist.jquery.min.js"></script>
<script src="./js/plaques.js?<?php echo mt_rand(); ?>"></script>