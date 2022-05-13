import { Component, Input, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/servicios/clinica/profesionales/agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  @Input() profesional_id = 1;

  public horario:any;
  constructor(
    private AgendaService:AgendaService
  ) { }

  ngOnInit(): void {
    this.AgendaService.request = {
      "profesional_id":this.profesional_id
    }
    this.AgendaService.obtenerHorario().subscribe(
      (data: any) => {
        if (data.code == 0) {
         this.horario = data.body.horario;
        } else {
          console.log( data.message);
        }
      },
      (err: any) => {
        console.log( JSON.stringify(err.statusText));
      }
    );
   }







  }


