/**
 * CitasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  citas: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador){
      respuesta.view("pages/citas");
    } else {
      return respuesta.redirect("/");
    }
  },

};

