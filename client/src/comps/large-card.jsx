import React from 'react';

function LargeCard({ recipe, onClose }) {
  function handleClose() {
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg">
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} className="w-full" />
        {/* Display more information about the recipe */}
        <p>{recipe.description}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default LargeCard;