import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../components/ui/carousel"
import { ScrollArea } from "../components/ui/scroll-area"
import { Separator } from "../components/ui/separator"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../components/ui/resizable"
import { Image } from "@nextui-org/react";
import PushCards from "../comps/push-cards";
import {AvatarPic} from "../comps/avatar";
import React from "react";


const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function Profile() {

    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Card className="w-[350px]">
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
            </Card>
            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <ScrollArea className="h-72 w-48 rounded-md border">
                <div className="p-4">
                    <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                    {tags.map((tag) => (
                        <>
                            <div key={tag} className="text-sm">
                                {tag}
                            </div>
                            <Separator className="my-2" />
                        </>
                    ))}
                </div>
            </ScrollArea>
            <ResizablePanelGroup
                direction="horizontal"
                className="max-w-md rounded-lg border"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="flex h-[200px] items-center justify-center p-6">
                        <span className="font-semibold">One</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={25}>
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Two</span>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={75}>
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Three</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
            <Image
                isZoomed
                width={240}
                alt="NextUI Fruit Image with Zoom"
                src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
            />
         
<AvatarPic className='recipe-ava' />

        </div>
    )
}
