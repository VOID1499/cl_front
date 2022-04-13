import { Component, OnInit } from '@angular/core';
import { FormularioService } from 'src/app/servicios/ficha/formularios/formulario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagina-pacientes',
  templateUrl: './pagina-pacientes.component.html',
  styleUrls: ['./pagina-pacientes.component.css']
})
export class PaginaPacientesComponent implements OnInit {

  constructor(
    public FormularioService:FormularioService
  ) { }


  public showPacientes:boolean = true;
  public showAtenciones:boolean = false;
  public kid:any;

  ngOnInit(): void {
  }

  exeRespuesta(kid:string){
    this.kid = kid;
    this.showPacientes = false;
    this.showAtenciones = true;
  }

  pacienteSinFicha(respuesta:string){
    Swal.fire({
      icon: 'error',
      title: 'Ficha no encontrada ',
      text: 'Se debe registrar una ficha medica previamente para gestionar las atenciones',
    })
    this.showPacientes = true;
    this.showAtenciones = false;
  }
}
