/**
 * SesionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  inicioSesion: async (peticion, respuesta) => {
    respuesta.view("pages/inicioSesion", { layout: "" });
  },

  procesarInicioSesion: async (peticion, respuesta) => {
    let usuario = await Usuarios.findOne({
      email_usr: peticion.body.email,
      pass_usr: peticion.body.contrasena,
    });

    if (usuario) {
      if (!usuario.est_usr) {
        peticion.addFlash("mensaje", "Usuario inactivo");
        return respuesta.redirect("/");
      } else {
        peticion.session.usuario = usuario;
        peticion.session.nombreCompleto =
          usuario.nom_usr.toUpperCase() + " " + usuario.apell_usr.toUpperCase();
        return respuesta.redirect("/menu-principal");
      }
    } else {
      peticion.addFlash("mensaje", "Email o contrasena invalidos");
      return respuesta.redirect("/");
    }
  },

  menuPrincipal: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.usuario) {
      respuesta.view("pages/dashboard");
    } else {
      return respuesta.redirect("/");
    }
  },

  cerrarSesion: async (peticion, respuesta) => {
    peticion.session.usuario = undefined;
    return respuesta.redirect("/");
  },
};
