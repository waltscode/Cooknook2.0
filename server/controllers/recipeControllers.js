const { User, Recipe } = require('../models');

module.exports = {
  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
    async saveRecipe({ user, body }, res) {
        console.log(user);
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
        const recipe = await recipe.findOneAndDelete({
            _id: params.id,
          });
  
          await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedRecipes: recipe._id } },
            { new: true }
          );
        
      
        return res.json(recipe);
      },

    };