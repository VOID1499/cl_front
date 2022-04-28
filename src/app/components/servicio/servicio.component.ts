import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProfesionalesService } from 'src/app/servicios/clinica/profesionales/profesionales.service';
import { ServicioService } from 'src/app/servicios/clinica/serviciosClinica/servicio.service';
import { BoxService } from 'src/app/servicios/clinica/boxs/box.service';
import * as moment from 'moment';

@Component({
selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  public paso:number = 1;
  public closeResult = "";
  public profesionales = [ {
    'value' : "1",
    'name' : "",
    'ver' !: false,
  }];

  @ViewChild('modalEditarServicio') modalEditarServicio!:NgbModal;

  @Input() servicio:any;
  @Input() feriados:any = [];


  constructor(
    private modalService:NgbModal,
    public ProfesionalesService:ProfesionalesService,
    public ServicioService:ServicioService,
    private BoxService:BoxService
  ) {

   }

  ngOnInit(): void {
    this.listarProfesionales();

  }

  siguientePaso(){
    this.paso += 1;
  }

  anteriorPaso(){
    this.paso -= 1;

  }


  listarProfesionales(){

    this.ProfesionalesService.listarTodo().subscribe((data:any)=>{
      if (data.code == 0) {

        this.profesionales = data.profesionales.map(function(element:any) {
          return {'value' :element.id,'name' :element.nombre +' '+ element.apellido_paterno+' '+element.apellido_materno,'ver'!:true}
        });


      } else {
        console.log('Error al intetar recuperar clave ' + data.message);
      }
    },
    (err: any) => {
      console.log('Error en el login ' + JSON.stringify(err.statusText));
    });
  }





  abrirModal(){
    this.feriados.forEach((element:any) => {
      element.estado = false;
    });
    this.removeDuplicates();
    this.open(this.modalEditarServicio,'xl');
  }

  open(content:any,size:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: size}).result.then((result) => {
      this.editarServicio();
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

  seleccionProfesional(item:any){
    this.servicio.profesional_id = item.value;
    console.log(this.servicio);
  }

  agregarEliminarHorario(i?:number){
    console.log(this.servicio.horarios)
    if(i == undefined){
      this.servicio.horarios.push(
        {"dia_id":0,
        "hora_i":"",
        "hora_f":"",
        "hora_inicio":{
          "hour": 0,
          "minute": 0,
          "second": 0
        },
        "hora_fin":{
          "hour": 0,
          "minute": 0,
          "second": 0
        },
        "estado":1
        }
      );
    }else{
      this.servicio.horarios.splice(i,1);
    }
  }


  editarServicio(){

    if(this.servicio.estado == true){
      this.servicio.estado = 1;
    }
    if(this.servicio.estado == false){
      this.servicio.estado = 0;
    }

    this.formatearHoras();
    this.asignarFeriadosNoTrabajados();
    this.ServicioService.request = this.servicio;

    this.ServicioService.editar().subscribe((data:any)=>{
      if (data.code == 0) {
        console.log(data.message);
      } else {
        console.log('Error al editar servicio' + data.message);
      }
    },
    (err: any) => {
      console.log('Error al editar' + JSON.stringify(err.statusText));
    });

  }

  //formatear horas {hour:0,minute:0} a 00:00:00 para la base de datos
formatearHoras(){
  this.servicio.horarios.forEach((element:any)=>{
    element.hora_i =  `${element.hora_inicio.hour}:${element.hora_inicio.minute}:00`
    element.hora_f =  `${element.hora_fin.hour}:${element.hora_fin.minute}:00`
  });

}

//signar array de solo feriados seleccionados en estado true
asignarFeriadosNoTrabajados(){
  this.servicio.feriadosNoTrabajados = this.feriados.filter((element:any) => {
    return element.estado == true;
  });

}


  removeDuplicates(){

      var arr = this.feriados.concat(this.servicio.feriadosNoTrabajados); // fusion de feriados con feriados no trabajados

      for(var i=0; i<arr.length; ++i) {

          for(var j=i+1; j<arr.length; ++j) {
              //comparacion
              if(arr[i].id === arr[j].id) {
                  arr[i].estado = true;
                  arr.splice(j, 1); //quita el elemento con id deuplicado
              }
          }
      }
     // return console.log(arr);
  }


     consultarBoxsDisponibles(i:any){

     let horario =  this.servicio.horarios[i];

     if(horario.hora_inicio.hour != 0 && horario.hora_fin.hour != 0 && horario.dia_id != 0){
      var cdt = moment(`${horario.hora_inicio.hour}:${horario.hora_inicio.minute}:00`, 'HH:mm:ss');
      var cdt2 = moment(`${horario.hora_fin.hour}:${horario.hora_fin.minute}:00`, 'HH:mm:ss');

      this.BoxService.request = {
       "hora_inicio":moment(cdt).add(1, 'm').format('HH:mm:ss'),
       "hora_fin":moment(cdt2).subtract(1, 'm').format('HH:mm:ss'),
       "dia_id":horario.dia_id
      };

      this.BoxService.boxsDisponibles().subscribe((data:any)=>{
           if (data.code == 0) {
             horario.boxs_disponibles = data.body.boxs;
           } else {
             console.log('Error al consultar disponibles' + data.message);
           }
         },
         (err: any) => {
           console.log('Error en el login ' + JSON.stringify(err.statusText));
         });

     }else{

      console.log('Seleccione el rango horario');
     }


    }



}
