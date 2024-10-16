import { CanActivateFn } from '@angular/router';

import { inject, Inject } from '@angular/core';

import { AuthService } from '../modules/autentificacion/services/auth.service';

import { Router } from '@angular/router';
 //operadores de tipo observadores
import{map, switchMap, of , from} from 'rxjs';

export const rutaProtegidaGuard: CanActivateFn = (route, state) => {
//inyectamos / instanciamos servicio de autentificacion
  const servicioAuth = inject(AuthService); 

  //inyectamos / instanciamos servicio de rutas
  const servicioRutas = inject(Router);
 
  //especificamos el rol esperando en el guardian
  const rolEsperando = 'admin'
  return true;
};
