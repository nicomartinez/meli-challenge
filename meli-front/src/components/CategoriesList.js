import React from "react";

const CategoriesList = ({ categories }) => {
    return categories && categories.length > 0 ? 
    (
        <div className='App-results-categories'>
            <ul>
            {categories.map(cat => (
                <li key={cat}>Cat {cat}</li>
            ))}
            </ul>
        </div>
    ) : null;
}

export default CategoriesList;