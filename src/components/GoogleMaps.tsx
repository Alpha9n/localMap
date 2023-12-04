import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Spinner } from "@nextui-org/react";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import React from "react";

interface MapRenderComponentProp {
    center: google.maps.LatLngLiteral
    zoom:   number
};

interface MapProps extends google.maps.MapOptions {
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    children?: React.ReactNode;
  }


export const MapRender = (status: Status) => {
    switch(status) {
        case Status.LOADING:
            return <Spinner className="w-full h-full"/>;
        case Status.FAILURE:
            return <p className="text-warning-100">読み込みに失敗しました。</p>;
        case Status.SUCCESS:
            return <></>;
    }
};



export const MapComponent = ({onClick, onIdle, children, ...options}: MapProps) => {
        const ref = React.useRef<HTMLDivElement>(null);
        const [map, setMap] = React.useState<google.maps.Map>();

        React.useEffect(() => {
            if (ref.current && !map) {
              setMap(new window.google.maps.Map(ref.current, {}));
            }
          }, [ref, map]);

          useDeepCompareEffectForMaps(() => {
            if (map) {
              map.setOptions(options);
            }
          }, [map, options]);
        
        // React.useEffect(() => {
        //     if (map) {
        //         ["click", "idle"].forEach((eventName) =>
        //             google.maps.event.clearListeners(map, eventName)
        //         );
        //         if (onIdle) {
        //             map.addListener("idle", ()=>{onIdle(map)});
        //         }
        //     }
        // }, [map, onIdle]);

        return (
            <>
                <div ref={ref} className="w-full h-full"/>
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

export const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();
  
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