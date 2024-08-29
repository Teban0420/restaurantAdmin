
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {firebaseConfig } from './config';



export const firebase = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(firebase);
export const firebase_db = getFirestore(firebase);
// export const storage = getStorage(firebase, 'gs://restaurante-e6b45.appspot.com')
export const storage = getStorage(firebase) 
