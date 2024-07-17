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
      text: "Non sei Loggato", 
      showConfirmButton: false, 
      timer: 1000
    })
    return router.parseUrl("/Login")
  }

};
