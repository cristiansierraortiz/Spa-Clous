/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  dashboard: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.usuario){
      respuesta.view("pages/dashboard");
    } else {
      return respuesta.redirect("/");
    }
  },

};

