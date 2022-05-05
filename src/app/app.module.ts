import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RecetaComponent } from './components/receta/receta.component';
import { FormularioService } from './servicios/ficha/formularios/formulario.service';
import { PaginaLoginComponent } from './paginas/pagina-login/pagina-login.component';
import { LogeoComponent } from './components/login/logeo/logeo.component';
import { RecuperarClaveComponent } from './components/login/recuperar-clave/recuperar-clave.component';
import { CambiarClaveComponent } from './components/login/cambiar-clave/cambiar-clave.component';
import { RegistroComponent } from './components/login/registro/registro.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginaCambioClaveComponent } from './paginas/pagina-cambio-clave/pagina-cambio-clave.component';
import { PermisoRolesComponent } from './components/permiso/permiso-roles/permiso-roles.component';
import { ListadoRolComponent } from './components/permiso/listado-rol/listado-rol.component';
import { PaginaRolComponent } from './paginas/pagina-rol/pagina-rol.component' ;
import { PaginaCrearFormularioComponent } from './paginas/pagina-crear-formulario/pagina-crear-formulario.component';
import { EspecialidadComponent } from './components/especialidad/especialidad.component';
import { PaginaEspecialidadComponent } from './paginas/pagina-especialidad/pagina-especialidad.component';
import { EspecialidadService } from './servicios/clinica/especialidades/especialidad.service';
import { EspecialidadesComponent } from './components/especialidades/especialidades.component';
import { ProfesionalesComponent } from './components/profesionales/profesionales.component';
import { PaginaProfesionalComponent } from './paginas/pagina-profesional/pagina-profesional.component';
import { PaginaTipoProfesionalComponent } from './paginas/pagina-tipo-profesional/pagina-tipo-profesional.component';
import { TipoProfesionalesComponent } from './components/tipo-profesionales/tipo-profesionales.component';
import { ProfesionalComponent } from './components/profesional/profesional.component';
import { TipoProfesionalComponent } from './components/tipo-profesional/tipo-profesional.component';
import { PaginaFeriadosComponent } from './paginas/pagina-feriados/pagina-feriados.component';
import { FeriadosComponent } from './components/feriados/feriados.component';
import { FeriadoComponent } from './components/feriado/feriado.component';
import { PaginaPacientesComponent } from './paginas/pagina-pacientes/pagina-pacientes.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ListadoOrganizacionComponent } from './components/organizacion/listado-organizacion/listado-organizacion.component';
import { PaginaOrganizacionComponent } from './paginas/pagina-organizacion/pagina-organizacion.component';
import { PaginaPermisoComponent } from './paginas/pagina-permiso/pagina-permiso.component';
import { ListadoPermisoComponent } from './components/permiso/listado-permiso/listado-permiso.component';
import { PaginaUsuarioComponent } from './paginas/pagina-usuario/pagina-usuario.component';
import { ListadoUsuarioComponent } from './components/usuario/listado-usuario/listado-usuario.component';
import { FechaPipe } from './pipes/fechasPipe/fecha.pipe';
import { TiposDatosComponent } from './ficha/tipos-datos/tipos-datos.component';
import { PaginaTiposDatosComponent } from './paginas/pagina-tipos-datos/pagina-tipos-datos.component';
import { PlantillaFormularioComponent } from './ficha/plantilla-formulario/plantilla-formulario.component';
import { FormulariosComponent } from './ficha/formularios/formularios.component';
import { TipoDatoPipe } from './pipes/tipoDatoPipe/tipo-dato.pipe';
import { CampoComponent } from './ficha/campo/campo.component';
import { FormularioComponent } from './ficha/formulario/formulario.component';
import { FichasComponent } from './ficha/fichas/fichas.component';
import { PaginaFichasComponent } from './paginas/pagina-fichas/pagina-fichas.component';
import { PacienteFichaComponent } from './components/paciente-ficha/paciente-ficha.component';
import { FormatearObjetoPipe } from './pipes/formatearObjeto/formatear-objeto.pipe';
import { FormatearObjetoEstadoPipe } from './pipes/formatearObjeto/formatear-objeto-estado.pipe';
import { PaginaHomeComponent } from './paginas/pagina-home/pagina-home.component';
import { AtencionesComponent } from './components/atenciones/atenciones.component';
import { PlantillasComponent } from './components/plantillas/plantillas.component';
import { FormComponent } from './components/form/form.component';
import { AtencionComponent } from './components/atencion/atencion.component';
import { RecetaService } from './servicios/ficha/recetas/receta.service';
import { EnfermedadesComponent } from './components/enfermedades/enfermedades.component';
import { EnfermedadComponent } from './components/enfermedad/enfermedad.component';
import { PaginaEnfermedadesComponent } from './paginas/pagina-enfermedades/pagina-enfermedades.component';
import { PaginaVademecumsComponent } from './paginas/pagina-vademecums/pagina-vademecums.component';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { MedicamentoComponent } from './components/medicamento/medicamento.component';
import { PaginaServiciosComponent } from './paginas/pagina-servicios/pagina-servicios.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { KSelectComponent } from './komponentes/k-select/k-select.component';
import { MinutosHoraPipe } from './pipes/minutosHora/minutos-hora.pipe';
import { PaginaReservasComponent } from './paginas/pagina-reservas/pagina-reservas.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { MesPipe } from './pipes/mesPipe/mes.pipe';
import { PaginaTipoFormulariosComponent } from './paginas/pagina-tipo-formularios/pagina-tipo-formularios.component';
import { TipoFormulariosComponent } from './ficha/tipo-formularios/tipo-formularios.component';
import { TipoFormularioComponent } from './ficha/tipo-formulario/tipo-formulario.component';
import { HoraPipe } from './pipes/hora/hora.pipe';
import { KIdiomaPipe } from './pipes/kIdioma/k-idioma.pipe';
import { PaginaBoxsComponent } from './paginas/pagina-boxs/pagina-boxs.component';
import { BoxsComponent } from './components/boxs/boxs.component';
import { BoxComponent } from './components/box/box.component';
import { HorarioComponent } from './komponentes/horario/horario.component';
import { BoxsHorariosComponent } from './components/boxs-horarios/boxs-horarios.component';


@NgModule({
  declarations: [
    AppComponent,
    RecetaComponent,
    PaginaLoginComponent,
    LogeoComponent,
    RecuperarClaveComponent,
    CambiarClaveComponent,
    RegistroComponent,
    PaginaCambioClaveComponent,
    PermisoRolesComponent,
    ListadoRolComponent,
    PaginaRolComponent,
    PaginaCrearFormularioComponent,
    PaginaEspecialidadComponent,
    EspecialidadComponent,
    EspecialidadesComponent,
    ProfesionalesComponent,
    PaginaProfesionalComponent,
    PaginaTipoProfesionalComponent,
    TipoProfesionalesComponent,
    ProfesionalComponent,
    TipoProfesionalComponent,
    PaginaFeriadosComponent,
    FeriadosComponent,
    FeriadoComponent,
    PaginaPacientesComponent,
    PacientesComponent,
    PacienteComponent,
    ListadoOrganizacionComponent,
    PaginaOrganizacionComponent,
    PaginaPermisoComponent,
    ListadoPermisoComponent,
    PaginaUsuarioComponent,
    ListadoUsuarioComponent,
    FechaPipe,
    TiposDatosComponent,
    PaginaTiposDatosComponent,
    PlantillaFormularioComponent,
    FormulariosComponent,
    TipoDatoPipe,
    CampoComponent,
    FormularioComponent,
    FichasComponent,
    PaginaFichasComponent,
    PacienteFichaComponent,
    FormatearObjetoPipe,
    FormatearObjetoEstadoPipe,
    PaginaHomeComponent,
    AtencionesComponent,
    PlantillasComponent,
    FormComponent,
    AtencionComponent,
    EnfermedadesComponent,
    EnfermedadComponent,
    PaginaEnfermedadesComponent,
    PaginaVademecumsComponent,
    MedicamentosComponent,
    MedicamentoComponent,
    PaginaServiciosComponent,
    ServiciosComponent,
    ServicioComponent,
    KSelectComponent,
    MinutosHoraPipe,
    PaginaReservasComponent,
    ReservasComponent,
    ReservaComponent,
    MesPipe,
    PaginaTipoFormulariosComponent,
    TipoFormulariosComponent,
    TipoFormularioComponent,
    HoraPipe,
    KIdiomaPipe,
    PaginaBoxsComponent,
    BoxsComponent,
    BoxComponent,
    HorarioComponent,
    BoxsHorariosComponent,


  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    [SweetAlert2Module.forRoot()],
    ImageCropperModule,

  ],
  providers: [
      FormularioService,
      EspecialidadService,
      RecetaService
  ],
  bootstrap: [AppComponent]

})
export class AppModule {

 }
