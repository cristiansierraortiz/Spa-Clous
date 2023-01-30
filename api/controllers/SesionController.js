/**
 * SesionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

function obtenerFechaCorta() {
  let fecha = new Date();
  let dia = fecha.getDate();
  let mes = fecha.getMonth() + 1;
  let ano = fecha.getFullYear();
  let fechaFinal = ano + "-" + "0" + mes + "-" + dia;

  return fechaFinal;
}

module.exports = {
  inicioSesion: async (peticion, respuesta) => {
    respuesta.view("layouts/login", { layout: "" });
  },

  procesarInicioSesion: async (peticion, respuesta) => {
    let administrador = await Administradores.findOne({
      correo_admin: peticion.body.correo,
      contrasena_admin: peticion.body.contrasena,
    });

    if (administrador) {
      if (!administrador.estado_admin) {
        peticion.addFlash("mensajeLogin", "Administrador inactivo");
        return respuesta.redirect("/");
      } else {
        peticion.session.administrador = administrador;
        peticion.session.nombreCompleto =
          administrador.nombres_admin.toUpperCase() +
          " " +
          administrador.primer_apellido_admin.toUpperCase();
        return respuesta.redirect("/administradores");
      }
    } else {
      peticion.addFlash("mensajeLogin", "Email o contrasena invalidos");
      return respuesta.redirect("/");
    }
  },

  encuesta: async (peticion, respuesta) => {
    respuesta.view("layouts/encuesta", { layout: "" });
  },

  procesarEncuesta: async (peticion, respuesta) => {
    let datosCliente = peticion.body;
    let cedula = datosCliente.cedulaCliente;
    let calificacion = datosCliente.calificacion;
    let aromaterapia = datosCliente.aromaterapia;
    let musicoterapia = datosCliente.musicoterapia;
    let observacion = datosCliente.observacion;
    let idCliente;

    if (
      cedula.length === 0 ||
      calificacion.length === 0 ||
      aromaterapia.length === 0 ||
      musicoterapia.length === 0 ||
      observacion.length === 0
    ) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar!");
      return respuesta.redirect("/encuesta");
    } else {
      let cliente = await Clientes.findOne({
        cedula_cliente: cedula,
      });

      if (!cliente) {
        peticion.addFlash(
          "mensaje",
          "La cedula ingresada no existe, favor validar!"
        );
        return respuesta.redirect("/encuesta");
      } else {
        idCliente = cliente.id;
        await EncuestaSatisfaccionClientes.create({
          cliente: idCliente,
          calificacion_encuesta: calificacion,
          resultado_aromaterapia: aromaterapia,
          resultado_musicoterapia: musicoterapia,
          resultado_observaciones: observacion,
          fecha_encuesta: obtenerFechaCorta(),
        });
        peticion.addFlash(
          "mensajeExitoso",
          "Respuestas enviadas correctamente. Muchas gracias!"
        );
        return respuesta.redirect("/encuesta");
      }
    }
  },

  cerrarSesion: async (peticion, respuesta) => {
    peticion.session.administrador = undefined;
    return respuesta.redirect("/");
  },
};
