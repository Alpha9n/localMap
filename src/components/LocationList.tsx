import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Link } from '@nextui-org/react';
import { FaStar, FaRegStar } from 'react-icons/fa6';
import { IoMdPin } from 'react-icons/io';
import React from "react";
import useLocalStorage from '@/hooks/useLocalStorage';
import { type } from 'os';
import { listTag } from './CreatePlace';

interface LocationProps {
    title:          string;
    description:    string;
    link:           string;
    imgLink:        string;
    locButtonCallback: Function;
    latLng:         google.maps.LatLngLiteral;
};

export type LocationListTag = typeof listTag[number]['tag'];

export interface LocationDataValues {
    title:          string;
    description:    string;
    link:           string;
    imgLink:        string;
    latLng:         google.maps.LatLngLiteral;
    tag:            LocationListTag;
};

export const LocationCard = ({title, description, link, imgLink, latLng, locButtonCallback}: LocationProps) => {
    const {value, setValueAndStrage} = useLocalStorage(title, 'false');

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
                        locButtonCallback(latLng, title, description, link, imgLink);
                    }}
                >
                    <IoMdPin/>
                </Button>
                <Button
                    className={value === 'true' ? "bg-transparent text-foreground border-default-200" : ""}
                    color="primary"
                    radius="full"
                    size="md"
                    variant={value === 'true' ? "bordered" : "solid"}
                    onPress={() => {
                        setValueAndStrage(value==='true' ? 'false' : 'true');
                    }}
                    isIconOnly
                >
                    {value === 'true' ? <FaStar /> : <FaRegStar /> }
                </Button>
            </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
            <p>{description}</p>
            </CardBody>
            <CardFooter className="gap-5">
            <div className="flex gap-1">
                <Link 
                    href={link} 
                    target={'_blank'}
                >
                    <p>公式サイト</p>
                </Link>
            </div>
            </CardFooter>
        </Card>
    );
};