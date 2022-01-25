import { VariableSizeList } from "react-window";
import { Engine } from "./Engine";
import React from "react";
import { Slice } from "./Slice";
import { loadImage } from "./loadImage";

interface List {
  src: string;
  step: number;
}

interface State {
  status: "loading" | "loaded" | "error";
  width: number;
  height: number;
}

const DefaultState: State = {
  status: "loading",
  width: 0,
  height: 0
};

function toItems(width: number, height: number, step: number) {
  let ratio = 1;
  let items = [];
  while (ratio > 0.1) {
    items.push([width * ratio, height * ratio]);
    ratio -= step;
  }

  return items.reverse();
}

export const List: React.FC<List> = ({ src, step }) => {
  const [state, setState] = React.useState<State>(DefaultState);

  let sessRef = React.useRef(0);
  React.useEffect(() => {
    async function doIt() {
      sessRef.current++;

      let sess = sessRef.current;

      setState({ ...DefaultState });

      try {
        let img = await loadImage(src);

        if (sess !== sessRef.current) {
          return;
        }

        setState({
          status: "loaded",
          width: img.width,
          height: img.height
        });
      } catch (err) {
        setState({ ...DefaultState, status: "error" });
      }
    }

    doIt();
  }, [src]);

  if (state.status !== "loaded") {
    return state.status;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
      }}
    >
      <LoadedList
        src={src}
        width={state.width}
        height={state.height}
        step={0.1}
      />
    </div>
  );
};

interface LoadedList extends List {
  width: number;
  height: number;
}
const LoadedList: React.FC<LoadedList> = ({ src, step, width, height }) => {
  let items = React.useMemo(() => toItems(width, height, step), [
    step,
    width,
    height
  ]);

  return (
    <>
      {items.map((item, index) => (
        <Slice
          src={src}
          oriW={width}
          oriH={height}
          width={item[0]}
          height={item[1]}
        />
      ))}
    </>
  );
};
