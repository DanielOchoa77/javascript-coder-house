export class Producto{
    constructor(productoRecibidoPorParametro){
        const { id , precio , nombre, promo, precioPromo, recomendado,img} = productoRecibidoPorParametro;
       this.id = id;
       this.precio = precio;
       this.nombre = nombre;
       this.promo  = promo;
       this.precioPromo = precioPromo;
       this.recomendado = recomendado;
       this.img = img;

    }
}

/*export function inicializarProductos(arrayDeProductos) {
    arrayDeProductos.push(new Producto({
        id:arrayDeProductos.length +1,
        precio:284.361,
        nombre:"ADIDAS NEBZED CLOUDFOAM",
        promo:false,
        precioPromo:284.361,
        recomendado:false,
        img:"./assets/img/tenis1.avif"
    }));

    arrayDeProductos.push(new Producto({
        id:arrayDeProductos.length +1,
        precio:459.952,
        nombre:"ADIDAS TOP TEN RB",
        promo:true,
        precioPromo:271.371,
        recomendado:true,
        img:"./assets/img/tenis2.avif"
    }));

    arrayDeProductos.push(new Producto({
        id:arrayDeProductos.length +1,
        precio:379.952,
        nombre:"ADIDAS EQ19 RUN",
        promo:true,
        precioPromo:279.955,
        recomendado:false,
        img:"./assets/img/tenis3.avif"
    }));

    arrayDeProductos.push(new Producto({
        id:arrayDeProductos.length +1,
        precio:329.952,
        nombre:"ADIDAS QT RACER 3.0",
        promo:true,
        precioPromo:194.671,
        recomendado:true,
        img:"./assets/img/tenis4.avif"
    }));

    arrayDeProductos.push(new Producto({
        id:arrayDeProductos.length +1,
        precio:594.999,
        nombre:"Nike Court Vision",
        promo:true,
        precioPromo:475.992,    
        recomendado:false,
        img:"./assets/img/tenis5.jfif"
    }));

    arrayDeProductos.push(new Producto({
        id:arrayDeProductos.length +1,
        precio:569.999,
        nombre:"Running Renew Run 3",
        promo:false,
        precioPromo:569.999,    
        recomendado:false,
        img:"./assets/img/tenis6.jfif"
    }));

    arrayDeProductos.push(new Producto({
        id:arrayDeProductos.length +1,
        precio:619.999,
        nombre:"Jordan Series Es",
        promo:true,
        precioPromo:495.992,    
        recomendado:true,
        img:"./assets/img/tenis7.jfif"
    }));

    arrayDeProductos.push(new Producto({
        id:arrayDeProductos.length +1,
        precio:919.999,
        nombre:"Air Max 90",
        promo:true,
        precioPromo:735.992,    
        recomendado:true,
        img:"./assets/img/tenis8.jfif"
    }));
}
*/
export const agregarAlCarrito = (carrito, producto) => {
    carrito.push(producto)
}

export const eliminarDelCarrito = (carrito, producto) => {
    carrito = carrito.filter(prod => prod.id != producto.id);
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


export const CANTIDAD_MAXIMA_DEL_CARRITO = 10;
