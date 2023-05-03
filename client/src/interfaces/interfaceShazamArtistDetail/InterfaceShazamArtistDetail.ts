export interface IShazamArtistDetail {
  data: Datum[];
  resources: Resources;
}

export interface Datum {
  id: string;
  type: Type;
}

export enum Type {
  Albums = 'albums',
  Artists = 'artists',
  Songs = 'songs',
}

export interface Resources {
  albums: { [key: string]: Album };
  artists: Artists;
  songs: { [key: string]: Song };
}

export interface Album {
  attributes: AlbumAttributes;
  id: string;
  type: Type;
}

export interface AlbumAttributes {
  artistName: string;
  artwork: Artwork;
  audioTraits: AudioTrait[];
  contentRating?: ContentRating;
  copyright: string;
  editorialNotes?: EditorialNotes;
  genreNames: string[];
  isCompilation: boolean;
  isComplete: boolean;
  isMasteredForItunes: boolean;
  isPrerelease: boolean;
  isSingle: boolean;
  name: string;
  playParams: PlayParams;
  recordLabel: string;
  releaseDate: Date;
  trackCount: number;
  upc: string;
  url: string;
}

export interface Artwork {
  bgColor: string;
  hasP3: boolean;
  height: number;
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
  url: string;
  width: number;
}

export enum AudioTrait {
  Atmos = 'atmos',
  HiResLossless = 'hi-res-lossless',
  Lossless = 'lossless',
  LossyStereo = 'lossy-stereo',
  Spatial = 'spatial',
}

export enum ContentRating {
  Clean = 'clean',
  Explicit = 'explicit',
}

export interface EditorialNotes {
  short: string;
  standard?: string;
}

export interface PlayParams {
  id: string;
  kind: Kind;
}

export enum Kind {
  Album = 'album',
  Song = 'song',
}

export interface Artists {
  [key: string]: TheArtist;
}

export interface TheArtist {
  attributes: TheAtist_Attributes;
  id: string;
  meta: TheAtist_Meta;
  relationships: Relationships;
  type: Type;
  views: TheAtist_Views;
}

export interface TheAtist_Attributes {
  artwork: Artwork;
  genreNames: GenreName[];
  name: string;
  url: string;
}

export enum GenreName {
  HipHopRap = 'Hip-Hop/Rap',
  Music = 'Music',
  RBSoul = 'R&B/Soul',
}

export interface TheAtist_Meta {
  views: MetaViews;
}

export interface MetaViews {
  order: string[];
}

export interface Relationships {
  albums: Albums;
}

export interface Albums {
  data: Datum[];
}

export interface TheAtist_Views {
  'latest-release': LatestRelease;
  'top-songs': LatestRelease;
}

export interface LatestRelease {
  attributes: LatestReleaseAttributes;
  data: Datum[];
}

export interface LatestReleaseAttributes {
  title: string;
}

export interface Song {
  attributes: SongAttributes;
  id: string;
  meta?: SongMeta;
  type: Type;
}

export interface SongAttributes {
  albumName: string;
  artistName: string;
  artwork: Artwork;
  audioLocale: AudioLocale;
  audioTraits: AudioTrait[];
  composerName: string;
  contentRating?: ContentRating;
  discNumber: number;
  durationInMillis: number;
  genreNames: GenreName[];
  hasLyrics: boolean;
  hasTimeSyncedLyrics: boolean;
  isAppleDigitalMaster: boolean;
  isMasteredForItunes: boolean;
  isVocalAttenuationAllowed: boolean;
  isrc: string;
  name: string;
  playParams: PlayParams;
  previews: Preview[];
  releaseDate: Date;
  trackNumber: number;
  url: string;
}

export enum AudioLocale {
  EnUS = 'en-US',
}

export interface Preview {
  url: string;
}

export interface SongMeta {
  formerIds: string[];
}
