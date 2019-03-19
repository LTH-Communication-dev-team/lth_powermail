<?php
defined('TYPO3_MODE') || die('Access denied.');

// Add AJAX support
$TYPO3_CONF_VARS['FE']['eID_include']['lth_powermail'] = 'EXT:lth_powermail/Classes/Service/Ajax.php';

call_user_func(
    function($extKey)
	{

        \TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
            'LTH.LthPowermail',
            'Pi1',
            [
                'Unsubscribenewsletter' => 'list'
            ],
            // non-cacheable actions
            [
                'Unsubscribenewsletter' => 'list'
            ]
        );

        \TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
            'LTH.LthPowermail',
            'Pi2',
            [
                'Bestallmaterial' => 'list'
            ],
            // non-cacheable actions
            [
                'Bestallmaterial' => 'list'
            ]
        );
        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('<INCLUDE_TYPOSCRIPT: source="FILE:EXT:' . $extKey . '/Configuration/PageTS/TCEMAIN.txt">');
        

	/* wizards
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
		'mod {
			wizards.newContentElement.wizardItems.plugins {
				elements {
					unsubscribenewsletter {
						icon = ' . \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath($extKey) . 'Resources/Public/Icons/user_plugin_unsubscribenewsletter.svg
						title = LLL:EXT:lth_powermail/Resources/Private/Language/locallang_db.xlf:tx_lth_powermail_domain_model_unsubscribenewsletter
						description = LLL:EXT:lth_powermail/Resources/Private/Language/locallang_db.xlf:tx_lth_powermail_domain_model_unsubscribenewsletter.description
						tt_content_defValues {
							CType = list
							list_type = lthpowermail_unsubscribenewsletter
						}
					}
					bestallmaterial {
						icon = ' . \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath($extKey) . 'Resources/Public/Icons/user_plugin_bestallmaterial.svg
						title = LLL:EXT:lth_powermail/Resources/Private/Language/locallang_db.xlf:tx_lth_powermail_domain_model_bestallmaterial
						description = LLL:EXT:lth_powermail/Resources/Private/Language/locallang_db.xlf:tx_lth_powermail_domain_model_bestallmaterial.description
						tt_content_defValues {
							CType = list
							list_type = lthpowermail_bestallmaterial
						}
					}
				}
				show = *
			}
	   }'
	);*/
    },
    $_EXTKEY
);
