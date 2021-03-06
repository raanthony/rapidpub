<?php
session_start();

function gen_uuid($len = 8) {    
    $hex = md5("yourSaltHere" . uniqid("", true));    
    $pack = pack('H*', $hex);    
    $tmp = base64_encode($pack);    
    $uid = preg_replace("#(*UTF8)[^A-Za-z0-9]#", "", $tmp);    
    $len = max(4, min(128, $len));    
    while (strlen($uid) < $len) 
    $uid.= gen_uuid(22);    
    return substr($uid, 0, $len);
}

function getDPIImageMagick($filename) {    
    $cmd = 'identify -quiet -format "%x" ' . $filename;    
    @exec(escapeshellcmd($cmd), $data);    
    if ($data && is_array($data)) {        
        $data = explode(' ', $data[0]);        
        if ($data[1] == 'PixelsPerInch') {            
            return $data[0];        } 
        elseif ($data[1] == 'PixelsPerCentimeter') {            
            $x = ceil($data[0] * 2.54);            
            return $x;        } 
        elseif ($data[1] == 'Undefined') {            
            return $data[0];
        }
    }    
    return 72;
}

if ('POST' == $_SERVER['REQUEST_METHOD']) {    
    if (isset($_SERVER['HTTP_ORIGIN'])) {        
        $address = 'http://' . $_SERVER['SERVER_NAME'];        
        if (strpos($address, $_SERVER['HTTP_ORIGIN']) !== 0) {            
            exit('CSRF protection in POST request: detected invalid Origin header: ' . $_SERVER['HTTP_ORIGIN']);
        }
    }
}

if (isset($_SESSION['prodID'])) $productID = $_SESSION['prodID'];
else die();

if ('POST' == $_SERVER['REQUEST_METHOD']) {
    
    if ($_FILES['imageupload']['error'] > 0) {
        
        $data = array(
        'success' => false, 
        'msg' => 'Erreur pendant le téléchargement.');
        
        echo json_encode($data);
    }
    
    switch ($_FILES['imageupload']['type']) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
            
            $uploaddir = '../uploads/';            
            $fileName = basename($_FILES['imageupload']['name']);            
            $fileExt = pathinfo($_FILES['imageupload']['name']);            
            $uuid = gen_uuid(12);            
            $newName = $uuid . '.' . $fileExt['extension'];            
            $imgDir = $uploaddir . $newName;            
            $id = md5(uniqid(rand(), true));            
            $img = new Imagick($_FILES['imageupload']['tmp_name']);            
            $imgInfo = $img->identifyimage();            
            $date = date('m') . '-' . date('Y');            
            $folder = '../uploads/' . $date . '/';            
            if (!file_exists($folder)) {                
                mkdir($folder);            }
            
            $data = array(
                'success' => true, 
                'imgName' => $fileName, 
                'type' => $_FILES['imageupload']['type'], 
                'newImgName' => $newName, 
                'imgPath' => 'uploads/' . $date . '/' . $newName, 
                'imgPathOp' => 'uploads/' . $date . '/' . $uuid . '_op.png', 
                'id' => $id, 
                'dpi' => (int)getDPIImageMagick($_FILES['imageupload']['tmp_name']), 
                'expDate' => date('Yd/m/Y', strtotime("+2 days"))
            );
            
            if (move_uploaded_file($_FILES['imageupload']['tmp_name'], $folder . '/' . $newName)) {
                
                $im = new Imagick($folder . '/' . $newName);                
                /*if ($_FILES['imageupload']['type'] == 'image/png' OR $_FILES['imageupload']['type'] == 'image/gif') {                    
                    $im->evaluateImage(Imagick::EVALUATE_MULTIPLY, 0.85, Imagick::CHANNEL_ALPHA);
                } 
                elseif ($_FILES['imageupload']['type'] == 'image/jpeg') {                    
                    $im->setImageAlphaChannel(Imagick::ALPHACHANNEL_OPAQUE);                    
                    $im->evaluateImage(Imagick::EVALUATE_DIVIDE, 1.20, Imagick::CHANNEL_ALPHA);
                }*/
                $im->modulateImage(100,0,100);
                $im->writeImage($folder . '/' . $uuid . '_op.png');                               
                echo json_encode($data);
            } 
            else {
                
                $data = array(
                    'success' => false, 
                    'msg' => 'Erreur serveur.'
                );
                echo json_encode($data);

            }
            
            break;

        default:
            
            $data = array(
                'success' => false, 
                'msg' => 'Type de fichier non autorisé, vous ne pouvez télécharger que des images au format jpg, png et gif.'
            );
            
            echo json_encode($data);
            
            break;
    }
}
?>

