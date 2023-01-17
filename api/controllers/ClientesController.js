/**
 * ClientesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  clientes: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador){
      respuesta.view("pages/clientes");
    } else {
      return respuesta.redirect("/");
    }
  },

};

