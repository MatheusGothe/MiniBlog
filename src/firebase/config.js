// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, onSnapshot } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFFdZOsHcNg2CICYcRDCkM7lZWw9SbYoM",
  authDomain: "miniblog-4ba80.firebaseapp.com",
  projectId: "miniblog-4ba80",
  storageBucket: "miniblog-4ba80.appspot.com",
  messagingSenderId: "830225390769",
  appId: "1:830225390769:web:ebbd042a780ce7cfc7d690"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const updateLikeCount = async (postId, likeCount) => {
  try {
    const postRef = doc(db, 'posts', postId)
    await updateDoc(postRef, {
      likeCount
    })
  } catch (error) {
    console.log(error)
  }
}

const watchLikeCount = (postId, setLikeCount) => {
  const postRef = doc(db, 'posts', postId)
  onSnapshot(postRef, (doc) => {
    if (doc.exists()) {
      const post = doc.data()
      setLikeCount(post.likeCount)
    }
  })
}

export { db, updateLikeCount, watchLikeCount }
