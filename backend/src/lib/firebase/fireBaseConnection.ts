// eslint-disable-next-line import/no-extraneous-dependencies
import admin from 'firebase-admin';

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, '\n');
}

function createFirebaseAdminApp(params) {
  const privateKey = formatPrivateKey(params.privateKey);
  if (admin.apps.length > 0) return admin.app();

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });
  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}

export async function initAdmin() {
  const params = {
    projectId: process.env.Firebase_Project_Id,
    clientEmail: process.env.Firebase_Client_Email,
    storageBucket: process.env.Firebase_Storage_Bucket,
    privateKey: process.env.Firebase_Private_key,
  };

  return createFirebaseAdminApp(params);
}
