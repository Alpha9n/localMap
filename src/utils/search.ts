import { MapLocation } from "@/models/location";

export function filterTag(mapLocations: MapLocation[], tag?: string): MapLocation[] {
    console.log(tag);
    if (!tag) return mapLocations;

    return mapLocations.filter((value) => {
        value.tag == tag;
    });
}