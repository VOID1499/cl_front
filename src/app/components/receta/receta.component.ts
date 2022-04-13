import { Component, OnInit } from '@angular/core';
import { RecetaService } from 'src/app/servicios/ficha/recetas/receta.service';
import { FormularioService } from 'src/app/servicios/ficha/formularios/formulario.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  constructor(
    public RecetaService:RecetaService,
    public FormularioService:FormularioService){

  }

  ngOnInit(): void {
  }



}
