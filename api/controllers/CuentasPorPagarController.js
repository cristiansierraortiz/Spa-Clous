/**
 * CuentasPorPagarController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  cuentasPorPagar: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.usuario){
      respuesta.view("pages/cuentas_por_pagar");
    } else {
      return respuesta.redirect("/");
    }
  },

};

