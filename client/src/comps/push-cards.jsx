import React from "react";
import {Card, CardBody, CardFooter, CardHeader, Image, Button} from "@nextui-org/react";

export default function PushCards() {
  const list = [
    {
      title: "Orange",
      img: "https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://nextui-docs-v2.vercel.app/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://nextui-docs-v2.vercel.app/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://nextui-docs-v2.vercel.app/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://nextui-docs-v2.vercel.app/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "https://nextui-docs-v2.vercel.app/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "https://nextui-docs-v2.vercel.app/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  return (
    
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
    {list.map((item, index) => (
      <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}
      isFooterBlurred
      radius="lg"
      className="border-none">
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={item.title}
            className="w-full object-cover h-[140px]"
            src={item.img}
          />
        </CardBody>
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <b>{item.title}</b>
          <p className="text-tiny text-white/80">{item.price}</p>
        </CardFooter>
      </Card>
    ))}
  </div>

    
    
  );
}
