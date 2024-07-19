import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../_services/auth/auth.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService); 
  const router = inject(Router); 

  if(authService.isAuthenticated()){
    return true; 
  } else {
    Swal.fire({
      icon: "error",
      title: "Errore", 
      text: "Non sei Loggato", 
      showConfirmButton: false, 
      showCancelButton: false, 
      timer: 1000, 
      customClass: {
        popup: 'swal2-popup',
        title: 'swal2-title',
        actions: 'swal2-actions',
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel'
      }
    })
    return router.parseUrl("/Login")
  }

};
