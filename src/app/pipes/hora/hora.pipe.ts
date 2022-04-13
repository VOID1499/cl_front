import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {

  transform(fecha:any){
    moment.locale('es');
    return   moment(fecha).format('HH:mm:ss');
  }

}
