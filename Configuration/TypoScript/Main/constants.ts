plugin.tx_powermail {
    settings {
        styles {
            bootstrap {
                # cat=powermail_styles//0100; type=text; label= Framework classname(s) for form "form-horizontal"
                formClasses = 
                fieldWrappingClasses =
                labelClasses =
                offsetClasses =
            }
        }
    }
}

plugin.tx_powermail.settings.misc.forceJavaScriptDatePicker = 1
plugin.tx_powermail.settings.misc.htmlForHtmlFields = 1
plugin.tx_powermail.settings.styles.bootstrap.numberOfColumns = 1
plugin.tx_powermail.settings.styles.framework.numberOfColumns = 0
plugin.tx_powermail.settings.styles.bootstrap.fieldAndLabelWrappingClasses = 
plugin.tx_powermail.settings.main.pid = 0
plugin.tx_powermail.settings.main.confirmation = 0
plugin.tx_powermail.settings.main.optin = 0
plugin.tx_powermail.settings.main.moresteps = 0
plugin.tx_powermail.settings.misc.htmlForLabels = 1

plugin.tx_powermail {
    view {
        templateRootPath = EXT:lth_powermail/Resources/Private/Templates/
        #partialRootPath = EXT:lth_powermail/Resources/Private/Partials/
        #layoutRootPath = EXT:lth_powermail/Resources/Private/Layouts/
    }
}

plugin.tx_powermailrecaptcha.sitekey = 6LfRCycUAAAAAD_tN-rLKbHcTCdP-MxjxWzP8qAB
plugin.tx_powermailrecaptcha.secretkey = 6LfRCycUAAAAAAJp-mY7xm3gHFDqhYxri_IGQyPi

plugin.tx_lthpowermail_unsubscribenewsletter {
  view {
    # cat=plugin.tx_lthpowermail_unsubscribenewsletter/file; type=string; label=Path to template root (FE)
    templateRootPath = EXT:lth_powermail/Resources/Private/Templates/
    # cat=plugin.tx_lthpowermail_unsubscribenewsletter/file; type=string; label=Path to template partials (FE)
    partialRootPath = EXT:lth_powermail/Resources/Private/Partials/
    # cat=plugin.tx_lthpowermail_unsubscribenewsletter/file; type=string; label=Path to template layouts (FE)
    layoutRootPath = EXT:lth_powermail/Resources/Private/Layouts/
  }
  persistence {
    # cat=plugin.tx_lthpowermail_unsubscribenewsletter//a; type=string; label=Default storage PID
    storagePid =
  }
}

plugin.tx_lthpowermail_bestallmaterial {
  view {
    # cat=plugin.tx_lthpowermail_bestallmaterial/file; type=string; label=Path to template root (FE)
    templateRootPath = EXT:lth_powermail/Resources/Private/Templates/
    # cat=plugin.tx_lthpowermail_bestallmaterial/file; type=string; label=Path to template partials (FE)
    partialRootPath = EXT:lth_powermail/Resources/Private/Partials/
    # cat=plugin.tx_lthpowermail_bestallmaterial/file; type=string; label=Path to template layouts (FE)
    layoutRootPath = EXT:lth_powermail/Resources/Private/Layouts/
  }
  persistence {
    # cat=plugin.tx_lthpowermail_bestallmaterial//a; type=string; label=Default storage PID
    storagePid =
  }
}
