import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { BsSpotify } from 'react-icons/bs';

export const genres = [
  {
    id: 'global-1',
    listid: 'genre-global-chart-1',
    name: 'Pop',
    urlPath: 'pop',
    count: 200,
  },
  {
    id: 'global-2',
    listid: 'genre-global-chart-2',
    name: 'Hip-Hop/Rap',
    urlPath: 'hip-hop-rap',
    count: 200,
  },
  {
    id: 'global-3',
    listid: 'genre-global-chart-3',
    name: 'Dance',
    urlPath: 'dance',
    count: 200,
  },
  {
    id: 'global-4',
    listid: 'genre-global-chart-4',
    name: 'Electronic',
    urlPath: 'electronic',
    count: 100,
  },
  {
    id: 'global-5',
    listid: 'genre-global-chart-5',
    name: 'R&B/Soul',
    urlPath: 'randb-soul',
    count: 100,
  },
  {
    id: 'global-6',
    listid: 'genre-global-chart-6',
    name: 'Alternative',
    urlPath: 'alternative',
    count: 100,
  },
  {
    id: 'global-7',
    listid: 'genre-global-chart-7',
    name: 'Rock',
    urlPath: 'rock',
    count: 100,
  },
  {
    id: 'global-8',
    listid: 'genre-global-chart-8',
    name: 'Latin',
    urlPath: 'latin',
    count: 100,
  },
  {
    id: 'global-9',
    listid: 'genre-global-chart-9',
    name: 'Film, TV & Stage',
    urlPath: 'film-tv-and-stage',
    count: 100,
  },
  {
    id: 'global-10',
    listid: 'genre-global-chart-10',
    name: 'Country',
    urlPath: 'country',
    count: 100,
  },
  {
    id: 'global-11',
    listid: 'genre-global-chart-11',
    name: 'AfroBeats',
    urlPath: 'afrobeats',
    count: 50,
  },
  {
    id: 'global-12',
    listid: 'genre-global-chart-12',
    name: 'Worldwide',
    urlPath: 'worldwide',
    count: 50,
  },
  {
    id: 'global-13',
    listid: 'genre-global-chart-13',
    name: 'Reggae/Dancehall',
    urlPath: 'reggae-dancehall',
    count: 50,
  },
  {
    id: 'global-14',
    listid: 'genre-global-chart-14',
    name: 'House',
    urlPath: 'house',
    count: 50,
  },
  {
    id: 'global-15',
    listid: 'genre-global-chart-15',
    name: 'K-Pop',
    urlPath: 'k-pop',
    count: 50,
  },
];

export const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
  { name: "Y liked on radio", to: "/ymusic/albums", icon: BsSpotify }
];
