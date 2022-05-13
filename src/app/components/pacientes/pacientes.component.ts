import { Component, OnInit,Output ,Input, ViewChild,EventEmitter } from '@angular/core';
import { PacienteService } from 'src/app/servicios/clinica/pacientes/paciente.service';
import { PacientesService } from 'src/app/servicios/clinica/pacientes/pacientes.service';
import { FichasService } from 'src/app/servicios/ficha/fichas/fichas.service';
import { FichaService } from 'src/app/servicios/ficha/fichas/ficha.service';
import { FormularioService } from 'src/app/servicios/ficha/formularios/formulario.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AtencionesService } from 'src/app/servicios/ficha/atenciones/atenciones.service';



@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  @ViewChild("modalSeleccionFormulario") modalSeleccionFormulario!: NgbModal;
  @ViewChild("modalGuardarPaciente") modalGuardarPaciente!: NgbModal;
  @ViewChild("modalFicha") modalFicha!: NgbModal;

  public pagina = 1;
  public numfilas = 10;
  public ordenCol = "id";
  public ordenTipo = "ASC";
  public tipo_formulario_id:any;

  public kid:any;
  public ficha = {
    "ficha_id":0,
    "plantilla_formulario_id": 0,
    "almacen_dato_id":0
  }
  public pacientes:any = [];
  public busqueda = '';
  public id:number = 0;
  public rut:string = "";
  public correo:string = "";
  public nombre:string =  "";
  public apellido_paterno:string = "";
  public apellido_materno:string = "";
  public plantillas:any;
  public plantilla_formulario_id = 0;
  public almacen_dato_id = 0;
  public tiposDeFormulario:any[] = [];
  public showTable = true;
  public closeResult = "";
  public recarga:boolean = false;
  public modalTitulo:string = "";

  public _enfermedades_padre = [{
    "id":"0",
    "nombre":""
  }];

  public  _medicamentos_padre = [{
    "id":"0",
    "nombre":""
  }];

  @Output() respuesta = new EventEmitter<string>();


  constructor(
   private modalService: NgbModal,
   public PacienteService:PacienteService,
   public PacientesService:PacientesService,
   public FichasService:FichasService,
   public FichaService:FichaService,
   public FormularioService:FormularioService,
   public AtencionesService:AtencionesService,

  ) {


    this.PacientesService.numfilas = this.numfilas;
    this.cargarPlantillas();
    this.cargarTiposDeFormulario();
    this.cargarTabla();

  }

  ngOnInit(): void {
  }

  cargarTabla(){

    this.recarga = true;
    this.PacientesService.nombre = this.busqueda;

    this.PacientesService.obtener().subscribe((data:any)=>{
      if (data.code == 0) {
        this.pacientes = data.body;
        this.recarga = false;

        // this.router.navigate(['cambioClave']);
      } else {
        console.log('Error al intetar recuperar clave ' + data.message);
      }
    },
    (err: any) => {
      console.log('Error en el login ' + JSON.stringify(err.statusText));
    });

  }

  abrirAtenciones(kid:any){
    this.respuesta.emit(kid);
  }


  editar(i:number){

    this.modalTitulo = "editar paciente";
    let paciente = this.pacientes.pacientes[i];
    this.id = paciente.id;
    this.rut = paciente.rut;
    this.correo = paciente.correo;
    this.nombre = paciente.nombre;
    this.apellido_paterno = paciente.apellido_paterno;
    this.apellido_materno = paciente.apellido_materno;

    this.open(this.modalGuardarPaciente);
  }

  agregar(){

    this.modalTitulo = "agregar paciente";
    this.id = 0;
    this.rut = "";
    this.correo = "";
    this.nombre = "";
    this.apellido_paterno = "";
    this.apellido_materno = "";

    this.open(this.modalGuardarPaciente);
  }

  cargarFicha(kid:string){
    this.FichasService.kid = kid;
    this.kid = kid;
    this.FichasService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
          //response exitoso
          if(data.body.total_registros == 0){
            //abre el modal para seleccionar un formulario y cargarlo sin datos
            this.open(this.modalSeleccionFormulario);
          }else{
            //1-pasar el request para cargar el formulario
            //2-abirir el modal con el formulario
            this.ficha = data.body.fichas[0];
            this.almacen_dato_id  = data.body.fichas[0].almacen_dato_id;
            this.plantilla_formulario_id = data.body.fichas[0].plantilla_formulario_id;

            this.open(this.modalFicha);

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


  nuevaFicha(){

    //this.modalService.dismissAll(); desaparece el template y no termina de bindear los datos
    this.open(this.modalFicha);
  }



    //carga select para elegir formulario
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



  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'md'}).result.then((result) => {
      this.almacen_dato_id = 0;
      this.plantilla_formulario_id = 0;
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.almacen_dato_id = 0;
      this.plantilla_formulario_id = 0;
      this.FichaService.kid = "";
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.almacen_dato_id = 0;
      this.plantilla_formulario_id = 0;
      this.FichaService.kid = "";
      return 'by clicking on a backdrop';
    } else {
      this.almacen_dato_id = 0;
      this.plantilla_formulario_id = 0;
      this.FichaService.kid = "";
      return 'by clicking on a backdrop';
    }
  }


   public exeRespuesta(respuesta:string) {

    switch (respuesta) {
      case 'recargar':
          this.cargarTabla();
          this.modalService.dismissAll();

          Swal.fire(
            'Paciente',
            'Se Guardo con Exito',
            'success'
          )
        break;
        case 'cancelar':

          this.modalService.dismissAll();
          alert("NO se realizao nigun cambio");

        break;
      default:
        break;
    }

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


  cambioTipoFormulario(){
    this.plantilla_formulario_id = 0;
  }


  }












