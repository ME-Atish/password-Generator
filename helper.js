function getRandomChar(pool, count) {
  return Array.from(
    { length: count },
    () => pool[Math.floor(Math.random() * pool.length)]
  );
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

module.exports = { getRandomChar, shuffle };
