import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { getMe, getAllRecipes} from '../utils/API';
import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";




export default function Profile() {


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
                console.log(data);
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
                })
                .catch(error => {
                    // Handle errors
                    console.error('There was a problem with the fetch operation:', error);
                });
        };
    

    return (

        <div className="grid grid-cols-3 gap-4">
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