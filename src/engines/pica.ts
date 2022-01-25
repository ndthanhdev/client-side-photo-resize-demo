import { Engine } from "../Engine";
import { loadImage } from "../loadImage";
import pica from "pica";

export const PicaEngine: Engine = async ({ src, toW, toH }) => {
  let img = await loadImage(src, true);

  const canvas = document.createElement("canvas");
  canvas.width = toW;
  canvas.height = toH;

  await pica({
    features: ["wasm"]
  }).resize(img, canvas);

  let blob = await new Promise<Blob | null>((rs) =>
    canvas.toBlob(rs, "image/jpeg", 1)
  );

  if (!blob) {
    throw "null";
  }

  return URL.createObjectURL(blob);
};
