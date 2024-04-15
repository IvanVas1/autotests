// Функция
function greet(name) {
  return `Hello, ${name}!`
}

// Стрелочная функция
const farewell = name => {
  return `Goodbye, ${name}!`
}

console.log(greet('World'))
console.log(farewell('World'))
