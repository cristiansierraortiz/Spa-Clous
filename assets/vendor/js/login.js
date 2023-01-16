$( document ).ready(function() {
  $("#sidebar li").on("click", function(){
    $('.search.acvtive')
    .removeClass('active')
    .addClass('active')
  });
});