export interface INewRepeaseAlbum {
    albums: Albums;
   }
   
   export interface Albums {
    href:     string;
    items:    Item[];
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
   }
   
   export interface Item {
    album_type:             AlbumTypeEnum;
    artists:                Artist[];
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           Date;
    release_date_precision: ReleaseDatePrecision;
    total_tracks:           number;
    type:                   AlbumTypeEnum;
    uri:                    string;
   }
   
   export enum AlbumTypeEnum {
    Album = "album",
    Single = "single",
   }
   
   export interface Artist {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name:          string;
    type:          ArtistType;
    uri:           string;
   }
   
   export interface ExternalUrls {
    spotify: string;
   }
   
   export enum ArtistType {
    Artist = "artist",
   }
   
   export interface Image {
    height: number;
    url:    string;
    width:  number;
   }
   
   export enum ReleaseDatePrecision {
    Day = "day",
   }
   