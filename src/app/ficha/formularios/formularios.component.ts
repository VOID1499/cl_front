import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormularioService } from 'src/app/servicios/ficha/formularios/formulario.service';
import { TipoDatosService } from 'src/app/servicios/ficha/tipoDatos/tipo-datos.service';
import { EnfermedadesService } from 'src/app/servicios/ficha/enfermedades/enfermedades.service';
import { VademecumsService } from 'src/app/servicios/ficha/vademecums/vademecums.service';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {

  public tiposDatos:any;
  public enfermedades:any;
  public medicamentos:any;
  public lista_auxiliar:any = "";
  public plantillas:any;
  public data:any;
  public busqueda = "";
  public total_registros:any;

  @Output() respuesta:EventEmitter<string> =  new EventEmitter<string>();

  public _enfermedades = [{
    "id":"0",
    "nombre":""
  }];
  public _medicamentos = [{
    "id":"0",
    "nombre":""
  }];

  constructor(
    public FormularioService:FormularioService,
    public TipoDatosService:TipoDatosService,
    public EnfermedadesService:EnfermedadesService,
    public VademecumsService:VademecumsService,

  ){
    this.FormularioService.request.numFilas = 15;
    this.cargarTabla();
  }

  ngOnInit(): void {
  }

  cargarTabla(){
    console.log("carga tabla");


    this.FormularioService.listarPlantillas().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.plantillas = data.body.plantillas;
          this.total_registros = data.body.total_registros;
        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al listar plantillas' + JSON.stringify(err.statusText));
      }
    );
  }

  abrirFormulario(){

    this.FormularioService.requestFormularioDatos =  {
      "almacen_dato_id":0,
      "plantillaFormulario": {
        "id": 0,
        "nombre":"",
        "descripcion":"",
        "tipo_formulario_id":0
      },
      "camposFormulario": [ {
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
          "_lista_auxiliar":{"lista_auxiliar":[{"nombre":""}]},
          "tipo_dato": "",
          "referencia_table": "",
          "estado": 1
      },
      "dato": {
        "id":0,
        "almacen_dato_id":0,
        "plantilla_formulario_dato_id":0,
        "valor":""
    }
      },
      ]
    }

    this.respuesta.emit("nuevo formulario");
  }



  editar(id:number){

   this.FormularioService.requestCargarFormulario.plantilla_formulario_id = id;
   this.FormularioService.cargarFormulario().subscribe(
    (data: any) => {
      if (data.code == 0) {

        this.FormularioService.requestFormularioDatos.camposFormulario = data.body.camposFormulario;
        this.FormularioService.requestFormularioDatos.plantillaFormulario = data.body.plantillaFormulario;


        this.FormularioService.requestFormularioDatos.camposFormulario.forEach(element => {

          if(element.tipo_dato_formulario.lista_auxiliar != ""){
            element.tipo_dato_formulario._lista_auxiliar = JSON.parse(element.tipo_dato_formulario.lista_auxiliar);
          }
        });
      this.respuesta.emit("Cargar Formulario");

      } else {
        console.log('Error al intetar recuperar clave ' + data.message);
      }
    },
    (err: any) => {
      console.log('Error al cargar formulario' + JSON.stringify(err.statusText));
    }
  );

  }



}



