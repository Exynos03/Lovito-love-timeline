import React, { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../config/firebase';
import { collection , getDocs } from 'firebase/firestore';
import { docID } from './Form';
import '../styles/Timeline.css';
import moment from 'moment/moment';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

const Timeline = () => {
    const [dataFile , setDataFile] = useState([]);
   
    
    const dataRef = collection(db, 'userInfo');

    useEffect(() => {
        getData();
    },[])
    

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

    const downloadTimeline = async () => {
        const canvas = await html2canvas(document.getElementById('timeline'));
        const dataURL = canvas.toDataURL('image/png');
        downloadjs(dataURL, 'TImeline.png', 'image/png');
    }
    
return (
    <div className='timeline-main'>
    <div className='timeline-compo' id='timeline'>
    
    <div className='upper-div'>
        <img src={dataFile.image1} className='img-1' alt='Pic 1' />
        <p className='name-text'>When {dataFile.name1} meet {dataFile.name2}</p>
        <img src={dataFile.image2}  className='img-1' alt='pic 2'/>
    </div>

    <div className='left-div'>
        <img src='Group 53448.svg' alt='svg-1' />
        <div className='align' >
            <p className='main-text' >{moment(dataFile.event1Date, 'YYYY-MM-DD').format('Do MMMM YYYY')}</p>
            <p className='left-event-txt' >{dataFile.event1}</p>
        </div>
    </div>    
    <img src='Vector 5.svg' alt='line' className='svg-left-right' />
    <div className='right-div'>
        <div className='align' >
            <p className='main-text' >{moment(dataFile.event2Date, 'YYYY-MM-DD').format('Do MMMM YYYY')}</p>
            <p className='left-event-txt' >{dataFile.event2}</p>
        </div>
        <img src='undraw_people_search_re_5rre.svg' alt='svg-1' />
    </div> 
    <img src='Vector 6.svg' alt='line' className='svg-left-right' />
    <div className='left-div'>
        <img src='undraw_everywhere_together_re_xe5a 1.svg' alt='svg-1' />
        <div className='align' >
            <p className='main-text' >{moment(dataFile.foundDate, 'YYYY-MM-DD').format('Do MMMM YYYY')}</p>
            <p className='left-event-txt' >We found each other</p>
        </div>
    </div> 
    <img src='Vector 5.svg' alt='line' className='svg-left-right' />
    <div className='right-div'>
        <div className='align' >
            <p className='main-text' >{moment(dataFile.talkDate, 'YYYY-MM-DD').format('Do MMMM YYYY')}</p>
            <p className='left-event-txt' >We started talking</p>
        </div>
        <img src='Group 53426.svg' alt='svg-1' />
    </div>
    <img src='Vector 6.svg' alt='line' className='svg-left-right' />
    <div className='left-div'>
        <img src='Group.svg' alt='svg-1' />
        <div className='align' >
            <p className='main-text' >{moment(dataFile.event3Date, 'YYYY-MM-DD').format('Do MMMM YYYY')}</p>
            <p className='left-event-txt' >{dataFile.event3}</p>
        </div>
    </div>  
    <img src='Vector 5.svg' alt='line' className='svg-left-right' /> 
    <div className='right-div'>
        <div className='align' >
            <p className='main-text' >{moment(dataFile.fallInLoveDate, 'YYYY-MM-DD').format('Do MMMM YYYY')}</p>
            <p className='left-event-txt' >Fell in love</p>
        </div>
        <img src='Group 53429.svg' alt='svg-1' />
    </div>
    <img src='Vector 6.svg' alt='line' className='svg-left-right' />
    <div className='left-div'>
        <div className='main-img'>
            <img src={dataFile.image1} className='img-left'  alt='Pic 1' />
            <img src={dataFile.image2} className='img-right'  alt='Pic 1' />
        </div>
        
        <div className='align'>
            <p className='main-text-align'>{dataFile.name1} & {dataFile.name2}</p>
            <p className='loveto-text'>Loveto for life</p>
        </div> 
    </div>  
    
    
    </div>
    <button className='btn' onClick={downloadTimeline}>Download</button>
    </div>
  )
}

export default Timeline

