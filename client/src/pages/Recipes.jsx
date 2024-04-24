// import Categories from '../comps/checkbox.jsx';

import { useState } from 'react';
import React from "react";
import { Button } from '../components/ui/button'
import { saveRecipe, searchSpoonacular, searchSpoonacularById } from '../utils/API';
import { CheckboxGroup, Checkbox, image } from "@nextui-org/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion'
import { Card, CardBody, CardFooter, Image, Input } from "@nextui-org/react";
import { ScrollArea } from "../components/ui/scroll-area"
import { Separator } from "../components/ui/separator"
import { SearchIcon } from "../comps/searchIcon";
import Auth from "../utils/auth";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "../components/ui/pagination";






export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 10;



    const handleSaveRecipe = (recipe) => {
        console.log('before restructure Saving Recipe:', recipe);
        const obj = {
            recipeName: recipe.title,
            ingredients: recipe.additionalInfo.ingredients.map(ingredient => ({ ingredientName: ingredient.name, quantity: ingredient.measures.us.amount, unit: ingredient.measures.us.unitShort })),
            instructions: recipe.additionalInfo.instructions.map((instruction, index) => ({
                step: index + 1, // Assuming step numbers start from 1
                instruction: instruction,
            })),
            recipe_id: recipe.id,
            category: recipe.additionalInfo.cuisines,
            image: recipe.image,
        };
        console.log('CORRECT Saving Recipe:', obj);
        console.log('recipeName:', obj.recipeName);
        console.log('ingredients:', obj.ingredients);
        console.log('instructions:', obj.instructions);
        console.log('recipe_id:', obj.recipe_id);
        console.log('category:', obj.category);
        console.log('image:', obj.image);

        console.log('Recipe Object BEFORE SAVING:', recipe);
        // Get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            console.error('User not authenticated.');
            return;
        }

        saveRecipe(obj, token) // Pass obj instead of recipe
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(savedRecipe => {
                console.log('SAVED RECIPE BODY:', savedRecipe);
                // Do something with the saved recipe data if needed
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };


    const handleButtonClick = (cuisine) => {
        // Call the API function with the cuisine parameter
        searchSpoonacular(cuisine)
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
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                // Log the entire fetched object
                console.log('Fetched Data:', data);

                // Extract and format steps into arrays
                const instructions = data.analyzedInstructions.flatMap(instruction => {
                    return instruction.steps.map(step => step.step);
                });

                // Set the retrieved recipe information into state
                setSelectedRecipe({
                    ...recipe,
                    additionalInfo: {
                        ...data,
                        ingredients: data.extendedIngredients,
                        instructions: instructions
                    }
                });

                console.log('Ingredients:', data.extendedIngredients.map(ingredient => ingredient.name));
                console.log('Instructions:', instructions);
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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the index of the first recipe on the current page
    const indexOfFirstRecipe = (currentPage - 1) * recipesPerPage;

    // Calculate the index of the last recipe on the current page
    const indexOfLastRecipe = indexOfFirstRecipe + recipesPerPage;

    // Get the current recipes to display
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);




    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    function parseSummary(summary) {
        // Replace <b> tags with bold formatting
        let formattedSummary = summary.replace(/<\/?b>/g, '**');

        // Replace <a> tags with clickable links
        formattedSummary = formattedSummary.replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');

        // Remove all other HTML tags
        return formattedSummary.replace(/<[^>]+>/g, '');
    }


    return (
        <div className="grid grid-cols-6 gap-4">
            <div className="col-span-1">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[10rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<SearchIcon size={18} />}
                    type="search"
                />
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
                {currentRecipes.map(recipe => (
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
                  <Pagination className="col-span-3 flex justify-end items-center">
                <PaginationContent>
                <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                    </PaginationItem>
                    {[...Array(Math.ceil(recipes.length / recipesPerPage))].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink onClick={() => handlePageChange(index + 1)}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            </div>
          

            {/* Display the LargerCard component when selectedRecipe is not null */}
            {selectedRecipe && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-lg flex flex-col w-1/2">
                        {/* First Row: Established Formatting */}
                        <div className="flex justify-between mb-4">
                            {/* Image Section */}
                            <div className="w-2/4">
                                <h2 className="text-gray-600">{selectedRecipe.title}</h2>
                                <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-96" />
                                <p>{selectedRecipe.description}</p>
                            </div>
                            {/* Ingredients Section */}
                            <div className="w-1/4 ml-4">
                                <ScrollArea className="h-96 rounded-md border">
                                    <div className="p-4">
                                        <h4 className="mb-4 text-sm font-medium leading-none text-gray-600">Ingredients</h4>
                                        <ul className="list-disc pl-4">
                                            {selectedRecipe.additionalInfo && selectedRecipe.additionalInfo.extendedIngredients.map((ingredient, index) => (
                                                <React.Fragment key={ingredient.id}>
                                                    <li className="text-sm text-left text-gray-600">
                                                        {capitalizeFirstLetter(ingredient.originalName)} - {ingredient.measures.us.amount} {ingredient.measures.us.unitShort}
                                                    </li>
                                                    {index !== selectedRecipe.additionalInfo.extendedIngredients.length - 1 && <Separator className="my-2" />}
                                                </React.Fragment>
                                            ))}
                                        </ul>
                                    </div>
                                </ScrollArea>
                            </div>
                            {/* Instructions Section */}
                            <div className="w-1/4 ml-4">
                                <ScrollArea className="h-96 rounded-md border mb-4">
                                    <div className="p-4">
                                        <h4 className="mb-4 text-sm font-medium leading-none text-gray-600">Instructions</h4>
                                        <ol className="list-decimal pl-4">
                                            {selectedRecipe.additionalInfo && Array.isArray(selectedRecipe.additionalInfo.instructions) &&
                                                selectedRecipe.additionalInfo.instructions.map((instruction, index) => (
                                                    <React.Fragment key={index}>
                                                        {Array.isArray(instruction) ? (
                                                            instruction.map((step, stepIndex) => (
                                                                <li className="text-sm text-left text-gray-600" key={stepIndex}>
                                                                    <span className="font-bold">{stepIndex + 1}.</span> {step}
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li className="text-sm text-left text-gray-600">
                                                                {instruction}
                                                            </li>
                                                        )}
                                                        {index !== selectedRecipe.additionalInfo.instructions.length - 1 && <Separator className="my-2" />}
                                                    </React.Fragment>
                                                ))
                                            }
                                        </ol>
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                        {/* Second Row: Instructions and Additional Paragraph */}
                        <div className="mb-4">

                            {/* Additional Paragraph */}
                            <h4 className="mt-8 mb-4 text-sm font-medium leading-none text-gray-600">Summary</h4>
                            <p className='text-gray-600'>{selectedRecipe.additionalInfo && parseSummary(selectedRecipe.additionalInfo.summary)}</p>
                        </div>
                        {/* Close Button */}
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={() => {
                            console.log("SELECTED RECIPE", selectedRecipe);
                            handleSaveRecipe(selectedRecipe);
                        }}>Save</Button>

                    </div>
                </div>
            )}

        </div>
    );
}


/* Additional information
                           {selectedRecipe.additionalInfo && (
                               <div>
                                   <p>Preparation Time: {selectedRecipe.additionalInfo.preparationTime}</p>
                                   <p>Servings: {selectedRecipe.additionalInfo.servings}</p>
                                   {/* Add more details as needed */
/* </div> */
/* )} */