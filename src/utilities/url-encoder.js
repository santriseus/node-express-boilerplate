// https://stackoverflow.com/a/742047
// Removed 'a', 'e', 'i', 'o', 'u' to prevent offencive words
// Removed 'I', 'l', '1', 'O', '0' to prevent ambiguous chars

const alphabet = '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
const base = alphabet.length;
module.exports = function newUrlEncoder() {
  return {
    encode: function(num) {
      const result = [];
      while (num > 0) {
        result.push(alphabet.charAt(num % base));
        num = Math.floor(num / base);
      }
      return result.reverse().join('');
    },
  };
};
