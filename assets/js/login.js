$(document).ready(function () {
  var menus = $("#sidebar li");
  menus.click(function () {
    menus.removeClass("active");
    $(this).addClass("active");
  });
});
