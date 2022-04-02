import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import CategoriesList from "../components/CategoriesList";
import ProductDetail from "../components/ProductDetails";

const ProductDetailPage = () => {
    const [product, setProduct] = useState({});
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/items/${id}`);
            const body = await result.json();
            setProduct(body);
        }
        fetchData();
    }, [id]);

    if (!product.item) return null;

    document.title = `${product.item.title} - Mercado libre`

    return (
        <>
            <CategoriesList categories={product.categories} />
            <div className="App-results-detail">
                <ProductDetail product={product.item} />
            </div>
        </>
    );
}

export default ProductDetailPage;