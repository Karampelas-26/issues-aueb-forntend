import {CreateSites} from "./Create-sites";

export interface CreateBuilding {
    name: String,
    address:String,
    floors: String,
    sites: CreateSites[]
}
