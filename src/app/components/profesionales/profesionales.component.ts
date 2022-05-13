import { Component, OnInit,ViewChild } from '@angular/core';
import { ProfesionalesService } from 'src/app/servicios/clinica/profesionales/profesionales.service';
import { ProfesionalService } from 'src/app/servicios/clinica/profesionales/profesional.service';
import { EspecialidadesService } from 'src/app/servicios/clinica/especialidades/especialidades.service';
import { TipoProfesionalesService } from 'src/app/servicios/clinica/tipoProfesionales/tipo-profesionales.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent implements OnInit {

  @ViewChild('modalAgregarProfesional') modalAgregarProfesional!:NgbModal;
  @ViewChild('modalEspecialidades') modalEspecialidades!:NgbModal;
  @ViewChild('modalTipos') modalTipos!:NgbModal;

  public closeResult = "";
  public pagina:number = 1;
  public numfilas:number = 15;
  public ordenCol? = "id";
  public ordenTipo? = "ASC";

  public id = 0;
  public rut = "";
  public correo = "";
  public nombre = "";
  public apellido_paterno = "";
  public apellido_materno = "";
  public descripcion = "";
  public apellido = "";
  public _especialidades:any[] = [];
  public _tipoProfesionales:any[] = [];

  public tipo_id = 0;
  public especialidad_id = 0;
  public tipo_profesional_id = 0;

  public especialidades:any[] = [];
  public tipoProfesionales:any[] = [];
  public profesionales:any[] = [];
  public data:any;
  public total_registros:any;

  public disparador:any;

  public profesional = {
    "id": 0,
    "kid": "",
    "rut": "",
    "nombre": "",
    "apellido_paterno": "",
    "apellido_materno": "",
    "descripcion": "",
    "correo": "",
    "created_at": Date.now(),
    "updated_at": "",

    "especialidad": [
        {
            "id": 0,
            "nombre": "",
        }

    ],
    "tipo": [
        {
            "id": 0,
            "tipo": ""
        }
    ]
}

  constructor(
    public ProfesionalService:ProfesionalService,
    public ProfesionalesService:ProfesionalesService,
    public TipoProfesionalesService:TipoProfesionalesService,
    public EspecialidadesService:EspecialidadesService,
    private modalService:NgbModal
  ){

    this.cargarSelects();
    this.cargarTabla();

   }

  ngOnInit(): void {
    this.profesional.especialidad.splice(0,1)
    this.profesional.tipo.splice(0,1)
  }

  cargarTabla(){

    //this.ProfesionalesService.rut = this.rut,

    //console.log(this.especialidad_id)
   // console.log(this.tipo_profesional_id)
    this.ProfesionalesService.rut = this.rut;
    this.ProfesionalesService.correo = this.correo,
    this.ProfesionalesService.nombre = this.nombre,
    this.ProfesionalesService.apellido_materno = this.apellido,
    this.ProfesionalesService.apellido_paterno = this.apellido,
    this.ProfesionalesService.especialidad_id = this.especialidad_id,
    this.ProfesionalesService.tipo_profesional_id= this.tipo_profesional_id,
    this.ProfesionalesService.numfilas = this.numfilas;

    this.ProfesionalesService.obtener().subscribe(
      (data:any)=>{
        if (data.code == 0) {
          this.profesionales = data.body.profesional;
          this.total_registros = data.body.total_registros;

        } else {
          console.log('Error al listar profesionales' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al listar profesionales' + JSON.stringify(err.statusText));
      });

  }


  cargarSelects(){
    this.EspecialidadesService.paginacion = false;
    this.EspecialidadesService.obtener().subscribe((data:any)=>{
      if (data.code == 0) {
        this.especialidades= data.body.especialidad;
        //console.log(data.message,data.body.especialidad);
        // this.router.navigate(['cambioClave']);
      } else {
        console.log('Error al istar especialidades' + data.message);
      }
    },
    (err: any) => {
      console.log('Error al istar especialidades' + JSON.stringify(err.statusText));
    });

    /////////////////////
    this.TipoProfesionalesService.paginacion = false;
    this.TipoProfesionalesService.obtener().subscribe((data:any)=>{
      if (data.code == 0) {
        this.tipoProfesionales= data.body.tipo_profesional;
        //console.log(data.message,data.body.tipo_profesional);
        // this.router.navigate(['cambioClave']);
      } else {
        console.log('Error al listar tipo de pofesionales' + data.message);
      }
    },
    (err: any) => {
      console.log('Error al lista tipo de pofesionales' + JSON.stringify(err.statusText));
    });
  }


  abrirModal(){
    this.open(this.modalAgregarProfesional,'xl');
  }

  abrirModalEspecialidades(){
    this.open(this.modalEspecialidades,'sm');
  }

  abrirModalTipos(){
    this.open(this.modalTipos,'sm');
  }

  agregarEliminarEspecialidad(i:number = -1){
    if(i != -1){
      this.profesional.especialidad.splice(i,1);
    }else{
      let id = this.especialidad_id
      const especialidad = this.profesional.especialidad.find(function(element) {
        return element.id == id;
      });
      if(especialidad == undefined){
        const especialidad = this.especialidades.find(function(element) {
          return element.id == id;
        });
        this.profesional.especialidad.push(especialidad);
      }else{
        console.log('Especialidad ya asignada');
      }
    }
  }

  agregarEliminarTipo(i:number = -1){
    if(i != -1){
      this.profesional.tipo.splice(i,1);
    }else{
      let id = this.tipo_id
      const tipo = this.profesional.tipo.find(function(element) {
        return element.id == id;
      });
      if(tipo == undefined){
        const tipo = this.tipoProfesionales.find(function(element) {
          return element.id == id;
        });
        this.profesional.tipo.push(tipo);
      }else{
        console.log('Tipo ya asignado');
      }
    }
  }

  guardarProfesional(){
    console.log(this.profesional)
    this.ProfesionalService.request = this.profesional;
    this.ProfesionalService.guardar().subscribe((data:any)=>{
      if(data.code == 0){
        Swal.fire(
          'Profesional!',
          'Creado',
          'success'
        )
        this.cargarTabla();
      }else{
        console.log("Error al agregar profesional" + data.message);
      }
    },(err: any) => {
      console.log('Error al agregar profesional' + JSON.stringify(err.statusText));
    });
  }



  open(content:any,size:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: size}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  validarCampos(form:any){

    if(form.valid){
      this.guardarProfesional();
      this.modalService.dismissAll();
      this.cargarTabla();
    }else{
      console.log('Formulario erroneo');
    }
  }


  buscar() {
    clearInterval(this.disparador);
    this.disparador = setInterval(() => {
      this.cargarTabla();
      clearInterval(this.disparador);
    },500);

  }


}
