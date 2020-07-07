export const getRandomOtherIndex = (
  currentIndex: number,
  totalIndex: number
): number => {
  if (totalIndex == 0) return 0;
  let nextRandomIndex = Math.floor(Math.random() * totalIndex);
  while (currentIndex == nextRandomIndex) {
    nextRandomIndex = Math.floor(Math.random() * totalIndex);
  }
  return nextRandomIndex;
};
