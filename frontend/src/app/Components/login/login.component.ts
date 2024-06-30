import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { BackendService } from '../../_services/backend/backend.service';
import { AuthService } from '../../_services/auth/auth.service';
import Swal from 'sweetalert2'; 
import { UserService } from '../../_services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  router = inject(Router)
  backend = inject(BackendService)
  auth = inject(AuthService)
  user = inject(UserService)

  isLoginFormSubmitted: boolean = false; 

  loginForm = new FormGroup({
    username: new FormControl('', 
      [Validators.required, Validators.minLength(4), Validators.maxLength(15)]), 
    password: new FormControl('', 
      [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
  })

  onLoginSubmit(){

    this.isLoginFormSubmitted = true; 
    
    if(this.loginForm.invalid){
      // messaggio di errore 
      Swal.fire({
        icon: "error",
        title: "Non hai inserito i dati correttamente",
        showConfirmButton: false, 
        timer: 1500 
      })
    } else {
      this.backend.login({
        usr: this.loginForm.value.username as string, 
        psw: this.loginForm.value.password as string 
      }).subscribe({
        next: (response) => {
          console.log("response:", response) 
          this.auth.updateAuthStateOnLogin(response)
          this.user.updateUserOnLogin(response)
        },
        error: err => {
          // messaggio di errore 
          Swal.fire({
            icon: "error",
            title: "Credenziali non Valide",
            showConfirmButton: false, 
            timer: 1500 
          })
        }, 
        complete: () => {
          Swal.fire({
            icon: "success",
            title: "Hai effettuato il Login",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('/Home')
        }
      })
    }
  }

}
