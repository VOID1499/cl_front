import { Component, OnInit,Input,Output,EventEmitter,OnDestroy } from '@angular/core';
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
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  @Input()  id:number = 0;
  @Input()  rut:string = "" ;
  @Input()  correo:string = "" ;
  @Input()  nombre:string = "" ;
  @Input()  apellido_paterno:string = "";
  @Input()  apellido_materno:string = "" ;
  @Input()  kid = "no llego el kid"

  public _enfermedades = [{
    "id":"0",
    "nombre":""
  }];

  public  _medicamentos = [{
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

  @Input() plantilla_formulario_id = 0;
  @Input() almacen_dato_id = 0;

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

    this.cargarEnfermedades();
    this.cargarMedicamentos();
    this.cargarFormulario();

  }
  ngOnDestroy(){
  }


  cargarFormulario(){

    console.log(this.plantilla_formulario_id , this.almacen_dato_id)

    this.FormularioService.requestCargarFormulario.plantilla_formulario_id = this.plantilla_formulario_id;
    this.FormularioService.requestCargarFormulario.almacen_dato_id = this.almacen_dato_id;

    this.FormularioService.cargarFormulario().subscribe(
     (data: any) => {
       if (data.code == 0) {
        this.FormularioService.requestFormularioDatos.camposFormulario = data.body.camposFormulario;
        this.FormularioService.requestFormularioDatos.plantillaFormulario = data.body.plantillaFormulario;

        this.FormularioService.requestFormularioDatos.camposFormulario.forEach(element => {

          //setea todos los campos con un dato vacio
          if(this.almacen_dato_id == 0){
          element.dato = {
            "id": 0,
            "almacen_dato_id":0,
            "plantilla_formulario_dato_id":data.body.plantillaFormulario.id,
            "valor": ""
          }
        }

        if(element.tipo_dato_formulario.tipo_dato == 'checkbox' && this.almacen_dato_id != 0 ){
          let listaP = JSON.parse(element.tipo_dato_formulario.lista_auxiliar);
          let listaS = JSON.parse(element.dato.valor);

          listaP.lista_auxiliar.forEach((p:any) => {
              listaS.lista_auxiliar.forEach((s:any) => {
                if(p.nombre == s.nombre){
                  p.estado = s.estado
                }else{
                }
              });
          });

          element.tipo_dato_formulario._lista_auxiliar = listaP;
          }

        if(element.tipo_dato_formulario.tipo_dato == 'checkbox' && this.almacen_dato_id == 0 ){
          element.tipo_dato_formulario._lista_auxiliar = JSON.parse(element.tipo_dato_formulario.lista_auxiliar);
          }

        if(element.tipo_dato_formulario.tipo_dato == 'select' ){
           element.tipo_dato_formulario._lista_auxiliar = JSON.parse(element.tipo_dato_formulario.lista_auxiliar);
          }

        if(element.tipo_dato_formulario.referencia_table == 'enfermedads'){
          if(this.almacen_dato_id == 0){
            element.tipo_dato_formulario._lista_auxiliar = {"lista_auxiliar":[{"nombre":""}]};
           }else{
            element.tipo_dato_formulario._lista_auxiliar = JSON.parse(element.dato.valor);
           }
        }

        if(element.tipo_dato_formulario.referencia_table == 'vademecums'){
          if(this.almacen_dato_id == 0){

            element.tipo_dato_formulario._lista_auxiliar = {"lista_auxiliar":[{"nombre":""}]};
          }else{
            element.tipo_dato_formulario._lista_auxiliar = JSON.parse(element.dato.valor);

          }
        }


        });


       } else {
         console.log('Error al intetar recuperar clave ' + data.message);
       }
     },
     (err: any) => {
       console.log('Error al cargar formulario' + JSON.stringify(err.statusText));
     }
   );

   }












//retorna el objeto de lista auxiliar
formatearObjeto(element:any){
  return element = element;
}


agregarEnfermedad(indiceEnfermedad:number,indiceCampo:number){
  if(indiceEnfermedad == -1){
    this.FormularioService.requestFormularioDatos.camposFormulario[indiceCampo].tipo_dato_formulario._lista_auxiliar.lista_auxiliar.push({
      "nombre":""
    });

  }else{
    this.FormularioService.requestFormularioDatos.camposFormulario[indiceCampo].tipo_dato_formulario._lista_auxiliar.lista_auxiliar.splice(indiceEnfermedad,1);
  }
};



agregarMedicamento(indiceMedicamento:number,indiceCampo:number){
  if(indiceMedicamento == -1){
    this.FormularioService.requestFormularioDatos.camposFormulario[indiceCampo].tipo_dato_formulario._lista_auxiliar.lista_auxiliar.push({
      "nombre":""
    });
  }else{
      this.FormularioService.requestFormularioDatos.camposFormulario[indiceCampo].tipo_dato_formulario._lista_auxiliar.lista_auxiliar.splice(indiceMedicamento,1);
     };
}

cargarEnfermedades(){
  this.EnfermedadesService.obtener().subscribe(
    (data: any) => {
      if (data.code == 0) {
        this.enfermedades = data.body.enfermedades;
      } else {
        console.log('Error al intetar recuperar clave ' + data.message);
      }
    },
    (err: any) => {
      console.log('Error al listar enfermedades ' + JSON.stringify(err.statusText));
    }
  );
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


cleanRut(rutEntrada:string) {

  rutEntrada = typeof rutEntrada === 'string'? rutEntrada.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : ''
  let valor =  typeof rutEntrada === 'string'? rutEntrada.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : '';

  let cuerpo = valor.slice(0, -1);
  let dv = valor.slice(-1).toUpperCase();

  if (cuerpo.length < 7) { console.log("RUT INCOMPLETO"); }

  let  suma = 0;
  let  multiplo = 2;

  // Para cada dígito del Cuerpo
  for (let i = 1; i <= cuerpo.length; i++) {
  // Obtener su Producto con el Múltiplo Correspondiente
    let index = multiplo * parseInt(( valor.charAt(cuerpo.length - i) ),10);

  // Sumar al Contador General
    suma = suma + index;

  // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
}

// Calcular Dígito Verificador en base al Módulo 11
let dvEsperado = 11 - (suma % 11);

// Casos Especiales (0 y K)
let rdv= 0;
dv =  (dv == "K" ? "10" : dv );
rdv =  (parseInt(dv,10) == 0 ? 11 : parseInt(dv,10) );

if (dvEsperado != rdv) {
   // formulario.sellerInicio.rut.setCustomValidity("RUT Inválido");
    console.log("RUT Inválido" + dvEsperado + rdv );
    if ( cuerpo.length > 6 ) {
    rutEntrada = parseFloat(cuerpo).toLocaleString('es') +"-"+(dv == "10" ? "K" : dv );
    }
  } else {
    console.log("ES valido");
    let _rut = "";
    _rut = cuerpo + (dv == "10" ? "K" : dv );
    rutEntrada =   parseFloat(cuerpo).toLocaleString('es') +"-"+(dv == "10" ? "K" : dv );
  }
}





}




