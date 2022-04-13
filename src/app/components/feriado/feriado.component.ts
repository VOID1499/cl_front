import { Component, Input, OnInit } from '@angular/core';
import { FeriadoService } from 'src/app/servicios/clinica/feriados/feriado.service';
import { FeriadosService } from 'src/app/servicios/clinica/feriados/feriados.service';

@Component({
selector: 'app-feriado',
  templateUrl: './feriado.component.html',
  styleUrls: ['./feriado.component.css']
})
export class FeriadoComponent implements OnInit {

  @Input() id:number = 0;
  @Input() nombre:string = "";
  @Input() dia:number = 0;
  @Input() mes:number = 0;
  @Input() estado:number = 1;

  public fecha:string = "";

  constructor(
    public FeriadoService:FeriadoService,
    public FeriadosService:FeriadosService

  ) { }

  ngOnInit(): void {

  }

  public guardar() {
    this.FeriadoService.nombre = this.nombre;
    this.FeriadoService.dia = this.dia;
    this.FeriadoService.mes = this.mes;
    this.FeriadoService.estado = this.estado;

    this.FeriadoService.guardar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.FeriadoService.showAgregar = false;
          alert(data.message);

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


  public editar() {
    this.FeriadoService.nombre = this.nombre;
    this.FeriadoService.dia = this.dia;
    this.FeriadoService.mes = this.mes;
    this.FeriadoService.estado = this.estado;
    this.FeriadoService.id = this.id;

    this.FeriadoService.editar().subscribe(
      (data: any) => {
        if (data.code == 0) {
          this.nombre = "";
          this.FeriadoService.showEditar = false;
          alert(data.message);


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

  validarCampos(form:any){

    if(form.valid){

    }else{
      console.log("Formulario erroneo");
    }
  }





}
