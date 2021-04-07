import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  cambiarPassword:FormGroup;
  loading:boolean=false;
  constructor(private fb:FormBuilder, private usuarioService:UsuarioService,
                                      private toastr:ToastrService,
                                      private router:Router) {
    this.cambiarPassword=fb.group(
      {
        passwordAnterior:['',Validators.required],
        nuevaPassword:['',[Validators.required,Validators.minLength(4)]],
        confirmPassword:['']
      },{validator:this.checkPassword}
    );
   }

  ngOnInit(): void {
  }

  checkPassword(group:FormGroup):any{
    const pass =group.controls.nuevaPassword.value;
    const confirmPas=group.controls.confirmPassword.value;
    return pass===confirmPas ? null: {notSame:true};
  }

  guardarPassword():void{
    this.loading=true;
      const changePassword:any={
          passwordAnterior:this.cambiarPassword.value.passwordAnterior,
          nuevaPassword:this.cambiarPassword.value.nuevaPassword
      };
      
      this.usuarioService.changePassword(changePassword).subscribe(data =>{
          this.toastr.info(data.message);
          this.router.navigate(['/dashboard'])
      },
      error=>{
        this.loading=false;
        this.toastr.error(error.error.message);
        this.cambiarPassword.reset();
      }
      );
  }
}
