import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyB8vD2lC-iMA9MRxv3XuZEcd6AvH-Riz6A",
    authDomain: "home-c3227.firebaseapp.com",
    databaseURL: "https://home-c3227.firebaseio.com",
    projectId: "home-c3227",
    storageBucket: "home-c3227.appspot.com",
    messagingSenderId: "172845708106",
    appId: "1:172845708106:web:860b588af56a5f26ae07b3",
    measurementId: "G-49WX1B4CHX"
};

class Firebase {
    constructor(){
        app.initializeApp(config);
        this.db = app.firestore();
        this.auth = app.auth();
        this.storage = app.storage();
    }

    estaIniciado() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }

    guardarDocumento = ( nombreDocumento, documento) => this.storage.ref().child(nombreDocumento).put(documento);

    devolverDocumento = ( documentoUrl ) => this.storage.ref().child(documentoUrl).getDownloadURL();


}

export default Firebase;