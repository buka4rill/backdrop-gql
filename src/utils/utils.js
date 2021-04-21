
// Generate random strings
const generateRandomChars = (length) => {
  let result = '',
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    charactersLength = characters.length;
  
  for (let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

module.exports = generateRandomChars;