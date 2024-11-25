import { Component} from '@angular/core';
// IMPORTAMOS INTERFAZ

import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  Productosdescatacados =`
Descubre nuestra selección de productos destacados, cuidadosamente elegidos para ofrecerte lo mejor en tecnología móvil. Cada uno de estos dispositivos ha sido seleccionado por su calidad, innovación y desempeño superior. Ya sea que busques el celular más reciente con la mejor cámara, auriculares con sonido envolvente, o accesorios que complementen tu estilo de vida digital, en nuestra tienda encontrarás opciones que superarán tus expectativas. Nos enorgullece ofrecerte lo último en tecnología para mantenerte conectado y disfrutar de la mejor experiencia móvil.`
  empresa = `KILA NARA
  Mi página se trata de ventas de celulares, auriculares, teclados y mouses. Es un proyecto que valora un buen ambiente de trabajo, el cual he querido reflejar en el diseño de la página. Utilicé colores suaves y tranquilizantes para transmitir una sensación de calma y confianza. Además, estos elementos visuales están diseñados para resaltar el compromiso con un servicio de calidad y la seguridad que ofrecemos a nuestros clientes. En cada detalle, mi objetivo es demostrar que en nuestro negocio, no solo encuentras productos de alta calidad, sino también un entorno en el que puedes confiar plenamente.`



  // PROPIEDAD PÚBLICA (TIPO ARRAY)


  constructor(){

  }
  
}

