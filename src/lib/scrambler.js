const moves = ["U", "D", "R", "L", "F", "B"];
const modifiers = ["", "'", "2"];

function generateScramble() {
  let scramble = [];

  for (let i = 0; i < 20; i++) {
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    const randomModifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scramble.push(`${randomMove}${randomModifier}`);
  }
  
  return scramble.join(" ");
}

export default generateScramble;
