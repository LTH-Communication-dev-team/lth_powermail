$(document).ready(function() {
    if($('#powermail_field_prefill').val()) {
        fillFields();
    }
    
    if($('#powermail_field_max').val()) {
        checkMaxNumber($('#powermail_field_max').val());
    }
    
    $('.powermail_form').on('submit',function() { 
        //$(".tx-powermail :input").prop('disabled','true');
        //$('input[type="submit"]',this).prop('disabled', true);
        $('.tx-powermail').append('<div class="lthPackageOverlay"></div>');
        $('.tx-powermail').prepend('<div class="lthPackageLoader" style="position:absolute;top:40%;left:40%;"></div>');
    });
    
    if($('#lthPowermailBestallMaterialContainer').length > 0) {
        var header,bodytext,image,template, i=1;
        var pageId = $('body').attr('id').replace('p','');
        if(pageId) {
            $.ajax({
                type : "POST",
                url : 'index.php',
                data: {
                    eID: 'lth_powermail',
                    action: 'bestallMaterial',
                    input: {
                        pageId: pageId,
                    },
                    sid: Math.random(),
                },
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(d) {
                    if(d.data) {
                        $.each( d.data, function( key, aData ) {
                            if(aData.bodytext) bodytext = aData.bodytext;
                            if(aData.header) header = aData.header;
                            if(aData.image) image = aData.image;
                            template = $('#lthPowermailBestallMaterialTemplate').html();

                            template = template.replace('###id###', 'item_'+i);
                            template = template.replace(/###header###/g, header);
                            template = template.replace('###bodytext###', bodytext);
                            template = template.replace('###image###', image);
                            
                            $('#lthPowermailBestallMaterialContainer').append(template);
                            i++;
                        });
                        
                        
                    } 
                },
                failure: function(errMsg) {
                    console.log(errMsg);
                }
            });
        }
        
    }
});


function lthBestallMaterialGetPowermailForm()
{
    var noOfItems;
    var item = "", addOnMail = "";
    var items = new Array;
    $(".lthBestallMaterialItem").each(function() {
        noOfItems = $(this).val();
        if(noOfItems) {
            if(isPositiveInteger(noOfItems)) {
                item = $(this).attr('title');
                items.push(noOfItems+';'+item);
            }
        }
        
        //jQuery('#mydiv > select[name=myselect] > option:selected')
        //<input class="powermail_hidden  powermail_products" id="powermail_field_products" type="hidden" name="tx_powermail_pi1[field][products]" value="">
    });
    if(items.length === 0) {
        alert("Du måste välja minst en produkt!");
    } else {
        
        if($('.lthBestallMaterialOrderedProducts').length === 0) {
            $(".tx-powermail").prepend('<div class="lthBestallMaterialOrderedProducts"></div>');
        }
        var addOnCustomer = '<p><b>Dina beställningar</b></p>';
        for (var i=0; i<items.length; i++) {
            addOnMail += items[i].split(';')[0]+' st '+items[i].split(';')[1]+"\n";
            addOnCustomer += '<p>'+items[i].split(';')[0]+' st '+items[i].split(';')[1]+'</p>';
        }
        $("#powermail_field_products").val(addOnMail + "\n" + "mvh" + "\n" + "Kommunikationsavdelningen, LTH");
        var namn = $("#powermail_field_namn").val();
        var co = $("#powermail_field_co").val();
        var gatuadress = $("#powermail_field_gatuadress").val();
        var postnr = $("#powermail_field_postnr").val();
        var ort = $("#powermail_field_ort").val();
        var land = $("#powermail_field_land").val()
        var adress = namn + "\n";
        if(co) adress += co + "\n";
        adress += gatuadress + "\n" + postnr + " " + ort + "\n";
        if(land) adress += land;
        var rightNow = new Date();
        $("#powermail_field_datum").val(rightNow.toISOString().slice(0,10));
        $("#powermail_field_adress").val(adress);
        $(".lthBestallMaterialOrderedProducts").html(addOnCustomer);
        /*$(".tx_lthbestallmaterial").toggle(600);
        $(".tx-powermail").toggle(600);*/
        $(".powermail_fieldset").toggle();
    }
    
    /*$.ajax({
        type : "POST",
        url : 'index.php',
        data: {
            eID: 'lth_solr',
            action: 'listPublications',
            scope: $('#lth_solr_scope').val(),
            query: $('#lthsolr_publications_filter').val(),
            tableStart: tableStart,
            tableLength: '2000',
            tableFields: JSON.stringify(fieldArray),
            facet: getFacets(),
            syslang: syslang,
            publicationCategories: publicationCategories,
            sid: Math.random(),
        },
        dataType: "json",
        success: function(d) {
            if(d.data) {
                
            } 
        },
        failure: function(errMsg) {
            console.log(errMsg);
        }
    });*/
}

function lthBestallMaterialReturnToItems()
{
    $(".powermail_fieldset").toggle();
}


function isPositiveInteger(s)
{
  return /^\+?[1-9][\d]*$/.test(s);
}


function mobileCheck() {
    var check = false;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        check=true;
    }
    //testmode start
    //check=true;
    //testmode end
    return check;
}


function checkMaxNumber(maxNumber)
{
    var pid = $('body').attr('id').replace('p','');
    if(pid) {
        $.ajax({
            url: 'index.php',
            type: 'post',
            dataType: 'json',
            data: {
                eID : 'lth_powermail',
                action: 'checkMaxNumber',
                input: {
                    pid : pid,
                    maxNumber: maxNumber
                },
                sid : Math.random()
            },
            success: function(data) {
                var number = data.number;
                $('#powermailMaxContainer').html('<h2>'+number+' of ' + maxNumber + ' seats are reserved. ' + (maxNumber - number) + ' seats are left.</h2>');
                
                if(number >= maxNumber) {
                    $('.powermail_fieldset').attr('disabled','disabled');
                } else if(number + 11 > maxNumber) {
                    var x = maxNumber - number - 1;
                    for (var cc=10;cc > x;cc--) {
                        $('#powermail_field_guest'+cc+'name').attr('disabled','disabled');
                    }
                }
            }
        });
    }
}


function fillFields()
{
    var pnr, enamn, tnamn, gatadr, coadr, postnr, ort, land, telefon, epost, program, idatum;
    
    $.ajax({
        url: 'index.php',
        type: 'post',
        dataType: 'json',
        data: {
            eID : 'lth_powermail',
            action: 'fillFields',
            sid : Math.random()
        },
        success: function(data) {
            pnr = data.data.pnr;
            enamn = data.data.enamn;
            tnamn = data.data.tnamn;
            gatadr = data.data.gatadr;
            coadr = data.data.coadr;
            postnr = data.data.postnr;
            ort = data.data.ort;
            land = data.data.land;
            telefon = data.data.telefon;
            epost = data.data.epost;
            program = data.data.program;
            idatum = data.data.idatum;
            
            $('#powermail_field_personnummer').val(pnr);
            $('#powermail_field_namn').val(tnamn + ' ' + enamn);
            $('#powermail_field_adress').val(gatadr);
            $('#powermail_field_epost').val(epost);
            $('#powermail_field_telefon').val(telefon);
            $('#powermail_field_program').val(program);
            $('#powermail_field_antagenaar').val(idatum);
        }
    });
}