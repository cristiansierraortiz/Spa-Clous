/**
 * MusicoterapiaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  musicoterapia: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador){
      respuesta.view("pages/musicoterapia");
    } else {
      return respuesta.redirect("/");
    }
  },

};

