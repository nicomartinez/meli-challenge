import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import CategoriesList from "../components/CategoriesList";
import ProductList from '../components/ProductList';

const ProductListPage = () => {
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

    if (!results.items) return null;

    return (
        <>
            <CategoriesList categories={results.categories} />
    
            <div className='App-results-products'>
            {results.items.map(item => (
                <ProductList key={item.id} item={item} />
            ))}
            </div>
        </>
    );
}

export default ProductListPage;