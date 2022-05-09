import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'mes'
})
export class MesPipe implements PipeTransform {

  transform(fecha:any){
    moment.locale(localStorage.getItem('lang')!);
    return   moment(fecha).format('MMMM YYYY');
  }

}
