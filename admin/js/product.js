(function($) {
		"use strict";

	$(document).ready(function() {

        // Check Click1 :)
        $(".checkclick1").on( "change", function() {
            if(this.checked){
             $(this).parent().parent().parent().parent().next().removeClass('showbox');
            }
            else{
             $(this).parent().parent().parent().parent().next().addClass('showbox');
            }
        });
        // Check Click1 Ends :)


        // Product Measure :)

        $("#product_measure").on( "change" ,function() {
            var val = $(this).val();
            $('#measurement').val(val);
            if(val == "Custom")
            {
            $('#measurement').val('');
              $('#measure').show();
            }
            else{
              $('#measure').hide();
            }
        });

        // Product Measure Ends :)

	});

// TAGIT

        $("#metatags_English").tagit({
            fieldName: "meta_tag[]",
            allowSpaces: true
        });
        $("#metatags_Arabic").tagit({
            fieldName: "meta_tag_Arabic[]",
            allowSpaces: true
        });

        $("#tags").tagit({
            fieldName: "tags[]",
            allowSpaces: true
        });

        $("#keywords_English").tagit({
            fieldName: "keywords[]",
            allowSpaces: true
        });
        $("#keywords_Arabic").tagit({
            fieldName: "keywords_Arabic[]",
            allowSpaces: true
        });
// TAGIT ENDS


// Remove White Space
  function isEmpty(el){
      return !$.trim(el.html())
  }
// Remove White Space Ends



// Choose multi languuage for product

//$("#s-lang option[value='English']").attr("disabled","disabled");
//var option = $("#s-lang option").val('English').attr('selected','selected');


$("#s-lang option").each(function(){
    if ($(this).val() == "English")
        $(this).attr('selected','selected');
});
$("#c-lang").click(function(e) {
    var langs = $("#s-lang").children("option:selected")
                .toArray().map(item => item.value);

    $(langs).each(function(i,value){
        if (value == "English") {
            $('.pro-name .pro-input').attr("placeholder","Enter product name in "+value);           
        } else { 
            // make clone
            $(".pro-name input").last().attr('name').split('_');
            var newR = $('.pro-name .pro-input').clone(true);
            $(newR).attr("name","name_"+value)
                    .attr("placeholder","Enter product name in "+value)
                    .attr("id","name_"+value).removeAttr('required'); //change name,id attr
            $("#s-lang option:selected").removeAttr('selected').attr('disabled','disabled');
            $(newR).insertAfter(".pro-name input:last").last().removeClass('pro-input').addClass('cloned');

            // clone product description
            var desc = $(".pro-desc").clone(true);
            $(".pro-desc textarea").attr("id","desc_"+value)
                                    .attr("name","desc_"+value)
                                    .attr("value","{!desc_"+value+'}'); // add id to input
            $(".pro-desc .heading").text('Product Description in '+ value);
            $(desc).insertBefore(".pro-desc:last").last().removeClass('pro-desc').addClass('cloned');
            

            // clone Specification
            var speci  = $(".specification").last().clone(true);
            $(".specification textarea").attr("id","specification_"+value)
                                        .attr('name',"specification_"+value)
                                        .attr("value",'{!specification_'+value+'}'); // add id to input
            $(".specification .heading").text('specification in '+ value);
            $(speci).insertBefore(".specification").last().removeClass('specification').addClass('cloned');
            
            // clone product policy
            var policy = $(".policy").last().clone(true);
            $(".policy textarea").attr("id","policy_"+value)
                                 .attr('name','policy_'+value)
                                 .attr('value','{!policy_'+value+'}'); // add id to input
            $(".policy .heading").text('Product Buy/Return Policy in '+ value);
            $(policy).insertBefore(".policy").last().removeClass('policy').addClass('cloned');

            // Clone SEO
            var seo = $(".metatags").last().clone(true);
            $(".metatags .heading").text('Meta Tags in '+ value);
            $(".metatags .metataglist").attr("id", "metatags_"+ value); // meta tags ul 

            $(".metatags .metatitle .heading").text('Meta Title in '+ value);
            $(".metatags .metatitle input").attr('name','metatitle_'+value)
                                            .attr('placeholder','Enter Meta Title in '+value);

            $(".metatags .keywords .heading").text('Keywords in '+ value);
            $(".metatags .keywords .keywordslist").attr("id", "keywords_"+ value); // keywords ul 

            $(".metatags .metaDesc .heading").text('Meta Description in '+ value);
            $(".metatags .metaDesc textarea").attr('placeholder','Meta Description in '+value)
                                             .attr('id','meta_description_'+value)
                                             .attr('name','meta_description_'+value)
                                             .attr('value','{!meta_description_'+value+'}'); // textarea attributes
             
            $(seo).insertBefore(".metatags").last().addClass('cloned').removeClass('metatags');
            
        }
    });
});
// Remove Language
$("#clear").click(function (e) {
    $('.cloned').remove();
    // change desc
    $(".pro-desc textarea").attr("id","desc")
                           .attr("name","desc")
                           .attr("value","{!desc}"); // add id to input
    $(".pro-desc .heading").text('Product Description');
    // change specifications
    $(".specification textarea").attr("id","specification")
                                .attr("name","specification")
                                .attr("value","{!specification}"); // add id to input
    $(".specification .heading").text('specification');
    // Change policy
    $(".policy textarea").attr("id","policy")
                         .attr("name","policy")
                         .attr('value','{!policy}'); // add id to input
    $(".policy .heading").text('Product Buy/Return Policy');

    // change SEO
    $(".metatags .heading").text('Meta Tags');
    $(".metatags .metataglist").attr("id", "metatags"); // meta tags ul 

    $(".metatags .metatitle .heading").text('Meta Title');
            $(".metatags .metatitle input").attr('name','metatitle')
                                            .attr('placeholder','Enter Meta Title');

    $(".metatags .keywords .heading").text('Keywords');
    $(".metatags .keywords .keywordslist").attr("id", "keywords"); // keywords ul 

    $(".metatags .metaDesc .heading").text('Meta Description');
    $(".metatags .metaDesc textarea")
                            .attr("id","meta_description")
                            .attr("name","meta_description")
                            .attr('placeholder','Meta Description')
                            .attr('value','{!meta_description}'); // add id to input
    

    $("#s-lang option").removeAttr('disabled');
});


// add style color for the selected option color
$("#colors option").css('background-color',"$(this).attr('value').val()");

// Size Section => Dublicate the section
$(document).on('click','#size-btn', function(e) {
    e.preventDefault();
    var newSize = $(".pro-data:first").clone(true);
    $("#dummy-add").before(newSize);
});
// Remove cloned size 
$('.size-remove').click(function(e) {
    e.stopPropagation();
    var delete_ele = $(this.parentNode);
    //console.log(delete_ele);
    if($(delete_ele).is(':first-child')) {
       e.preventDefault();
    } else {
       $(delete_ele).remove();
    }
});

// End Size Section 

// Color Section
$("#color-btn").on('click', function(){

    $("#color-section").append(''+
                            '<div class="color-area">'+
                                '<span class="remove color-remove"><i class="fas fa-times"></i></span>'+
                                    '<div class="input-group colorpicker-component cp">'+
                                        '<input type="text" name="color[]" value="#000000" class="input-field cp"/>'+
                                        '<span class="input-group-addon"><i></i></span>'+
                                    '</div>'+

                            '</div>'
                            +'');
    $('.cp').colorpicker();
});


$(document).on('click','.color-remove', function(){

    $(this.parentNode).remove();
    if (isEmpty($('#color-section'))) {

    $("#color-section").append(''+
                            '<div class="color-area">'+
                                '<span class="remove color-remove"><i class="fas fa-times"></i></span>'+
                                    '<div class="input-group colorpicker-component cp">'+
                                        '<input type="text" name="color[]" value="#000000" class="input-field cp"/>'+
                                        '<span class="input-group-addon"><i></i></span>'+
                                    '</div>'+

                            '</div>'
                            +'');
    $('.cp').colorpicker();
    }

});

// Color Section Ends


// Feature Section

$("#feature-btn").on('click', function(){

    $("#feature-section").append(''+
                            '<div class="feature-area">'+
                                '<span class="remove feature-remove"><i class="fas fa-times"></i></span>'+
                                    '<div  class="row">'+
                                        '<div class="col-lg-6">'+
                                            '<input type="text" name="features[]" class="input-field" placeholder="Enter Your Keyword">'+
                                        '</div>'+
                                        '<div class="col-lg-6">'+
                                            '<div class="input-group colorpicker-component cp">'+
                                                '<input type="text" name="colors[]" value="#000000" class="input-field cp"/>'+
                                                '<span class="input-group-addon"><i></i></span>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                            '</div>'
                            +'');
    $('.cp').colorpicker();
});

$(document).on('click','.feature-remove', function(){

    $(this.parentNode).remove();
    if (isEmpty($('#feature-section'))) {

    $("#feature-section").append(''+
                            '<div class="feature-area">'+
                                '<span class="remove feature-remove"><i class="fas fa-times"></i></span>'+
                                    '<div  class="row">'+
                                        '<div class="col-lg-6">'+
                                            '<input type="text" name="features[]" class="input-field" placeholder="Enter Your Keyword">'+
                                        '</div>'+
                                        '<div class="col-lg-6">'+
                                            '<div class="input-group colorpicker-component cp">'+
                                                '<input type="text" name="colors[]" value="#000000" class="input-field cp"/>'+
                                                '<span class="input-group-addon"><i></i></span>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                            '</div>'
                            +'');
    $('.cp').colorpicker();
    }

});

// Feature Section Ends
// Type Check

$('#type_check').on('change',function(){
    var val = $(this).val();
    if(val == 1) {
    $('.row.file').css('display','flex');
    $('.row.file').find('input[type=file]').prop('required',true);
    $('.row.link').find('textarea').val('').prop('required',false);
    $('.row.link').hide();
    }
    else {
    $('.row.file').hide();
    $('.row.link').css('display','flex');
    $('.row.file').find('input[type=file]').prop('required',false);
    $('.row.link').find('textarea').prop('required',true);
    }

});

// Type Check Ends

// License Section

$("#license-btn").on('click', function(){

    $("#license-section").append(''+
                            '<div class="license-area">'+
                                '<span class="remove license-remove"><i class="fas fa-times"></i></span>'+
                                    '<div  class="row">'+
                                        '<div class="col-lg-6">'+
                                            '<input type="text" name="license[]" class="input-field" placeholder="License Key" required="">'+
                                        '</div>'+
                                        '<div class="col-lg-6">'+
                                            '<input type="number" name="license_qty[]" min="1" class="input-field" placeholder="License Quantity" value="1">'+
                                        '</div>'+
                                    '</div>'+
                            '</div>'
                            +'');
});

$(document).on('click','.license-remove', function(){

    $(this.parentNode).remove();
    if (isEmpty($('#license-section'))) {

    $("#license-section").append(''+
                            '<div class="license-area">'+
                                '<span class="remove license-remove"><i class="fas fa-times"></i></span>'+
                                    '<div  class="row">'+
                                        '<div class="col-lg-6">'+
                                            '<input type="text" name="license[]" class="input-field" placeholder="License Key" required="">'+
                                        '</div>'+
                                        '<div class="col-lg-6">'+
                                            '<input type="number" name="license_qty[]" min="1" class="input-field" placeholder="License Quantity" value="1">'+
                                        '</div>'+
                                    '</div>'+
                            '</div>'
                            +'');
    }

});

// License Section Ends

$("#size-check").change(function() {
    if(this.checked) {
        $("#size-display").show();
        $("#stckprod").hide();
    }
    else
    {
        $("#size-display").hide();
        $("#stckprod").show();

    }
});

$("#whole_check").change(function() {
    if(this.checked) {
        $("#whole-section input").prop('required',true);
    }
    else {
        $("#whole-section input").prop('required',false);
    }
});


// Whole Sell Section

$("#whole-btn").on('click', function(){

    if(whole_sell > $("[name='whole_sell_qty[]']").length)
    {
    $("#whole-section").append(''+
                            '<div class="feature-area">'+
                                '<span class="remove whole-remove"><i class="fas fa-times"></i></span>'+
                                    '<div  class="row">'+
                                        '<div class="col-lg-6">'+
                                            '<input type="number" name="whole_sell_qty[]" class="input-field" placeholder="Enter Quantity" min="0" required>'+
                                        '</div>'+
                                        '<div class="col-lg-6">'+
                                            '<input type="number" name="whole_sell_discount[]" class="input-field" placeholder="Enter Discount Percentage" min="0" required>'+
                                        '</div>'+
                                    '</div>'+
                            '</div>'
                            +'');
    }

});

$(document).on('click','.whole-remove', function(){

    $(this.parentNode).remove();
    if (isEmpty($('#whole-section'))) {

    $("#whole-section").append(''+
                            '<div class="feature-area">'+
                                '<span class="remove whole-remove"><i class="fas fa-times"></i></span>'+
                                    '<div  class="row">'+
                                        '<div class="col-lg-6">'+
                                            '<input type="number" name="whole_sell_qty[]" class="input-field" placeholder="Enter Quantity" min="0">'+
                                        '</div>'+
                                        '<div class="col-lg-6">'+
                                            '<input type="number" name="whole_sell_discount[]" class="input-field" placeholder="Enter Discount Percentage" min="0">'+
                                        '</div>'+
                                    '</div>'+
                            '</div>'
                            +'');
    }

});

// Whole Sell Section Ends

// digital product Page
// Toggle Product fratures

$(".show-l").change(function(e) {
    e.stopPropagation();
    $(".show-l + .d-l-option").toggleClass("show-hide");
}).change();

$(".show-w").change(function(e) {
    e.stopPropagation();
    $(".show-w + .d-w-option").toggleClass("show-hide");
}).change();

$(".show-d").change(function(e) {
    e.stopPropagation();
    $(".show-d + .d-d-option").toggleClass("show-hide");
}).change();



// Enable select Box to add new options
$(".js-example-basic").select2({
    tags: true,
});

// Submit product data 

$( "#geniusform" ).on( "submit", function( e ) {
    e.preventDefault();

    $.ajax({
        // url: "{{ route('admin-prod-store') }}",
        url: '/admin/products/store',
        enctype: 'multipart/form-data',
        data : $(this).serialize(),
        type: 'POST',
        cache: false,
        dataType: 'JSON',
        headers: {
            'X-CSRF-Token': '{{ csrf_token() }}',
        },
        success: function(response) {
            $('.alert').addClass('alert-success').removeClass('d-none').text(response);
            // $("#geniusform").reset();    
            console.log('success '+ response);
        },
        error: function(response){
            $('.alert').addClass('alert-danger').removeClass('d-none').text(response);
            console.log('Failed '+ response);
        }
    });
    console.log('from console' + $( this ).serialize() );
  });

})(jQuery);




