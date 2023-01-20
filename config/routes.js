/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "GET /": "SesionController.inicioSesion",

  "POST /procesar-inicio-sesion": "SesionController.procesarInicioSesion",

  "GET /encuesta": "SesionController.encuesta",

  "POST /procesar-encuesta-cliente": "SesionController.procesarEncuesta",

  "GET /menu-principal": "SesionController.menuPrincipal",

  "GET /cerrar-sesion": "SesionController.cerrarSesion",

  "GET /dashboard": "DashboardController.dashboard",

  "GET /administradores": "AdministradoresController.administradores",

  "GET /clientes": "ClientesController.clientes",

  "GET /citas": "CitasController.citas",

  "GET /colores": "CromoterapiaController.cromoterapia",

  "GET /aromas": "AromaterapiaController.aromaterapia",

  "GET /generos-musicales": "MusicoterapiaController.musicoterapia",

  "GET /terapias": "TerapiasController.terapias",

  // acciones Administradores

  "GET /crear-administrador": "AdministradoresController.crearAdministrador",

  "POST /procesar-crear-administrador":
    "AdministradoresController.procesarCrearAdministrador",

  "GET /editar-administrador/:adminId":
    "AdministradoresController.editarAdministrador",

  "POST /procesar-editar-administrador":
    "AdministradoresController.procesarEditarAdministrador",

  "GET /eliminar-administrador/:adminId":
    "AdministradoresController.procesarEliminarAdministrador",

  // acciones Clientes

  "GET /crear-cliente": "ClientesController.crearCliente",

  "POST /procesar-crear-cliente": "ClientesController.procesarCrearCliente",

  "GET /editar-cliente/:clienteId": "ClientesController.editarCliente",

  "POST /procesar-editar-cliente": "ClientesController.procesarEditarcliente",

  "GET /eliminar-cliente/:clienteId":
    "ClientesController.procesarEliminarcliente",

  "GET /historial-cliente/:clienteId": "ClientesController.historialCliente",

  "GET /resultados-encuestas-cliente/:clienteId":
    "ClientesController.encuestasCliente",

  // acciones Citas

  "GET /crear-cita": "CitasController.crearCita",

  "POST /procesar-crear-cita": "CitasController.procesarCrearCita",

  "GET /completar-cita/:citaId": "CitasController.completarCita",

  "GET /editar-cita/:citaId": "CitasController.editarCita",

  "POST /procesar-editar-cita": "CitasController.procesarEditarCita",

  "GET /eliminar-cita/:citaId": "CitasController.procesarEliminarCita",

  // acciones Cromoterapia

  "GET /crear-color": "CromoterapiaController.crearColor",

  "POST /procesar-crear-color": "CromoterapiaController.procesarCrearColor",

  "GET /editar-color/:colorId": "CromoterapiaController.editarColor",

  "POST /procesar-editar-color": "CromoterapiaController.procesarEditarColor",

  "GET /eliminar-color/:colorId":
    "CromoterapiaController.procesarEliminarColor",

  // acciones Aromaterapia

  "GET /crear-aroma": "AromaterapiaController.crearAroma",

  "POST /procesar-crear-aroma": "AromaterapiaController.procesarCrearAroma",

  "GET /editar-aroma/:aromaId": "AromaterapiaController.editarAroma",

  "POST /procesar-editar-aroma": "AromaterapiaController.procesarEditarAroma",

  "GET /eliminar-aroma/:aromaId":
    "AromaterapiaController.procesarEliminarAroma",

  // acciones Musicoterapia

  "GET /crear-genero": "MusicoterapiaController.crearGenero",

  "POST /procesar-crear-genero": "MusicoterapiaController.procesarCrearGenero",

  "GET /editar-genero/:generoId": "MusicoterapiaController.editarGenero",

  "POST /procesar-editar-genero":
    "MusicoterapiaController.procesarEditarGenero",

  "GET /eliminar-genero/:generoId":
    "MusicoterapiaController.procesarEliminarGenero",

  // acciones Terapia

  "GET /crear-terapia": "TerapiaController.crearTerapia",

  "POST /procesar-crear-terapia": "TerapiaController.procesarCrearTerapia",

  "GET /editar-terapia/:terapiaId": "TerapiaController.editarTerapia",

  "POST /procesar-editar-terapia": "TerapiaController.procesarEditarTerapia",

  "GET /eliminar-terapia/:terapiaId":
    "TerapiaController.procesarEliminarTerapia",

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
