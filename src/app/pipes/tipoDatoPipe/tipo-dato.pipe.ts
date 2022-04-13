import { Pipe, PipeTransform } from '@angular/core';
import { TipoDatosService } from 'src/app/servicios/ficha/tipoDatos/tipo-datos.service';


@Pipe({
  name: 'tipoDato'
})
export class TipoDatoPipe implements PipeTransform {

  transform(id:number){
    let tipoDato ;

  }

}
