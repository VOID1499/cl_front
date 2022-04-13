import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha:any){
    moment.locale('es');
    return   moment(fecha).format('dddd') +" "+ moment(fecha).format('LL');
  }

}
