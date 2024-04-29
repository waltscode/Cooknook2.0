const { User, Recipe } = require('../models');

module.exports = {
  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function

  async getAllTheRecipes(req, res) {
    try {
      const recipeData = await Recipe.find();
      res.status(200).json(recipeData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getRecipeByTheId (req, res) {
    try {
      const recipeData = await Recipe.findOne({ _id: req.params.id });
      res.status(200).json(recipeData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

 
  
    async saveRecipe({ user, body }, res) {
        console.log(user);
        console.log(body);
        try {
            const recipe = await Recipe.create(body);
          const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { savedRecipes: recipe._id } },
            { new: true, runValidators: true }
          );
          return res.json(recipe);
        } catch (err) {
          console.log(err);
          return res.status(400).json(err);
        }
      },
      // remove a book from `savedBooks`
      async deleteRecipe({ user, params }, res) {
        try {
            // Delete the recipe from the database
            const deletedRecipe = await Recipe.findByIdAndDelete(params.id);
            
            // Remove the recipe ID from the user's savedRecipes array
            await User.findByIdAndUpdate(
                user._id,
                { $pull: { savedRecipes: params.id } },
                { new: true }
            );
    
            return res.json(deletedRecipe);
        } catch (error) {
            // Handle errors
            console.error('Error deleting recipe:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    };