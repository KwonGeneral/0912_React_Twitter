
import firebase from "firebase/compat";
import "firebase/auth"

// 파이어베이스 데이터베이스
import "firebase/firestore"

// 파이어베이스 저장소
import "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// export default firebase.initializeApp(firebaseConfig)
firebase.initializeApp(firebaseConfig)

export const authService = firebase.auth();

// 소셜 로그인 기능 : 위의 auth 함수에는 소셜 로그인에 필요한 provider가 없다.
export const firebaseInstance = firebase;

// 파이어베이스 데이터베이스
export const dbService = firebase.firestore();

// 파이어베이스 저장소
export const storageService = firebase.storage();




