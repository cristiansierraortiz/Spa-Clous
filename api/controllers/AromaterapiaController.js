/**
 * AromaterapiaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  aromaterapia: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador){
      respuesta.view("pages/aromaterapia");
    } else {
      return respuesta.redirect("/");
    }
  },

};

