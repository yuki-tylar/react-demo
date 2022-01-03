export function hasGetUserMedia() {
  return ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices)
}

//video --> image (base64)
export function getScreenshotFromVideo(video: HTMLVideoElement): string {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d')!
  ctx.translate(video.videoWidth,0)
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0);
  return canvas.toDataURL('image/webp');
}

//blob | base64 --> base 64
export function shrinkImageByFixedSize(image: Blob | string, constrain: { axis: 'x' | 'y', size: number }): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const cvs = document.createElement('canvas');

      if (constrain.axis === 'y' && img.height > constrain.size) {

        cvs.height = constrain.size;
        cvs.width = img.width * constrain.size / img.height;
      } else if (constrain.axis === 'x' && img.width > constrain.size) {

        cvs.width = constrain.size;
        cvs.height = img.height * constrain.size / img.width;
      } else {
        cvs.width = img.width;
        cvs.height = img.height;
      }

      const ctx = cvs.getContext('2d');
      ctx!.drawImage(img, 0, 0, img.width, img.height, 0, 0, cvs.width, cvs.height);
      resolve(cvs.toDataURL('image/webp'));
    }
    img.src = typeof image === 'string' ? image : URL.createObjectURL(image);
  });
}

export * as mediaService from './media-service';
