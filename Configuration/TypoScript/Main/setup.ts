page.includeCSS.lth_powermail = typo3conf/ext/lth_powermail/Resources/Public/Css/Style.css
page.includeJSFooter.lth_powermail = typo3conf/ext/lth_powermail/Resources/Public/JavaScript/lth_powermail.js

plugin.tx_lthpowermail_unsubscribenewsletter {
  view {
    templateRootPaths.0 = EXT:lth_powermail/Resources/Private/Templates/
    templateRootPaths.1 = {$plugin.tx_lthpowermail_unsubscribenewsletter.view.templateRootPath}
    partialRootPaths.0 = EXT:lth_powermail/Resources/Private/Partials/
    partialRootPaths.1 = {$plugin.tx_lthpowermail_unsubscribenewsletter.view.partialRootPath}
    layoutRootPaths.0 = EXT:lth_powermail/Resources/Private/Layouts/
    layoutRootPaths.1 = {$plugin.tx_lthpowermail_unsubscribenewsletter.view.layoutRootPath}
  }
  persistence {
    storagePid = {$plugin.tx_lthpowermail_unsubscribenewsletter.persistence.storagePid}
    #recursive = 1
  }
  features {
    #skipDefaultArguments = 1
  }
  mvc {
    #callDefaultActionIfActionCantBeResolved = 1
  }
}

plugin.tx_lthpowermail_bestallmaterial {
  view {
    templateRootPaths.0 = EXT:lth_powermail/Resources/Private/Templates/
    templateRootPaths.1 = {$plugin.tx_lthpowermail_bestallmaterial.view.templateRootPath}
    partialRootPaths.0 = EXT:lth_powermail/Resources/Private/Partials/
    partialRootPaths.1 = {$plugin.tx_lthpowermail_bestallmaterial.view.partialRootPath}
    layoutRootPaths.0 = EXT:lth_powermail/Resources/Private/Layouts/
    layoutRootPaths.1 = {$plugin.tx_lthpowermail_bestallmaterial.view.layoutRootPath}
  }
  persistence {
    storagePid = {$plugin.tx_lthpowermail_bestallmaterial.persistence.storagePid}
    #recursive = 1
  }
  features {
    #skipDefaultArguments = 1
  }
  mvc {
    #callDefaultActionIfActionCantBeResolved = 1
  }
}

plugin.tx_lthpowermail._CSS_DEFAULT_STYLE (
    textarea.f3-form-error {
        background-color:#FF9F9F;
        border: 1px #FF0000 solid;
    }

    input.f3-form-error {
        background-color:#FF9F9F;
        border: 1px #FF0000 solid;
    }

    .tx-lth-powermail table {
        border-collapse:separate;
        border-spacing:10px;
    }

    .tx-lth-powermail table th {
        font-weight:bold;
    }

    .tx-lth-powermail table td {
        vertical-align:top;
    }

    .typo3-messages .message-error {
        color:red;
    }

    .typo3-messages .message-ok {
        color:green;
    }
)
