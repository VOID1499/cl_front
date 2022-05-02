import { Component, OnInit } from '@angular/core';
import { BoxService } from 'src/app/servicios/clinica/boxs/box.service';
import { BoxsService } from 'src/app/servicios/clinica/boxs/boxs.service';


@Component({
  selector: 'app-boxs',
  templateUrl: './boxs.component.html',
  styleUrls: ['./boxs.component.css']
})
export class BoxsComponent implements OnInit {

  boxVacio = {
    "id":0,
    "nombre":"",
    "descripcion":"",
    "tipo":"",
    "plataforma":"",
    "url_conferencia":"",
    "user":"",
    "password":"",
    "horas":0
  }


  constructor(
    public BoxsService:BoxsService

  ) { }

  public listaBoxs:any[] = [];
  public total_registros:any;

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla(){

    this.BoxsService.request.paginacion = true;
    this.BoxsService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {

          this.total_registros = data.body.total_registros;
          this.listaBoxs = data.body.boxs;
          console.log(this.listaBoxs)

        } else {
          console.log('Error al cargar lista de boxs ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al cargar lista de boxs ' + JSON.stringify(err.statusText));
      }
    );
  }

}
