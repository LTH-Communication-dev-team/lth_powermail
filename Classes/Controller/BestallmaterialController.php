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
 * BestallmaterialController
 */
class BestallmaterialController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
{
    /**
     * action list
     *
     * @return void
     */
    public function listAction()
    {
        $items = $this->getItems();
        $this->view->assign('items', $items);
    }
    
    public function getItems()
    {
        
        $pageId = (string)$GLOBALS['TSFE']->id;
        $i = 0;
        $items = array();
        if($pageId) {
            //$GLOBALS['TYPO3_DB']->store_lastBuiltQuery = 1;
            $res = $GLOBALS['TYPO3_DB']->exec_SELECTquery("T.header, T.bodytext, S.identifier",
                    "tt_content T LEFT JOIN sys_file_reference SR ON T.uid = SR.uid_foreign LEFT JOIN sys_file S ON S.uid = SR.uid_local",
                    "T.pid=$pageId AND T.CType='textpic' AND T.deleted=0",
                    "",
                    "T.sorting",
                    "");
            while ($row = $GLOBALS["TYPO3_DB"]->sql_fetch_assoc($res)) {
                $header = $row["header"];
                $bodtext = $row["bodytext"];
                $image = $row["identifier"];
                if($image) {
                    $image = "fileadmin/$image";
                } else {
                    $image = "fileadmin/$image";
                }
                $items[] = array("i" => $i, "header" => $header, "bodytext" => $bodtext, "image" => $image);
                $i++;
            }
            //echo $GLOBALS['TYPO3_DB']->debug_lastBuiltQuery;
            /*
             * SELECT T.header, T.bodytext, S.identifier FROM tt_content T 
LEFT JOIN sys_file_reference SR ON T.uid = SR.uid_foreign 
LEFT JOIN sys_file S ON S.uid = SR.uid_local 
WHERE T.pid=23712 AND T.deleted=0 ORDER BY T.sorting;
             */
            $GLOBALS['TYPO3_DB']->sql_free_result($res);
        }
        //print_r($items);
        return $items;
    }
}
