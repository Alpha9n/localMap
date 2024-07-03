'use client';
import { MapComponent, MapRender, Marker } from "@/components/GoogleMaps";
import { LocationCard, LocationListTag } from "@/components/LocationList";
import { useGeolocated } from "react-geolocated";
import React, { useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import CreatePlaceModal, { listTag } from "@/components/CreatePlace";
import { Button, Divider, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import CreateListModal from "@/components/CreateList";
import { MapLocation } from "@/models/location";
import { getLocations } from "@/repositories/dataController";
import useLocalStorage from "@/hooks/useLocalStorage";
import { filterTag } from "@/utils/search";

export default function Home() {
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const lat = coords?.latitude ?? 34.7025;
  const lng = coords?.longitude ?? 135.4959;

  const [mapMarkers, setMapMarkers] = useState<{ title: string, position: google.maps.LatLngLiteral, location: MapLocation }[]>([]);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ lat: lat, lng: lng });
  const [mapZoom, setMapZoom] = useState<number>(12);
  const [clickEvent, setClickEvent] = useState<google.maps.MapMouseEvent>();
  const [tagFilter, setTagFilter] = useState<LocationListTag>("favorite");

  const setPointModal = useDisclosure();
  const setListModal = useDisclosure();

  const mapLocationsStorage = useLocalStorage('mapLocations', JSON.stringify(getLocations()));
  const [mapLocations, setMapLocations] = useState<MapLocation[]>(JSON.parse(mapLocationsStorage.value));

  useEffect(() => {
    setMapLocations(JSON.parse(mapLocationsStorage.value));
  }, [mapLocationsStorage.value]);

  const setMapOpts = (latLng: google.maps.LatLngLiteral, zoom: number) => {
    setMapCenter(latLng);
    setMapZoom(zoom);
  };

  const addMarker = (latLng: google.maps.LatLngLiteral, title: string, description: string, link: string, imgLink: string) => {
    const markers = mapMarkers.find((marker) => marker.title == title);
    if (!markers) {
      setMapMarkers([...mapMarkers, {
        title, position: latLng, location: {
          title: title,
          description: description,
          officialLink: link,
          imgUrl: imgLink,
          location: [latLng.lat, latLng.lng],
          tag: tagFilter
        }
      }]);
    };
  };

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    setClickEvent(event);
    setMapCenter(event.latLng?.toJSON() ?? mapCenter);
    setMapZoom(15);
    setPointModal.onOpen();
  };

  const onTagSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTagFilter(e.target.value);
  };

  console.log('検索対象データ', mapLocations);
  const filteringResult = filterTag(mapLocations, tagFilter ?? undefined);

  return (
    <main className="h-[93%] lg:py-10">
      <div className="mx-auto w-full h-full lg:h-[90%] lg:w-5/6 lg:max-w-5xl lg:flex lg:bg-foreground-200 lg:rounded-xl">
        <div className="h-[50%] w-full overflow-hidden items-center lg:h-full lg:w-4/6 lg:rounded-xl">
          <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY ?? ''} render={MapRender}>
            <MapComponent zoom={mapZoom} center={mapCenter} onClick={onMapClick}>
              {mapMarkers.map((markerSet): React.ReactNode => {
                return (<Marker
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
        <div className="p-4 gap-4 grid bg-default-200 rounded-xl lg:h-full">
          <div className="flex gap-4 lg:justify-between">
            <Select
              isRequired
              label="地点リスト"
              labelPlacement="outside"
              className="min-w-[9rem] max-w-60 mt-auto"
              defaultSelectedKeys={"all"}
              onChange={onTagSelection}
            >
              {listTag.map((value) => (
                <SelectItem key={value.tag}>
                  {value.title}
                </SelectItem>
              ))}
            </Select>
            <Button 
              color="primary"
              startContent={<FaPlus/>}
              className="min-w-40 mt-auto"
              onClick={setListModal.onOpen}>
              リストを追加
            </Button>
          </div>
          <Divider className="hidden lg:grid"/>
          <div className="flex gap-4 overflow-x-scroll overflow-y-hidden h-fit lg:h-full lg:grid lg:content-start lg:w-2/6 lg:min-w-fit lg:overflow-y-scroll lg:overflow-x-hidden">
            {(filteringResult.length <= 0) ? (
              <div className="w-full min-w-[20rem] h-[150px]">
                <p>地点を登録してください。</p>
              </div>
            ) : filteringResult.map((loc) => {
              return (
                <LocationCard
                  key={loc.title}
                  title={loc.title}
                  description={loc.description}
                  link={loc.officialLink}
                  imgLink={loc.imgUrl}
                  latLng={{ lat: loc.location[0], lng: loc.location[1] }}
                  locButtonCallback={(latLng: google.maps.LatLngLiteral, title: string, description: string, link: string, imgLink: string) => {
                    setMapOpts(latLng, 15);
                    addMarker(latLng, title, description, link, imgLink);
                  }}/>
              );
            })
            }
          </div>
        </div>
        <CreateListModal isOpen={setListModal.isOpen} onOpen={setListModal.onOpen} onOpenChange={setListModal.onOpenChange}/>
        <CreatePlaceModal isOpen={setPointModal.isOpen} onOpen={setPointModal.onOpen} onOpenChange={setPointModal.onOpenChange} latlng={clickEvent?.latLng?.toJSON() ?? mapCenter} />
      </div>
    </main>
  );
}


