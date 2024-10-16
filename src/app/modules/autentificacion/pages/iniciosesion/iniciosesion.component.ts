import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  hide = true;

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }

  // ############################# INGRESADO
  // Definimos la interfaz de usuario
  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  // Función para iniciar sesión
  async iniciarSesion() {
    // Recibe la información ingresada desde el navegador
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }

    try {
      // obtenemos usuario de la BD
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);


      //condicional verificada que ese usuario de la BD existiera o que sea igual al de nuestra collecion
      if (!usuarioBD || usuarioBD.empty) {
        Swal.fire({
          title: "mal ahi!",
          text: "correo electronico incorrecto!",
          icon: "error"
        });

        this.limpiarInputs();
        return;
      }


      //vinculaba al primr documento que se obtenia desde la BD
      const usuarioDoc = usuarioBD.docs[0];

      //extrae los datos del documento de forma del "objeto" y se especifica que va a ser de tipo "usuario" (se refiere a la interfaz de usuario de nuetros modelos)
      const usuarioData = usuarioDoc.data() as Usuario;

      //encripta la contraseña que el usuario envia mediante "iniciar sesion"
      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

      //condicional que compara la contraseña que acabamos de encriptar y que el usuario envio con la que recibimos "usuarioDAta"
      if (hashedPassword !== usuarioData.password) {

        this.usuarios.password = '';
        return;
      }

     const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
        .then(res => {
          Swal.fire({
            title: "bien!",
            text: "contraseña correcta!",
            icon: "success"
          });


          //almacena el rol de usuario en el servicio autentificacion
          this.servicioAuth.enviarRolUsuario(usuarioData.rol);

          if(usuarioData.rol === "admin"){
            console.log("inicio de sesion de usuario administrador")

            //si es admin, redirecciona a la vista de 'admin'
            this.servicioRutas.navigate(['/inicio']);
          }else{
            console.log("inicio de sesion de usuario visitante");

            //si eres visitante, redirecciona a la vista de 'inicio'
            this.servicioRutas.navigate(['/inicio']);
          }


  
        })
        .catch(err => {
          alert('Hubo un problema al iniciar sesión :( ' + err);

          this.limpiarInputs();
        }) 
    } catch(error){
      this.limpiarInputs();
    }
  }

  limpiarInputs() {
    const inputs = {
      email: this.usuarios.email = '',
      password: this.usuarios.password = ''
    }
  }
}
