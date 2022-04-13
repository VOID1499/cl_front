import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecuperarClaveService } from 'src/app/servicios/login/recuperacion/recuperar-clave.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  public email?: string;

  constructor(private router: Router, private srs: RecuperarClaveService) { }

  ngOnInit(): void {
  }

  public recuperar(){
    this.srs.email = this.email;

    this.srs.recuperar().subscribe(
      (data: any) => {
        if (data.code == 0) {

            console.log(data.message);
           // this.router.navigate(['cambioClave']);

        } else {
          console.log('Error al intetar recuperar clave ' + data.message);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );
  }

}

