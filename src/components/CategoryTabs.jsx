import React from 'react';
import { CATEGORIES } from '../data/mockData';

const CategoryTabs = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="category-tabs" aria-label="Video Categories">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`category-tab ${activeCategory === category ? 'active' : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
