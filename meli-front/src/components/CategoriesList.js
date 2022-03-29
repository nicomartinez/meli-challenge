import React from "react";

const CategoriesList = ({ categories }) => (
    <div className='App-results-categories'>
        <ul>
        {categories.map(cat => (
            <li key={cat}>Cat {cat}</li>
        ))}
        </ul>
    </div>
);

export default CategoriesList;