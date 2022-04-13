import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'minutosHora'
})
export class MinutosHoraPipe implements PipeTransform {

  transform(minutos:any){
    moment.locale('es');
    let dato = minutos;

    let hora = Math.trunc(dato/60);
    minutos = dato % 60;

      return `${hora} Horas ${minutos}  Minutos `



}

}
