import { Component, OnInit } from '@angular/core';
import { FormularioService } from 'src/app/servicios/ficha/formularios/formulario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-formularios',
  templateUrl: './tipo-formularios.component.html',
  styleUrls: ['./tipo-formularios.component.css']
})
export class TipoFormulariosComponent implements OnInit {

  public tiposFormulario:any[] = [];
  public total_registros:any;
  public data:any;
  constructor(
    public FormularioService:FormularioService
  ){ }

  ngOnInit(): void {
    this.cargarTabla();
  }

  public itemVacio = {
      "id": 0,
      "created_at": null,
      "updated_at": null,
      "tipo": ""
  }

  cargarTabla(){

    this.FormularioService.requestTiposFormulario.numFilas = 10;
    this.FormularioService.requestTiposFormulario.paginacion = true;

    this.FormularioService.tiposFormularios().subscribe(
      (data:any)=>{
        if (data.code == 0) {
          this.tiposFormulario = data.body.tipo_formularios;
          this.total_registros = data.body.total_registros;

        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      });

  }


      exeRespuesta(event:any){
        this.cargarTabla();

        switch (event) {
          case 'Cambios guardados':
            Swal.fire({
              icon: 'success',
              title: 'Cambios guardados',
              text: '',
            })
            break;

            case 'No se puede eliminar':
              Swal.fire({
                icon: 'warning',
                title: 'No es posible eliminar',
                text: '',
              })
              break;
        }

      }


}
