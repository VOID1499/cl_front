import { Component, Input, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/servicios/clinica/profesionales/agenda.service';
import { ReservasService } from 'src/app/servicios/clinica/reservas/reservas.service';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  @Input() profesional_id = 1;
  public horario:any;

  public serviciosProfesional:any[] = [22,23];
  constructor(
    private ReservasService:ReservasService,
    private AgendaService:AgendaService
  ) { }

  ngOnInit(): void {

    this.serviciosProfesional.forEach(element => {

        this.ReservasService.request = {
            "servicio_id":element,
            "fecha_inicio":"2022-05-11",
            "cantidad_dias":7
        
        }
    
        this.ReservasService.obtener().subscribe(
            (data: any) => {
              if (data.code == 0) {
               this.serviciosProfesional.push(data.body);
              } else {
                console.log( data.message);
              }
            },
            (err: any) => {
              console.log( JSON.stringify(err.statusText));
            }
          );

        
        
    });

    this.serviciosProfesional.splice(0,1)
    this.serviciosProfesional.splice(0,1)
    console.log(this.serviciosProfesional)



 
   }

   public mostrar(){
       this.horario = this.serviciosProfesional[0];
    this.serviciosProfesional.forEach((element:any) =>{
        
       element.HoraServicio.forEach((dia:any,index:any) => {
          if(this.horario.HoraServicio[index].fecha == dia.fecha){
            this.horario.HoraServicio[index].item.push(...dia.item)
          }
       });

    })

    console.log(this.horario)
}






}