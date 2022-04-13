import { Component, OnInit } from '@angular/core';
import { FichasService } from 'src/app/servicios/ficha/fichas/fichas.service';

@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  styleUrls: ['./fichas.component.css']
})
export class FichasComponent implements OnInit {


  public fichas:any;
  public data:any;


  constructor(public FichasService:FichasService){
    this.FichasService.numfilas = 10;
    this.cargarTabla();
  }

  ngOnInit(): void {
  }


  cargarTabla(){

    this.FichasService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.fichas = data.body.fichas;
          this.data = data;
        } else {
          console.log('Error al intentar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al listar fichas' + JSON.stringify(err.statusText));
      }
    );
  }
}
