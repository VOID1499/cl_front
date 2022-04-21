import { Pipe, PipeTransform } from '@angular/core';
import { KLangService } from 'src/app/servicios/k-lang/k-lang.service';

@Pipe({
  name: 'kIdioma'
})
export class KIdiomaPipe implements PipeTransform {

  constructor (public dic: KLangService) {

  } 

  transform(value: unknown, ...args: unknown[]): unknown {
    let traduccion = this.dic.st(value) ||  "" ;
    
    if (traduccion == "")  {
      return value;
    }

    return traduccion;
  }

}
