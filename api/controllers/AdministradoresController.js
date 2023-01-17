/**
 * AdministradoresController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var fechaBD = new Date();
var fecha =
  fechaBD.getDate() + "-" + fechaBD.getMonth() + "-" + fechaBD.getFullYear();

module.exports = {
  administradores: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let administradores = await Administradores.find();
      respuesta.view("pages/administradores", { administradores });
    } else {
      return respuesta.redirect("/");
    }
  },

  agregarAdministrador: async (peticion, respuesta) => {
    respuesta.view("pages/administradores/agregarAdministrador");
  },

  procesarAgregarAdministrador: async (peticion, respuesta) => {
    let administrador = await Administradores.findOne({
      correo_admin: peticion.body.correoAdministrador,
    });
    let estadoAdministrador;

    if (administrador) {
      peticion.addFlash("mensaje", "Email duplicado");
      return respuesta.redirect("/agregar-administrador");
    } else {
      if (peticion.body.estadoAdministrador === "Activo") {
        estadoAdministrador = true;
      } else if (peticion.body.estadoAdministrador === "Inactivo") {
        estadoAdministrador = false;
      }
      await Administradores.create({
        nombre_admin: peticion.body.nombreAdministrador,
        primer_apellido_admin: peticion.body.primerApellidoAdministrador,
        segundo_apellido_admin: peticion.body.segundoApellidoAdministrador,
        correo_admin: peticion.body.correoAdministrador,
        constrasena_admin: peticion.body.contrasenaAdministrador,
        fec_alta: fecha.toString(),
        estado_admin: estadoAdministrador,
      });
      peticion.addFlash("mensaje", "Usuario registrado");
      return respuesta.redirect("/administradores");
    }
  },
};
