import { Component, OnInit } from '@angular/core';
import { RegistrarService } from 'src/app/servicios/login/registro/registrar.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public name?: string;
  public password?: string;
  public password_confirmation?: string;
  public email?: string;
  public link?: number = 1;


  constructor(private srs: RegistrarService) { }

  ngOnInit(): void {
  }

  public registrar(){
    this.srs.email = this.email;
    this.srs.name = this.name;
    this.srs.password = this.password;
    this.srs.password_confirmation = this.password_confirmation;
    this.srs.link = this.link;

    this.srs.registrar().subscribe(
      (data: any) => {
        if (data.code == 0) {

            console.log(data);

        } else {
          console.log('Error en el registro ' + data.message.email);
          console.log('Error en el registro ' + data.message.password);
        }
      },
      (err: any) => {
        console.log('Error en el login ' + JSON.stringify(err.statusText));
      }
    );
  }

}
