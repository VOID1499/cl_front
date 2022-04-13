import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/servicios/clinica/pacientes/paciente.service';
import { PacientesService } from 'src/app/servicios/clinica/pacientes/pacientes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {


  public correo_:any;
  @Input()  id:number = 0;
  @Input()  rut:string = "" ;
  @Input()  correo:string = "" ;
  @Input()  nombre:string = "" ;
  @Input()  apellido_paterno:string = "";
  @Input()  apellido_materno:string = "" ;

  @Output()
  respuesta = new EventEmitter<string>();

  constructor(
    public PacienteService:PacienteService,
    public PacientesService:PacientesService,
    public router:Router,

  ){}

  ngOnInit(): void {
  }



  editar(){
    let crear =  true;
    if (this.id != 0 ) {
      this.PacienteService.id = this.id;
      crear = false;
    }

    this.PacienteService.rut = this.rut;
    this.PacienteService.correo = this.correo;
    this.PacienteService.nombre = this.nombre;
    this.PacienteService.apellido_paterno = this.apellido_paterno;
    this.PacienteService.apellido_materno = this.apellido_materno;

    this.PacienteService.guardar(crear).subscribe(
      (data: any) => {
        if (data.code == 0) {

        console.log(data.message);
        this.respuesta.emit('recargar');

        } else{
          console.log('Error al crear paciente ' + data.message);
        }
      },
      (err: any) => {
        alert(JSON.stringify(err.error.message));
        console.log('Error al crear paciente' + JSON.stringify(err.code));
      }
    );
  }

  cancelar(){
      this.respuesta.emit('cancelar');
  }

  validarCampos(form:any){
    if(form.valid) {
      this.editar();
      }else{
        console.log("Formulario erroneo");
      }
    }


}
