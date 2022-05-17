import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  public request:any;

  constructor(private http:HttpClient) {}



  obtener(){
    let Auth =  localStorage.getItem('TK');
    let KAuth =  localStorage.getItem('KT');
    let seguro =  {'Content-Type': 'application/json', 'Authorization': Auth!, 'K_Authorization': KAuth! };

    const data:any = this.http.post(environment.urlHorasDisponibles, JSON.stringify(this.request) ,{ headers:new HttpHeaders(seguro)});
    return data;
  }


}


export interface Horario {
  code: number
  message: string
  body: Body
}

export class Horario implements Horario{
  constructor(){
  }
}

export interface Body {
  id: number
  created_at: string
  updated_at: string
  nombre: string
  descripcion: string
  estado: number
  tiempo: number
  precio: string
  comision: string
  profesional_id: number
  DiasActivo: string[]
  HoraServicio: HoraServicio[]
  CantidadHorasDiaria: number
}

export class Body implements Body{
  constructor(){
    this.id = 0;
    this.DiasActivo = new Array();
    this.HoraServicio = new Array();
  }
}

export interface HoraServicio {
  item: Item[]
  fecha: string
  reservaTotal: number
  reservados: number
  disponible: number
}

export class HoraServicio implements HoraServicio{
  constructor(){
    this.item = new Array();
  }
}

export interface Item {
  reserva: boolean
  hora: string
  horaFin: string
  usuario: string
  dia: number
}

export class Item implements Item{
  constructor(){
  }
}


