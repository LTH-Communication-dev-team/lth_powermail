<?php
if (!defined ('PATH_typo3conf')) die ('Could not access this script directly!');
use TYPO3\CMS\Core\Utility\GeneralUtility;
$data = \TYPO3\CMS\Core\Utility\GeneralUtility::_GP('data');
$input = \TYPO3\CMS\Core\Utility\GeneralUtility::_GP('input');
$action = \TYPO3\CMS\Core\Utility\GeneralUtility::_GP('action');
$password = \TYPO3\CMS\Core\Utility\GeneralUtility::_GP('password');
$sid = \TYPO3\CMS\Core\Utility\GeneralUtility::_GP('sid');

$settings = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['lth_powermail']);

switch($action) {
    case 'fillFields':
        $content = fillFields($settings);
        break;
    case 'checkMaxNumber':
        $content = checkMaxNumber($input);
        break;
    case 'getSalt':
        $content = getSalt($password);
        break;
    case "bestallMaterial":
        $content = bestallMaterial($input);
        break;
}

print $content;

function bestallMaterial($input)
{
    $pageId = $input['pageId'];
    $i = 0;
    $items = array();
    if($pageId) {
        //$GLOBALS['TYPO3_DB']->store_lastBuiltQuery = 1;
        $res = $GLOBALS['TYPO3_DB']->exec_SELECTquery("T.header, T.bodytext, S.identifier",
                "tt_content T LEFT JOIN sys_file_reference SR ON T.uid = SR.uid_foreign LEFT JOIN sys_file S ON S.uid = SR.uid_local",
                "T.pid=$pageId AND T.CType IN('textpic','textmedia') AND T.deleted=0 AND SR.deleted = 0",
                "",
                "T.sorting",
                "");
        while ($row = $GLOBALS["TYPO3_DB"]->sql_fetch_assoc($res)) {
            $header = $row["header"];
            $bodytext = $row["bodytext"];
            if($bodytext) {
                $bodytext = str_replace('<link ','<a href="',$bodytext);
                //<link fileadmin="" mypdf.pdf="">
                $bodytext = str_replace('.pdf>','.pdf">',$bodytext);
                $bodytext = str_replace('</link>','</a>',$bodytext);
            }
            $image = $row["identifier"];
            if($image) {
                $image = "fileadmin/$image";
            } else {
                $image = "fileadmin/$image";
            }
            $items[] = array("header" => $header, "bodytext" => $bodytext, "image" => $image);
            $i++;
        }
        $GLOBALS['TYPO3_DB']->sql_free_result($res);
        return(json_encode(array('data'=>$items)));
    }
}


function checkMaxNumber($input)
{
    $pid = $input['pid'];
    $maxNumber = $input['maxNumber'];
    $res = $GLOBALS['TYPO3_DB']->exec_SELECTquery("F.marker, A.value",
            "tx_powermail_domain_model_answer A JOIN tx_powermail_domain_model_field F ON A.field = F.uid",
            "A.deleted=0 AND A.pid=".intval($pid),"","","");
    //SELECT A.uid, A.value, F.marker, F.title FROM `tx_powermail_domain_model_answer` A JOIN `tx_powermail_domain_model_field` F ON A.field = F.uid  WHERE A.pid=42974;
    $i=0;
    while ($row = $GLOBALS["TYPO3_DB"]->sql_fetch_assoc($res)) {
        $ii++;
        if($row['marker'] == 'yourname' && trim($row['value']) != '') $i++;
        if($row['marker'] == 'guest1name' && trim($row['value']) != '') $i++;
        if($row['marker'] == 'guest2name' && trim($row['value']) != '') $i++;
        if($row['marker'] == 'guest3name' && trim($row['value']) != '') $i++;
        if($row['marker'] == 'guest4name' && trim($row['value']) != '') $i++;
        if($row['marker'] == 'guest5name' && trim($row['value']) != '') $i++;
        if($row['marker'] == 'guest6name' && trim($row['value']) != '') $i++;
        if($row['marker'] == 'guest7name' && trim($row['value']) != '') $i++;
        if($row['marker'] == 'guest8name' && trim($row['value']) != '') $i++;
        if($row['marker'] == 'guest9name' && trim($row['value']) != '') $i++;
        if($row['marker'] == 'guest10name' && trim($row['value']) != '') $i++;
    }
    $GLOBALS['TYPO3_DB']->sql_free_result($res);
    return(json_encode(array('number'=>$i)));
}


function fillFields($settings)
{
    $GLOBALS['TSFE'] = GeneralUtility::makeInstance('TYPO3\CMS\Frontend\Controller\TypoScriptFrontendController', $GLOBALS['TYPO3_CONF_VARS'], 0, 0);
    $GLOBALS['TSFE']->initFEuser();
    $GLOBALS['TSFE']->set_no_cache();
    $username = $GLOBALS['TSFE']->fe_user->user['username'];
    
    if($username || 1+1===2) {
        $dbhostUsers = $settings['dbhostUsers'];
        $dbUsers = $settings['dbUsers'];
        $userUsers = $settings['userUsers'];
        $pwUsers = $settings['pwUsers'];
        $dbhostLadok = $settings['dbhostLadok'];
        $dbLadok = $settings['dbLadok'];
        $userLadok = $settings['userLadok'];
        $pwLadok = $settings['pwLadok'];

        $mysqli = new mysqli($dbhostUsers, $userUsers, $pwUsers, $dbUsers);
        mysqli_set_charset($mysqli,'utf8');
        if ($mysqli->connect_errno) {
            return json_encode(array("Errno" => $mysqli->connect_errno, "Error" => $mysqli->connect_error));
        }

        // Perform an SQL query
        $sql = "SELECT pnr FROM lucache_person WHERE primary_uid = '$username' OR primary_student_uid = '$username'";
        $res = $mysqli->query($sql);
        $row = $res->fetch_assoc();
        $pnr = $row['pnr'];
$pnr = '9801262990';
        if($pnr) {
            $enamn = "";
            $tnamn = "";
            $gatadr = "";
            $coadr = "";
            $postnr = "";
            $ort = "";
            $land = "";
            $telefon = "";
            $epost = "";
            $program = "";
            $idatum = "";
                    
            $mysqli = new mysqli($dbhostLadok, $userLadok, $pwLadok, $dbLadok);
            mysqli_set_charset($mysqli,'utf8');
            if ($mysqli->connect_errno) {
                return "Errno: " . $mysqli->connect_errno . "\n" . "Error: " . $mysqli->connect_error . "\n";
            }
            
            $sql = "SELECT n.enamn, n.tnamn, a.gatadr, a.coadr, a.postnr, a.ort, a.land, GROUP_CONCAT(t.komtyp, ':', t.komadr) AS kom, 
                f.progr, l.benamn AS program, f.idatum
                FROM namn n LEFT JOIN adress a ON a.pnr = n.pnr 
                LEFT JOIN telekom t ON t.pnr = a.pnr 
                LEFT JOIN ffglin f ON a.pnr = f.pnr 
                LEFT JOIN linje l ON f.progr = l.kod 
                WHERE a.pnr = '$pnr'
                GROUP BY a.pnr";
            $res = $mysqli->query($sql);
            $row = $res->fetch_assoc();
            
            $enamn = ucwords(strtolower($row['enamn']));
            $tnamn = ucwords(strtolower($row['tnamn']));
            $gatadr = ucwords(strtolower($row['gatadr']));
            $coadr = $row['coadr'];
            $postnr = $row['postnr'];
            $ort = $row['ort'];
            $land = $row['land'];
            $kom = $row['kom'];
            $program = $row['program'];
            $idatum = $row['idatum'];
            if($kom) {
                $GLOBALS['TYPO3_DB']->exec_INSERTquery('tx_devlog', array('msg' => $kom, 'crdate' => time()));
                $komArray = explode(',', $kom);
                foreach ($komArray as $key => $value) {
                    $valueArray = explode(':', $value);
                    if($valueArray[0] === "TEL") {
                        $telefon = $valueArray[1];
                    } else if($valueArray[0] === "EMAIL") {
                        $epost = $valueArray[1];
                    }
                }
            }
            $res->free();
            $mysqli->close();
        }
        
        
    }
    $data = array(
        'pnr' => $pnr,
        'enamn' => $enamn,
        'tnamn' => $tnamn,
        'gatadr' => $gatadr,
        'coadr' => $coadr,
        'postnr' => $postnr,
        'ort' => $ort,
        'land' => $land,
        'telefon' => $telefon,
        'epost' => $epost,
        'program' => $program,
        'idatum' => $idatum
    );
    $resArray = array('data' => $data);
    //$GLOBALS['TYPO3_DB']->exec_INSERTquery('tx_devlog', array('msg' => $ort, 'crdate' => time()));
    return json_encode($resArray);
}

function getSalt($password)
{
    try {
        $rsaEncryptionDecoder = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Rsaauth\RsaEncryptionDecoder::class);
 
 	$decryptedPassword = $rsaEncryptionDecoder->decrypt($password);
        
        if (\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::isLoaded('saltedpasswords')) {
            $objSalt = \TYPO3\CMS\Saltedpasswords\Salt\SaltFactory::getSaltingInstance(NULL);
            if (is_object($objSalt)) {
                $saltedPassword = $objSalt->getHashedPassword($decryptedPassword);
            }
            //$saltedpasswordsInstance = tx_saltedpasswords_salts_factory::getSaltingInstance();
            //$encryptedPassword = $objSalt->getHashedPassword($password);
            $password = $saltedPassword;
        }
    } catch(Exception $e) {
        return json_encode(array('data' => $e->getMessage()));
    }

    return json_encode(array('data' => $password));
}