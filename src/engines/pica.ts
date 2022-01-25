import { Engine } from "../Engine";
import { loadImage } from "../loadImage";
import pica from "pica";
import thwack from "thwack";

export const PicaEngine: Engine = async ({ src, toW, toH }) => {
  const { data } = await thwack.get(src, { responseType: "blob" });
  let url = URL.createObjectURL(data);
  let img = await loadImage(url);
  const canvas = document.createElement("canvas");
  canvas.width = toW;
  canvas.height = toH;

  await pica().resize(img, canvas, {
    quality: 3,
    unsharpAmount: 200,
    unsharpRadius: 2,
    unsharpThreshold: 255
  });

  let blob = await new Promise<Blob | null>((rs) =>
    canvas.toBlob(rs, "image/jpeg", 1)
  );

  if (!blob) {
    throw "null";
  }

  return URL.createObjectURL(blob);
};
