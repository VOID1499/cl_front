import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CambiarClaveService } from 'src/app/servicios/login/cambio/cambiar-clave.service';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {

  public email?: string;
  public password?: string;
  public password_confirmation?: string;
  public password_token?: string;

  constructor(private sccs: CambiarClaveService, route: ActivatedRoute) {
    route.queryParams.subscribe((params) => {
      this.password_token = params['token'];
    })
   }

  ngOnInit(): void {
  }

  public cambiar(){
    this.sccs.email = this.email;
    this.sccs.password = this.password;
    this.sccs.password_confirmation = this.password_confirmation;
    this.sccs.password_token = this.password_token;

    this.sccs.cambiarclave().subscribe(
      (data: any) => {
        if (data.code == 0) {

            console.log(data);

        } else {
          console.log('Error en el registro ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );
  }

}
