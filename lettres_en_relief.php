<?php
header('Content-Type: text/html; charset=utf-8');
session_start();
if ( isset( $_SESSION['rapidpub']) )
	session_unset( $_SESSION['rapidpub'] );
require_once( 'includes/connexion.php' );
function random_color_part() {
    
    return str_pad(dechex(mt_rand(0, 255)), 2, '0', STR_PAD_LEFT);
}
function random_color() {
    
    return random_color_part() . random_color_part() . random_color_part();
}
$statement = $db->prepare("SELECT * FROM couleurs ORDER BY nom ASC");
$statement->execute();
$couleurs = $statement->fetchAll();

$productID = md5( uniqid( rand(), true ) );
$_SESSION['prodID'] = $productID;
?>
<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/blitzer/jquery-ui.css" />
<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="./css/ddlist.jquery.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/reliefs.css?<?php echo mt_rand(); ?>" type="text/css" media="all" />
<link rel="stylesheet" href="./css/jquery.mCustomScrollbar.min.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/jquery.qtip.min.css" type="text/css" media="all" />
<link rel="stylesheet" href="./css/hopscotch.min.css" type="text/css" media="all" />
<link rel="stylesheet" type="text/css" href="slick/slick.css"/>
<link rel="stylesheet" type="text/css" href="slick/slick-theme.css"/>
<link rel="stylesheet" href="./fancybox/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
<link href="./skins/flat/red.css" rel="stylesheet">
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

<div id="lettres_en_relief">
	<div id="descriptif">
		<div class="block_left">
			<div class="images">
				<div class="carouselImages">
					<div><img src="http://placehold.it/130x130/ff0000/ffffff" data-altimg="http://placehold.it/390x440/ff0000/ffffff" alt="" /></div>
					<div><img src="http://placehold.it/130x130/ff00ee/ffffff" data-altimg="http://placehold.it/390x440/ff00ee/ffffff" alt="" /></div>
					<div><img src="http://placehold.it/130x130/5900ff/ffffff" data-altimg="http://placehold.it/390x440/5900ff/ffffff" alt="" /></div>
					<div><img src="http://placehold.it/130x130/0037ff/ffffff" data-altimg="http://placehold.it/390x440/0037ff/ffffff" alt="" /></div>
					<div><img src="http://placehold.it/130x130/00c7ff/ffffff" data-altimg="http://placehold.it/390x440/00c7ff/ffffff" alt="" /></div>
					<div><img src="http://placehold.it/130x130/00ff9d/ffffff" data-altimg="http://placehold.it/390x440/00ff9d/ffffff" alt="" /></div>
					<div><img src="http://placehold.it/130x130/00ff00/ffffff" data-altimg="http://placehold.it/390x440/00ff00/ffffff" alt="" /></div>
					<div><img src="http://placehold.it/130x130/c3ff00/ffffff" data-altimg="http://placehold.it/390x440/c3ff00/ffffff" alt="" /></div>
					<div><img src="http://placehold.it/130x130/ff7200/ffffff" data-altimg="http://placehold.it/390x440/ff7200/ffffff" alt="" /></div>
				</div>
			</div>
			<div class="texte">
				<p>
					<strong>Lettres en relief PVC</strong><br>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula ultrices egestas. Nam felis libero, interdum vel malesuada at, suscipit in odio. Aenean commodo, ipsum nec egestas laoreet, lorem nunc commodo mi, eget tempor orci justo et diam. Donec pharetra pulvinar mollis. Praesent consequat hendrerit diam vel luctus. Mauris dictum luctus pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In congue lacinia justo, sed imperdiet tellus interdum ac. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed at porttitor tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
					Nunc vel tristique mauris. Duis vehicula nec erat vel dignissim. Quisque ac vehicula nulla. Maecenas consectetur magna nec lorem rhoncus venenatis. Aenean rutrum nisl vel justo lacinia, in pulvinar nisl lobortis. Vestibulum posuere a velit nec pretium. Duis ultricies, odio et volutpat ullamcorper, nulla turpis auctor turpis, ac placerat nunc leo a sapien. In fermentum magna vel efficitur rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce facilisis malesuada dui at congue. Curabitur in arcu orci. Morbi non nisi at justo finibus egestas sit amet molestie mi. Vestibulum eu lectus ex. Aliquam vehicula purus eu lobortis euismod. Nullam sed mattis ante. Pellentesque neque mi, pretium non porta at, volutpat sed eros.
				</p>
			</div>
		</div>
		<div class="block_right">
			<div class="image">
				<img src="http://placehold.it/330x130/333333/ffffff" alt="" />
			</div>
		</div>
	</div>
	<div id="configurateur">
		<div class="block_left">
			<div id="panel">
				<div class="imgApercu">
					<img src="#" alt="">
				</div>
				<div id="productCfg" class="border">
					<div class="floatLeft"><span class="sectionTitre" style="margin:10px 4px 0 0;">Choix de la matière</span></div>
					<div class="floatLeft" style="margin-top:5px;width:220px;">
					<select name="matiere" id="matiere">
						<?php
							$statement = $db->prepare("SELECT * FROM lettres_matieres ORDER BY nom ASC");
							$statement->execute();
							$row = $statement->fetchAll();
							$i = 0;
							foreach ( $row AS $matiere ) {
								if ( $i == 0 )
									$idselect = $matiere['id'];
								echo '<option value="' . $matiere['id'] . '">' . $matiere['nom']. '</option>';
								$i++;
							}
						?>
					</select></div>
				</div>
				<div id="heightCfg" class="border">
					<div class="floatLeft"><span class="sectionTitre" style="margin:10px 4px 0 4px;">Hauteur de lettre</span></div>
					<div class="floatLeft" style="margin-top:5px"><select name="hauteur_lettres" id="hauteur_lettres">
						<?php
							$statement = $db->prepare("SELECT * FROM tailles_lettres WHERE actif = 1 ORDER BY taille ASC");
							$statement->execute();
							$row = $statement->fetchAll();

							foreach ( $row AS $taille ) {
								echo '<option value="' . $taille['taille'] . '">' . $taille['nom']. '</option>';
							}
						?>
					</select></div>
					<div class="floatLeft" style="margin-top: 3px;">
						<button id="uploadFile" class="upload-button">À partir de votre fichier</button>
					</div>
					<div id="uploadFileContent">
						<div>
							<h1>À partir de votre fichier</h1>
							<div>Pour recevoir un devis détaillé basé sur votre fichier de travail, veuillez remplir le formulaire ci-dessous et télécharger votre fichier au format vectoriel (.pdf, .ai ou .eps).</div>
							<form action="/">
								<label for="nom">Nom </label>
								<input type="text" id="nom" name="nom" placeholder="Nom..."><br>
								<label for="prenom">Prénom </label>
								<input type="text" id="prenom" name="prenom" placeholder="Prénom..."><br>
								<label for="email">Email </label>
								<input type="text" id="email" name="email" placeholder="Email..."><br>
								<label for="telephone">Téléphone </label>
								<input type="text" id="telephone" name="telephone" placeholder="Téléphone..."><br>
								<label for="infos">Descriptif </label>
								<textarea style="resize: none;width:173px" name="infos" id="infos" cols="30" rows="10" placeholder="Décrivez en détaillant au possible votre projet (textes, couleurs, police, matière souhaitée, hauteur de lettre etc...)."></textarea><br><br>
								<label for="fichier">Fichier </label>
								<input type="file" name="fichier" id="fichier"><br>
								<em style="float:left;font-size:10px">Formats acceptés: pdf, jpg et png</em>
								<br><button class="upload-button" style="width:150px">Envoyer</button>
							</form>
						</div>
						<div>
							<div>Votre demande sera traîtée sous <strong>48 heures ouvrées</strong>*.</p>
							<p><em>*Sous réserve de faisabilité</em></p></div>
						</div>
					</div>					
				</div>
				<div id="thicknessCfg" class="border">
					<div class="epaisseur">
						<span class="sectionTitre" style="margin-bottom:3px">Épaisseur des lettres</span>
						<div class="radioContainer">
							<?php
								$statement = $db->prepare("SELECT * FROM epaisseurs_lettres WHERE id_matiere = :id_matiere ORDER BY epaisseur ASC");
								$statement->execute(array(':id_matiere' => $idselect));
								$row = $statement->fetchAll();
								$i = 0;
								foreach ( $row AS $epaisseur ) {
									if ( $i == 0 ) {
										echo '<input class="epaisseur" name="epaisseur_lettres" ' . ( $epaisseur['couleurs'] == 0 ? 'data-color=0' : 'data-color=1' ) . ' data-epaisseur="' . $epaisseur['epaisseur'] . '" type="radio" id="' . $epaisseur['id'] . '" value="' . $epaisseur['id'] . '" checked><label for="' . $epaisseur['id'] . '">' . $epaisseur['nom'] . '</label>';
										$epaisseur2 = $epaisseur['epaisseur'];
										if ( $epaisseur['couleurs'] == 0 ){
											echo '<script type="text/javascript">$(function(){ $( "#MsgColors" ).show(); $( ".minibloc_couleur" ).hide(); });</script>';
										}
									} else
										echo '<input class="epaisseur" name="epaisseur_lettres" ' . ( $epaisseur['couleurs'] == 0 ? 'data-color=0' : 'data-color=1' ) . ' data-epaisseur="' . $epaisseur['epaisseur'] . '" type="radio" id="' . $epaisseur['id'] . '" value="' . $epaisseur['id'] . '"><label for="' . $epaisseur['id'] . '">' . $epaisseur['nom'] . '</label>';
									$i++;
								}
							?>
						</div>
					</div>
				</div>
				<div id="textCfg" class="border">
					<div class="texte">
						<input type="text" name="texte" id="texte" placeholder="Saisissez votre texte ici">
					</div>						
				</div>
				<div id="fontCfg">
					<div id="bloc_fonts" class="jcarousel-wrapper">
						<div id="bloc_subfonts" class="jcarousel">
							<ul style="overflow:hidden;width: 1200px;height:70px !important;position:relative;list-style:none;margin:0;padding:0;">
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
				</div>
				<div id="colorCfg" class="border">
					<div id="bloc_couleurs">
						<span class="sectionTitre" style="margin-bottom:3px">Couleur de face</span>
						<span id="MsgColors">La matière sélectionnée ne permet pas d'appliquer une couleur de face.</span>
						<?php
							foreach ( $couleurs AS $color ) {
								echo '<div data-hexcolor="' . $color['hexa'] . '" class="minibloc_couleur" title="' . $color['nom'] . '" style="background-color:' . $color['hexa'] . '"></div>';
							}
						?>
					</div>
				</div>
				<div id="priceCfg">
					
				</div>
				<div id="add2Cart">
					
				</div>
			</div>
		</div>
		<div class="block_right" style="position:relative">
			<div id="perspective">
				<label for="tperspective" style="margin-right: 0 !important;">Vue en relief</label> <input type="checkbox" name="tperspective" id="tperspective">
			</div>
			<div id="creation_fond">
				<label for="fond_apercu" style="margin-right: 0 !important;">Fond:</label>&nbsp;<select name="fond_apercu" id="fond_apercu">
					<option value="blanc">Blanc</option>
					<option value="noir">Noir</option>
					<option value="mur">Mur</option>
					<option value="paysage">Paysage</option>
				</select>
			</div>
			<div id="apercu">
				
			</div>
			<div id="dimensions">
				<span id="slongueur"></span><span id="shauteur"></span>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	var matiereSel = <?php echo $idselect; ?>;
	var thickness = <?php echo $epaisseur2; ?>;
	var productID = "<?php echo $productID;?>";
</script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
<script src="./js/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="./js/jquery.jcarousel.min.js"></script>
<script src="./js/jquery.jcarousel-control.min.js"></script>
<script src="./js/jquery.qtip.min.js"></script>
<script src="./js/functions.js?<?php echo mt_rand(); ?>"></script>
<script src="./js/ddlist.jquery.min.js"></script>
<script src="./js/icheck.min.js"></script>
<script src="./js/hopscotch.min.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="slick/slick.min.js"></script>
<script type="text/javascript" src="./fancybox/jquery.fancybox.pack.js?v=2.1.5"></script>
<script type="text/javascript" src="./fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
<script src="./js/reliefs.js?<?php echo mt_rand(); ?>"></script>