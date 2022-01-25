export function loadImage(src: string, crossOrigin: boolean = false) {
  return new Promise<HTMLImageElement>((rs, rj) => {
    let img = new Image();
    if (crossOrigin) img.crossOrigin = "anonymous";
    img.onload = () => rs(img);
    img.onerror = rj;
    img.src = src;
  });
}
