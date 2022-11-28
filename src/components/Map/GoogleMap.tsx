import React from 'react';
import { useDeepCompareEffectForMaps } from '@hooks/map';

export interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
  options: google.maps.MapOptions,
}

export default function GoogleMap(props: MapProps) {
  const { options, children, ...rest } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  return (
    <>
      <div ref={ref} {...rest} />
      {
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // set the map prop on the child component
            // @ts-ignore
            return React.cloneElement(child, { map });
          }
          return null;
        })
      }
    </>
  );
}
