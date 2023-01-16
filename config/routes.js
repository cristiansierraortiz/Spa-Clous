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

  "GET /menu-principal": "SesionController.menuPrincipal",

  "GET /cerrar-sesion": "SesionController.cerrarSesion",

  "GET /dashboard": "DashboardController.dashboard",

  "GET /usuarios": "UsuariosController.usuarios",

  "GET /ingresos": "IngresosController.ingresos",

  "GET /egresos": "EgresosController.egresos",

  "GET /cuentas-por-cobrar": "CuentasPorCobrarController.cuentasPorCobrar",

  "GET /cuentas-por-pagar": "CuentasPorPagarController.cuentasPorPagar",

  "GET /ahorros": "AhorrosController.ahorros",

  // acciones Usuarios

  "GET /agregar-usuario": "UsuariosController.agregarUsuario",

  "POST /procesar-agregar-usuario": "UsuariosController.procesarAgregarUsuario",

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
