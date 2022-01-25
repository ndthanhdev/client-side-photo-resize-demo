export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((rs, rj) => {
    let img = new Image();
    img.onload = () => rs(img);
    img.onerror = rj;
    img.src = src;
  });
}
