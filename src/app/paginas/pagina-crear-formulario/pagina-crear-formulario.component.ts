import { Component, OnInit } from '@angular/core';
import { FormularioService } from 'src/app/servicios/ficha/formularios/formulario.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-pagina-crear-formulario',
  templateUrl: './pagina-crear-formulario.component.html',
  styleUrls: ['./pagina-crear-formulario.component.css']
})
export class PaginaCrearFormularioComponent implements OnInit {

  constructor(public formularioServicio: FormularioService) {

  }

  ngOnInit(): void {
  }

  public showForm:boolean = false;
  public showTable:boolean = true;


  exeRespuesta(message:string):void{
    if(message == 'formulario creado' || message == 'formulario editado' ){
      this.showForm = false;
      this.showTable = true;

      Swal.fire(
        'Cambios guardados!',
        '',
        'success'
      )

    }else{
      this.showForm = true;
      this.showTable = false;
    }


  }





}
