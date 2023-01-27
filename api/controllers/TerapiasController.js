/**
 * TerapiasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  terapias: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let terapias = await Terapias.find()
        .populate("color")
        .populate("aroma")
        .populate("genero");
      respuesta.view("pages/terapias/mostrarTerapias", { terapias });
    } else {
      return respuesta.redirect("/");
    }
  },

  crearTerapia: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let colores = await Colores.find();
      let aromas = await Aromas.find();
      let generos = await GenerosMusicales.find();
      respuesta.view("pages/terapias/crearTerapia", {
        colores,
        aromas,
        generos,
      });
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarCrearTerapia: async (peticion, respuesta) => {
    let datosTerapia = peticion.body;
    let descripcion = datosTerapia.descripcionTerapia;
    let idColor = datosTerapia.idColor;
    let idAroma = datosTerapia.idAroma;
    let idGenero = datosTerapia.idGenero;

    if (
      descripcion.length == 0 ||
      idColor == undefined ||
      idAroma == undefined ||
      idGenero == undefined
    ) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/crear-terapia");
    } else {
      await Terapias.create({
        descripcion_terapia: descripcion,
        color: idColor,
        aroma: idAroma,
        genero: idGenero,
      });
      peticion.addFlash("mensaje", "Terapia creada correctamente");
      return respuesta.redirect("/terapias");
    }
  },

  editarTerapia: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let idTerapia = peticion.params.terapiaId;

      let terapia = await Terapias.find({
        id: idTerapia,
      });
      let colores = await Colores.find();
      let aromas = await Aromas.find();
      let generos = await GenerosMusicales.find();

      respuesta.view("pages/terapias/editarTerapia", {
        terapia,
        colores,
        aromas,
        generos,
      });
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarEditarTerapia: async (peticion, respuesta) => {
    let datosTerapia = peticion.body;
    let idTerapia = datosTerapia.idTerapia;
    let idColor = datosTerapia.idColor;
    let idAroma = datosTerapia.idAroma;
    let idGenero = datosTerapia.idGenero;

    if (idColor == undefined || idAroma == undefined || idGenero == undefined) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/editar-terapia/" + idTerapia);
    } else {
      await Terapias.update(
        { id: idTerapia },
        {
          color: idColor,
          aroma: idAroma,
          genero: idGenero,
        }
      );
      peticion.addFlash("mensaje", "Terapia actualizada correctamente");
      return respuesta.redirect("/terapias");
    }
  },

  procesarEliminarTerapia: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let idterapia = peticion.params.terapiaId;
      let terapia = await Terapias.findOne({
        id: idterapia,
      });
      await Terapias.destroyOne({ id: idterapia });
      peticion.addFlash(
        "mensaje",
        'Terapia "' + terapia.descripcion_terapia + '" eliminada correctamente'
      );
      return respuesta.redirect("/terapias");
    } else {
      return respuesta.redirect("/");
    }
  },

  obtenerTerapia: async (peticion, respuesta) => {
    try {
      let idTerapia = peticion.params.terapiaId;
      let resultado = await Terapias.findOne({
        id: idTerapia,
      })
        .populate("color")
        .populate("aroma")
        .populate("genero");
      respuesta.status(200).json({ datos: resultado });
    } catch (error) {
      respuesta.status(500).json({ mensaje: error });
    }
  },
};
