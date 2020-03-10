const consonants = Array.from("bcdfghjkmnpqrstvwxyz");
const vowels = Array.from("aeiou");

function choose(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateId(currentCount) {
  let charCount = 2;
  let capacity = consonants.length * vowels.length;
  let id = choose(consonants) + choose(vowels);
  while (capacity <= currentCount) {
    charCount++;
    if (charCount % 2 === 0) {
      capacity *= 5;
      id += choose(vowels);
    } else {
      capacity *= 21;
      id += choose(consonants);
    }
  }
  return id;
}

module.exports = { generateId };
