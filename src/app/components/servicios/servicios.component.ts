import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProfesionalesService } from 'src/app/servicios/clinica/profesionales/profesionales.service';
import { ServicioService } from 'src/app/servicios/clinica/serviciosClinica/servicio.service';
import { ServiciosService } from 'src/app/servicios/clinica/serviciosClinica/servicios.service';
import {NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { FeriadosService } from 'src/app/servicios/clinica/feriados/feriados.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  @ViewChild('modalAgregarServicio') modalAgregarServicio!:NgbModal;

  public time = {hour: 0, minute: 0};
  public profesionalSeleccionadoNombre ="";
  public paso:number = 1;
  public data:any;
  public total_registros:any;
  public servicios:any[] = []
  public feriados:any = [];
  public profesionales = [ {
    'value' : "1",
    'name' : "",
    'ver' !: false,
  }];


  public closeResult = "";
  public servicio =  {
    "id": 0,
    "profesional_id": 0,
    "nombre":"",
    "estado": 1,
    "tiempo": 0,
    "precio":0.00,
    "comision":0.00,

    "horarios":[
      {"dia_id":0,
      "estado":1,
      "hora_i":"",
      "hora_f":"",
      "hora_fin":{"hour": 0,"minute": 0,"second": 0},
      "hora_inicio":{"hour": 0,"minute": 0,"second": 0}
      }
    ],

      "profesionalesExtra":[{
        "nombre":"",
        "profesional_id":0
      }],

      "feriadosNoTrabajados":[]
  }


  public model: NgbDateStruct | undefined;
  datePickerJson = {};
  public markDisabled:any;
  public json = {
    disable: [6, 7],
    disabledDates: [
      { year: 2022, month: 3, day: 1 },
      { year: 2022, month: 3, day: 2 },
      { year: 2022, month: 3, day: 3 }
    ]
  };
  public isDisabled:any;

  constructor(
    public ServiciosService:ServiciosService,
    public ProfesionalesService:ProfesionalesService,
    private modalService:NgbModal,
    public ServicioService:ServicioService,
    private config: NgbTimepickerConfig,
    public FeriadosService:FeriadosService,
    private calendar: NgbCalendar,
  ){

    config.seconds = false;
    config.spinners = false;
   }


  ngOnInit(): void {
    this.cargarTabla();
    this.cargarFeriados();
    this.listarProfesionales();

  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  cargarTabla(){

    this.ServiciosService.paginacion = true;
    this.ServiciosService.obtener().subscribe(
      (data:any)=>{
        if (data.code == 0) {


          this.servicios = data.body.servicios;

          //formatear los horarios
          this.servicios.forEach((element:any) => {

            element.horarios.forEach((element:any) => {
              element.hora_inicio = {"hour": parseInt(element.hora_inicio.slice(0,2)),"minute": parseInt(element.hora_inicio.slice(3,5))};
              element.hora_fin ={"hour": parseInt(element.hora_fin.slice(0,2)),"minute": parseInt(element.hora_fin.slice(3,5))};
            });

          });

          this.total_registros = data.body.total_registros;

        } else {
          console.log('Error al listar servicios' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al listar servicios' + JSON.stringify(err.statusText));
      });


  }

  cargarFeriados(){
    this.FeriadosService.paginacion = false;
    this.FeriadosService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.feriados= data.body.feriado.map((element:any)=> {
            element = {
              "id":element.id,
              "estado":false,
              "nombre":element.nombre,
              "dia":element.dia,
              "mes":element.mes
            }
            return element;
         });

      this.deshabilitarDias();


        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );
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

  seleccionProfesional(item:any){
    this.profesionalSeleccionadoNombre = item.name;
    this.servicio.profesional_id = item.value;
  }



  profesionalExtra(item?:any,i?:any){

    if(i == undefined){
      this.servicio.profesionalesExtra.push({"profesional_id":0,"nombre":""})
    }else{
      this.servicio.profesionalesExtra[i]['profesional_id'] = item.value;
      this.servicio.profesionalesExtra[i]['nombre'] = item.name;
      console.log(this.servicio.profesionalesExtra);
    }
  }

  abrirModal(){
    this.open(this.modalAgregarServicio,'xl');
  }

  siguientePaso(){
    this.paso += 1;
    console.log(this.paso);
  }

  anteriorPaso(){
    this.paso -= 1;
    console.log(this.paso);
  }

  open(content:any,size:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: size}).result.then((result) => {
      this.crearServicio();
      this.cargarTabla();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.servicio.profesional_id = 0;
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.servicio.profesional_id = 0;

      return 'by clicking on a backdrop';
    } else {
      this.servicio.profesional_id = 0;
      return `with: ${reason}`;
    }
  }

  crearServicio(){

    this.formatearHoras();
    this.asignarFeriadosNoTrabajados();
    this.ServicioService.request = this.servicio;
    this.ServicioService.guardar().subscribe((data:any)=>{
      if(data.code == 0){
        console.log(data.message);
      }else{
        console.log('Error al crear servidio' + data.message);
      }
    },
    (err:any)=>{
      console.log('Error al crear' + JSON.stringify(err.statusText));
    })

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


deshabilitarDias(){

        this.json.disabledDates = this.feriados.map((element:any)=>{
          return { year: 2022, month: element.mes , day: element.dia }
        });

      //to disable specific date and specific weekdays
      this.isDisabled = (
        date: NgbDateStruct
        //current: { day: number; month: number; year: number }
      ) => {
        return this.json.disabledDates.find(x =>
          (new NgbDate(x.year, x.month, x.day).equals(date))
          || (this.json.disable.includes(this.calendar.getWeekday(new NgbDate(date.year,date.month,date.day))) )
        )
          ? true
          : false;
      };
}


      validarCampos(form:any){

       this.crearServicio();

      }



}
