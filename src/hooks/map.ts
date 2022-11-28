import { useEffect, useRef } from 'react';
import { createCustomEqual, TypeEqualityComparator } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';

// const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a: any, b: any) => {
//   if (
//     isLatLngLiteral(a)
//       || a instanceof google.maps.LatLng
//       || isLatLngLiteral(b)
//       || b instanceof google.maps.LatLng
//   ) {
//     return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
//   }
//
//   // TODO extend to other types
//
//   // use fast-equals for other objects
//   return deepEqual(a, b);
// });

const areObjectsEqual: TypeEqualityComparator<any, any> = (a, b) => {
  if (isLatLngLiteral(a)
    || a instanceof google.maps.LatLng || isLatLngLiteral(b) || b instanceof google.maps.LatLng) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
  }
  return a === b;
};

const deepCompareEqualsForMaps = createCustomEqual(() => ({ areObjectsEqual }));

export function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current, undefined)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffectForMaps(callback: React.EffectCallback, dependencies: any[]) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
