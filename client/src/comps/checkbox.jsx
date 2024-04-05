import React from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion'

export default function Categories() {
    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>American Cuisine</AccordionTrigger>
                    <AccordionContent>
                        <CheckboxGroup >
                            <Checkbox value="american">American</Checkbox>
                            <Checkbox value="brazilian">Brazilian</Checkbox>
                            <Checkbox value="columbian">Columbian</Checkbox>
                            <Checkbox value="mexican">Mexican</Checkbox>
                        </CheckboxGroup>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Asian Cuisine</AccordionTrigger>
                    <AccordionContent>
                        <CheckboxGroup >
                            <Checkbox value="chinese">Chinese</Checkbox>
                            <Checkbox value="indian">Indian</Checkbox>
                            <Checkbox value="japanese">Japanese</Checkbox>
                            <Checkbox value="korean">Korean</Checkbox>
                            <Checkbox value="thai">Thai</Checkbox>
                            <Checkbox value="vietnamese">Vietnamese</Checkbox>
                        </CheckboxGroup>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>European Cuisine</AccordionTrigger>
                    <AccordionContent>
                        <CheckboxGroup >
                            <Checkbox value="british">British</Checkbox>
                            <Checkbox value="french">French</Checkbox>
                            <Checkbox value="german">German</Checkbox>
                            <Checkbox value="greek">Greek</Checkbox>
                            <Checkbox value="irish">Irish</Checkbox>
                            <Checkbox value="italian">Italian</Checkbox>
                            <Checkbox value="spanish">Spanish</Checkbox>
                        </CheckboxGroup>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Other Regional Cuisines</AccordionTrigger>
                    <AccordionContent>
                        <CheckboxGroup >
                            <Checkbox value="african">African</Checkbox>
                            <Checkbox value="australian">Australian</Checkbox>
                            <Checkbox value="caribbean">Caribbean</Checkbox>
                            <Checkbox value="mediterranean">Mediterranean</Checkbox>
                            <Checkbox value="middle-eastern">Middle Eastern</Checkbox>
                            <Checkbox value="russian">Russian</Checkbox>
                            <Checkbox value="scandinavian">Scandinavian</Checkbox>
                            <Checkbox value="turkish">Turkish</Checkbox>
                        </CheckboxGroup>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>



        </div>
    );
}
