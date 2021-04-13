import firebase from "firebase";
import 'firebase/storage';
import { db_connection } from "../../config";
import admin from 'firebase-admin';

firebase.initializeApp(db_connection.firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert(db_connection.serviceAccountKey),
    storageBucket: db_connection.bucketName,
});

export const db = firebase.firestore();
export const storageRef = firebase.storage().ref();
export const bucket = admin.storage().bucket();
