import { useEffect, useState } from "react";
import CategoriesList from "../components/CategoriesList";

const ProductDetail = ({ match }) => {
    const id = match.params.id;
    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/items/${id}`);
            const body = await result.json();
            setProduct(body);
        }
        fetchData();
    }, [id]);

    if (!product) return <div>Producto no encontrado</div>;

    return (
        <>
            <CategoriesList categories={product.categories} />
            <article>
                Pending details
            </article>
        </>
    );
}

export default ProductDetail;