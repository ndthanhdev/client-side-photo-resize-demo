import React, { useState } from "react";
import ReactCompareImage from "react-compare-image";
import { useEngine } from "./Engine";

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
  const [state, setState] = React.useState<{
    status: "loading" | "loaded" | "error";
    src?: string;
  }>({
    status: "loading",
    src: undefined
  });

  const engine = useEngine();

  const sessRef = React.useRef(0);
  React.useEffect(() => {
    async function doIt() {
      sessRef.current++;
      const sess = sessRef.current;

      try {
        let res = await engine({
          src,
          toW: width,
          toH: height
        });

        if (sess !== sessRef.current) {
          return;
        }

        setState({
          src: res,
          status: "loaded"
        });
      } catch (error) {
        console.log(error);
        setState({
          status: "error"
        });
      }
    }

    doIt();
  }, [src, engine]);

  let el: any;

  if (state.status !== "loaded") {
    el = state.status;
  } else {
    el = <ReactCompareImage leftImage={state.src} rightImage={src} />;
  }

  return (
    <div
      style={{
        width,
        height
      }}
    >
      {el}
    </div>
  );
};
