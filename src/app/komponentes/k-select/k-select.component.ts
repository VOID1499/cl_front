import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-k-select',
  templateUrl: './k-select.component.html',
  styleUrls: ['./k-select.component.css']
})
export class KSelectComponent implements OnInit {

@Input() mensajeInput = "Seleccionar otro";
placeholderBuscar = "Buscar";

busca = "";
seleccion = {
  'value' :0,
  'name' : "",
   'ver' : true
}

@Output() seleccionado: EventEmitter<any> = new EventEmitter();


@Input() lista =[ {
  'value' : "1'",
  'name' : "hola",
  'ver' !: false,
},]


  constructor() { }

  ngOnInit(): void {
    this.recorrer();
  }

  buscar() {
     this.lista
      .forEach(element => {
        element.ver =  false;
      });


    this.lista
    .filter((el) => el.name.toLowerCase().indexOf(this.busca.toLowerCase()) > -1)
    .forEach(element => {
    element.ver = true;
  });
  }


  recorrer() {
    this.lista.forEach(element => {
      element.ver = true;
    });
  }

  asignar(item:any) {

    this.seleccion = item;
    this.seleccionado.emit(item);

  }
}
