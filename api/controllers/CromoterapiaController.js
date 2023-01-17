/**
 * CromoterapiaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  cromoterapia: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador){
      respuesta.view("pages/cromoterapia");
    } else {
      return respuesta.redirect("/");
    }
  },

};

