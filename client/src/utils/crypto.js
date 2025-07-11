export async function generateRSAKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );

  return keyPair;
}

export async function exportPublicKey(key) {
  const exported = await window.crypto.subtle.exportKey("spki", key);
  return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

export async function exportPrivateKey(key) {
  const exported = await window.crypto.subtle.exportKey("pkcs8", key);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(exported)));
  return base64; // ✅ only this
}

function strToBuffer(str) {
  return new TextEncoder().encode(str);
}

function bufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToBuffer(base64) {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

export async function generateAESKey() {
  return window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function encryptMessageWithAES(message, key) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    strToBuffer(message)
  );

  return {
    encrypted: bufferToBase64(encrypted),
    iv: bufferToBase64(iv)
  };
}

export async function encryptAESKeyWithRSA(aesKey, publicKeyBase64) {

    if (!publicKeyBase64 || typeof publicKeyBase64 !== "string") {
  throw new Error("❌ Public key is invalid or undefined");
}
  const keyBuffer = base64ToBuffer(publicKeyBase64);

  const publicKey = await window.crypto.subtle.importKey(
    "spki",
    keyBuffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );

  const rawAES = await window.crypto.subtle.exportKey("raw", aesKey);

  const encryptedAES = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    rawAES
  );

  return bufferToBase64(encryptedAES);
}

export async function decryptAESKeyWithRSA(encryptedKeyBase64, privateKeyBase64) {


    if (!encryptedKeyBase64 || typeof encryptedKeyBase64 !== "string") {
  throw new Error("❌ Invalid or missing encrypted AES key base64");
}

if (!privateKeyBase64 || typeof privateKeyBase64 !== "string") {
  throw new Error("❌ Missing private RSA key from localStorage");
}
     const encryptedKey = Uint8Array.from(atob(encryptedKeyBase64), c => c.charCodeAt(0));
  const keyBuffer = Uint8Array.from(atob(privateKeyBase64), c => c.charCodeAt(0)).buffer;

  const privateKey = await window.crypto.subtle.importKey(
    "pkcs8",
    keyBuffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  );
  console.log("privateKey (CryptoKey):", privateKey);
console.log("encryptedKey (Uint8Array):", encryptedKey);
console.log("encryptedKeyBase64:", encryptedKeyBase64);
console.log("privateKeyBase64:", privateKeyBase64);

  const decryptedKey = await window.crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    encryptedKey
  );
  console.log("decryptedKey:", decryptedKey);

  return await window.crypto.subtle.importKey(
    "raw",
    decryptedKey,
    { name: "AES-GCM" },
    true,
    ["decrypt"]
  );
}

export async function decryptMessageWithAES(encryptedBase64, aesKey, ivBase64) {
  const encryptedBuffer = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
  const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0));

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    aesKey,
    encryptedBuffer
  );

  return new TextDecoder().decode(decrypted);
}

// export async function generateRSAKeyPair() {
//   return window.crypto.subtle.generateKey(
//     {
//       name: "RSA-OAEP",
//       modulusLength: 2048,
//       publicExponent: new Uint8Array([1, 0, 1]),
//       hash: "SHA-256",
//     },
//     true,
//     ["encrypt", "decrypt"]
//   );
// }
// export async function exportPrivateKey(key) {
//   const exported = await window.crypto.subtle.exportKey("pkcs8", key);
//   return btoa(String.fromCharCode(...new Uint8Array(exported)));
// }
// export async function exportPublicKey(key) {
//   const exported = await window.crypto.subtle.exportKey("spki", key);
//   return btoa(String.fromCharCode(...new Uint8Array(exported)));
// }
// export async function generateAESKey() {
//   return window.crypto.subtle.generateKey(
//     { name: "AES-GCM", length: 256 },
//     true,
//     ["encrypt", "decrypt"]
//   );
// }
// export async function encryptMessageWithAES(message, key) {
//   const iv = window.crypto.getRandomValues(new Uint8Array(12));
//   const encoded = new TextEncoder().encode(message);
//   const encrypted = await window.crypto.subtle.encrypt(
//     { name: "AES-GCM", iv },
//     key,
//     encoded
//   );
//   return {
//     encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
//     iv: btoa(String.fromCharCode(...iv)),
//   };
// }
// export async function decryptMessageWithAES(encryptedBase64, key, ivBase64) {
//   const encryptedBytes = Uint8Array.from(atob(encryptedBase64), (c) =>
//     c.charCodeAt(0)
//   );
//   const iv = Uint8Array.from(atob(ivBase64), (c) => c.charCodeAt(0));
//   const decrypted = await window.crypto.subtle.decrypt(
//     { name: "AES-GCM", iv },
//     key,
//     encryptedBytes
//   );
//   return new TextDecoder().decode(decrypted);
// }
// export async function encryptAESKeyWithRSA(aesKey, publicKeyBase64) {
//   const publicKeyBuffer = Uint8Array.from(atob(publicKeyBase64), (c) =>
//     c.charCodeAt(0)
//   );
//   const key = await window.crypto.subtle.importKey(
//     "spki",
//     publicKeyBuffer,
//     { name: "RSA-OAEP", hash: "SHA-256" },
//     true,
//     ["encrypt"]
//   );
//   const raw = await window.crypto.subtle.exportKey("raw", aesKey);
//   const encrypted = await window.crypto.subtle.encrypt(
//     { name: "RSA-OAEP" },
//     key,
//     raw
//   );
//   return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
// }
// export async function decryptAESKeyWithRSA(
//   encryptedKeyBase64,
//   privateKeyBase64
// ) {
//   const encryptedKey = Uint8Array.from(atob(encryptedKeyBase64), (c) =>
//     c.charCodeAt(0)
//   );
//   const privateKeyBuffer = Uint8Array.from(atob(privateKeyBase64), (c) =>
//     c.charCodeAt(0)
//   ).buffer;
//   const privateKey = await window.crypto.subtle.importKey(
//     "pkcs8",
//     privateKeyBuffer,
//     { name: "RSA-OAEP", hash: "SHA-256" },
//     true,
//     ["decrypt"]
//   );
//   const decrypted = await window.crypto.subtle.decrypt(
//     { name: "RSA-OAEP" },
//     privateKey,
//     encryptedKey
//   );
//   return await window.crypto.subtle.importKey(
//     "raw",
//     decrypted,
//     { name: "AES-GCM" },
//     true,
//     ["decrypt"]
//   );
// }
