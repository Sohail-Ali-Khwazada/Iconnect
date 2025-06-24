
function useGenerateKeys() {


  const generateKeyPair = async () => {
    try {
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: "ECDH",
          namedCurve: "P-256",
        },
        true,
        ["deriveKey"]
      );

      const rawPublicKey = await window.crypto.subtle.exportKey("raw",keyPair.publicKey);
      const publicKeyBase64 = bufferToBase64(rawPublicKey);

      const pkcs8PrivateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
      const privateKeyBase64 = bufferToBase64(pkcs8PrivateKey);

      return saveKeys(privateKeyBase64,publicKeyBase64);

    } catch (error) {
      console.error("Key generation failed:", error);
      return { publicKeyBase64: null, privateKey: null };
    }
  };

  return { generateKeyPair };
}
export default useGenerateKeys;

function bufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function saveKeys(privateKey, publicKey) {
  //save private key and return public key
  
  return { publicKey };
}
