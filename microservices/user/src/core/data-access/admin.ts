import firebase from "firebase";
import 'firebase/storage';
import { DB_CONFIG } from "../../config";
import admin from 'firebase-admin';

firebase.initializeApp(DB_CONFIG.firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert(DB_CONFIG.serviceAccountKey),
    storageBucket: DB_CONFIG.bucketName,
});

export const db = firebase.firestore();
export const storageRef = firebase.storage().ref();
export const bucket = admin.storage().bucket();
