(function ($) {
  "use strict";

  var fullHeight = function () {
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight();
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });
})(jQuery);

$(function () {
  $(".js-check-all").on("click", function () {
    if ($(this).prop("checked")) {
      $('.control--checkbox input[type="checkbox"]').each(function () {
        $(this).prop("checked", true);
        $(this).closest("tr").addClass("active");
      });
    } else {
      $('.control--checkbox input[type="checkbox"]').each(function () {
        $(this).prop("checked", false);
        $(this).closest("tr").removeClass("active");
      });
    }
  });
  $('.control--checkbox input[type="checkbox"]').on("click", function () {
    if ($(this).closest("tr").hasClass("active")) {
      $(this).closest("tr").removeClass("active");
    } else {
      $(this).closest("tr").addClass("active");
    }
  });
});

$(document).ready(function () {
  $("#administradores").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });
});
