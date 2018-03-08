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
});


function lthBestallMaterialGetPowermailForm()
{
    var noOfItems;
    var item = "";
    var items = new Array;
    $(".lthBestallMaterialItem").each(function() {
        noOfItems = $(this).find("select[name=lthBestallMaterialSelect] > option:selected").text();
        if(noOfItems !== "0") {
            item = $(this).find("h2").text();
            items.push(noOfItems+';'+item);
        }
        
        //jQuery('#mydiv > select[name=myselect] > option:selected')
        //<input class="powermail_hidden  powermail_products" id="powermail_field_products" type="hidden" name="tx_powermail_pi1[field][products]" value="">
    });
    if(items.length === 0) {
        alert("Du måste välja minst en produkt!");
    } else {
        $("#powermail_field_products").val(JSON.stringify(items));
        if($('.lthBestallMaterialOrderedProducts').length === 0) {
            $(".tx-powermail").prepend('<div class="lthBestallMaterialOrderedProducts"></div>');
        }
        var addOn = '<p><b>Dina beställningar</b></p>';
        for (var i=0; i<items.length; i++) { 
            addOn += '<p>'+items[i].split(';')[0]+' st '+items[i].split(';')[1]+'</p>';
        }
        $(".lthBestallMaterialOrderedProducts").html(addOn);
        $(".tx_lthbestallmaterial").toggle(600);
        $(".tx-powermail").toggle(600);
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
    $(".tx_lthbestallmaterial").toggle(600);
    $(".tx-powermail").toggle(600);
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