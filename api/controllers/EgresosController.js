/**
 * EgresosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  egresos: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.usuario){
      respuesta.view("pages/egresos");
    } else {
      return respuesta.redirect("/");
    }
  },

};

