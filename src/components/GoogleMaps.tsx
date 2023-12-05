import { Status } from "@googlemaps/react-wrapper";
import { Spinner } from "@nextui-org/react";
import React, { MutableRefObject } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { MapOpts } from "@/app/settings/page";
import { MarkOptions } from "perf_hooks";
import { Location } from "@/app/page";

interface MapProps extends google.maps.MapOptions {
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    children?: React.ReactNode;
}


export const MapRender = (status: Status) => {
    switch (status) {
        case Status.LOADING:
            return <Spinner className="w-full h-full" />;
        case Status.FAILURE:
            return <p className="text-warning-100">読み込みに失敗しました。</p>;
        case Status.SUCCESS:
            return <></>;
    }
};



export const MapComponent = ({ onClick, onIdle, children, ...options }: MapProps) => {
    const { value, setValueAndStrage } = useLocalStorage('settings', '{"mapTypeControl":false,"selectedMapType":"hybrid","zoomControl":true,"streetViewControl":false,"fullscreenControl":false}');
    const ref = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState<google.maps.Map>();

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);
    
    const storage: MapOpts = JSON.parse(value);

    options.mapTypeControl = storage.mapTypeControl ?? false;
    options.mapTypeId = storage.selectedMapType ?? 'roadmap';
    options.zoomControl = storage.zoomControl ?? true;
    options.streetViewControl = storage.streetViewControl ?? false;
    options.fullscreenControl = storage.fullscreenControl ?? false;


    console.log(storage);

    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    React.useEffect(() => {
        if (map) {
            ["click"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener("click", onClick);
            }
        }
    }, [map, onClick, onIdle]);

    return (
        <>
            <div ref={ref} className="w-full h-full" />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    // @ts-ignore
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    );
};

interface MarkerProps extends google.maps.MarkerOptions {
    location: Location;
}

export const Marker = ({location, ...options}: MarkerProps) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();
    const infoWindowRef = React.useRef<google.maps.InfoWindow | null>(
        new google.maps.InfoWindow({maxWidth: 200})
    );
    const infoWindowContant = (
        `<div style="color: black;">` +
        `   <h1 style="font-weight: 900;">${location.title}</h1>` +
        `   <p>${location.description}</p>` +
        `   <img src="${location.imgUrl}" style="height: 300px"/>` +
        `</div>`
    );

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    marker?.addListener('click', () => {
        if (options.map instanceof google.maps.Map) {
            const position = marker.getPosition();
            if (!!position) options.map.panTo(position);
            options.map.setZoom(17);
        }

        if (infoWindowRef && infoWindowRef.current) {
            infoWindowRef.current.setContent(infoWindowContant);
            infoWindowRef.current.open({ map: options.map, anchor: marker });
        }
    });

    return null;
};

function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

function useDeepCompareMemoize(value: any) {
    const ref = React.useRef();
    ref.current = value;
    return ref.current;
}