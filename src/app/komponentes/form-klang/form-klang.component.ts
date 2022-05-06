import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KLangService } from 'src/app/servicios/k-lang/k-lang.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-klang',
  templateUrl: './form-klang.component.html',
  styleUrls: ['./form-klang.component.css']
})
export class FormKLangComponent implements OnInit {

  public lang:string = localStorage.getItem('lang')!;
  public diccionario:any = [];


  constructor(
    public diccionarioService:KLangService ,
    private router: Router,
    ){
      this.diccionarioService.datos.lang = this.lang;

    }

  ngOnInit(): void {


  }

 cambiarIdioma(){
    localStorage.setItem('lang',this.lang);
    this.obtenerDiccionario();

  }




  obtenerDiccionario(){

   this.diccionarioService.obtener().subscribe(
      (data: any) => {
        if (data.code == 0) {
          //response exitoso
          localStorage.setItem("diccionario", JSON.stringify(data.body.diccionario));
          this.diccionario = data.body.diccionario;
          this.router.navigate(['refresh',this.router.url]);
        } else {
          console.log('Error al cargar diccionario' + data.message);
        }
      },
      (err: any) => {
        console.log('Error al cargar diccionario' + JSON.stringify(err.statusText));
      }
    );
  }

}
