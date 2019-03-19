<?php
namespace LTH\LthPowermail\Controller;

/***
 *
 * This file is part of the "LTH Powermail" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 *  (c) 2018 Tomas havner <tomas.havner@kansli.lth.se>, LTH
 *
 ***/

use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * UnsubscribenewsletterController
 */
class UnsubscribenewsletterController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
{
    /**
     * action list
     *
     * @return void
     */
    public function listAction()
    {
        $table = $this->settings['flexform']['main']['table'];
        $rU = $_GET['rU'];
        $aC = $_GET['aC'];
        //$GLOBALS['TYPO3_DB']->exec_INSERTquery('tx_devlog', array('msg' => $table, 'crdate' => time()));
        if($aC && $rU && $table) {
            //$GLOBALS['TYPO3_DB']->store_lastBuiltQuery = 1;

            $res = $GLOBALS['TYPO3_DB']->exec_SELECTquery('*',$table,'uid='.intval($rU),'','');
            $recipRow = $GLOBALS['TYPO3_DB']->sql_fetch_assoc($res);
            $GLOBALS['TYPO3_DB']->sql_free_result($res);
            //echo $GLOBALS['TYPO3_DB']->debug_lastBuiltQuery;

            foreach ($recipRow as $k => $v) {
                $tempRow[$k] = htmlspecialchars($v);
            }
            unset($recipRow);
            $recipRow = $tempRow;

            //http://www.lth.se/cee/kontakt/avregistrering/?cmd=delete&aC=37029e1b&rU=485431
            $recipRow['email'] = trim($recipRow['email']);

            $authCode = GeneralUtility::stdAuthCode($rU, '');
            if($recipRow['email'] && ($authCode === $aC)) {
                $GLOBALS['TYPO3_DB']->exec_UPDATEquery($table, 'uid='.intval($rU), array('deleted' => 1, 'tstamp' => time()));
                $forms = 'Your emailadress ' . $recipRow['email'] . ' will no longer receive our newsletter.';
            } else {
                $forms = 'An error occured. Please contact the system administrator.';
            }
        } else {
            $forms = 'No input data!';
        }
        //$forms = $this->formRepository->findAll();

        $this->view->assign('unsubscribenewsletters', $forms);
    }
}
