/**
 * ClientesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  clientes: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let clientes = await Clientes.find();
      respuesta.view("pages/clientes/mostrarClientes", { clientes });
    } else {
      return respuesta.redirect("/");
    }
  },

  crearCliente: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      respuesta.view("pages/clientes/crearCliente");
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarCrearCliente: async (peticion, respuesta) => {
    let datosCliente = peticion.body;
    let cedula = datosCliente.cedulaCliente;
    let nombres = datosCliente.nombreCliente;
    let apellido1 = datosCliente.apellido1Cliente;
    let apellido2 = datosCliente.apellido2Cliente;
    let sexo = datosCliente.sexoCliente;
    let direccion = datosCliente.direccionCliente;
    let contacto = datosCliente.contactoCliente;
    let correo = datosCliente.correoCliente;
    let edad = datosCliente.edadCliente;
    let sexoCliente;

    if (
      cedula.length === 0 ||
      nombres.length === 0 ||
      apellido1.length === 0 ||
      apellido2.length === 0 ||
      direccion.length === 0 ||
      contacto.length === 0 ||
      correo.length === 0 ||
      edad.length === 0
    ) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/crear-cliente");
    } else {
      let cliente = await Clientes.findOne({
        correo_cliente: correo,
      });

      if (cliente) {
        peticion.addFlash("mensaje", "Email duplicado");
        return respuesta.redirect("/agregar-cliente");
      } else {
        if (sexo === "Masculino") {
          sexoCliente = "M";
        } else if (sexo === "Femenino") {
          sexoCliente = "F";
        }

        await Clientes.create({
          cedula_cliente: cedula,
          nombres_cliente: nombres,
          primer_apellido_cliente: apellido1,
          segundo_apellido_cliente: apellido2,
          sexo_cliente: sexo,
          direccion_cliente: direccion,
          contacto_cliente: contacto,
          correo_cliente: correo,
          edad_cliente: edad,
        });
        peticion.addFlash("mensaje", "Cliente agregado correctamente");
        return respuesta.redirect("/clientes");
      }
    }
  },

  editarCliente: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let idCliente = peticion.params.clienteId;
      let cliente = await Clientes.find({
        id: idCliente,
      });
      respuesta.view("pages/clientes/editarCliente", {
        cliente,
      });
    } else {
      return respuesta.redirect("/");
    }
  },

  procesarEditarCliente: async (peticion, respuesta) => {
    let datosCliente = peticion.body;
    let idCliente = datosCliente.idCliente;
    let direccion = datosCliente.direccionCliente;
    let contacto = datosCliente.contactoCliente;
    let correo = datosCliente.correoCliente;
    let edad = datosCliente.edadCliente;

    if (
      direccion.length === 0 ||
      contacto.length === 0 ||
      correo.length === 0 ||
      edad.length === 0
    ) {
      peticion.addFlash("mensaje", "Complete todos los campos para continuar");
      return respuesta.redirect("/editar-cliente/" + idCliente);
    } else {
      await Clientes.update(
        { id: idCliente },
        {
          direccion_cliente: direccion,
          contacto_cliente: contacto,
          coreo_cliente: correo,
          edad_cliente: edad,
        }
      );
      peticion.addFlash("mensaje", "Cliente editado correctamente");
      return respuesta.redirect("/clientes");
    }
  },

  procesarEliminarCliente: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let idCliente = peticion.params.clienteId;
      let cliente = await Clientes.findOne({
        id: idCliente,
      });
      await Clientes.destroyOne({ id: idCliente });
      peticion.addFlash(
        "mensaje",
        "Cliente " + cliente.nombres_cliente + " eliminado correctamente"
      );
      return respuesta.redirect("/clientes");
    } else {
      return respuesta.redirect("/");
    }
  },

  historialCliente: async (peticion, respuesta) => {
    if (peticion.session && peticion.session.administrador) {
      let idCliente = peticion.params.clienteId;
      let historiales = await Historial.find({
        cliente: idCliente,
      }).populate("cliente");
      respuesta.view("pages/clientes/historialCliente", { historiales });
    } else {
      return respuesta.redirect("/");
    }
  },
};
