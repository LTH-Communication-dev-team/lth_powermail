page.includeCSS.lth_powermail_bestallmaterial = typo3conf/ext/lth_powermail/Resources/Public/Css/Bestallmaterial/Style.css
page.includeJSFooterlibs.lth_package = typo3conf/ext/lth_powermail/Resources/Public/JavaScript/lth_powermail.js

plugin.tx_powermail {
    view {
        templateRootPaths {
            1 = EXT:powermail/Resources/Private/Templates/
            10 =  EXT:lth_powermail/Resources/Private/Templates/Bestallmaterial/
        }
    }
}

plugin.tx_bwpowermailmpdf {
  settings {
    # Activate powermail pdf
    activate = 1

    # Show download link on success page
    showDownloadLink = 1

    # Send PDF via Email?
    email{
      attachFile = 1
    }

    # Link settings73433
    filelink {
      ATagParams = class="btn btn-default btn-primary"
      jumpurl = 0
      jumpurl.secure = 0
      jumpurl.secure.mimeTypes = pdf=application/pdf
      icon = 0
      icon_link = 0
      target = _blank
    }

    # PDF settings
    #sourceFile = typo3conf/ext/lth_bestallmaterial/Resources/Private/Templates/Mpdf/form.html
    fillPdf = 1
    fieldMap {
        # pdffield = powermailfield
        namn = namn
        e_post = e_post
        co = co
        gatuadress = gatuadress
        postnr = postnr
        ort = ort
        land = land
        products = products
    }
  }
}