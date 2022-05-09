import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {

  transform(fecha:any){
    moment.locale(localStorage.getItem('lang')!);
    return   moment(fecha).format('HH:mm:ss');
  }

}
