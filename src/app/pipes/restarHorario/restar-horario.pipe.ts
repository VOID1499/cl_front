import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'restarHorario'
})
export class RestarHorarioPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    let date =   moment(`2/1/22, ${value}`).format('HH:mm:ss');
    return date;
  }

}
