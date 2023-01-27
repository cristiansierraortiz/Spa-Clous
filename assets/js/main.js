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

    if ($("#iconoToogle").hasClass("fa-angle-left")) {
      $("#iconoToogle").removeClass("fa-angle-left");
      $("#iconoToogle").addClass("fa-angle-right");
    } else {
      $("#iconoToogle").removeClass("fa-angle-right");
      $("#iconoToogle").addClass("fa-angle-left");
    }
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
  setTimeout(function () {
    $("#alerts").hide(600);
  }, 5500);
});

$(document).ready(function () {
  $("#administradores").DataTable({
    scrollX: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });
});

$(document).ready(function () {
  $("#clientes").DataTable({
    scrollX: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });
});

$(document).ready(function () {
  $("#historialClientes").DataTable({
    scrollX: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });
});

$(document).ready(function () {
  $("#citas").DataTable({
    scrollX: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });
});

$(document).ready(function () {
  $("#colores").DataTable({
    scrollX: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });
});

$(document).ready(function () {
  $("#aromas").DataTable({
    scrollX: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });
});

$(document).ready(function () {
  $("#generosMusicales").DataTable({
    scrollX: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });
});

$(document).ready(function () {
  $("#terapias").DataTable({
    scrollX: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });
});

$(document).ready(function () {
  $("#encuestas").DataTable({
    scrollX: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
    },
  });
});
