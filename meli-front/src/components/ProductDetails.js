import { formatCurrecy, showDecimals } from "../utils/utils";

const ProductDetail = ({ product }) => (
    <article className="product">
        <img className="product-img" src={product.picture} alt="Imagen del producto" />
        <div className="product-details">
            <p className="status">
                {product.condition === 'new' ? 'Nuevo' : 'Usado'} - {product.sold_quantity} vendidos
            </p>
            <h1 className="name">{product.title}</h1>
            <p className="price">
                $ {formatCurrecy(product.price.amount, product.price.currency)}
                <span className="price-decimals">{showDecimals(product.price.decimals)}</span>
            </p>

            <button className="btn-primary">Comprar</button>
        </div>
        <div className="product-description">
            <h3>Descripci&oacute;n del producto</h3>
            <p>
                {product.description}
            </p>
        </div>
    </article>
);

export default ProductDetail;