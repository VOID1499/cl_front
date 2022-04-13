import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearObjeto'
})
export class FormatearObjetoPipe implements PipeTransform {

  transform(element:any): unknown {
    return element = element.nombre;
  }

}
