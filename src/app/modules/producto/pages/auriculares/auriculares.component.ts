import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
@Component({
  selector: 'app-auriculares',
  templateUrl: './auriculares.component.html',
  styleUrls: ['./auriculares.component.css']
})
export class AuricularesComponent {
  public info: Producto[];

  constructor() {
    this.info = [
      {
        idProducto: "",
        Nombre: "JBL Wave 100TWS",
        Precio: 40,
        Descripcion: "Los JBL Wave 100TWS son auriculares inalámbricos compactos y ligeros, diseñados para ofrecer una experiencia de sonido envolvente con la calidad característica de JBL. Vienen con una carcasa de carga compacta que facilita su transporte y carga. Los auriculares tienen un diseño ergonómico que se adapta cómodamente al oído, proporcionando un ajuste seguro y cómodo. Son ideales para el uso diario, ya sea en desplazamientos, durante el ejercicio, o en el trabajo.",
        Categoria: "Auriculares Inalámbricos",
        Imagen: "./assets/cardsauriculares/a.inalm1.png",
        Alt: "auriculares",
      },
      {
        idProducto: "",
        Nombre: " AirPods Genéricos con Estuche de Carga",
        Precio: 20,
        Descripcion: "Estos auriculares inalámbricos tienen un diseño inspirado en los AirPods de Apple, pero con un acabado en color negro mate que les da un aspecto elegante y moderno. Vienen con un estuche de carga que facilita su transporte y asegura que siempre estén listos para usar. Ofrecen una experiencia auditiva cómoda y se conectan fácilmente con dispositivos a través de Bluetooth, siendo ideales para quienes buscan una alternativa económica sin comprometer el estilo.",
        Categoria: "Auriculares Inalámbricos",
        Imagen: "./assets/cardsauriculares/a.inalm2.png",
        Alt: "auriculares",
      },
      {
        idProducto: "",
        Nombre: "JBL TUNE 230NC TWS",
        Precio: 70,
        Descripcion: "Los JBL TUNE 230NC TWS son auriculares inalámbricos con cancelación de ruido activa, diseñados para ofrecer una experiencia auditiva inmersiva con la reconocida calidad de sonido JBL. Tienen un diseño elegante en color rosa metálico, con un ajuste cómodo y seguro para un uso prolongado. El estuche de carga compacta permite una recarga rápida y portátil, asegurando que los auriculares estén siempre listos para su uso. Son ideales para quienes buscan un dispositivo que combine estilo, comodidad y funcionalidad avanzada.",
        Categoria: "Auriculares Inalámbricos",
        Imagen: "./assets/cardsauriculares/a.inalm3.png",
        Alt: "auriculares",
      },
      {
        idProducto: "",
        Nombre: "",
        Precio: 0,
        Descripcion: "",
        Categoria: "",
        Imagen: "./assets/cardsauriculares/a.inalm4.png",
        Alt: "",
      },
      {
        idProducto: "",
        Nombre: "",
        Precio: 0,
        Descripcion: "",
        Categoria: "",
        Imagen: "./assets/cardsauriculares/a.inalm5.png",
        Alt: "",
      },
      {
        idProducto: "",
        Nombre: "",
        Precio: 0,
        Descripcion: "",
        Categoria: "",
        Imagen: "./assets/cardsauriculares/a.inalm6.png",
        Alt: "",
      }
    ]
  }
}
