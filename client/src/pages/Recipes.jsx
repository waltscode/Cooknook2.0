// import Categories from '../comps/checkbox.jsx';
import PushCards from "../comps/push-cards";
import { Cara } from "../comps/carousel";
import { useState } from 'react';
import React from "react";
import { Button } from '../components/ui/button'
import { searchSpoonacular } from '../utils/API'
import { searchSpoonacularById } from '../utils/API'
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion'
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";







export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const handleButtonClick = (cuisine) => {
        // Call the API function with the cuisine parameter
        searchSpoonacular("", cuisine)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Set the retrieved recipes into state
                setRecipes(data.results);
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    // Function to handle the click event for the recipe cards
    const handleClick = (recipe) => {
        setSelectedRecipe(recipe);
        console.log('CLICKED');
        searchSpoonacularById(recipe.id)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Set the retrieved recipe information into state
                setSelectedRecipe({ ...recipe, additionalInfo: data });
                console.log('spoonID response', data);
                const ingredients = data.extendedIngredients.map(ingredient => ingredient.name);
                console.log('Ingredients:', ingredients);
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the fetch operation:', error);
            });
    };


    // Function to close the larger card
    const handleClose = () => {
        setSelectedRecipe(null);
    };

    return (
        <div className="grid grid-cols-6 gap-4">
            <div className="col-span-1">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>American Cuisine</AccordionTrigger>
                        <AccordionContent>
                            <CheckboxGroup>
                                <Checkbox value="american" onClick={() => handleButtonClick("american")}>American</Checkbox>
                                <Checkbox value="cajun" onClick={() => handleButtonClick("cajun")}>Cajun</Checkbox>
                            </CheckboxGroup>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Asian Cuisine</AccordionTrigger>
                        <AccordionContent>
                            <CheckboxGroup>
                                <Checkbox value="chinese" onClick={() => handleButtonClick("chinese")}>Chinese</Checkbox>
                                <Checkbox value="indian" onClick={() => handleButtonClick("indian")}>Indian</Checkbox>
                                <Checkbox value="japanese" onClick={() => handleButtonClick("japanese")}>Japanese</Checkbox>
                                <Checkbox value="korean" onClick={() => handleButtonClick("korean")}>Korean</Checkbox>
                                <Checkbox value="thai" onClick={() => handleButtonClick("thai")}>Thai</Checkbox>
                                <Checkbox value="vietnamese" onClick={() => handleButtonClick("vietnamese")}>Vietnamese</Checkbox>

                            </CheckboxGroup>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>European Cuisine</AccordionTrigger>
                        <AccordionContent>
                            <CheckboxGroup>
                                <Checkbox value="british" onClick={() => handleButtonClick("british")}>British</Checkbox>
                                <Checkbox value="eastern-european" onClick={() => handleButtonClick("eastern-european")}>Eastern European</Checkbox>
                                <Checkbox value="french" onClick={() => handleButtonClick("french")}>French</Checkbox>
                                <Checkbox value="german" onClick={() => handleButtonClick("german")}>German</Checkbox>
                                <Checkbox value="greek" onClick={() => handleButtonClick("greek")}>Greek</Checkbox>
                                <Checkbox value="italian" onClick={() => handleButtonClick("italian")}>Italian</Checkbox>
                                <Checkbox value="nordic" onClick={() => handleButtonClick("nordic")}>Nordic</Checkbox>
                                <Checkbox value="spanish" onClick={() => handleButtonClick("spanish")}>Spanish</Checkbox>
                            </CheckboxGroup>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Other Regional Cuisines</AccordionTrigger>
                        <AccordionContent>
                            <CheckboxGroup>
                                <Checkbox value="african" onClick={() => handleButtonClick("african")}>African</Checkbox>
                                <Checkbox value="caribbean" onClick={() => handleButtonClick("caribbean")}>Caribbean</Checkbox>
                                <Checkbox value="latin-american" onClick={() => handleButtonClick("latin-american")}>Latin American</Checkbox>
                                <Checkbox value="mediterranean" onClick={() => handleButtonClick("mediterranean")}>Mediterranean</Checkbox>
                                <Checkbox value="middle-eastern" onClick={() => handleButtonClick("middle-eastern")}>Middle Eastern</Checkbox>
                                <Checkbox value="mexican" onClick={() => handleButtonClick("mexican")}>Mexican</Checkbox>
                            </CheckboxGroup>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Display the retrieved recipes */}
            {/* Recipe cards column */}
            <div className="col-span-5 grid grid-cols-5 gap-4">
                {/* Display the retrieved recipes */}
                {recipes.map(recipe => (
                    <div key={recipe.id} onClick={() => handleClick(recipe)}> {/* Add onClick event to the recipe card */}
                        <Card shadow="sm" isPressable onPress={() => handleClick(recipe)} isFooterBlurred radius="lg" className="border-none">
                            <CardBody className="overflow-visible p-0">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={recipe.title}
                                    className="w-full object-cover h-[140px]"
                                    src={recipe.image}
                                />
                            </CardBody>
                            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                <b>{recipe.title}</b>
                                {/* You can replace recipe.price with any other property you want to display */}
                                {/* <p className="text-tiny text-white/80">{recipe.price}</p> */}
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Display the LargerCard component when selectedRecipe is not null */}
            {selectedRecipe && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-lg">
                        <h2>{selectedRecipe.title}</h2>
                        <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full" />
                        <p>{selectedRecipe.description}</p>
                        {/* Ingredients */}
                        {selectedRecipe.additionalInfo && (
                            <div>
                                <h3>Ingredients:</h3>
                                <ul>
                                    {selectedRecipe.additionalInfo.extendedIngredients.map(ingredient => (
                                        <li key={ingredient.id}>{ingredient.originalName} </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {/* Additional information */}
                        {selectedRecipe.additionalInfo && (
                            <div>
                                <p>Preparation Time: {selectedRecipe.additionalInfo.preparationTime}</p>
                                <p>Servings: {selectedRecipe.additionalInfo.servings}</p>
                                {/* Add more details as needed */}
                            </div>
                        )}
                        <button onClick={handleClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}