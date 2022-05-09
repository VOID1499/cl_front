import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'minutosHora'
})
export class MinutosHoraPipe implements PipeTransform {

  transform(minutos:any){
    moment.locale(localStorage.getItem('lang')!);
    let dato = minutos;

    let hora = Math.trunc(dato/60);
    minutos = dato % 60;

    var time = `${hora}:${minutos}:00`;
    var formatted = moment(time, "HH:mm:ss").format('hh:mm:ss');
    return  formatted ;



}

}
