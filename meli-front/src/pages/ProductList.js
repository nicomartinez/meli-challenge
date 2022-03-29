import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import CategoriesList from "../components/CategoriesList";

const ProductList = () => {
    const [results, setResults] = useState({});
    const [params] = useSearchParams();
    const query = params.get('search');

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/items?q=${query}`);
            const body = await result.json();
            setResults(body);
        }
        fetchData();
    }, [query]);

    if (!results.products) return <div>No se encontraron resultados para la busqueda</div>;

    return (
        <>
            <CategoriesList categories={results.categories} />
    
            <div className='App-results-products'>
            {results.products.map(product => (
                <article className='product'>
                <img className='product-image' alt="Imagen de producto"/>
                <div className='product-details'>
                    <p>$ 1.900<span className='envio'><img className='shipping-available' alt="envio disponible"/></span></p>
                    <p className='product-name'>nombre producto</p>
                </div>
                </article>  
            ))}
            </div>
        </>
    );
}

export default ProductList;