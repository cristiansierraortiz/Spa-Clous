/**
 * MusicoterapiaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  musicoterapia: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador){
      let generos = await GenerosMusicales.find();
      respuesta.view("pages/musicoterapia/mostrarMusicoterapia", { generos });
    } else {
      return respuesta.redirect("/");
    }
  },

};

