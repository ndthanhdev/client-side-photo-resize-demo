import React from "react";
import ReactCompareImage from "react-compare-image";

export interface Slice {
  src: string;
  oriW: number;
  oriH: number;
  width: number;
  height: number;
}

export const Slice: React.FC<Slice> = ({
  src,
  oriW,
  oriH,
  width,
  height,
  ...otherProps
}) => {
  return (
    <div
      style={{
        width,
        height
      }}
    >
      <ReactCompareImage leftImage={src} rightImage={src} />;
    </div>
  );
};
