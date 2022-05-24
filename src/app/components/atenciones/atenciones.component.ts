import { Component, Input, OnInit,Output,ViewChild,EventEmitter } from '@angular/core';
import { AtencionesService } from 'src/app/servicios/ficha/atenciones/atenciones.service';
import { AtencionService } from 'src/app/servicios/ficha/atenciones/atencion.service';
import { FichasService } from 'src/app/servicios/ficha/fichas/fichas.service';
import { FormularioService } from 'src/app/servicios/ficha/formularios/formulario.service';
import { RecetaService } from 'src/app/servicios/ficha/recetas/receta.service';
import { RecetasService } from 'src/app/servicios/ficha/recetas/recetas.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-atenciones',
  templateUrl: './atenciones.component.html',
  styleUrls: ['./atenciones.component.css']
})
export class AtencionesComponent implements OnInit {

  public cargando:boolean = true;
  public total_registros:any;
  public tituloFormulario = "";
  public closeResult = "";
  public nombreModal = "Atención"
  public plantillas:any;
  public atenciones:any = [];
  public ficha:any;
  public data:any;
  public _enfermedades:any;
  public _medicamentos:any;
  public atencion_id = 0;
  public tiposDeFormulario:any[] = [];
  public tipo_formulario_id:any;
  public atencionVacia =  {
    "id": 0,
    "ficha_id": 0,
    "almacen_dato_id": 0,
    "fecha": "",
    "plantilla_formulario_id": 0,
    "reserva_id": 0,
  }



  @Input() kid:any;
  @ViewChild("modalCrearAtencion") modalCrearAtencion!: NgbModal;
  @ViewChild("modalSeleccionFormulario") modalSeleccionFormulario!: NgbModal;
  @ViewChild("modalAgregarReceta") modalAregarReceta!: NgbModal;

  @Output() respuesta =  new EventEmitter<string>();


  constructor(
    public AtencionesService:AtencionesService,
    public AtencionService:AtencionService,
    public FichasService:FichasService,
    public modalService: NgbModal,
    public FormularioService:FormularioService,
    public RecetaService:RecetaService,
    public RecetasService:RecetasService,

  ){
    this.cargarTiposDeFormulario();
    this.cargarPlantillas();
   }

  ngOnInit(): void {
    this.AtencionesService.numfilas = 2;
    this.cargarTabla();
  }



  cargarTabla(){


    //busca la ficha
    //carga las atenciones de la ficha
      this.FichasService.kid = this.kid;
      this.FichasService.obtener().subscribe(
        (data: any) => {
          if (data.code == 0) {
            //response exitoso
            if(data.body.total_registros == 0){
              //El paciente no tiene ficha medica
              this.respuesta.emit('Paciente sin ficha');

            }else{
              //El paciente si tiene ficha medica
              this.ficha = data.body.fichas[0];
              this.AtencionesService.ficha_id = this.ficha.ficha_id;
              this.atencionVacia.ficha_id = this.ficha.ficha_id;
              this.RecetasService.ficha_id = this.ficha.id;
              console.log(this.ficha)
              this.cargarAtenciones();

            }

          } else {
            console.log('Error al cargar ficha del paciente' + data.message);
          }
        },
        (err: any) => {
          console.log('Error al listar fichas' + JSON.stringify(err.statusText));
        }
      );


  }


  cargarAtenciones(){
    this.AtencionesService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {

          this.total_registros = data.body.total_registros;
          this.atenciones = data.body.atencion;
          this.cargando = false;

        } else {
          console.log('Error al cargar ficha del paciente' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al listar fichas' + JSON.stringify(err.statusText));
      }
    );

  }

  public exeRespuesta(respuesta:string) {

    console.log('exe')
    switch (respuesta) {
      case 'atencion creada':
          this.modalService.dismissAll();
          this.cargarTabla();

          Swal.fire(
            'Atencion registrada',
            'Se Guardo con Exito',
            'success'
          )
        break;
        case 'atencion editada':
          this.modalService.dismissAll();
          this.cargarTabla();

          Swal.fire(
            'Atencion editada',
            'Cambios guardados con Exito',
            'success'
          )
        break;
      default:
        break;
    }

}



cargarPlantillas(){
  this.FormularioService.listarPlantillas().subscribe(
    (data: any) => {
      if (data.code == 0) {
        this.plantillas = data.body.plantillas;
      } else {
        console.log('Error al intetar recuperar clave ' + data.message);
      }
    },
    (err: any) => {
      console.log('Error al listar plantillas' + JSON.stringify(err.statusText));
    }
  );
}


cargarTiposDeFormulario(){

  this.FormularioService.requestTiposFormulario.paginacion = false;
  this.FormularioService.tiposFormularios().subscribe(
   (data: any) => {
     if (data.code == 0) {
       this.tiposDeFormulario = data.body.tipo_formularios;
     } else {
       console.log('Error al cargar tipos de formulario formulario' + data.message);
     }
   },
   (err: any) => {
     console.log('Error al carga tipos de formulario' + JSON.stringify(err.statusText));
   }
 );
}




}
