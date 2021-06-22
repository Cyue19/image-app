import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

import React, { Component } from 'react'

export default class Firebase extends Component {
    //use as singleton
    static instance;

    static getInstance() {
        if (!Firebase.instance) {
            Firebase.instance = new Firebase();
        }
        return Firebase.instance;
    }

    constructor(props) {
        super(props);

        this.firebase = firebase.initializeApp({
            apiKey: "AIzaSyByUVAApAlMdHos1jmT4nAQbaR-KEZufU4",
            authDomain: "task-list2-d84e9.firebaseapp.com",
            projectId: "task-list2-d84e9",
            storageBucket: "task-list2-d84e9.appspot.com",
            messagingSenderId: "640800326082",
            appId: "1:640800326082:web:437d779e17681df340165b",
            measurementId: "G-YJXQ9NEQ5Z"
        });

        this.db = this.firebase.firestore();
        this.auth = this.firebase.auth();
        this.storage = this.firebase.storage();
    }
}