import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearObjetoEstado'
})
export class FormatearObjetoEstadoPipe implements PipeTransform {


  transform(element:any): unknown {
    return element = element.estado;
  }

}
