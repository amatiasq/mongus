export function init() {
  loadImage('../assets/sprites/player.png').then(x => {
    document.appendChild(x);
  });
}

export function loadImage(url: string) {
  const img = new Image();

  return new Promise<HTMLImageElement>((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
