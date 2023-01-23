/**
 * MusicoterapiaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  musicoterapia: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let generos = await GenerosMusicales.find();
      respuesta.view("pages/musicoterapia/mostrarMusicoterapia", { generos });
    } else {
      return respuesta.redirect("/");
    }
  },

  crearGenero: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      respuesta.view("pages/musicoterapia/crearMusicoterapia");
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarCrearGenero: async (peticion, respuesta) => {
    let datosGenero = peticion.body;
    let nombre = datosGenero.nombreGenero;
    let descripcion = datosGenero.descripcionGenero;

    if (nombre.length == 0 || descripcion.length == 0) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/crear-genero-musical");
    } else {
      await GenerosMusicales.create({
        nombre_genero_musical: nombre,
        descripcion_genero_musical: descripcion,
      });
      peticion.addFlash("mensaje", "Género Musical agregado correctamente");
      return respuesta.redirect("/generos-musicales");
    }
  },

  editarGenero: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let idGenero = peticion.params.generoId;
      let genero = await GenerosMusicales.find({
        id: idGenero,
      });
      respuesta.view("pages/musicoterapia/editarMusicoterapia", {
        genero,
      });
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarEditarGenero: async (peticion, respuesta) => {
    let datosGenero = peticion.body;
    let idGenero = datosGenero.idGenero;
    let nombre = datosGenero.nombreGenero;
    let descripcion = datosGenero.descripcionGenero;

    if (descripcion.length == 0) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/editar-genero-musical/" + idGenero);
    } else {
      await GenerosMusicales.update(
        { id: idGenero },
        {
          nombre_genero_musical: nombre,
          descripcion_genero_musical: descripcion,
        }
      );
      peticion.addFlash("mensaje", "Genero Musical editado correctamente");
      return respuesta.redirect("/generos-musicales");
    }
  },
};
