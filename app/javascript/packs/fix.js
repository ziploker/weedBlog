import $ from 'jquery';


//$(document).ready(function() {
//    $('#select').css('color','white');
//    $('#select').change(function() {
//       var current = $('#select').val();
//       if (current != 'null') {
//           $('#select').css('color','black');
//       } else {
//           $('#select').css('color','gray');
//       }
//    }); 
//});

$(document).ready(function() {

    var e = document.getElementById('select');

    if (!e ){
        return
    }else{
        e.onchange = function() {
            if (e.value != 'null') {
                e.style.color = 'black';
            } else {
                e.style.color = 'green';
            }
         }; 

    }
    
    //e.focus();

});