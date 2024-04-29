import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { getMe, getAllRecipes, getRecipeById, deleteTheRecipe } from '../utils/API';
import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";




export default function Profile() {

    const [fetchedRecipes, setFetchedRecipes] = useState([]);
    const [userData, setUserData] = useState({
        email: "",
        password: "",

    });


    console.log(userData)

    const navigate = useNavigate();

    useEffect(() => {
        getMe(Auth.getToken())
            .then(response => response.json())
            .then(data => {
                console.log('GET ME', data);
                setUserData(data);
            })
            .catch(err => {
                console.error(err);
                navigate('/login');
            });
    }
        , []);

    const handleAllRecipes = () => {
        getAllRecipes()
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Set the retrieved recipes into state
                console.log('All Recipes:', data);

                data.forEach(recipe => {
                    console.log(recipe.recipeName);
                });
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const fetchRecipesByIds = async () => {
        try {
            // Check if userData exists
            if (!userData) {
                // Handle if userData is not available
                return;
            }
            const recipes = [];
            // Iterate over savedRecipes array
            for (const recipeId of userData.savedRecipes) {
                // Fetch recipe by ID
                const response = await getRecipeById(recipeId);
                if (response.ok) {
                    // Parse and use the recipe data
                    const recipeData = await response.json();
                    console.log('RECIPES FULL:', recipeData);
                    console.log('RECIPESS NAME:', recipeData.recipeName);
                    recipes.push(recipeData);
                    // You can set the recipe data in state or use it as needed
                } else {
                    throw new Error('Failed to fetch recipe');
                }
            }
            setFetchedRecipes(recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    const handleDeleteRecipe = (recipe) => {
        console.log('Recipe to delete:', recipe);
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            console.error('No token found');
            return;
        }
        deleteTheRecipe(recipe, token) // Passing recipe._id instead of recipe
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('Recipe deleted:', data);
                // Remove the deleted recipe from the fetchedRecipes state
                const updatedRecipes = fetchedRecipes.filter(recipe => recipe._id !== data._id);
                setFetchedRecipes(updatedRecipes);
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the fetch operation:', error);
            });
    };

        


    return (

        <div className="grid grid-cols-3 gap-4 backgrpic-ta">
            <div className="col-span-1">
                <Card>
                    <div className="profile-card">
                        <div className="profile-picture">
                            <img src="/images/happyshmock.jpg" alt="Profile Picture" />
                        </div>
                    </div>
                </Card>
            </div>

            <div className="col-span-2">
                <Card>
                    <div className="profile-info">
                        <h2>Welcome {userData.username}!</h2>
                        <p>Email associated with account: {userData.email}</p>
                    </div>

                    <CardContent>
                        <h2>My Recipes</h2>
                        <ul>
                            {userData.savedRecipes && userData.savedRecipes.map((recipe, index) => (
                                <li key={index}>{recipe}</li>
                            ))}

                        </ul>
                        <button onClick={handleAllRecipes}>All Recipes</button>

                        <button onClick={fetchRecipesByIds}>Fetch My Recipes</button>
                        {/* Display fetched recipes */}
                        <h2>Fetched Recipes</h2>
                        <ul>
                            {fetchedRecipes.map((recipe, index) => (
                                <li key={index}>{recipe.recipeName}
                                <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button></li>
                            ))}
                        </ul>




                    </CardContent>
                </Card>
            </div>
        </div>



    )
}


{/* <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Name of your project" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">Framework</Label>
                                <Select>
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="next">Next.js</SelectItem>
                                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                        <SelectItem value="astro">Astro</SelectItem>
                                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                </CardFooter>
            </Card> */}