import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../../_services/backend/backend.service';
import { AuthService } from '../../_services/auth/auth.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  router = inject(Router)
  backend = inject(BackendService)
  auth = inject(AuthService)

  isSignUpFormSubmitted: boolean = false; 

  signUpForm = new FormGroup({
    username: new FormControl('', 
      [Validators.required, Validators.minLength(6), Validators.maxLength(15)]), 
    password: new FormControl('', 
      [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
  })


  onSignupSubmit(){

    this.isSignUpFormSubmitted = false; 
    
    if(this.signUpForm.invalid){
      // messaggio di errore 
    } else {
      this.backend.signup({
        usr: this.signUpForm.value.username as string, 
        psw: this.signUpForm.value.password as string 
      }).subscribe({
        error: err => {
          // messaggio di errore 
          Swal.fire({
            icon: "error",
            title: "Utente gia Registrato",
            text: "Effettua il Login"
          });
        }, 
        complete: () => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Ti sei Registrato con Successo",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('/Login')
        }
      })
    }

  }

}
