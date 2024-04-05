import React from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";

export default function Categories() {
    return (
        <div>
            <CheckboxGroup label={<u>American Cuisine</u>} className="p-2">
                <Checkbox value="american">American</Checkbox>
                <Checkbox value="brazilian">Brazilian</Checkbox>
                <Checkbox value="columbian">Columbian</Checkbox>
                <Checkbox value="mexican">Mexican</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup label={<u>Asian Cuisine</u>} className="p-2">
                <Checkbox value="chinese">Chinese</Checkbox>
                <Checkbox value="indian">Indian</Checkbox>
                <Checkbox value="japanese">Japanese</Checkbox>
                <Checkbox value="korean">Korean</Checkbox>
                <Checkbox value="thai">Thai</Checkbox>
                <Checkbox value="vietnamese">Vietnamese</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup label={<u>European Cuisine</u>} className="p-2">
                <Checkbox value="british">British</Checkbox>
                <Checkbox value="french">French</Checkbox>
                <Checkbox value="german">German</Checkbox>
                <Checkbox value="greek">Greek</Checkbox>
                <Checkbox value="irish">Irish</Checkbox>
                <Checkbox value="italian">Italian</Checkbox>
                <Checkbox value="spanish">Spanish</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup label={<u>Other Regional Cuisine</u>} className="p-2">
                <Checkbox value="african">African</Checkbox>
                <Checkbox value="australian">Australian</Checkbox>
                <Checkbox value="caribbean">Caribbean</Checkbox>
                <Checkbox value="mediterranean">Mediterranean</Checkbox>
                <Checkbox value="middle-eastern">Middle Eastern</Checkbox>
                <Checkbox value="russian">Russian</Checkbox>
                <Checkbox value="scandinavian">Scandinavian</Checkbox>
                <Checkbox value="turkish">Turkish</Checkbox>
            </CheckboxGroup>
        </div>
    );
}
