import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FichasService } from 'src/app/servicios/ficha/fichas/fichas.service';
import { FichaService } from 'src/app/servicios/ficha/fichas/ficha.service';
import { FormularioService } from 'src/app/servicios/ficha/formularios/formulario.service';
import { TipoDatosService } from 'src/app/servicios/ficha/tipoDatos/tipo-datos.service';
import { EnfermedadesService } from 'src/app/servicios/ficha/enfermedades/enfermedades.service';
import { VademecumsService } from 'src/app/servicios/ficha/vademecums/vademecums.service';
import { PacientesService } from 'src/app/servicios/clinica/pacientes/pacientes.service';
import { FormatearObjetoPipe } from 'src/app/pipes/formatearObjeto/formatear-objeto.pipe';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-paciente-ficha',
  templateUrl: './paciente-ficha.component.html',
  styleUrls: ['./paciente-ficha.component.css']
})
export class PacienteFichaComponent implements OnInit {

  @Input()  id:number = 0;
  @Input()  rut:string = "" ;
  @Input()  correo:string = "" ;
  @Input()  nombre:string = "" ;
  @Input()  apellido_paterno:string = "";
  @Input()  apellido_materno:string = "" ;
  @Input()  kid = "no llego el kid"
  @Input()  ficha_id = 0;
  @Input()  ficha:any;

  @Output() respuesta =  new EventEmitter<string>();


  @Input() _enfermedades = [{
    "id":"0",
    "nombre":""
  }];

  @Input() _medicamentos = [{
    "id":"0",
    "nombre":""
  }];



  public plantillas:any;
  public data:any;
  public tiposDatos:any;
  public enfermedades:any;
  public medicamentos:any;
  public lista_auxiliar:any = "";
  public tipo_dato:any;
  public almacen_dato_id = 0;


  constructor(
    public FormularioService:FormularioService,
    public TipoDatosService:TipoDatosService,
    public EnfermedadesService:EnfermedadesService,
    public VademecumsService:VademecumsService,
    public PacientesService:PacientesService,
    public FichaService:FichaService
  ) {

  }

  ngOnInit(): void {
  }




enviar(){
  //1-crea la ficha
  //2-guarda los datos
  //el kid llega desde pacientes por un input


  if(this.ficha.ficha_id == 0 ){
    this.FichaService.kid = this.kid; //kid paciente
    this.FichaService.plantilla_formulario_id = this.FormularioService.requestFormularioDatos.plantillaFormulario.id;
      this.FichaService.guardar().subscribe(
        (data: any) => {
          if (data.code == 0) {

            this.FormularioService.requestFormularioDatos.almacen_dato_id = data.almacen_dato_id;
            this.guardarDatos();

          } else {
            console.log(data.message);
          }
        },
        (err: any) => {
          console.log('Error al crear ficha' + JSON.stringify(err.statusText));
        }
      );
  }else{

  console.log(this.ficha);
  this.FormularioService.requestFormularioDatos.almacen_dato_id = this.ficha.almacen_dato_id;
  this.guardarDatos();
  this.respuesta.emit('recargar');

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

    console.log(this.FormularioService.requestFormularioDatos);

  this.FormularioService.guardarDatos().subscribe(
    (data: any) => {
      if (data.code == 0) {
        this.kid = "";
          this.respuesta.emit('recargar');
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




}
