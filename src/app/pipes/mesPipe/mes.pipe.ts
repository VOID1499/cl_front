import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'mes'
})
export class MesPipe implements PipeTransform {

  transform(fecha:any){
    moment.locale('es');
    return   moment(fecha).format('MMMM YYYY');
  }

}
