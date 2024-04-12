
// Function to get saved recipes from localStorage
export const getSavedRecipes = () => {
  const savedRecipesJSON = localStorage.getItem('saved_recipes');
  return savedRecipesJSON ? JSON.parse(savedRecipesJSON) : [];
};

// Function to save recipes to localStorage
export const saveRecipe = (recipe) => {
  const savedRecipes = getSavedRecipes();
  const updatedRecipes = [...savedRecipes, recipe];
  localStorage.setItem('saved_recipes', JSON.stringify(updatedRecipes));
};

// Function to remove a recipe from localStorage
export const removeRecipe = (recipeId) => {
  const savedRecipes = getSavedRecipes();
  const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
  localStorage.setItem('saved_recipes', JSON.stringify(updatedRecipes));
};