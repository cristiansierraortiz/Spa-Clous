/**
 * CromoterapiaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  cromoterapia: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador){
      let aromas = await Aromas.find();
      respuesta.view("pages/cromoterapia/mostrarCromoterapia", { aromas });
    } else {
      return respuesta.redirect("/");
    }
  },

};

