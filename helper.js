function getRandomChar(pool, count) {
  return Array.from(
    { length: count },
    () => pool[Math.floor(Math.random() * pool.length)]
  );
}

module.exports = {getRandomChar}