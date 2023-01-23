/**
 * CromoterapiaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  cromoterapia: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let colores = await Colores.find();
      respuesta.view("pages/cromoterapia/mostrarCromoterapia", { colores });
    } else {
      return respuesta.redirect("/");
    }
  },

  crearColor: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      respuesta.view("pages/cromoterapia/crearCromoterapia");
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarCrearColor: async (peticion, respuesta) => {
    let datosColor = peticion.body;
    let nombre = datosColor.nombreColor;
    let efecto = datosColor.efectoColor;

    if (nombre.length == 0 || efecto.length == 0) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/crear-color");
    } else {
      await Colores.create({
        nombre_color: nombre,
        efecto_color: efecto,
      });
      peticion.addFlash("mensaje", "Color agregado correctamente");
      return respuesta.redirect("/colores");
    }
  },

  editarColor: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let idColor = peticion.params.colorId;
      let color = await Colores.find({
        id: idColor,
      });
      respuesta.view("pages/cromoterapia/editarCromoterapia", {
        color,
      });
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarEditarColor: async (peticion, respuesta) => {
    let datosColor = peticion.body;
    let idColor = datosColor.idColor;
    let nombre = datosColor.nombreColor;
    let efecto = datosColor.efectoColor;

    if (efecto.length == 0) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/editar-color/" + idColor);
    } else {
      await Colores.update(
        { id: idColor },
        {
          nombre_color: nombre,
          efecto_color: efecto,
        }
      );
      peticion.addFlash("mensaje", "Color editado correctamente");
      return respuesta.redirect("/colores");
    }
  },
};
