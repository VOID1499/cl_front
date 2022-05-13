import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-agenda',
  templateUrl: './pagina-agenda.component.html',
  styleUrls: ['./pagina-agenda.component.css']
})
export class PaginaAgendaComponent implements OnInit {

  public profesional_id = 0;

  constructor(private rutaActiva: ActivatedRoute) {

  }

  ngOnInit(): void {

   this.profesional_id = this.rutaActiva.snapshot.params.profesional_id
  }

}
