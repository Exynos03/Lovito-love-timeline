import React from 'react';
import { useState } from 'react';
import '../styles/Form.css'
import { storage , userInfoRef } from '../config/firebase';
import { addDoc } from 'firebase/firestore';
import { ref, uploadBytes , getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import SyncLoader from "react-spinners/SyncLoader";

export let docID ;

const Form = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [event1, setEvent1] = useState('');
    const [event2, setEvent2] = useState('');
    const [event3, setEvent3] = useState('');
    const [event1Date, setEvent1Date] = useState('');
    const [event2Date, setEvent2Date] = useState('');
    const [event3Date, setEvent3Date] = useState('');
    const [foundDate, setFoundDate] = useState('');
    const [talkDate, setTalkDate] = useState('');
    const [fallInLoveDate, setFallInLoveDate] = useState('');
    const [loader , setLoader] = useState(false);
  
    const navigate = useNavigate();

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

    const handleSubmit = async () => {
     

        const image1Ref = ref(storage, `images/${image1.name+v4()}`);
        const image2Ref = ref(storage, `images/${image2.name+v4()}`);
        setLoader(true);

        try {
            await uploadBytes(image1Ref, image1); 
            await uploadBytes(image2Ref, image2);
            const url1 = await getDownloadURL(image1Ref);
            const url2 = await getDownloadURL(image2Ref);
            const docRef = await addDoc(userInfoRef, {
                name1: name1,
                name2: name2,
                image1: url1,
                image2: url2,
                event1: event1,
                event2: event2,
                event3: event3,
                foundDate: foundDate,
                talkDate: talkDate,
                fallInLoveDate: fallInLoveDate,
                event1Date: event1Date,
                event2Date: event2Date,
                event3Date: event3Date
            });
            docID = docRef.id;
            docRef.id && setLoader(false);
            console.log("Document written with ID: ", docID );
            navigate('/timeline');

        }catch(error) {
            console.log(error);
        }
    }
    


    return (
    <div className='form'>

        {loader 
        ? 
        <SyncLoader color={"#2A2F4F"} loading={loader} size={25} />
        :
        <div className='form'>
            <h2>Create Timeline</h2>
            <label>
                Your Name
                <input type="text" placeholder='Enter your name' required onChange={ (e) => setName1(e.target.value)} />
            </label>
            <label>
                Partner Name
                <input type="text" placeholder='Enter your partner name' required onChange={ (e) => setName2(e.target.value)}  />
            </label>
            
            {image1 ?
            <label>
            Your Image
                <div className='show-file'>
                    <p>{image1.name}</p>
                    <input type="file" className='hidden-inpt-again' required onChange={handleImag1Change}  />
                </div>
            </label>
            :
            <label>
            Your Image
                <input type="file" className='hidden-inpt' required onChange={handleImag1Change}  />
            </label>
            }

            {image2 ?
            <label>
            Partner Image
                <div className='show-file'>
                    <p>{image2.name}</p>
                    <input type="file" className='hidden-inpt-again' required onChange={handleImag2Change}  />
                </div>
            </label>
            :
            <label>
            Partner Image
                <input type="file" className='hidden-inpt' required onChange={handleImag2Change}  />
            </label>
            }

            <label>
                When did you find each other ?
                <input type="date" className='date' required onChange={ (e) => setFoundDate(e.target.value)} />
            </label>

            <label>
                When did you started talking ?
                <input type="date" className='date' required onChange={ (e) => setTalkDate(e.target.value)} />
            </label>

            <label>
                When did you fall in love ?
                <input type="date" className='date' required onChange={ (e) => setFallInLoveDate(e.target.value)} />
            </label>
            
            <div className='event'>
                <label>
                    Event 1
                    <input type="text" placeholder='First Event' required onChange={ (e) => setEvent1(e.target.value)} />
                </label>
                <label>
                    Date of Event 1
                    <input type="date" className='date' required onChange={ (e) => setEvent1Date(e.target.value)} />
                </label>
            </div>
            <div className='event'>
                <label>
                    Event 2
                    <input type="text" placeholder='Second Event' required onChange={ (e) => setEvent2(e.target.value)} />
                </label>
                <label>
                    Date of Event 2
                    <input type="date" className='date' required onChange={ (e) => setEvent2Date(e.target.value)} />
                </label>
            </div>
            <div className='event'>
                <label>
                    Event 3
                    <input type="text" placeholder='Third Event' required onChange={ (e) => setEvent3(e.target.value)} />
                </label>
                <label>
                    Date of Event 3
                    <input type="date" className='date' required onChange={ (e) => setEvent3Date(e.target.value)} />
                </label>
            </div>

            <button type="submit" onClick={handleSubmit}>Check Timeline</button>
        </div>
        }
        </div>
    )
}

export default Form
