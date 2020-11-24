const CryptoJS = require('crypto-js');

function AES() {

  function encryptToBase64 (text, passphrase) {
    return btoa(CryptoJS.AES.encrypt(text, passphrase).toString());
  };
  
  
  function decryptFromBase64 (text, passphrase) {
    const bytes = CryptoJS.AES.decrypt(atob(text), passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };
  
  return Object.freeze({
    encryptToBase64: encryptToBase64,
    decryptFromBase64: decryptFromBase64,
  });

}
export default new AES();