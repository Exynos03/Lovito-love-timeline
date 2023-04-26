import React from 'react';
import { useState } from 'react';
import "../styles/form.css";
import { storage , userInfoRef } from '../config/firebase';
import { addDoc } from 'firebase/firestore';
import { ref, uploadBytes , getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';


const Form = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [event1, setEvent1] = useState('');
    const [event2, setEvent2] = useState('');
    const [url1,setUrl1] = useState('');
    const [url2,setUrl2] = useState('');
    
    
   const handleImag1Change =  (e) => {
        if(e.target.files[0]){
            setImage1(e.target.files[0]);
        }
    }

    const handleImag2Change =  (e) => {
        if(e.target.files[0]){
            setImage2(e.target.files[0]);
        }
    }

    const uploadFun = async () => {
        const image1Ref = ref(storage, `images/${image1.name+v4()}`);
        const image2Ref = ref(storage, `images/${image2.name+v4()}`);

        uploadBytes(image1Ref, image1)
            .then(() => {
                getDownloadURL(image1Ref).then((url) => {
                    setUrl1(url);
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
        
        uploadBytes(image2Ref, image2)
            .then ( () => {
                getDownloadURL(image2Ref).then((url) => {
                    setUrl2(url);
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
    }

 

    const handleSubmit = async () => {
        uploadFun()
        setTimeout(() => {
            addDoc(userInfoRef, {
                name1: name1,
                name2: name2,
                image1: url1,
                image2: url2,
                event1: event1,
                event2: event2
            }).then(() => {
                console.log("Document successfully written!");
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        }, 5000);   
    }



    return (
    <div>
      <h2>Create Timeline</h2>

      
      <label>
        Name 1:
        <input type="text" onChange={ (e) => setName1(e.target.value)} />
      </label>
      <label>
        Name 2:
        <input type="text" onChange={ (e) => setName2(e.target.value)}  />
      </label>
      <label>
        Image 1:
        <input type="file" onChange={handleImag1Change} />
      </label>
      <label>
        Image 2:
        <input type="file" onChange={handleImag2Change} />
        
      </label>
      <label>
        Event 1:
        <input type="text" onChange={ (e) => setEvent1(e.target.value)} />
      </label>
      <label>
        Event 2:
        <input type="text" onChange={ (e) => setEvent2(e.target.value)}/>
      </label>
      
      <button type="submit" onClick={handleSubmit}>Submit</button>

        
    </div>
  )
}

export default Form
