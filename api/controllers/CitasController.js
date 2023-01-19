/**
 * CitasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  citas: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let citas = await Citas.find().populate("cliente");
      respuesta.view("pages/citas/mostrarCitas", { citas });
    } else {
      return respuesta.redirect("/");
    }
  },
};
