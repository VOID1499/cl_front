import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PaginaLoginComponent } from './paginas/pagina-login/pagina-login.component';
import { PaginaCambioClaveComponent } from './paginas/pagina-cambio-clave/pagina-cambio-clave.component';
import { PaginaRolComponent } from './paginas/pagina-rol/pagina-rol.component';
import { PaginaEspecialidadComponent } from './paginas/pagina-especialidad/pagina-especialidad.component';
import { PaginaTipoProfesionalComponent } from './paginas/pagina-tipo-profesional/pagina-tipo-profesional.component';
import { PaginaFeriadosComponent } from './paginas/pagina-feriados/pagina-feriados.component';
import { PaginaPacientesComponent } from './paginas/pagina-pacientes/pagina-pacientes.component';
import { PaginaProfesionalComponent } from './paginas/pagina-profesional/pagina-profesional.component';
import { PaginaOrganizacionComponent } from './paginas/pagina-organizacion/pagina-organizacion.component';
import { PaginaPermisoComponent } from './paginas/pagina-permiso/pagina-permiso.component';
import { PaginaTiposDatosComponent } from './paginas/pagina-tipos-datos/pagina-tipos-datos.component';
import { PaginaCrearFormularioComponent } from './paginas/pagina-crear-formulario/pagina-crear-formulario.component';
import { PaginaFichasComponent } from './paginas/pagina-fichas/pagina-fichas.component';
import { PaginaHomeComponent } from './paginas/pagina-home/pagina-home.component';
import { PaginaEnfermedadesComponent } from './paginas/pagina-enfermedades/pagina-enfermedades.component';
import { PaginaVademecumsComponent } from './paginas/pagina-vademecums/pagina-vademecums.component';
import { PaginaServiciosComponent } from './paginas/pagina-servicios/pagina-servicios.component';
import { PaginaReservasComponent } from './paginas/pagina-reservas/pagina-reservas.component';
import { PaginaTipoFormulariosComponent } from './paginas/pagina-tipo-formularios/pagina-tipo-formularios.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { PaginaBoxsComponent } from './paginas/pagina-boxs/pagina-boxs.component';

const routes: Routes = [
  //sistema logeo
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: PaginaLoginComponent, data: { title: 'Login'}},
  { path: 'cambioClave', component: PaginaCambioClaveComponent, data: { title: 'Cambio Clave'}},

   //permisos
  { path: 'rol', component: PaginaRolComponent, data: { title: 'Roles'}},
  { path: 'permiso', component: PaginaPermisoComponent, data: { title: 'Permisos'}},
  { path: 'organizacion', component: PaginaOrganizacionComponent, data: { title: 'Organizaciones'}},


 //Pacientes
  { path: 'pacientes', component: PaginaPacientesComponent},

  //Profesionales
  { path: 'profesionales', component: PaginaProfesionalComponent},


   //Formularios
   { path: 'tipos-datos', component: PaginaTiposDatosComponent},
   { path: 'formularios', component: PaginaCrearFormularioComponent},
   { path: 'fichas', component: PaginaFichasComponent},

   //Base de datos auxiliar
   { path: 'especialidad', component: PaginaEspecialidadComponent},
   { path: 'tipo-profesionales', component: PaginaTipoProfesionalComponent},
   { path: 'feriados', component: PaginaFeriadosComponent},
   { path: 'enfermedades', component: PaginaEnfermedadesComponent},
   { path: 'medicamentos', component: PaginaVademecumsComponent},
   { path: 'tipo-formularios', component: PaginaTipoFormulariosComponent},


   //Servicios
   { path: 'servicios', component: PaginaServiciosComponent},

   { path: 'boxs', component: PaginaBoxsComponent},


   //Reservas
   { path: 'reservas', component: PaginaReservasComponent},
   { path: 'reservas/:servicio_id/:fecha', component: PaginaReservasComponent },


   { path: 'home', component: PaginaHomeComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes) ,   CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
