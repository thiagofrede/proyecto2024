import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
@Component({
  selector: 'app-teclados',
  templateUrl: './teclados.component.html',
  styleUrls: ['./teclados.component.css']
})
export class TecladosComponent {
  public info: Producto[];

  constructor() {
    this.info = [
      {
        idProducto: "",
        Nombre: "Teclado Mecánico Edición Dragón Retroiluminado ",
        Precio: 40,
        Descripcion: "El Teclado Mecánico Edición Dragón Retroiluminado combina funcionalidad y estilo con teclas en inglés y chino, iluminación LED púrpura, y un diseño único con un dragón. Perfecto para uso diario y gaming.",
        Categoria: "teclados",
        Imagen: "./assets/cardsteclados/teclados6.png",
        Alt: "teclados",
      },
      {
        idProducto: "",
        Nombre: " Aurora Custom 75",
        Precio: 20,
        Descripcion: "Un teclado mecánico con un esquema de color personalizado, utilizando keycaps en tonos morados y verdes. El cable parece ser trenzado y de color morado, con un conector verde, lo que sugiere que es un teclado personalizado, probablemente un teclado 65% o 75%, más compacto.",
        Categoria: "teclados",
        Imagen: "./assets/cardsteclados/teclados2.png",
        Alt: "teclados",
      },
      {
        idProducto: "",
        Nombre: "ShadowStrike MKII",
        Precio: 70,
        Descripcion: "Un teclado mecánico con keycaps en blanco y negro, también con retroiluminación morada. Parece tener un diseño más limpio y minimalista, con las teclas de función resaltadas en color blanco.",
        Categoria: "teclados",
        Imagen: "./assets/cardsteclados/teclados3.png",
        Alt: "teclados",
      },
      {
        idProducto: "",
        Nombre: "The violet 56",
        Precio: 80,
        Descripcion: "Un teclado mecánico con retroiluminación morada, que parece ser de tamaño completo (full-size) con un controlador de Xbox. Las teclas parecen ser de perfil alto, y la retroiluminación morada es fuerte.",
        Categoria: "teclados",
        Imagen: "./assets/cardsteclados/teclados4.png",
        Alt: "teclados",
      },
      {
        idProducto: "",
        Nombre: "Lazer T28",
        Precio: 90,
        Descripcion: "Un teclado mecánico con retroiluminación morada, que parece ser de tamaño completo (full-size) con un controlador de Xbox. Las teclas parecen ser de perfil alto, y la retroiluminación morada es fuerte.",
        Categoria: "teclados",
        Imagen: "./assets/cardsteclados/teclados5.png",
        Alt: "teclados",
      },
      {
        idProducto: "",
        Nombre: "Lumina Pro X1",
        Precio: 100,
        Descripcion: "Un teclado mecánico con retroiluminación morada, que parece ser de tamaño completo (full-size) con un controlador de Xbox. Las teclas parecen ser de perfil alto, y la retroiluminación morada es fuerte.",
        Categoria: "teclados",
        Imagen: "./assets/cardsteclados/teclados.png",
        Alt: "teclados",
      }
    ]
  }
}
