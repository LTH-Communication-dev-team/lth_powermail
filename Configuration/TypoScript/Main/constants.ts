plugin.tx_powermail {
    settings {
        styles {
            bootstrap {
                # cat=powermail_styles//0100; type=text; label= Framework classname(s) for form "form-horizontal"
                formClasses = 
                fieldWrappingClasses =
                labelClasses =
                offsetClasses =
                submitClasses = btn btn-default
                numberOfColumns = 1
                fieldAndLabelWrappingClasses = 
            }
            framework {
                numberOfColumns = 0
            }
        }
        misc {
            forceJavaScriptDatePicker = 1
            htmlForHtmlFields = 1
            htmlForLabels = 1
        }
        main {
            pid = 0
            confirmation = 0
            optin = 0
            moresteps = 0
        }
    }
}


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
