import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrecy, showDecimals } from '../utils/utils';
import freeShipping from '../assets/ic_shipping.png';

const ProductList = ({ item }) => {
    const detail = `/item/${item.id}`;

    return (
        <Link to={detail} className="link-decoration">
            <article className='product'>
                <img className='product-image' alt="Imagen de producto" src={item.picture}/>
                <div className='product-details'>
                    <p className="d-flex w-100">
                        {formatCurrecy(item.price.amount, item.price.currency)}
                        <span className="price-decimals">{showDecimals(item.price.decimals)}</span>
                        {item.free_shipping && <span className='shipping'><img className='shipping-available' alt="envio disponible" src={freeShipping}/></span>}
                        <span className="location">Prueba</span>
                    </p>
                    <p className='product-name'>{item.title}</p>
                </div>
                <span className="separator w-100"></span>
            </article>
        </Link>);
}

export default ProductList;