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
        if($('#lthPowermailBestallMaterialContainer').length > 0) {
            lthBestallMaterialSubmtPowermailForm();
        }
    });
    
    if($('#lthPowermailBestallMaterialContainer').length > 0) {
        var uid,header,bodytext,image,template, i=1;
        var pageId = $('body').attr('id').replace('p','');
        var lang = $('html').attr('lang');

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
                            if(aData.uid) uid = aData.uid;
                            if(aData.bodytext) bodytext = aData.bodytext;
                            if(aData.header) header = aData.header;
                            if(aData.image) image = aData.image;
                            template = $('#lthPowermailBestallMaterialTemplate').html();

                            template = template.replace(/###id###/g, uid);
                            template = template.replace(/###header###/g, header);
                            template = template.replace('###bodytext###', bodytext);
                            template = template.replace('###image###', image);
                                                        
                            $('#lthPowermailBestallMaterialContainer').append(template);
                            i++;
                        });
                        $('.lthBestallMaterialItem').change(function(){
                            var tmpId = $(this).parent().attr('id');
                            if($('#'+tmpId).length > 0) {
                                if($(this).val() > 0) {
                                    $('#'+tmpId).html($(this).val() + ' st ' + $(this).attr('title'));
                                } else {
                                    $('#'+tmpId).remove();
                                    $(this).val('');
                                }
                            }
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


function lthBestallMaterialSubmtPowermailForm()
{
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
}


function lthBestallMaterialGetPowermailForm()
{
    var noOfItems;
    var itemTitle = "", itemId='', addOnMail = "";
    var items = new Array;
    var lang = $('html').attr('lang');
    
    $(".lthBestallMaterialItem").each(function() {
        noOfItems = $(this).val();
        if(noOfItems) {
            if(isPositiveInteger(noOfItems)) {
                itemTitle = $(this).attr('title');
                itemId = $(this).attr('id');
                items.push(noOfItems+';'+itemTitle+';'+itemId);
            }
        }
        
        //jQuery('#mydiv > select[name=myselect] > option:selected')
        //<input class="powermail_hidden  powermail_products" id="powermail_field_products" type="hidden" name="tx_powermail_pi1[field][products]" value="">
    });
    if(items.length === 0) {
        if(lang==='sv') {
            alert("Du måste välja minst en produkt!");
        } else {
            alert("You must choose at least one product!");
        }
    } else {
        
        if($('.lthBestallMaterialOrderedProducts').length === 0) {
            $(".tx-powermail").prepend('<div class="lthBestallMaterialOrderedProducts"></div>');
        }
        var addOnCustomer = '<p><b>Dina beställningar</b></p>';
        if(lang==='en') addOnCustomer = '<p><b>Your order</b></p>';
        for (var i=0; i<items.length; i++) {
            addOnMail += items[i].split(';')[0]+' st '+items[i].split(';')[1]+"\n";
            addOnCustomer += '<p class="'+items[i].split(';')[2]+'">'+items[i].split(';')[0]+' st '+items[i].split(';')[1]+'</p>';
        }
        var halsningsFras = $("#powermail_field_halsningsfras").val();
        $("#powermail_field_products").val(addOnMail + halsningsFras);
        $("#powermail_field_products_receiver").val(addOnMail);
        
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

window.Parsley.addValidator('custom100', function (value, requirement) {
    if(requirement) {
        var otherValue = $('#powermail_field_' + requirement.toLowerCase()).val();
        if (value == otherValue) {
            return true;
        }
        return false;
    } else {
        return true;
    }
}, 32).addMessage('en', 'custom100', 'Error');