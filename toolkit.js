
//h6 area clicks to open toggle    
  $('h6').on('click', function(){

    $('.toggle').click(function(e) {
      e.stopPropagation();
    });

    $(this).next('.toggle:first').triggerHandler('click');

    $('.menu').click(function(e) {
      e.stopPropagation();
    });

  });

    //expand the next div + -
    $('.toggle').on('click', function(){
      $(this).next().slideToggle('fast');
      
      let toggleTxt = $(this).text();
      
      if(toggleTxt === 'expand_more'){
        $(this).text('expand_less');
      }else{
        $(this).text('expand_more');
      }
  });

      //toggle doesn't click checkbox
      $('.toggle').click(function(e) {
        e.stopPropagation();
      });

      //h6 doesn't click checkbox
      $('h6').on('click', function(e) {
        e.stopPropagation();
      });

  //select the checkbox by clicking on the area!!!
  $('.paddingXtra').on('click', function(){

    //select checkbox
    boxCheck = $(this).find('input').prop('checked');
    if(boxCheck){
      $(this).find('input').prop('checked', false);
      $(this).find('input').triggerHandler('click');
      $(this).css('outline','1px solid rgba(157, 221, 247, 0.4)');
      // $(this).css('outline-offset','-7px');
      $(this).css('box-shadow','inset 0px 0px 0px rgba(157, 221, 247, 0.4)');
    }else{
      $(this).find('input').prop('checked', true);
      $(this).find('input').triggerHandler('click');
      $(this).css('outline','2px solid #C8EFFF');
      // $(this).css('outline-offset','-7px');
      $(this).css('box-shadow','inset 0px 0px 13px rgba(157, 221, 247, 0.4)');
    }
     //update total in cart and sections
     itemNum();
  });

  //add project to the DL area
  $("#pName").blur(function(){
    let pName = $('#pName').val();
    $('#pTitle').text(pName);
  }); 

  //checkbox controls - 
  //first check for defaulted "required"
  let inCart = $(":checkbox:checked").length;
  
    $(document).ready(function() {
      //clear chekboxes and name on reload
      $('input').prop('checked', false);
      $('#pName').val('');
      //default checked number to cart "toolbox"
      $('.totalNum').text(inCart);
    });
  
  $('.check').on('click', function(){
    let method = $(this).val();
    let time = parseInt($(this).data('time'));
    let totalTime = parseInt($('#time').val());
    let noSpace = method.replace(/ /g,'');
    let pill = '<div class="pill '+noSpace+'" data-time="'+time+'">'+method+'<span class="remove material-icons md-48" id="'+method+'">close</span></div>';
    let cata = $(this).data("cata");
  
    if($(this).prop('checked')){
      $('.'+cata).prepend(pill);
      $('#time').val(totalTime+time);
    }else{
      $('div').remove('.'+noSpace);
      $('#time').val(totalTime-time);
    }

  //remove or show "nothing selected"
  let hasSomething = $('.'+cata).children().length;
    if(hasSomething > 1 ){
      $('.'+cata + "> .nothing").text('');
    } else{
      $('.'+cata + "> .nothing").text('Nothing Selected');
    }
    
    //trying to do something with a diabled chekbox, can't select cause it is disabled
    let defaultD = $(this).attr('data-default');
    // if(defaultD){
    //   alert('whaaaa?');
    // }
    
    //update total in cart and sections
    itemNum();
    
  });
  
  //TODO if checked by default (required) add to items - without (x) button ///////
  
  //Remove Pill --- 
  //.delegate is used for items that do not exist in DOM on render
  $(".review").delegate(".remove", "click", function(){
    let remove = $(this).attr('id');
  //uncheck the appropriate box and remove styling from method
    $('input[value="' + remove + '"]').prop('checked', false);
    let methOut = $('input[value="' + remove + '"]').parentsUntil('.content');
    methOut.not('.box').css('outline','1px solid rgba(157, 221, 247, 0.4)');
    methOut.not('.box').css('box-shadow','0px 0px 0px rgba(157, 221, 247, 0)');
    
    //show text "nothing selected"
    let hasPill = $(this).parents('.review').children().length;
      if(hasPill < 3){
        $(this).parents('.review').find('.nothing').text('Nothing Selected');
      }

    //remove it
    $(this).parent().remove();

    //reduce total in cart and sections
    itemNum();

    //Subtract time from total
    let totalTime = parseInt($('#time').val());
    let time = parseInt($(this).parent().data('time'));
    $('#time').val(totalTime-time);
    
  });

  function itemNum(){
        //reduce total in cart
        let inCart = $(":checkbox:checked").length;
        $('.totalNum').text(inCart);
        //update section number
        let inDisc = $(".discChecks:checkbox:checked").length;
        $('.discNum').text(inDisc);
        let inDefi = $(".defChecks:checkbox:checked").length;
        $('.defNum').text(inDefi);
        let inIdea = $(".ideaChecks:checkbox:checked").length;
        $('.ideaNum').text(inIdea);
        let inTest = $(".testChecks:checkbox:checked").length;
        $('.testNum').text(inTest);
  }
  
  // NAVIGATION /////////
  $('#start').on('click', function(){
    $('#USA').slideUp(800);
    $('.active').slideDown(800); //which adds "display block"
  });
  
  $('#home').on('click', function(){
    $('.active').css('display','none'); //hides content but preserves spot
    $('#USA').slideDown(800);
  });
  
  $('#cartButton').on('click', function(){
    $('.active').removeClass('active');
    $('.rev').addClass('active');
    navConditional();
  });

  $('#pTitle').on('click', function(){
    $('.active').removeClass('active');
    $('.nameIt').addClass('active');
    navConditional();
  });

  function navConditional(){
    // hide/show back button
    if($("section:first").hasClass('active')){
        $('#back').hide();
      }else{
        $('#back').show();
      }
    //same button logic but for continue
      if($("section:last").hasClass('active')){
        $('#continue').hide();
        $('#submit').show();
      }else{
        $('#continue').show();
        $('#submit').hide();
      }
  }
  
  $('#back').on('click', function(){    
    $('.active').prev('section').addClass('active');
    $('.active:last').removeClass('active');

    navConditional();
  });
  
  $('#continue').on('click', function(){
     $('.active').next('section').addClass('active');  
     $('.active:last').prev('section').removeClass('active');
    
     if($('#pTitle').text()){
      //do nothing
     }else {
      let pName = $('#pName').val();
      $('#pTitle').text(pName);
     }

     navConditional();
  });
  
  $( document ).ready(function() {
      if($("section:first").hasClass('active')){
        $('#back').hide();
      }

    //Nothing selected - Null state
    let hasSomething = $(".review").children().hasClass('pill');

      if(hasSomething){
        $(".review > .nothing").text('');
      } else {
        $(".review > .nothing").text('Nothing Selected');
      }

  });
  
//.discoveries .defines .ideas .tests

//DOWNLOAD CONTENT
var fileName =  'Liberty-UX-Toolkit.html'; 

function downloadInnerHtml(filename, elId, mimeType) {
  var elHtml = document.getElementById(elId).innerHTML;
  var link = document.createElement('a');
  mimeType = mimeType || 'text/plain';

  link.setAttribute('download', filename);
  link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
  link.click(); 
}

$('#downloadLink').click(function(){
  //add project name to the DL area
  let pName = $('#pName').val();
  $('#dlContent').append("<h2>"+pName+"</h2>");
  //add checked content
  let description = $("input:checked").parentsUntil('.content').contents().clone();
  $('#dlContent').append(
    '<head><title>Liberty HCD | UX Toolkit</title>'+
    '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'+
    '<style>input,hr,.toggle{display:none}body{max-width:800px; margin:140px; font-family: sans-serif}ul{list-style: none;}'+
    'h3,h4{margin-bottom:0px;}h3{font-size:30px;}</style>'+
    '</head><body>');
    $('#dlContent').append(description);
  $('#dlContent').append('</body>');
  //Download the dlcontent area
  downloadInnerHtml(fileName, 'dlContent','text/html');
  //remove everything from dl div
  $('#dlContent').empty();
});
