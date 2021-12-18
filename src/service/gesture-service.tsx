export const getSwipeDirection = (offset: number, velocity: number, swipeConfidenceThreshold: number = 1000) => {
  const swipePower = Math.abs(offset) * velocity
  return swipePower < -swipeConfidenceThreshold ? 1 : swipePower > swipeConfidenceThreshold ? -1 : 0;
}


export * as gestureService from './gesture-service';