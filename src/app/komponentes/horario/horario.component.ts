import { Component, OnInit,Input } from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  @Input() time = {hour: 0, minute: 0,second:0};
  @Input() time_min = {hour: 0, minute: 0,second:0};

  constructor() { }

  ngOnInit(): void {

  }

  verificar_hora(){


    if(this.time.hour > 24 || this.time.hour < 0 || this.time.hour < this.time_min.hour){
      this.time.hour = this.time_min.hour;
    }
  }


  verificar_minuto(){

    console.log(this.time_min)

    if(this.time.minute > 59 || this.time.minute < 0  || this.time.minute < this.time_min.minute){
      this.time.minute = this.time_min.minute;
    }
  }

}
