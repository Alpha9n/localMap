import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Link } from '@nextui-org/react';
import { FaStar, FaRegStar } from 'react-icons/fa6';
import { IoMdPin } from 'react-icons/io';
import data from '@/static/data.json';
import React, { useState } from "react";

interface ListSelectionProps {
    listTag: 'pilgrimagePlace' | 'all'
}

interface LocationProps {
    title:          string
    description:    string
    link:           string
    imgLink:        string
    latLng:         google.maps.LatLngLiteral
}

export const LocationListComponent = ({listTag}: ListSelectionProps) => {
    const selectedLocationList = data.filter((elem) => elem.tag == listTag);
    console.log(data);
    
    return (
        <>
            {selectedLocationList.map((loc) => {
                return (<LocationCard 
                    key={loc.title}
                    title={loc.title} 
                    description={loc.description} 
                    link={loc.officialLink} 
                    imgLink={loc.imgUrl} 
                    latLng={{ lat: loc.location[0], lng: loc.location[1] }} 
                />)
            })}
        </>
    );
};

const LocationCard = ({title, description, link, imgLink, latLng}: LocationProps) => {
    const [isFollowed, setIsFollowed] = React.useState(false);
    return (
        <Card className="w-full min-w-[350px] h-[150px]">
            <CardHeader className="justify-between">
            <div className="flex gap-5">
                <Avatar isBordered radius="sm" size="md" src={imgLink} />
                <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">{title}</h4>
                </div>
            </div>
            <div
                className="flex gap-2"
            >
                <Button
                    color="primary"
                    radius="full"
                    size="md"
                    onPress={() => {
                        console.log(latLng);
                    }}
                >
                    <IoMdPin/>
                </Button>
                <Button
                    className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                    color="primary"
                    radius="full"
                    size="md"
                    variant={isFollowed ? "bordered" : "solid"}
                    onPress={() => setIsFollowed(!isFollowed)}
                    isIconOnly
                >
                    {isFollowed ? <FaStar /> : <FaRegStar /> }
                </Button>
            </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
            <p>{description}</p>
            </CardBody>
            <CardFooter className="gap-5">
            <div className="flex gap-1">
                <Link href={link}>公式サイト</Link>
            </div>
            </CardFooter>
        </Card>
    );
};