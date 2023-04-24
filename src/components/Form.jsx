import React from 'react';
import { useState } from 'react';
import "../styles/form.css";
import { storage , userInfoRef } from '../config/firebase';
import { addDoc } from 'firebase/firestore';
import { ref, getDownloadURL , uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

const Form = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [event1, setEvent1] = useState('');
    const [event2, setEvent2] = useState('');
    const [url1, setUrl1] = useState('');
    const [url2, setUrl2] = useState('');
    
    
    const handleSubmit = async () => {
        if(image1==null || image2==null || name1==='' || name2==='' ){
            alert("Please fill all the fields");
            return;
        }

        const image1Ref = ref(storage, `images/${image1.name+v4()}`);
        const image2Ref = ref(storage, `images/${image2.name+v4()}`);
        
        try{
            await uploadBytes(image1Ref, image1);
            alert("Image 1 uploaded");
        }catch(error){console.log(error)}
        
        try{
            await uploadBytes(image2Ref, image2);
            alert("Image 2 uploaded");
        }catch(error){console.log(error)}
        
        getDownloadURL(image1Ref).then((url) => {
            setUrl1(url);
        }).catch((error) => {
            console.log(error);
        });

        getDownloadURL(image2Ref).then((url) => {
            setUrl2(url);
        }).catch((error) => {
            console.log(error);
        });

        try{
            
            await addDoc(userInfoRef, {
                name1: name1,
                name2: name2,
                image1Url: url1,
                image2Url: url2,
                event1: event1,
                event2: event2
            })
        }catch(error){
            console.log(error);
        }
       
        //await uploadData();
    } 

    const userInfo = {
        name1: name1,
        name2: name2,
        image1Url: url1,
        image2Url: url2,
        event1: event1,
        event2: event2
    }

    console.log(userInfo);

    
    const uploadData = async () => {
        try{
            
            await addDoc(userInfoRef, {
                ...userInfo
            })
        }catch(error){
            console.log(error);
        }
    }
    

    const handleImage1Change = (e) => {
        if(e.target.files[0]){
            setImage1(e.target.files[0])
        }
    }
    const handleImage2Change = (e) => {
        if(e.target.files[0]){
            setImage2(e.target.files[0])
        }
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
        <input type="file" onChange={handleImage1Change} />
      </label>
      <label>
        Image 2:
        <input type="file" onChange={handleImage2Change} />
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
