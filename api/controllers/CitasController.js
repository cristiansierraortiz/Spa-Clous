/**
 * CitasController
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
  citas: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let citas = await Citas.find().populate("cliente");
      respuesta.view("pages/citas/mostrarCitas", { citas });
    } else {
      return respuesta.redirect("/");
    }
  },

  crearCita: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let clientes = await Clientes.find();
      respuesta.view("pages/citas/crearCita", { clientes });
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarCrearCita: async (peticion, respuesta) => {
    let datosCita = peticion.body;
    let idCliente = datosCita.idCliente;
    let fecha = datosCita.fechaCita;

    if (idCliente == undefined || fecha.length == 0) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/crear-cita");
    } else {
      await Citas.create({
        cliente: idCliente,
        fecha_cita: fecha,
        estado_cita: false,
      });
      peticion.addFlash("mensaje", "Cita agendada correctamente");
      return respuesta.redirect("/citas");
    }
  },

  completarCita: async (peticion, respuesta) => {
    let idCita = peticion.params.citaId;
    await Citas.update({ id: idCita }, { estado_cita: true });
    peticion.addFlash("mensaje", "Cita completada correctamente");
    return respuesta.redirect("/citas");
  },

  editarCita: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let idCita = peticion.params.citaId;
      let cita = await Citas.find({
        id: idCita,
      }).populate("cliente");
      console.log(cita);
      respuesta.view("pages/citas/editarCita", { cita });
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarEditarCita: async (peticion, respuesta) => {
    let datosCita = peticion.body;
    let idCita = datosCita.idCita;
    let idCliente = datosCita.idCliente;
    let fecha = datosCita.fechaCita;

    if (idCliente == undefined || fecha.length == 0) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/editar-cita" + idCita);
    } else {
      await Citas.update(
        {
          id: idCita,
          cliente: idCliente,
        },
        { fecha_cita: fecha, estado_cita: false }
      );
      peticion.addFlash("mensaje", "Cita modificada correctamente");
      return respuesta.redirect("/citas");
    }
  },

  procesarEliminarCita: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let idCita = peticion.params.citaId;
      await Citas.destroyOne({ id: idCita });
      peticion.addFlash("mensaje", "Cita eliminada correctamente");
      return respuesta.redirect("/citas");
    } else {
      return respuesta.redirect("/");
    }
  },

  obtenerCitaCliente: async (peticion, respuesta) => {
    try {
      let resultado = await sails.sendNativeQuery(
        "select * from public.citas \
        inner join public.clientes on citas.id_cliente_cita = clientes.id_cliente \
        where estado_cita = false and fecha_cita <= current_date;"
      );
      let citas = resultado.rows;
      respuesta.status(200).json({ datos: citas });
    } catch (error) {
      respuesta.status(500).json({ mensaje: error });
    }
  },

  insertarDatosCitaCliente: async (peticion, respuesta) => {
    try {
      let { idCliente, saturacion, ritmoCardiaco } = peticion.query;
      await Historial.create({
        cliente: idCliente,
        saturacion_historial: saturacion,
        frecuencia_cardiaca_historial: ritmoCardiaco,
        fecha_historial: obtenerFechaCorta(),
      });
      let historial = "Historial registrado correctamente!";
      respuesta.status(200).json({ mensaje: historial });
    } catch (error) {
      respuesta.status(500).json({ mensaje: error });
    }
  },
};
