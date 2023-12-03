import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Spinner } from "@nextui-org/react";
import React from "react";


const render = (status: Status) => {
    const center = { lat: 34.70256475633783, lng: 135.495982783378 };
    const zoom = 12;
    
    switch(status) {
        case Status.LOADING:
            return <Spinner className="w-full h-full"/>
        case Status.FAILURE:
            return <p className="text-warning-100">読み込みに失敗しました。</p>
        case Status.SUCCESS:
            return <MapComponent center={center} zoom={zoom}/>
    }
};

const MapComponent = ({
        center,
        zoom,
    }: {
        center: google.maps.LatLngLiteral;
        zoom: number;
    }) => {
        const ref = React.useRef<HTMLDivElement>(null);
        const [map, setMap] = React.useState<google.maps.Map>();

        React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center, zoom
            }));
        }
        }, [ref, map, center, zoom]);

        return <div ref={ref} className="w-full h-full"/>;
};

export const MapRenderComponent = () => {
    return (
        <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY??''} render={render}/>
    );
};