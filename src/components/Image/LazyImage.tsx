import React, { useEffect, useState } from 'react';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  lazySrc: Promise<typeof import('*.png')> | string
}

export default function LazyImage(props: LazyImageProps) {
  const {
    lazySrc, src, alt, ...rest
  } = props;
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);
  useEffect(() => {
    if (typeof lazySrc === 'string') {
      setImageSrc(lazySrc);
    } else {
      lazySrc.then((data) => setImageSrc(data.default));
    }
  }, [lazySrc]);
  return (
    <img {...rest} src={imageSrc} alt={alt} />
  );
}
