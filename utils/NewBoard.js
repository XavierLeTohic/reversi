export default function newBoard(size = 8) {
  return Array.from({ length: size }, (a, row) => Array.from({ length: size }, (b, col) => {
    if (row === 3) {
      if (col === 3) {
        return 'w';
      }
      if (col === 4) {
        return 'b';
      }
    }
    if (row === 4) {
      if (col === 3) {
        return 'b';
      }
      if (col === 4) {
        return 'w';
      }
    }
    return null;
  }));
}
