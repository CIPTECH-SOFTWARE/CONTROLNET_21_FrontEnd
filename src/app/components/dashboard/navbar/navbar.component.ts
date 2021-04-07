import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario:string;
  nombreUsuario:string;
  empresa:string;
  sede:string;
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.getNombreUsuario();
    //this.getAlmacen();
  }
  getNombreUsuario():void{
    this.nombreUsuario=this.loginService.getTokenDecode().sub;
    this.usuario=this.loginService.getTokenDecode().Usuario;
    this.sede=this.loginService.getTokenDecode().Sede;
    this.empresa="CORPORACIÓN DE INDUSTRIAS PLASTICAS S.A."
  }
  getAlmacen(): void{
   
    this.sede="Frutales"
  }
  logOut():void{
    this.loginService.removeLocalStorage();
    this.router.navigate(['/inicio']);
  }
}
