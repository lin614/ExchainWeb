import pako from 'pako'

const stringToByteArray = (str) => {
  var array = new Uint8Array(str.length);
  var i;
  
  for (i = 0; i < str.length; ++i) {
    array[i] = ~str.charCodeAt(i)
  }
  
  return array;
}

export default (base64Data) => {
    return pako.inflate(stringToByteArray(atob(base64Data)), {to:"string"});
}