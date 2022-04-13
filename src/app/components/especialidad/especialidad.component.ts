import { Component, OnInit,Input } from '@angular/core';
import { EspecialidadService } from 'src/app/servicios/clinica/especialidades/especialidad.service';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css'],
})
export class EspecialidadComponent implements OnInit {

  @Input() nombre:string = "";
  @Input() id:number = 0;

  public closeResult = "";


  constructor(
    public especialidadService: EspecialidadService,
    private modalService: NgbModal,
    public router:Router
    ) {

    }



  ngOnInit(): void {
  }

  public guardar() {

    console.log(this.nombre);
    this.especialidadService.nombre = this.nombre;

    this.especialidadService.guardar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.nombre = "";
          alert(data.message);

        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );
  }


  public editar() {
    this.especialidadService.nombre = this.nombre;
    this.especialidadService.id = this.id;
    this.especialidadService.editar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.nombre = "";
          this.especialidadService.showEditar = false;
          alert(data.message);
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
    if(form.valid) {
      this.editar();
      this.modalService.dismissAll();
      }else{
        console.log("Formulario erroneo");
      }
    }




}
