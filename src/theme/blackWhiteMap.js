export const blackWhiteMap = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }],
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f5f5f5' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    stylers: [
      { saturation: -100 },
      { lightness: 45 },
      { color: '#ffffff' },
    ],
  },
  {
    featureType: 'road.highway',
    stylers: [{ color: '#e0e0e0' }],
  },
  {
    featureType: 'road.arterial',
    stylers: [{ color: '#eaeaea' }],
  },
  {
    featureType: 'road.local',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'water',
    stylers: [
      { saturation: -100 },
      { lightness: 50 },
      { color: '#cfcfcf' },
    ],
  },
  {
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 20 }],
  },
];
