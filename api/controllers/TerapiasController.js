/**
 * TerapiasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  terapias: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador){
      let terapias = await Terapias.find().populate("color").populate("aroma").populate("genero");
      respuesta.view("pages/terapias/mostrarTerapias", { terapias });
    } else {
      return respuesta.redirect("/");
    }
  },

};

