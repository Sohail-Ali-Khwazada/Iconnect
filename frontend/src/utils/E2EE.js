export const generateKeyPair = async () => {
  try {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "ECDH",
        namedCurve: "P-256",
      },
      true,
      ["deriveKey"]
    );

    const rawPublicKey = await window.crypto.subtle.exportKey(
      "raw",
      keyPair.publicKey
    );
    const publicKeyBase64 = bufferToBase64(rawPublicKey);

    const pkcs8PrivateKey = await window.crypto.subtle.exportKey(
      "pkcs8",
      keyPair.privateKey
    );
    const privateKeyBase64 = bufferToBase64(pkcs8PrivateKey);

    return { privateKeyBase64, publicKeyBase64 };
  } catch (error) {
    console.error("Key generation failed:", error);
    return { publicKeyBase64: null, privateKey: null };
  }
};

export const generateSharedKey = async (privateKey,publicKey) => {
  const priKey = await importPrivateKey(privateKey);
  const pubKey = await importPublicKey(publicKey);
  const sharedKey = await window.crypto.subtle.deriveKey(
    {
      name: "ECDH",
      public: pubKey,
    },
    priKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  return { sharedKey };
};

export const encryptMessage = async(message, aesKey) => {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(message);

  const ciphertext = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    encoded
  );

  return {
    ciphertext: bufferToBase64(ciphertext),
    iv: bufferToBase64(iv),
  };
}


export const decryptMessage = async(ciphertextBase64, ivBase64, aesKey) => {
  const ciphertext = base64ToBuffer(ciphertextBase64);
  const iv = base64ToBuffer(ivBase64);

  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    aesKey,
    ciphertext
  );

  const plainMessage = new TextDecoder().decode(decrypted)

  return { plainMessage };
}

async function importPrivateKey(privateKey) {
  const binary = base64ToBuffer(privateKey);
  return await window.crypto.subtle.importKey(
    "pkcs8",
    binary,
    { name: "ECDH", namedCurve: "P-256" },
    true,
    ["deriveKey"]
  );
}

async function importPublicKey(publicKey) {
  const binary = base64ToBuffer(publicKey);
  return await window.crypto.subtle.importKey(
    "raw",
    binary,
    { name: "ECDH", namedCurve: "P-256" },
    true,
    []
  );
}

function bufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToBuffer(base64) {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}
