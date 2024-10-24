import { CanActivateFn } from '@angular/router';

import { inject} from '@angular/core';

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
  const rolEsperado = 'admin';

  return from(servicioAuth.obtenerUid()).pipe(
    switchMap(uid=>{
      if(uid){
        return servicioAuth.ObtenerRol(uid).pipe(
          map(rol=>{
            if(rol === rolEsperado){
              //si obtiene el rol esperado, habilita el acceso al usuario
              console.log("usuario verificado como administrador");
              return true;
            }else{
              //caso contrario, denega el acceso
              return false;
            }
          })
        )
      }else{

        //ej: no esta registrado o es visitante
        console.log("el usuario no esta validado, tiene permisos insuficientes");


        //redirreciona a inicio de pagina para usuarios no validados o sin permisos de admin
        return of(servicioRutas.createUrlTree(["/inicio"]))
      }
    })
  )

};
