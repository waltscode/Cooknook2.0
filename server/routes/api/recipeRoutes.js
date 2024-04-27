const router = require('express').Router(); 
const { saveRecipe, deleteRecipe, getAllTheRecipes, getRecipeByTheId } = require('../../controllers/recipeControllers');
const { authMiddleware } = require('../../utils/auth');

require('dotenv').config();

// Route for the root path '/'
router.route('/').delete(authMiddleware, deleteRecipe);

router.route('/saved')
.post(authMiddleware, saveRecipe).get(getAllTheRecipes);

  router.route('/cuisine/:cuisine')
  .get(async (req, res) => {
    try {
      const apiKey = process.env.SPOONACULAR_API_KEY;
      const { cuisine, query } = req.params;
      const spoonacularUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${cuisine}&number=50`;
      const response = await fetch(spoonacularUrl);
      const data = await response.json();
      console.log(data);
      res.json(data);
    } catch (error) {
      console.error('Error fetching recipes from Spoonacular:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.route('/:id')
.get(async (req, res) => {
  try {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    const { id } = req.params;
    const spoonacularUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    const response = await fetch(spoonacularUrl);
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching recipe from Spoonacular:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);








router.route('/saved/:id')
  .delete(authMiddleware, deleteRecipe).get(getRecipeByTheId);

module.exports = router;