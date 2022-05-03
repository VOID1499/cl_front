import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { TipoDatoService } from 'src/app/servicios/ficha/tipoDatos/tipo-dato.service';
import { TipoDatosService } from 'src/app/servicios/ficha/tipoDatos/tipo-datos.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tipos-datos',
  templateUrl: './tipos-datos.component.html',
  styleUrls: ['./tipos-datos.component.css']
})
export class TiposDatosComponent implements OnInit {

  @ViewChild("modalGuardar") modalGuardar!: NgbModal;


  public pagina:number = 1;
  public numfilas:number = 10;
  public ordenCol? = "id";
  public ordenTipo? = "DESC";

  public busqueda = '';
  public id:number = 0;
  public nombre = '';
  public estado:number = 1;
  public lista_auxiliar = {"lista_auxiliar":[{"nombre":"campo auxiliar","estado":false}]};
  public nombreModal = "Sin nombre";
  public closeResult = "";
  public tiposDatos:any =[];
  public data:any;
  public tipo_dato:any;
  public nombreCampoAuxiliar:any;
  public total_registros:any;





  constructor(
    private modalService: NgbModal,
    public TipoDatoService:TipoDatoService,
    public TipoDatosService:TipoDatosService,

  ) {
    this.TipoDatosService.numFilas = this.numfilas;
    this.cargarTabla();
  }

  ngOnInit(): void {

  }

  cargarTabla(){

    this.lista_auxiliar = {"lista_auxiliar":[{"nombre":"campo auxiliar","estado":false}]};
    //this.lista_auxiliar.lista_auxiliar.splice(0,1);

    this.TipoDatosService.nombre = this.busqueda;
    this.TipoDatosService.estado = null;
    this.TipoDatosService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.tiposDatos = data.body.tipo_dato;
          this.data = data;
          this.total_registros = data.body.total_registros;
          //console.log(this.tiposDatos);

          this.tiposDatos.forEach((element:any) => {
            if( element.lista_auxiliar != '' ){
              element["lista_aux"] =  JSON.parse(element.lista_auxiliar);
            }
          });

        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );

  }

  guardar(){
    let lista =   {"lista_auxiliar":[{"nombre":"campo auxiliar","estado":false}]};
    lista.lista_auxiliar.splice(0,1);


    if(this.tipo_dato == 'select' || this.tipo_dato == 'checkbox' ){
      for (let i = 0; i < this.lista_auxiliar.lista_auxiliar.length; i++) {
        const element = this.lista_auxiliar.lista_auxiliar[i];
        lista.lista_auxiliar.push({"nombre":element.nombre,"estado":false});
      }
    }

    this.TipoDatoService.lista_auxiliar = JSON.stringify(lista);
    this.TipoDatoService.tipo_dato = this.tipo_dato;
    this.TipoDatoService.nombre = this.nombre;
    this.TipoDatoService.estado = this.estado;
    this.TipoDatoService.guardar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          console.log(data.message,data.body);
          this.cargarTabla();
        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );

  }

editar(){

      let lista = {"lista_auxiliar":[{"nombre":"campo auxiliar","estado":false}]};
      lista.lista_auxiliar.splice(0,1);

      if(this.tipo_dato == 'select' || this.tipo_dato == 'checkbox' ){

        for (let i = 0; i < this.lista_auxiliar.lista_auxiliar.length; i++) {
          const element = this.lista_auxiliar.lista_auxiliar[i];
          lista.lista_auxiliar.push({"nombre":element.nombre,"estado":false});
        }

    this.TipoDatoService.lista_auxiliar = JSON.stringify(lista);
    this.TipoDatoService.id = this.id;
    this.TipoDatoService.tipo_dato = this.tipo_dato;
    this.TipoDatoService.nombre = this.nombre;
    this.TipoDatoService.estado = this.estado;

      }else{

    this.TipoDatoService.lista_auxiliar = "";
    this.TipoDatoService.id = this.id;
    this.TipoDatoService.tipo_dato = this.tipo_dato;
    this.TipoDatoService.nombre = this.nombre;
    this.TipoDatoService.estado = this.estado;

      }

    this.TipoDatoService.editar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          console.log(data.message);
          this.cargarTabla();
        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log(this.id,this.lista_auxiliar,this.nombre,this.estado)
        console.log('Error al editar ' + JSON.stringify(err.statusText));
      }
    );

  }

  abrirModal(i:number = 0,id:number = 0 ){
    if (id != 0) {
      console.log("esta editando");
      this.nombreModal = 'Editar Tipo Dato';
      let tipoDato = this.tiposDatos[i];

      if(tipoDato.lista_auxiliar != ''){
        let lista = JSON.parse(tipoDato.lista_auxiliar);
        this.lista_auxiliar.lista_auxiliar.splice(0,1);

        for (let i = 0; i < lista.lista_auxiliar.length; i++) {
        const element = lista.lista_auxiliar[i];
        this.lista_auxiliar.lista_auxiliar.push({"nombre":element.nombre,"estado":false});
        }
      }else{
      }

      console.log(this.tipo_dato);
      this.id = tipoDato.id;
      this.nombre = tipoDato.nombre;
      this.tipo_dato = tipoDato.tipo_dato;
      this.estado = tipoDato.estado;


    }  else {

      this.nombreModal = 'Agregar Tipo Dato';
      this.id = 0;
      this.nombre = '';
      this.estado = 1;
   //   this.lista_auxiliar = '';
    }
    this.open(this.modalGuardar);

  }


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.lista_auxiliar = {"lista_auxiliar":[{"nombre":"campo auxiliar","estado":false}]};
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.lista_auxiliar = {"lista_auxiliar":[{"nombre":"campo auxiliar","estado":false}]};
      return 'by clicking on a backdrop';
    } else {
      this.lista_auxiliar = {"lista_auxiliar":[{"nombre":"campo auxiliar","estado":false}]};
      return `with: ${reason}`;
    }
  }


  agregarCampoAuxiliar(i = -1){
    if(i != -1){
      this.lista_auxiliar.lista_auxiliar.splice(i,1);
    }else{
      this.lista_auxiliar.lista_auxiliar.push({"nombre":"campo auxiliar","estado":false});
    }
    console.log( this.lista_auxiliar.lista_auxiliar);
  }

validarCampos(form:any){
  if(form.valid){
      if(this.id  == 0){
        this.guardar();
        this.modalService.dismissAll();
      }else{
        this.editar();
        this.modalService.dismissAll();
      }
  }else{

    console.log("Formulario erroneo" , form.valid)
  }
}

}
