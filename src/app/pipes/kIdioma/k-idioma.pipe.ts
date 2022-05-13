import { Pipe, PipeTransform } from '@angular/core';
import { KLangService } from 'src/app/servicios/k-lang/k-lang.service';


@Pipe({
  name: 'kIdioma'
})
export class KIdiomaPipe implements PipeTransform {

  constructor (public dic: KLangService ,private diccionarioService:KLangService ) {

  }

  transform(value: unknown ) {

    let result = this.diccionarioService.diccionario.find((obj:any) => {
        return obj.clave == value
      })

     return result.texto;
  }

}
