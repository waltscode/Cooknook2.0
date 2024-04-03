const router = require('express').Router(); 
const {saveRecipe, deleteRecipe} = require('../../controllers/recipeControllers');
const { authMiddleware } = require('../../utils/auth');

router.route('/').post(authMiddleware, saveRecipe);
router.route('/:id').delete(authMiddleware, deleteRecipe);







module.exports = router;