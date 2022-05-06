import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute ,Params } from '@angular/router';

@Component({
  selector: 'app-k-refresh',
  templateUrl: './k-refresh.component.html',
  styleUrls: ['./k-refresh.component.css']
})
export class KRefreshComponent implements OnInit {

  public ruta = "";
  constructor(
    private router:Router,
    private activeRoute:ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.ruta = this.activeRoute.snapshot.params.next;
    this.router.navigate([this.ruta]);
  }

}
