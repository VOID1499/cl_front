import { Component, OnInit ,ViewChild} from '@angular/core';
import { FeriadoService } from 'src/app/servicios/clinica/feriados/feriado.service';
import { FeriadosService } from 'src/app/servicios/clinica/feriados/feriados.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feriados',
  templateUrl: './feriados.component.html',
  styleUrls: ['./feriados.component.css']
})
export class FeriadosComponent implements OnInit {

  @ViewChild("modalGuardar") modalGuardar!: NgbModal;


  public closeResult = '';
  public pagina:number = 1;
  public numfilas:number = 10;
  public ordenCol? = "id";
  public ordenTipo? = "DESC";

  public id:number = 0;
  public nombre:string = "";
  public dia:any = 1;
  public mes:number = 1;
  public estado:number = 1;
  public feriados:any = [];
  public busqueda = '';
  public nombreModal = 'Sin nombre';
  public meses:any = [];
  public year:any;

  constructor(
    private modalService: NgbModal,
    public FeriadoService:FeriadoService,
    public FeriadosService:FeriadosService,
    ){
      this.dia = 1;
      this.mes = 1;
      this.FeriadosService.numfilas = this.numfilas;
      this.cargarTabla();
     }

     ngOnInit(): void {

      let date = new Date();
      this.year = date.getFullYear();

      this.meses = [
        {'nombre':1,'dias':1 ,},{'nombre':2,'dias': 1,},{'nombre':3,'dias': 1,},{'nombre':4,'dias': 1,},{'nombre':5,'dias': 1,},
        {'nombre':6,'dias': 1,},{'nombre':7,'dias': 1,},{'nombre':8,'dias': 1,},{'nombre':9,'dias': 1,},{'nombre':10,'dias': 1,},
        {'nombre':11,'dias': 1,},{'nombre':12,'dias': 1,},
      ]

      for(let i = 0;i < this.meses.length; i++){
        let _dias =  new Date(this.year, i, 0).getDate();
        this.meses[i].dias = Array(_dias);

      }


      console.log(this.meses)

    }



    cargarTabla(){

      this.FeriadosService.obtener().subscribe(
        (data: any) => {
          if (data.code == 0) {
            this.feriados = data.body;
            console.log(data.message,data.body);
          } else {
            console.log('Error al intetar recuperar clave ' + data.message);
          }
        },
        (err: any) => {
          console.log('Error en el login ' + JSON.stringify(err.statusText));
        }
      );
    }



  abrirModal(i:number = 0,nombre:string = '' ) {

    if (nombre != '') {
      let feriado = this.feriados.feriado[i];
      this.nombreModal = "Editar feriado ";
      this.id = feriado.id;
      this.nombre = feriado.nombre;
      this.dia = feriado.dia;
      this.mes = feriado.mes;
      this.estado = feriado.estado;
    }  else {
      this.nombreModal = "Nuevo feriado ";
      this.nombre ='';
      this.dia = 1;
      this.mes = 1;
      this.estado = 1;
      this.id = 0;

    }
    this.open(this.modalGuardar);

  }



    public guardar() {

      this.FeriadoService.nombre = this.nombre;
      this.FeriadoService.dia = this.dia;
      this.FeriadoService.mes = this.mes;
      this.FeriadoService.estado = this.estado;

      this.FeriadoService.guardar().subscribe(
        (data: any) => {
          if (data.code == 0) {
            this.nombre ='';
            this.dia = 0;
            this.mes = 0
            this.estado = 0;
            this.id = 0;
            this.modalService.dismissAll();
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


    public editar(){

      this.FeriadoService.nombre = this.nombre;
      this.FeriadoService.dia = this.dia;
      this.FeriadoService.mes = this.mes;
      this.FeriadoService.estado = this.estado;
      this.FeriadoService.id = this.id;

      this.FeriadoService.editar().subscribe(
        (data: any) => {
          if (data.code == 0) {
            this.nombre ='';
            this.dia = 0;
            this.mes = 0
            this.estado = 0;
            this.id = 0;
            this.modalService.dismissAll();
            this.cargarTabla();
            // this.router.navigate(['cambioClave']);
          } else {
            console.log('Error al intetar recuperar clave ' + data.message);
          }
        },
        (err: any) => {
          console.log('Error en el login ' + JSON.stringify(err.statusText));
        }
      );
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
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  validarCampos(form:any){

    if(form.valid){
      if (this.id == 0 ) {
        console.log("guardando")
      this.guardar();
      } else {
      this.editar();
      }
    }else{
      console.log("Formulario erroneo");
    }
  }




}
