import React from "react";

const CategoriesList = ({ categories }) => {
    return categories && categories.length > 0 ? 
    (
        <div className='App-results-categories'>
            <ul>
            {categories.map(category => (
                <li key={category.id}>{category.name}</li>
            ))}
            </ul>
        </div>
    ) : null;
}

export default CategoriesList;