import { Component, Input, OnInit, Output , EventEmitter, ViewChild} from '@angular/core';
import { FormularioService } from 'src/app/servicios/ficha/formularios/formulario.service';
import { AtencionService } from 'src/app/servicios/ficha/atenciones/atencion.service';
import { VademecumsService } from 'src/app/servicios/ficha/vademecums/vademecums.service';
import { RecetaService } from 'src/app/servicios/ficha/recetas/receta.service';
import { VademecumService } from 'src/app/servicios/ficha/vademecums/vademecum.service';
import { NgbModal ,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.css']
})
export class AtencionComponent implements OnInit {

  public recetaCompleta:any;
  public closeResult = '';
  public tiposDeFormulario:any[] = [];
  public tipo_formulario_id:any;
  public plantillas:any[] = [];
  public plantilla_formulario_id:any;
  @ViewChild('modalReceta') modalReceta!:NgbModal;
  @ViewChild('modalSeleccionFormulario') modalSeleccionFormulario!:NgbModal;

  @Output() respuesta = new EventEmitter<string>();
  @Input() atencion:any;

  public time = {hour: 13, minute: 30};
  public receta = {
    "body": {
      "receta":
          {
            "id": 0,
            "ficha_atencion_id":0,
            "descripcion":""
          }
      ,
      "medicamentos": [
          {
            "id":0,
            "vademecums_id": 0,
            "recetas_id":0,
            "dosis": "",
            "intervalo": "",
            "tiempo": "",
            "nombre": ""
          }
        ]

      }
    }


  public fechaAtencion = moment().format('YYYY-MM-DD');
  public horaAtencion = {hour:  parseInt(moment().format('HH')) , minute:parseInt(moment().format('mm'))};

  public medicamentos:any;

  constructor(
    public FormularioService:FormularioService,
    public AtencionService:AtencionService,
    public VademecumsService:VademecumsService,
    public RecetaService:RecetaService,
    private modalService:NgbModal

  ) { }

  ngOnInit(): void {
    this.cargarMedicamentos();
    this.cargarPlantillas();
    this.cargarTiposDeFormulario();
    this.receta.body.medicamentos.splice(0,1);
  }

  ngOnChanges(){

  }

  cargarReceta(){

    //carga la receta relacionada con la atencion
    this.RecetaService.obtener(this.atencion.id).subscribe((data:any)=>{
        if(data.code == 0){
          if(data.body.receta == null){
           this.receta.body.receta = {"id": 0,"ficha_atencion_id":this.atencion.id,"descripcion":""}
          }else{
            this.receta.body.receta = data.body.receta;
            this.receta.body.medicamentos = data.body.medicamentos;
          }
          console.log(this.receta)
        }
    },(err:any)=>{
      console.log('Error al cargar receta' +JSON.stringify(err.statusText));
    });

  }


    guardar(){

      if(this.atencion.id == 0){
        this.atencion.fecha = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.AtencionService.guardar(this.atencion).subscribe((data:any)=>{
          if(data.code == 0){
            this.FormularioService.requestFormularioDatos.almacen_dato_id = data.fichaAtencion.almacen_dato_id;
            this.guardarDatos();
            this.receta.body.receta.ficha_atencion_id = data.fichaAtencion.id;
            this.guardarReceta();
            this.modalService.dismissAll();
            this.respuesta.emit('atencion creada');

          }

        },(err:any)=>{

        })
      }else{

        console.log('Editando');
        this.FormularioService.requestFormularioDatos.almacen_dato_id = this.atencion.almacen_dato_id;
        this.guardarDatos();
        this.guardarReceta();
        this.modalService.dismissAll();
        this.respuesta.emit('atencion editada');

      }
    }


    guardarReceta(){

      this.RecetaService.guardar(this.receta).subscribe((data:any)=>{
        if(data.code == 0){
           console.log('Receta guardada')
        }

      },(err:any)=>{
        console.log('Error al guardar receta')
      });

    }



    validarCampos(form:any){

       this.recetaCompleta = true;

      for (let i = 0; i < this.receta.body.medicamentos.length; i++) {
        const element = this.receta.body.medicamentos[i];
        if(element.vademecums_id == 0 || element.dosis == '' || element.intervalo == '' || element.tiempo == ''){
          this.recetaCompleta = false;
          break;
        }
      }

     if(this.recetaCompleta == true){
       this.guardar();
     }else{
       console.log('Formulario erroneo');
     }
    }


    guardarDatos(){
      for (let i = 0; i < this.FormularioService.requestFormularioDatos.camposFormulario.length; i++) {
        const element =  this.FormularioService.requestFormularioDatos.camposFormulario[i];

        //inserta json array  de los checks box
          if(element.tipo_dato_formulario.tipo_dato == "checkbox" ){
            element.dato.valor =  JSON.stringify(element.tipo_dato_formulario._lista_auxiliar);
          }

        //inserta un JSON array en el dato, de todos los medicamentos/enfermedades agregadas
        if(element.tipo_dato_formulario.referencia_table == "vademecums"){
            element.dato.valor =  JSON.stringify(element.tipo_dato_formulario._lista_auxiliar);
          }

        if(element.tipo_dato_formulario.referencia_table == "enfermedads"){
            element.dato.valor =  JSON.stringify(element.tipo_dato_formulario._lista_auxiliar);
          }
        }

      this.FormularioService.guardarDatos().subscribe(
        (data: any) => {
          if (data.code == 0) {
            console.log(data.message);
          } else {
            console.log(data.message);
          }
        },
        (err: any) => {
          console.log('Error al guardar datos' + JSON.stringify(err.statusText));
        }
      );

    }

    abrirModalSeleccionFormulario(){
      this.open(this.modalSeleccionFormulario,'md')
    }
    open(content:any,size:string) {
      this.cargarReceta();
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:size }).result.then((result) => {
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


agregarMedicamento(){
  this.receta.body.medicamentos.push({
    "id":0,
    "vademecums_id": 0,
    "recetas_id":0,
    "dosis": "",
    "intervalo": "",
    "tiempo": "",
    "nombre": ""
  })

  console.log(this.receta.body.medicamentos);

}

eliminarMedicamento(index:number){
  this.receta.body.medicamentos.splice(index,1);
}

cargarMedicamentos(){
  this.VademecumsService.obtener().subscribe(
    (data: any) => {
      if (data.code == 0) {
        this.medicamentos = data.body.medicamentos;
      } else {
        console.log('Error al intetar recuperar clave ' + data.message);
      }
    },
    (err: any) => {
      console.log('Error al listar medicamentos ' + JSON.stringify(err.statusText));
    }
  );
  }


}
