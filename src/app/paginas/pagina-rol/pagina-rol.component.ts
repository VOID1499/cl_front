import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-rol',
  templateUrl: './pagina-rol.component.html',
  styleUrls: ['./pagina-rol.component.css']
})
export class PaginaRolComponent implements OnInit {

  public showListado = true;
  public showModificar = false;

  constructor() { }

  ngOnInit(): void {
  }

  public cambiarForm($event: any){

    if ($event == "editar") {
    this.showModificar  = true;
    this.showListado =  false;
    }
   }

}
