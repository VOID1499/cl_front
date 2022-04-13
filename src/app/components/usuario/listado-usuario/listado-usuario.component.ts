import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listado-usuario',
  templateUrl: './listado-usuario.component.html',
  styleUrls: ['./listado-usuario.component.css']
})
export class ListadoUsuarioComponent implements OnInit {

  public usuario?: any;
  closeResult = '';
  public busqueda = '';
  public permisoSeleccionado: any;
  @ViewChild("modalCrear") modalCrear!: NgbModal;
  @ViewChild("modalEdicion") modalEdicion!: NgbModal;

  constructor(public userService: UsuarioService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.userService.Listar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          if (data.body != null) {
            this.usuario = data.body;
          }
        } else {
          console.log('Error en el login ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );
  }

  open(content:any) {
    this.modalService.open( content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  public crearPermiso(){
    this.permisoSeleccionado = {};
    this.open(this.modalCrear);
  }

  public editarPermiso(permiso: any){
    this.permisoSeleccionado = permiso;
    this.open(this.modalEdicion);
  }

  public editar(){

    this.userService.id = this.permisoSeleccionado.id;
    this.userService.name = this.permisoSeleccionado.name;

    this.userService.editar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          console.log(data.message);
        } else {
          console.log('Error en la actualizacion de los datos ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en la actualizacion de los datos ' + JSON.stringify(err.statusText));
      }
    );
  }

  public crear(){

    this.userService.name = this.permisoSeleccionado.name;

    this.userService.crear().subscribe(
      (data: any) => {
        if (data.code == 0) {
          console.log(data.message);
          this.listar();
        } else {
          console.log('Error en la creacion de los datos ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en la creacion de los datos ' + JSON.stringify(err.statusText));
      }
    );
  }

}
