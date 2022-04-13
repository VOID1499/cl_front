import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pagina-reservas',
  templateUrl: './pagina-reservas.component.html',
  styleUrls: ['./pagina-reservas.component.css']
})
export class PaginaReservasComponent implements OnInit {

  public servicio_id:any;
  public fecha:any;
  constructor(
    private rutaActiva: ActivatedRoute,
  ) { }

  ngOnInit(): void {
   this.servicio_id = this.rutaActiva.snapshot.params.servicio_id;
   this.fecha = this.rutaActiva.snapshot.params.fecha;
  }

}
