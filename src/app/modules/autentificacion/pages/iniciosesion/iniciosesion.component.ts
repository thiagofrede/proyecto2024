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
  // ############################# LOCAL
  // Definimos colección local de usuarios
  /*
  public coleccionUsuariosLocales: Usuario[];

  constructor(){
    this.coleccionUsuariosLocales = [
      {
        uid: '',
        nombre: 'Santiago',
        apellido: 'Nuñez',
        email: 'santinuñez@gmail.com',
        rol: 'admin',
        password: '123456'
      },
      {
        uid: '',
        nombre: 'Juan',
        apellido: 'Perez',
        email: 'juanperez@gmail.com',
        rol: 'vis',
        password: 'abc123'
      },
      {
        uid: '',
        nombre: 'Thalia',
        apellido: 'Rosales',
        email: 'thaliarosales@gmail.com',
        rol: 'vis',
        password: 'abcdef'
      }
    ]
  }*/
  // ############################# FIN LOCAL

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
    /*
    const credenciales = {
      uid: this.usuarios.uid,
      nombre: this.usuarios.nombre,
      apellido: this.usuarios.apellido,
      email: this.usuarios.email,
      rol: this.usuarios.rol,
      password: this.usuarios.password
    

    // Repetitiva para recorrer la colección de usuarios locales
    for(let i = 0; i < this.coleccionUsuariosLocales.length; i++){
      // usuarioLocal corresponde a esa posición en específico
      const usuarioLocal = this.coleccionUsuariosLocales[i];

      // Condicional para verificar la existencia del usuario ingresado
      if(usuarioLocal.nombre === credenciales.nombre && 
        usuarioLocal.apellido === credenciales.apellido && 
        usuarioLocal.email === credenciales.email && 
        usuarioLocal.rol === credenciales.rol && 
        usuarioLocal.password === credenciales.password){
          // Notificamos al usuario que pudo ingresar
          alert("¡Ingresaste con éxito! :)");
          // Paramos a la función
          break;
        } else {
          alert("Ocurrió un problema al iniciar sesión :(");
          break;
        }
    }*/

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
        Swal.fire({
          title: "mal ahi!",
          text: "contraseña incorrecta!",
          icon: "error"
        });

        this.usuarios.password = '';
        return;
      }

      const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
        .then(res => {
          alert('¡Se pudo ingresar con éxito :)!');

          this.servicioRutas.navigate(['/inicio']);
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
