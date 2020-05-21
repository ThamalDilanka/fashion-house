import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAmGQxuzZLamD8XrHWFIdfvOlADWdQl_NU',
	authDomain: 'fashionhouse-c4b93.firebaseapp.com',
	databaseURL: 'https://fashionhouse-c4b93.firebaseio.com',
	projectId: 'fashionhouse-c4b93',
	storageBucket: 'fashionhouse-c4b93.appspot.com',
	messagingSenderId: '240199992678',
	appId: '1:240199992678:web:de397c9b9b1f8ed4c474a7',
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
