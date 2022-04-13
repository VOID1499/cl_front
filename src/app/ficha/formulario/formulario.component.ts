import { Component, OnInit,Output,EventEmitter,OnDestroy } from '@angular/core';
import { FormularioService } from 'src/app/servicios/ficha/formularios/formulario.service';
import { TipoDatosService } from 'src/app/servicios/ficha/tipoDatos/tipo-datos.service';
import { EnfermedadesService } from 'src/app/servicios/ficha/enfermedades/enfermedades.service';
import { VademecumsService } from 'src/app/servicios/ficha/vademecums/vademecums.service';
import { ActivatedRoute , Router } from '@angular/router';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Output() emit = new EventEmitter<string>();

  public camposFormularioCompletos:boolean = true;
  public tiposDatos:any;
  public enfermedades:any;
  public medicamentos:any;
  public lista_auxiliar:any = "";
  public data:any;
  public tiposDeFormulario:any[] = [];

  public prueba:any;
  public _enfermedades = [{
    "id":"0",
    "nombre":""
  }];
  public _medicamentos = [{
    "id":"0",
    "nombre":""
  }];

  public rutEntrada = "";
  public rut = "";
  public tipo_formulario_id:any;

  constructor(
    public FormularioService:FormularioService,
    public TipoDatosService:TipoDatosService,
    public EnfermedadesService:EnfermedadesService,
    public VademecumsService:VademecumsService,

  ){
    this.FormularioService.request.numFilas = 5;
    this.cargarTiposDeFormulario();
    this.cargarTiposDatos();
    this.cargarEnfermedades();
    this.cargarMedicamentos();

  }

  ngOnInit(): void {
  }

  ngOnDestroy():void{
    console.log('destroy editar')
  }

  cargarTiposDatos(){

    this.TipoDatosService.estado = 1;
   this.TipoDatosService.numFilas = 100;


    this.TipoDatosService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.tiposDatos = data.body.tipo_dato;
          console.log(this.tiposDatos);
        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );
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


asignarTipo(i:any){

  let campo = this.FormularioService.requestFormularioDatos.camposFormulario[i];
  let tipoDato:any = this.tiposDatos.find((element:any) => element.id == campo.tipo_dato_formulario_id );
  campo.tipo_dato_formulario = tipoDato;
  campo.tipo_dato_formulario_id =  tipoDato.id;

  if(tipoDato.lista_auxiliar != ""){
    campo.tipo_dato = tipoDato.tipo_dato;
    campo.tipo_dato_formulario._lista_auxiliar = JSON.parse(tipoDato.lista_auxiliar);
    campo.tipo_dato_formulario.tipo_dato = tipoDato.tipo_dato;

  }

  if(tipoDato.referencia_table == 'vademecums'){
    campo.tipo_dato = tipoDato.tipo_dato;
    campo.tipo_dato_formulario.tipo_dato = tipoDato.tipo_dato;
    campo.tipo_dato_formulario.referencia_table = tipoDato.referencia_table;
  }

  if(tipoDato.referencia_table == 'enfermedads'){
    campo.tipo_dato = tipoDato.tipo_dato;
    campo.tipo_dato_formulario.tipo_dato = tipoDato.tipo_dato;
    campo.tipo_dato_formulario.referencia_table = tipoDato.referencia_table;
 }

console.log(campo)

}

  agregarCampo(){

    this.FormularioService.requestFormularioDatos.camposFormulario.push(
      {
        "id_campo":0,
        "nombre":"",
        "posicion":0,
        "estado":1,
        "tipo_dato_formulario_id": 0,
        "tipo_dato":"",
        "tipo_dato_formulario": {
          "id": 0,
          "nombre": "",
          "lista_auxiliar":"",
          "_lista_auxiliar":{"lista_auxiliar":[]},
          "tipo_dato": "",
          "referencia_table":"",
          "estado": 1
      },
      "dato": {
        "id":0,
        "almacen_dato_id":0,
        "plantilla_formulario_dato_id":0,
        "valor":""
    }
      }

     );
    console.log( this.FormularioService.requestFormularioDatos.camposFormulario);
  }


eliminarCampo(i:number){
  this.FormularioService.requestFormularioDatos.camposFormulario.splice(i,1);
  this.FormularioService.requestFormulario.camposFormulario.splice(i,1);
  console.log(this.FormularioService.requestFormulario.camposFormulario);
}

bajarPosicion(i:number){
let a = this.FormularioService.requestFormularioDatos.camposFormulario[i];
let b = this.FormularioService.requestFormularioDatos.camposFormulario[i+1];

this.FormularioService.requestFormularioDatos.camposFormulario[i+1] = a;
this.FormularioService.requestFormularioDatos.camposFormulario[i] = b;
console.log(this.FormularioService.requestFormularioDatos.camposFormulario);

}

subirPosicion(i:number){
 let a = this.FormularioService.requestFormularioDatos.camposFormulario[i];
 let b = this.FormularioService.requestFormularioDatos.camposFormulario[i-1];

 this.FormularioService.requestFormularioDatos.camposFormulario[i-1] = a;
 this.FormularioService.requestFormularioDatos.camposFormulario[i] = b;
 console.log(this.FormularioService.requestFormularioDatos.camposFormulario);
}

agregarEnfermedad(i:number = -1){
  if(i == -1){
    this._enfermedades.push({
      "id":"0",
      "nombre":""
    });
  }else{
    this._enfermedades.splice(i,1);
  }
};

agregarMedicamento(i:number = -1){
  if(i == -1){
    this._medicamentos.push({
      "id":"0",
      "nombre":""
    });
  }else{
    this._medicamentos.splice(i,1);
  }
};


crearFormulario(){

  if(this.FormularioService.requestFormularioDatos.plantillaFormulario.id == 0){

    console.log(this.FormularioService.requestFormularioDatos)

    this.FormularioService.guardar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          console.log(data.message);
          this.emit.emit('formulario creado');
        } else {
          console.log('Error creando formulario' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al crear formulario' + JSON.stringify(err.statusText));
      }
    );

  }else{
    this.FormularioService.editar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          console.log(data.message);
          this.emit.emit('formulario editado');

        } else {
          console.log('Error al intentar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al editar formulario' + JSON.stringify(err.statusText));
      }
    );
  }

  this.FormularioService.requestFormulario =  {
    "plantillaFormulario": {
      "id": 0,
      "nombre":"",
      "descripcion":""
    },
    "camposFormulario": [{
      "nombre":"",
      "posicion":0,
      "estado":1,
      "tipo_dato_formulario_id": 0,
      "tipo_dato":"",
      "tipo_dato_formulario": {
        "id": 0,
        "nombre": "",
        "lista_auxiliar":  {"lista_auxiliar":[{}]},
        "tipo_dato": "",
        "referencia_table": null,
        "estado": 1
    }
    }
    ]
  };
  this.FormularioService.requestFormulario.camposFormulario.splice(0,1);

}


editar(id:number){

 this.FormularioService.requestCargarFormulario.plantilla_formulario_id = id;
 this.FormularioService.cargarFormulario().subscribe(
  (data: any) => {
    if (data.code == 0) {
      this.FormularioService.requestFormulario = data.body;

    } else {
      console.log('Error al cargar formulario' + data.message);
    }
  },
  (err: any) => {
    console.log('Error al cargar formulario' + JSON.stringify(err.statusText));
  }
);

}


validarCampos(form:any){
  if(form.valid){
    if(this.FormularioService.requestFormularioDatos.plantillaFormulario.tipo_formulario_id == 0){
      this.FormularioService.requestFormularioDatos.plantillaFormulario.tipo_formulario_id = this.tipo_formulario_id;
      this.validarCamposFormulario();
    }else{
      this.validarCamposFormulario();
    }


  }else{
    console.log('Formulario erroneo');
  }
}


validarCamposFormulario(){
  this.camposFormularioCompletos = true;
  for (let i = 0; i <  this.FormularioService.requestFormularioDatos.camposFormulario.length; i++) {
    const element = this.FormularioService.requestFormularioDatos.camposFormulario[i];
    if(element.tipo_dato_formulario_id == 0 || element.nombre == '' ){
      this.camposFormularioCompletos = false;
      break;
    }
  }

  if(this.camposFormularioCompletos == true){
    this.crearFormulario();

  }
}


formatearObjeto(element:any){
  return element = element;
}



cargarTiposDeFormulario(){

this.FormularioService.requestTiposFormulario.paginacion = false;
this.FormularioService.tiposFormularios().subscribe(
 (data: any) => {
   if (data.code == 0) {
     this.tiposDeFormulario = data.body.tipo_formularios;
     console.log(this.tiposDeFormulario);
   } else {
     console.log('Error al cargar tipos de formulario formulario' + data.message);
   }
 },
 (err: any) => {
   console.log('Error al carga tipos de formulario' + JSON.stringify(err.statusText));
 }
);
}





cleanRut() {

  this.rutEntrada = typeof this.rutEntrada === 'string'? this.rutEntrada.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : ''
  let valor =  typeof this.rutEntrada === 'string'? this.rutEntrada.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : '';

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
    this.rutEntrada = parseFloat(cuerpo).toLocaleString('es') +"-"+(dv == "10" ? "K" : dv );
    }
  } else {
    console.log("ES valido");
    this.rut = cuerpo + (dv == "10" ? "K" : dv );
    this.rutEntrada =   parseFloat(cuerpo).toLocaleString('es') +"-"+(dv == "10" ? "K" : dv );
  }
}

}
