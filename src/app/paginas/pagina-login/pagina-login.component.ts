import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css']
})
export class PaginaLoginComponent implements OnInit {

  public showRecuperar = false;
  public showRegistro = false;
  public showLogin = true;
  constructor() { }

  ngOnInit(): void {
  }

  public cambiarForm($event: any){

    if ($event == "recuperar") {
    this.showRecuperar  = true;
    this.showRegistro =  false;
    this.showLogin =  false;
    }else if($event == "registrar") {
      this.showRecuperar  = false;
      this.showRegistro =  true;
      this.showLogin =  false;
    }
   }

}
