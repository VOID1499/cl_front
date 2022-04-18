import { Component, Input, OnInit,ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BoxService } from 'src/app/servicios/clinica/boxs/box.service';


@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  @Input() box:any;
  @ViewChild("modalBox") modalBox!: NgbModal;
  @ViewChild("modalServiciosBox") modalServiciosBox!: NgbModal;
  public closeResult = "";

  constructor(
    private BoxService:BoxService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }


  guardar(){
    if(this.box.id != 0){
      this.editarBox();
    }else{
      this.crearBox();
    }

  }

  crearBox(){
    this.BoxService.request = this.box;
    this.BoxService.guardar().subscribe((data:any)=>{
      if(data.code == 0){
        console.log(data.message);
      }
    }
    ,(err:any)=>{
      console.log('Error al crar box '+ JSON.stringify(err.statusText));
    });
  }

  editarBox(){

    this.BoxService.request = this.box;
    this.BoxService.editar().subscribe((data:any)=>{
      if(data.code == 0){
        console.log(data.message);
      }
    }
    ,(err:any)=>{
      console.log('Error al crar box '+ JSON.stringify(err.statusText));
    });

  }

  serviciosBox(){

    this.BoxService.request = {
      "id":this.box.id
    }

    this.BoxService.serviciosBox().subscribe((data:any)=>{
      if(data.code == 0){
        console.log(data.message );
        this.box.servicios = data.body.servicios;
        this.open(this.modalServiciosBox,'lg');
      }
    }
    ,(err:any)=>{
      console.log('Error al cargar servicios del box  '+ JSON.stringify(err.statusText));
    });

  }


  open(content:any ,size:string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:size}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
