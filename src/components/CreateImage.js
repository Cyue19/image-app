import React, { Component } from 'react';

import Firebase from "../firebase/Firebase";

export default class CreateImage extends Component {

    constructor(props) {
        super(props);
        this.db = Firebase.getInstance().db;
        this.storage = Firebase.getInstance().storage;

        this.state = {
            file: null,
            fileData: null
        }
    }

    onImageSelected(e) {
        const file = e.target.files[0];
        this.setState({
            file: e.target.files[0]
        })

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e) => {
                this.setState({
                    fileData: e.target.result
                });
                console.log(e.target.result);
            };
        }
    }

    uploadImage(e) {
        e.preventDefault();
        const { file } = this.state;

        if (file) {
            const uploadTask = this.storage.ref('images/' + file.name).put(file);
    
            uploadTask.on('state_changed',
            (snap) => {
                const progress = snap.bytesTransferred / snap.totalBytes * 100.0;
                console.log("Progress: ", progress, "%");
            },
            (err) => {
                console.log(err);
            },
            () => this.onFileUploaded(uploadTask)
            );
        } else {
            return;
        }
    }

    async onFileUploaded(uploadTask) {
        const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
        await this.db.collection("images").doc().set({
            url: imageUrl
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.uploadImage(e)}>
                    <input onChange={(e) => this.onImageSelected(e)} type="file" />

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
