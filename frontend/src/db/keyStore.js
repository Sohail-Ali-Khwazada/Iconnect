import Dexie from 'dexie';

const db = new Dexie('iConnectDB');

db.version(1).stores({
  userKeys: 'username' 
});

export const savePrivateKey = async (username, privateKeyBase64) => {
  await db.userKeys.put({
    username,
    privateKeyBase64,
  });
};

export const loadPrivateKey = async (username) => {
  const result = await db.userKeys.get(username);
  return result?.privateKeyBase64 || null;
};

// export const deletePrivateKey = async (userId) => {
//   await db.userKeys.delete(username);
// };
