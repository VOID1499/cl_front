import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha:any){
    moment.locale(localStorage.getItem('lang')!);
    return   moment(fecha).format('dddd') +" "+ moment(fecha).format('LL');
  }

}
