'use client'
import { MapComponent, MapRender, Marker } from "@/components/GoogleMaps";
import { LocationCard, LocationListTag } from "@/components/LocationList";
import { useGeolocated } from "react-geolocated";
import data from "@/static/data.json";
import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import CreatePlaceModal from "@/components/CreatePlace";
import { useDisclosure } from "@nextui-org/react";
import { Loader } from "@googlemaps/js-api-loader";

export interface Location {
    title: string;
    description: string;
    location: number[];
    imgUrl: string;
    officialLink: string;
    tag: string;
}

export default function Home() {
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const lat = coords?.latitude ?? 34.70256475633783;
  const lng = coords?.longitude ?? 135.495982783378;

  const [mapMarkers, setMapMarkers] = React.useState<{ title: string, position: google.maps.LatLngLiteral, location: Location }[]>([]);
  const [mapCenter, setMapCenter] = React.useState<google.maps.LatLngLiteral>({ lat: lat, lng: lng });
  const [mapZoom, setMapZoom] = React.useState<number>(12);
  const [clickEvent, setClickEvent] = React.useState<google.maps.MapMouseEvent>();
  const [tagFilter, setTagFilter] = React.useState<LocationListTag>("pilgrimagePlace-jujutu");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const selectedLocationList: Location[] = data.filter((elem) => elem.tag == tagFilter);

  const setMapOpts = (latLng: google.maps.LatLngLiteral, zoom: number) => {
    setMapCenter(latLng);
    setMapZoom(zoom);
  };

  const addMarker = (latLng: google.maps.LatLngLiteral, title: string, description: string, link: string, imgLink: string) => {
    const markers = mapMarkers.find((marker) => marker.title == title);
    if (!markers) {
      setMapMarkers([...mapMarkers, { title, position: latLng, location: {
        title: title, description: description, officialLink: link, imgUrl: imgLink, location: [latLng.lat, latLng.lng],
        tag: tagFilter
      }}]);
    };
  };

  const mapClick = (event: google.maps.MapMouseEvent) => {
    setClickEvent(event);
    setMapCenter(event.latLng?.toJSON() ?? mapCenter);
    setMapZoom(15);
    onOpen();
  };

  // const onIdle = (map: google.maps.Map) => {
  //   setMapZoom(map.getZoom()?? mapZoom);
  //   setMapCenter(map.getCenter()?.toJSON ?? mapCenter);
  // };

  return (
    <main className="h-5/6 md:py-10">
      <div className="mx-auto w-full h-full md:w-5/6 md:flex md:bg-foreground-200 md:rounded-xl">
        <div className="h-4/5 w-full md:h-full md:w-4/6 md:rounded-xl overflow-hidden items-center">
          <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY ?? ''} render={MapRender}>
            <MapComponent zoom={mapZoom} center={mapCenter} onClick={mapClick}>
              {mapMarkers.map((markerSet): React.ReactNode => {
                return(<Marker
                  key={markerSet.title}
                  position={markerSet.position}
                  title={markerSet.title}
                  animation={google.maps.Animation.DROP} 
                  location={markerSet.location}
                />);
              })}
            </MapComponent>
          </Wrapper>
        </div>
        <div className="min-h-1/5 p-4 flex gap-4 overflow-x-scroll overflow-y-hidden h-fit md:h-full md:grid md:content-start md:w-2/6 md:min-w-fit md:overflow-y-scroll md:overflow-x-hidden">
          {selectedLocationList.map((loc) => {
            return (<LocationCard
              key={loc.title}
              title={loc.title}
              description={loc.description}
              link={loc.officialLink}
              imgLink={loc.imgUrl}
              latLng={{ lat: loc.location[0], lng: loc.location[1] }}
              locButtonCallback={(latLng: google.maps.LatLngLiteral, title: string, description: string, link: string, imgLink: string) => {
                console.log("before:", mapCenter);
                setMapOpts(latLng, 15);
                addMarker(latLng, title, description, link, imgLink);
                console.log("clicked", latLng, mapMarkers);
              }} />);
          })}
        </div>
        <CreatePlaceModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} latlng={clickEvent?.latLng?.toJSON() ?? mapCenter} />
      </div>
    </main>
  );
}
