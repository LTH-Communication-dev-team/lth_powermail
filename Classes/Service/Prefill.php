<?php
if (!defined ('PATH_typo3conf')) die ('Could not access this script directly!');
use TYPO3\CMS\Core\Utility\GeneralUtility;

class user_prefill
{

        function myinit()
        {
            
            /*$GLOBALS['TSFE'] = GeneralUtility::makeInstance('TYPO3\CMS\Frontend\Controller\TypoScriptFrontendController', $GLOBALS['TYPO3_CONF_VARS'], 0, 0);
            /*$GLOBALS['TSFE']->initFEuser();
            $GLOBALS['TSFE']->set_no_cache();
            $username = $GLOBALS['TSFE']->fe_user->user['username'];*/
            $feUserObj = \TYPO3\CMS\Frontend\Utility\EidUtility::initFeUser();
            $settings = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['lth_powermail']);
            
            $username = $feUserObj->user['username'];
            if($username) {
                $dbhostUsers = $settings['dbhostUsers'];
                $dbUsers = $settings['dbUsers'];
                $userUsers = $settings['userUsers'];
                $pwUsers = $settings['pwUsers'];
                $dbhostLadok = $settings['dbhostLadok'];
                $dbLadok = $settings['dbLadok'];
                $userLadok = $settings['userLadok'];
                $pwLadok = $settings['pwLadok'];
            }
            
            $mysqli = new mysqli($dbhostUsers, $userUsers, $pwUsers, $dbUsers);
            mysqli_set_charset($mysqli,'utf8');
            if ($mysqli->connect_errno) {
                return json_encode(array("Errno" => $mysqli->connect_errno, "Error" => $mysqli->connect_error));
            }
        
            $asql = "SELECT pnr FROM lucache_person WHERE primary_uid = '$username' OR primary_student_uid = '$username'";
            $res = $mysqli->query($asql);
            $row = $res->fetch_assoc();
            $pnr = $row['pnr'];

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

                $sql = "SELECT LOWER(n.enamn) AS enamn, LOWER(n.tnamn) AS tnamn, LOWER(a.gatadr) AS gatadr, 
                    LOWER(a.coadr) AS coadr, a.postnr, LOWER(a.ort) AS ort, LOWER(a.land) AS land, GROUP_CONCAT(t.komtyp, ':', t.komadr) AS kom, 
                    f.progr, LOWER(l.benamn) AS program, f.idatum
                    FROM namn n LEFT JOIN adress a ON a.pnr = n.pnr 
                    LEFT JOIN telekom t ON t.pnr = a.pnr 
                    LEFT JOIN ffglin f ON a.pnr = f.pnr 
                    LEFT JOIN linje l ON f.progr = l.kod 
                    WHERE a.pnr = '$pnr'
                    GROUP BY a.pnr";
                $res = $mysqli->query($sql);
                $row = $res->fetch_assoc();
                $enamn = ucwords($row['enamn']);
                $tnamn = ucwords($row['tnamn']);
                $gatadr = ucfirst($row['gatadr']);
                $coadr = ucfirst($row['coadr']);
                $postnr = $row['postnr'];
                $ort = ucfirst($row['ort']);
                $land = ucfirst($row['land']);
                $kom = $row['kom'];
                $program = ucfirst($row['program']);
                $idatum = $row['idatum'];
                if($kom) {
                    $komArray = explode(',', $kom);
                    foreach ($komArray as $key => $value) {
                        $valueArray = explode(':', $value);
                        if($valueArray[0] === "TEL" || $valueArray[0] === "SMS") {
                            $telefon = $valueArray[1];
                        } else if($valueArray[0] === "EMAIL") {
                            $epost = $valueArray[1];
                        }
                    }
                }
                $res->free();
                $mysqli->close();
            }
            return array('pnr' => $pnr, 'namn' => $tnamn . 'aa ' . $enamn, 'adress' => $this->addSpace($coadr) . 
                $this->addSpace($gatadr) . $this->addSpace($postnr) . $ort, 'epost' => $epost, 'telefon' => $telefon, 'program' => $program);
        }
        
        public function getNamn($content = '', $conf = array())
        {
            $res = $this->myinit();
            return $res['namn'];
        }
        
        public function getPersonnummer($content = '', $conf = array())
        {
            $res = $this->myinit();
            return $res['pnr'];
        }
        
        public function getAdress($content = '', $conf = array())
        {
            $res = $this->myinit();
            return $res['adress'];
        }
        
        public function getEpost($content = '', $conf = array())
        {
            $res = $this->myinit();
            return $res['epost'];
        }
        
        public function getTelefon($content = '', $conf = array())
        {
            $res = $this->myinit();
            return $res['telefon'];
        }
        
        public function getProgram($content = '', $conf = array())
        {
            $res = $this->myinit();
            return $res['program'];
        }
        
        private function addSpace($input)
        {
            if($input) $input = $input . ' ';
            return $input;
        }
}