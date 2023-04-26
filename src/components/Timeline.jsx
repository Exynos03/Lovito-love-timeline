import React from 'react';
import { useState } from 'react';
import { getDownloadURL,ref } from 'firebase/storage';
import { storage } from '../config/firebase';
import { v4 } from 'uuid';

const Timeline = ({ img1 , img2}) => {
    const [image1Url, setImage1Url] = useState('');
    const [image2Url, setImage2Url] = useState('');
    
    getDownloadURL(img1).then((url) => {
        setImage1Url(url);
        }).catch((error) => {
        console.log(error);
        });

    getDownloadURL(img2).then((url) => {
        setImage2Url(url);
        }).catch((error) => {
        console.log(error);
        });
  
    return (
    <div>
    <p>{name1}</p>
    <p>{name2}</p>
    <img src={image1Url} alt='Img 1' />
    <img src={image2Url} alt='Img 2' />
    <p>{event1}</p>
    <p>{event2}</p>
    </div>
  )
}

export default Timeline
