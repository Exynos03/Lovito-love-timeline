import React, { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../config/firebase';
import { collection , getDocs } from 'firebase/firestore';
import { docID } from './Form';

const Timeline = () => {
    const [dataFile , setDataFile] = useState([]);
    
    const dataRef = collection(db, 'userInfo');

    useEffect(() => {
        getData();
    }, [])
    
    
    const getData = async () => {
        
    try {
        const data = await getDocs(dataRef);
        const filteredData = data.docs.map((doc) => (
            {
                ...doc.data(),
                id: doc.id,
            }
        ))
        
        for(let i=0;i<filteredData.length;i++){
            if(filteredData[i].id === docID){
                setDataFile(filteredData[i]);
            }
        }
    }catch(error) {
        console.log(error);
    }
    }
    

   
    

  
    return (
    <div>
     <h2>TimeLine</h2>
    
    <p>{dataFile.name1}</p>
    <p>{dataFile.name2}</p>
    <img src={dataFile.image1} alt='Img 1' />
    <img src={dataFile.image2} alt='Img 2' />
    <p>{dataFile.event1}</p>
    <p>{dataFile.event2}</p>
    
    
    </div>
  )
}

export default Timeline
