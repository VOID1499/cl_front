// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var url = "http://localhost:8000/api/";


export const environment = {
  production: false,
  "urlPacientes": url+"pacientes",
  "urlPaciente": url+"paciente",
  "urlDias":url+"dias",
  "urlDia":url+"dia",
  "urlEspecialidades":url+"especialidades",
  "urlEspecialidad":url+"especialidad",
  
  "urlDiccionario": url+"urlDiccionario",

  "urlTipoProfesionales":url+"tipo/profesionales",
  "urlTipoProfesional":url+"tipo/profesional",

  "urlFeriados":url+"feriados",
  "urlFeriado":url+"feriado",


  "urlProfesionales":url+"profesionales",
  "urlProfesionalesPorEspecialidad":url+"profesionalesPorEspecialidad",
  "urlProfesional":url+"profesional",

  "urlAtenciones":url+"atenciones",
  "urlAtencion":url+"atencion",
  "urlFichas":url+"fichas",
  "urlFicha":url+"ficha",

  //Formulario
  "urlFormularios":url+"formularios",
  "urlFormularioEditar":url+"formulario/editar",
  "urlFormularioCrear":url+"formulario/crear",
  "urlCargarFormulario":url+"cargar/formulario",
  "urlGuardarDatos":url+"guardar/formulario",

  //Tipos de formulario
  "urlTiposFormulario":url+"tipos_formulario",
  "urlTipoFormulario":url+"tipo_formulario",
  "urlEliminarTipoFormulario":url+"eliminar_tipo_formulario",


  //servicios
  "urlServicios":url+"servicios",
  "urlServiciosPorProfesional":url+"serviciosPorProfesional",
  "urlServicio":url+"servicio",


  "urlTipoDatos":url+"tipo/datos",
  "urlTipoDato":url+"tipo/dato",

  "urlRecetas":url+"recetas",
  "urlReceta":url+"agregar/receta",

  "urlVademecums":url+"medicamentos",
  "urlVademecum":url+"medicamento",
  "urlEnfermedades":url+"enfermedades",
  "urlEnfermedad":url+"enfermedad",



  //LOGIN ENVIROMENT

  "headerSimple": {'Content-Type': 'application/json'},
  "urlLogeo":  url+"login",
  "urlRecuperacion":  url+"recuperar_clave",
  "urlRegistro":  url+"register",
  "urlCambioClave":  url+"cambio_clave",

  //rol
  "urlRol":  url+"roles",
  "urlCrearRol":  url+"role",
  "urlEditarRol":  url+"role",

  //permiso-rol
  "urlPermisoRol":  url+"role_permisos",
  "urlAgregarPermisoRol":  url+"role_permiso",

  //permiso
  "urlPermiso":  url+"permisos",
  "urlCrearPermiso":  url+"permiso",
  "urlEditarPermiso":  url+"permiso",

  //organizacion
  "urlOrganizaciones":  url+"organizaciones",
  "urlEditarOrganizacion":  url+"organizacion",
  "urlCrearOrganizacion":  url+"organizacion",

   //usuario
   "urlUsuario":  url+"usuarios",
   "urlCrearUsuario":  url+"usuario",
   "urlEditarUsuario":  url+"usuario",

   //Reservas
   "urlHorasDisponibles":  url+"horas_disponibles",
   "urlCrearReserva":  url+"crear_reserva",
   "urlEliminarReserva":  url+"eliminar_reserva",


};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
