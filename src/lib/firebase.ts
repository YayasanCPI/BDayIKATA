import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Reference to our single shared card document
export const cardDocRef = doc(db, 'cards', 'shared-card');

// Reference to our guestbook collection
export const guestbookCollection = collection(db, 'guestbook');
