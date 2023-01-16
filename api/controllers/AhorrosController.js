/**
 * AhorrosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  ahorros: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.usuario){
      respuesta.view("pages/ahorros");
    } else {
      return respuesta.redirect("/");
    }
  },

};

