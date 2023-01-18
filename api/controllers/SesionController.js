/**
 * SesionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  inicioSesion: async (peticion, respuesta) => {
    respuesta.view("layouts/login", { layout: "" });
  },

  procesarInicioSesion: async (peticion, respuesta) => {
    let administrador = await Administradores.findOne({
      correo_admin: peticion.body.correo,
      contrasena_admin: peticion.body.contrasena,
    });

    if (administrador) {
      if (!administrador.estado_admin) {
        peticion.addFlash("mensaje", "Administrador inactivo");
        return respuesta.redirect("/");
      } else {
        peticion.session.administrador = administrador;
        peticion.session.nombreCompleto =
          administrador.nombres_admin.toUpperCase() +
          " " +
          administrador.primer_apellido_admin.toUpperCase();
        return respuesta.redirect("/menu-principal");
      }
    } else {
      peticion.addFlash("mensaje", "Email o contrasena invalidos");
      return respuesta.redirect("/");
    }
  },

  menuPrincipal: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      respuesta.view("pages/dashboard");
    } else {
      return respuesta.redirect("/");
    }
  },

  encuesta: async (peticion, respuesta) => {
    respuesta.view("layouts/encuesta", { layout: "" });
  },

  procesarEncuesta: async (peticion, respuesta) => {
    let encuesta = peticion.body;
    console.log(encuesta);
    return respuesta.redirect("/encuesta");
  },

  cerrarSesion: async (peticion, respuesta) => {
    peticion.session.administrador = undefined;
    return respuesta.redirect("/");
  },
};
