import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { reduceEachTrailingCommentRange } from 'typescript';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KLangService {

  constructor(private http: HttpClient , private router:Router) {

  }

  public diccionario:any = [];

  datos = {
    "lang": ""
  }


  obtener() {
    let seguro = environment.headerSimple;
    const ladata:any =  this.http.post(environment.urlDiccionario, JSON.stringify(this.datos), { headers: new HttpHeaders(seguro)} );
    return ladata;

  }



}

