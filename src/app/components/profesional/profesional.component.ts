import { Component, Input, OnInit, Output,EventEmitter, ViewChild } from '@angular/core';
import { ProfesionalesService } from 'src/app/servicios/clinica/profesionales/profesionales.service';
import { ProfesionalService } from 'src/app/servicios/clinica/profesionales/profesional.service';
import { EspecialidadesService } from 'src/app/servicios/clinica/especialidades/especialidades.service';
import { TipoProfesionalesService } from 'src/app/servicios/clinica/tipoProfesionales/tipo-profesionales.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.css']
})
export class ProfesionalComponent implements OnInit {

  @ViewChild('modalEditarProfesional') modalEditarProfesional!:NgbModal;
  @ViewChild('modalEspecialidades') modalEspecialidades!:NgbModal;
  @ViewChild('modalTipos') modalTipos!:NgbModal;

  @Input() _especialidades:any[] = [];
  @Input() _tipoProfesionales:any[] = [];
  @Output()  emitir:EventEmitter<any> =  new EventEmitter<any>();

  public especialidad_id:any;
  public tipo_id:any;
  public closeResult = "";
  public especialidades:any[] = [];
  public tipoProfesionales:any[] = [];

  @Input()  profesional = {
    "id": 0,
    "kid": "",
    "rut": "",
    "nombre": "",
    "apellido_paterno": "",
    "apellido_materno": "",
    "descripcion": "",
    "correo": "",
    "created_at": "",
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
  ){}

  ngOnInit(): void {
    this.cargarSelects();
  }



  cargarSelects(){

    this.TipoProfesionalesService.paginacion = false;
    this.TipoProfesionalesService.obtener().subscribe((data:any)=>{
      if (data.code == 0) {
        this.tipoProfesionales = data.body.tipo_profesional;
      } else {
        console.log('Error al intetar recuperar clave ' + data.message);
      }
    },
    (err: any) => {
      console.log('Error en el login ' + JSON.stringify(err.statusText));
    });

    this.EspecialidadesService.paginacion = false;
    this.EspecialidadesService.obtener().subscribe((data:any)=>{
      if (data.code == 0) {
        this.especialidades= data.body.especialidad;
      } else {
        console.log('Error al intetar recuperar clave ' + data.message);
      }
    },
    (err: any) => {
      console.log('Error en el login ' + JSON.stringify(err.statusText));
    });

  }


  abrirModal(){
    this.open(this.modalEditarProfesional,'xl');
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
      let id = parseInt(this.especialidad_id)
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
      let id = parseInt(this.tipo_id)
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




  editarProfesional(){
    console.log(this.profesional)
    this.ProfesionalService.request = this.profesional;
    this.ProfesionalService.editar().subscribe((data:any)=>{
      if(data.code == 0){
        console.log(data.message);
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
      this.editarProfesional();
      this.modalService.dismissAll();
    }else{
      console.log('Formulario erroneo');
    }
  }



  }




