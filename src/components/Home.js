import React, { Component } from 'react';

import Firebase from "../firebase/Firebase";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.db = Firebase.getInstance().db;

        this.state = {
            images: [],
            loading: true
        }
    }

    componentDidMount() {
        this.fetchImagesFromFirebase();
    }

    async fetchImagesFromFirebase() {
        const snapshot = await this.db.collection("images").get();
        console.log(snapshot);
        const images = snapshot.docs.map(doc => doc.data().url);

        this.setState({
            images
        })
    }

    render() {
        return (
            <div>
                {this.state.images.map(url =>
                    <div><img src={url} alt="image"></img></div>
                )}
            </div>
        )
    }
}
