/**
 * AromaterapiaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  aromaterapia: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let aromas = await Aromas.find();
      respuesta.view("pages/aromaterapia/mostrarAromaterapia", { aromas });
    } else {
      return respuesta.redirect("/");
    }
  },

  crearAroma: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      respuesta.view("pages/aromaterapia/crearAromaterapia");
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarCrearAroma: async (peticion, respuesta) => {
    let datosAroma = peticion.body;
    let nombre = datosAroma.nombreAroma;
    let descripcion = datosAroma.descripcionAroma;

    if (nombre.length == 0 || descripcion.length == 0) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/crear-aroma");
    } else {
      await Aromas.create({
        nombre_aroma: nombre,
        descripcion_aroma: descripcion,
      });
      peticion.addFlash("mensaje", "Aroma agregado correctamente");
      return respuesta.redirect("/aromas");
    }
  },

  editarAroma: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let idAroma = peticion.params.aromaId;
      let aroma = await Aromas.find({
        id: idAroma,
      });
      respuesta.view("pages/aromaterapia/editarAromaterapia", {
        aroma,
      });
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarEditarAroma: async (peticion, respuesta) => {
    let datosAroma = peticion.body;
    let idAroma = datosAroma.idAroma;
    let nombre = datosAroma.nombreAroma;
    let descripcion = datosAroma.descripcionAroma;

    if (descripcion.length == 0) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/editar-aroma/" + idAroma);
    } else {
      await Aromas.update(
        { id: idAroma },
        {
          nombre_aroma: nombre,
          descripcion_aroma: descripcion,
        }
      );
      peticion.addFlash("mensaje", "Aroma editado correctamente");
      return respuesta.redirect("/aromas");
    }
  },
};
