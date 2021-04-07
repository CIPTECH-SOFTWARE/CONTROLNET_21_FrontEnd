import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import {UsuarioService} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register:FormGroup;
  loading=false;
  constructor(private fb:FormBuilder, 
              private usuarioService:UsuarioService,
              private router:Router,
              private toastR:ToastrService) {
    this.register=fb.group({
      usuario:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(4)]],
      confirmPassword:['']
    },{validator:this.checkPassword});

   }

  ngOnInit(): void {
  }

  registrarUsuario():void{
    console.log(this.register);
    this.loading=true;
    const usuario:Usuario={
        nombreUsuario:this.register.value.usuario,
        password: this.register.value.password

    };

    this.usuarioService.saveUser(usuario).subscribe(data=> {
      console.log(data);
      this.toastR.success('El usuario ' + usuario.nombreUsuario + ' registrado con éxito','Usuario registrado');
      this.router.navigate(["/inicio/login"]);
      this.loading=false;
    }, error=> {
      this.loading=false;
      this.toastR.error(error.error.message,'Error');
      this.register.reset();
    });

  }

  checkPassword(group:FormGroup):any{
    const pass =group.controls.password.value;
    const confirmPas=group.controls.confirmPassword.value;
    return pass===confirmPas ? null: {notSame:true};
  }
}
