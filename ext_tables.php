<?php
defined('TYPO3_MODE') || die('Access denied.');

call_user_func(
    function($extKey)
    {
        /**
         * Include Plugins
         */
        \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin('LTH.LthPowermail','Pi1','Unsubscribe newsletter');
        \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin('LTH.LthPowermail','Pi2','Beställ material');
        /*
         * \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin('powermail', 'Pi1', 'Powermail');
        \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin('powermail', 'Pi2', 'Powermail_Frontend');
         */
        
        /**
         * Include TypoScript
         */
        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($extKey, 'Configuration/TypoScript/Main/', 'LTH Powermail');
        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($extKey, 'Configuration/TypoScript/Bestallmaterial/', 'Beställ material');
        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($extKey, 'Configuration/TypoScript/Unsubscribenewsletter/', 'Unsubscribe newsletter');
        
         /**
        * Include Flexform
        */
        $GLOBALS['TCA']['tt_content']['types']['list']['subtypes_addlist']['lthpowermail_pi1'] = 'pi_flexform';
        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
            'lthpowermail_pi1',
            'FILE:EXT:lth_powermail/Configuration/FlexForms/Unsubscribenewsletter.xml'
        );

    },
    $_EXTKEY
);