/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var fechaBD = new Date();
var fecha =
  fechaBD.getDate() + "-" + fechaBD.getMonth() + "-" + fechaBD.getFullYear();

module.exports = {
  usuarios: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.usuario) {
      let usuarios = await Usuarios.find();
      respuesta.view("pages/usuarios", { usuarios });
    } else {
      return respuesta.redirect("/");
    }
  },

  agregarUsuario: async (peticion, respuesta) => {
    respuesta.view("pages/usuarios/agregarUsuario");
  },

  procesarAgregarUsuario: async (peticion, respuesta) => {
    let usuario = await Usuarios.findOne({
      email_usr: peticion.body.correoUsuario,
    });
    let estadoUsuario;

    if (usuario) {
      peticion.addFlash("mensaje", "Email duplicado");
      return respuesta.redirect("/agregar-usuario");
    } else {
      if (peticion.body.estadoUsuario === "Activo") {
        estadoUsuario = true;
      } else if (peticion.body.estadoUsuario === "Inactivo") {
        estadoUsuario = false;
      }
      await Usuarios.create({
        nom_usr: peticion.body.nombreUsuario,
        apell_usr: peticion.body.apellidoUsuario,
        email_usr: peticion.body.correoUsuario,
        pass_usr: peticion.body.contrasenaUsuario,
        fec_alta: fecha.toString(),
        est_usr: estadoUsuario,
      });
      peticion.addFlash("mensaje", "Usuario registrado");
      return respuesta.redirect("/usuarios");
    }
  },
};
