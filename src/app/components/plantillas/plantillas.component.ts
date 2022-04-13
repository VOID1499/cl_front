import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormularioService } from 'src/app/servicios/ficha/formularios/formulario.service';


@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css']
})
export class PlantillasComponent implements OnInit {


  public plantilla_formulario_id = 0;
  public plantillas:any;
  public data:any;

  constructor(
    public FormularioService:FormularioService,
  ) { }

  ngOnInit(): void {
    this.cargarPlantillas();
  }

  ngOnDestroy(){

    console.log("Destroy")
  }



   //carga select para elegir formulario
   cargarPlantillas(){

    this.FormularioService.listarPlantillas().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.plantillas = data.body.plantillas;
          this.data = data;
        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al listar plantillas' + JSON.stringify(err.statusText));
      }
    );
  }




}
