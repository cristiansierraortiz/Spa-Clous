/**
 * AdministradoresController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

function obtenerFechaCorta() {
  let fecha = new Date();
  let dia = fecha.getDate();
  let mes = fecha.getMonth() + 1;
  let ano = fecha.getFullYear();
  let fechaFinal = dia + "-" + mes + "-" + ano;

  return fechaFinal;
}

module.exports = {
  administradores: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let administradores = await Administradores.find();
      respuesta.view("pages/administradores/mostrarAdministradores", {
        administradores,
      });
    } else {
      return respuesta.redirect("/");
    }
  },

  crearAdministrador: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      respuesta.view("pages/administradores/crearAdministrador");
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarCrearAdministrador: async (peticion, respuesta) => {
    let datosAdministrador = peticion.body;
    let nombres = datosAdministrador.nombreAdministrador;
    let apellido1 = datosAdministrador.apellido1Administrador;
    let apellido2 = datosAdministrador.apellido2Administrador;
    let correo = datosAdministrador.correoAdministrador;
    let contrasena = datosAdministrador.contrasenaAdministrador;
    let estado = datosAdministrador.estadoAdministrador;
    let estadoAdministrador;

    if (
      nombres.length == 0 ||
      apellido1.length == 0 ||
      apellido2.length == 0 ||
      correo.length == 0 ||
      contrasena.length == 0 ||
      estado == undefined
    ) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/crear-administrador");
    } else {
      let administrador = await Administradores.findOne({
        correo_admin: correo,
      });

      if (administrador) {
        peticion.addFlash("mensaje", "Email duplicado");
        return respuesta.redirect("/agregar-administrador");
      } else {
        if (estado == 1) {
          estadoAdministrador = true;
        } else if (estado == 2) {
          estadoAdministrador = false;
        }
        await Administradores.create({
          nombres_admin: nombres,
          primer_apellido_admin: apellido1,
          segundo_apellido_admin: apellido2,
          correo_admin: correo,
          contrasena_admin: contrasena,
          fecha_alta: obtenerFechaCorta(),
          estado_admin: estadoAdministrador,
        });
        peticion.addFlash("mensaje", "Administrador agregado correctamente");
        return respuesta.redirect("/administradores");
      }
    }
  },

  editarAdministrador: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let idAdmin = peticion.params.adminId;
      let administrador = await Administradores.find({
        id: idAdmin,
      });
      respuesta.view("pages/administradores/editarAdministrador", {
        administrador,
      });
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarEditarAdministrador: async (peticion, respuesta) => {
    let datosAdministrador = peticion.body;
    let idAdmin = datosAdministrador.idAdministrador;
    let nombres = datosAdministrador.nombreAdministrador;
    let estado = datosAdministrador.estadoAdministrador;
    let estadoAdministrador;

    if (nombres.length == 0 || estado == undefined) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/editar-administrador/" + idAdmin);
    } else {
      if (estado == 1) {
        estadoAdministrador = true;
      } else if (estado == 2) {
        estadoAdministrador = false;
      }
      await Administradores.update(
        { id: idAdmin },
        {
          nombres_admin: nombres,
          estado_admin: estadoAdministrador,
        }
      );
      peticion.addFlash("mensaje", "Administrador editado correctamente");
      return respuesta.redirect("/administradores");
    }
  },

  procesarEliminarAdministrador: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let idAdmin = peticion.params.adminId;
      let administrador = await Administradores.findOne({
        id: idAdmin,
      });
      await Administradores.destroyOne({ id: idAdmin });
      peticion.addFlash(
        "mensaje",
        "Administrador " +
          administrador.nombres_admin +
          " eliminado correctamente"
      );
      return respuesta.redirect("/administradores");
    } else {
      return respuesta.redirect("/");
    }
  },
};
