import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Usuario} from "../../../models/usuario";
import {LoginService} from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login:FormGroup;
loading=false;
  constructor(private fb:FormBuilder,
              private toastr: ToastrService, 
              private router:Router,
              private loginSerice:LoginService) { 
    this.login=fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  log():void{
    console.log(this.login);

    const usuario:Usuario={
              nombreUsuario:this.login.value.usuario,
              password:this.login.value.password}
    this.loading=true;

    this.loginSerice.login(usuario).subscribe(data=>{



      this.loading=false;
      this.loginSerice.setLocalStorage(data.token);

      if (this.loginSerice.getTokenDecode().Respuesta==="1"){
        this.router.navigate(['/dashboard']);
      }
      else{
        this.toastr.error(this.loginSerice.getTokenDecode().Message,'Error');
        this.login.reset();
  
      }

      
    },
     error=>{
      this.loading=false;
      this.toastr.error(error.error.message,'Error');
      this.login.reset();
    }

    );
    // setTimeout(()=>{
    //   if (usuario.nombreUsuario==='jmallqui' && usuario.password=='123456'){
    //     this.login.reset();
    //     this.toastr.info('Bienvenido ' + usuario.nombreUsuario,'Cúbico WMS');
    //     this.router.navigate(['/dashboard']);
    // }
    // else{
    //   this.toastr.error('Usuario o contraseña incorrecto','Error');
    //   this.login.reset();
    // }
    // this.loading=false;

    // },3000);

              console.log(usuario);
    }
    

}
