import { MapLocation } from "@/models/location";
import data from "@/static/data.json";
import { filterTag } from "@/utils/search";

export function getLocations(tag?: string): MapLocation[] {
        return filterTag(data, tag);
}