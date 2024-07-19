import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../../_services/backend/backend.service';
import { AuthService } from '../../_services/auth/auth.service';
import Swal from 'sweetalert2'; 
import { UserService } from '../../_services/user/user.service';

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
  user = inject(UserService)

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
            title: "Errore nella Registrazione", 
            text: err?.error?.message,
            timer: 1500,
            customClass: {
              popup: 'swal2-popup',
              title: 'swal2-title',
              actions: 'swal2-actions',
              confirmButton: 'swal2-confirm',
              cancelButton: 'swal2-cancel'
            }
          });
        }, 
        complete: () => {
          Swal.fire({
            icon: "success",
            title: "Ti sei Registrato",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'swal2-popup',
              title: 'swal2-title',
              actions: 'swal2-actions',
              confirmButton: 'swal2-confirm',
              cancelButton: 'swal2-cancel'
            }
          });
          this.loginAfterRegistration(); 
        }
      })
    }
  }

  loginAfterRegistration(){
    this.backend.login({
      usr: this.signUpForm.value.username as string, 
      psw: this.signUpForm.value.password as string 
    }).subscribe({
      next: (response) => {
        this.auth.updateAuthStateOnLogin(response)
        this.user.updateUserOnLogin(response)
      },
      error: err => {
        // messaggio di errore 
        Swal.fire({
          icon: "error",
          title: "Riprova ad Accedere",
          text: err?.error?.message, 
          showConfirmButton: false, 
          timer: 1500,
          customClass: {
            popup: 'swal2-popup',
            title: 'swal2-title',
            actions: 'swal2-actions',
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel'
          }
        })
      }, 
      complete: () => {
        this.router.navigateByUrl('/Home')
      }
    })
  }

}
