const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema(
    {
        ingredientName: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id:false
    }
);

const instructionSchema = new Schema(
    {
        step: {
            type: Number,
            required: true,
        },
        instruction: {
            type: String,
            required: true,
        },

    },
    {
        toJSON: {
            virtuals: true,
        },
        id:false
    }
);
const recipeSchema = new Schema(

    {
        recipeName: {
            type: String,
            required: true,
        },
        ingredients: [ingredientSchema],

        instructions: [instructionSchema],

        category: {
            type: String,
            required: true,
        },
        recipe_id: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },

        
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'comment',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id:false
    }
);

recipeSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

const Recipe = model('recipe', recipeSchema);
module.exports = Recipe;