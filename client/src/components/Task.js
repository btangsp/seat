import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import '../css/components.css';

import { shuffledFiles } from '../utilities/data';
import Audio, { updateAudio } from './Audio';
import AudioRadioButtonGroup from './AudioRadioButtonGroup';

import text from '../json/text.json';

const RefSection = ({ index, audioRef, refEnded, setRefEnded, shuffledData }) => (
    <div className='section col-all'>
        <ReactMarkdown children={`**Question ${ index + 1 } of ${shuffledData.length}**`}/>
        {(!refEnded) ? <ReactMarkdown children={text.audio_group.ref_prompt}/> : <br></br>}
        <Audio name={'test-abx'}
            file={'X/' + shuffledData[index].reference} 
            audioRef={audioRef} 
            setAudioEnded={setRefEnded}
        />
    </div>
);

// (secondEnded ? text.audio_group.question : (firstEnded ? text.audio_group.second_audio : (refEnded ? text.audio_group.first_audio : '')))

const ABSection = ({ choice, updateChoice, audioRef_1, audioRef_2, audioRef_3, refEnded, firstEnded, setFirstEnded, secondEnded, setSecondEnded, files }) => {
    
    let taskInstruction = '';
    let audioRef = null;
    let audioEnded = null;
    let setAudioEnded = null;

    if (secondEnded) {
        taskInstruction = text.audio_group.question;
        audioRef = [audioRef_2, audioRef_3];
        audioEnded = secondEnded;
        setAudioEnded = setSecondEnded;
    } else if (firstEnded) {
        taskInstruction = text.audio_group.second_audio;
        audioRef = [audioRef_2, audioRef_3];
        audioEnded = secondEnded;
        setAudioEnded = setSecondEnded;
    } else if (refEnded) {
        taskInstruction = text.audio_group.first_audio;
        audioRef = [audioRef_2];
        audioEnded = firstEnded;
        setAudioEnded = setFirstEnded;
    }

    // setResObj({ ...resObj, FilenameList: files });

    return (
        <div className="section col-all">
            <ReactMarkdown children={taskInstruction} />
            {audioRef ? <AudioRadioButtonGroup name={'test-abx'} 
				files={files} 
				choice={choice}
				updateChoice={updateChoice}
				audioRefs={audioRef}
				refEnded={refEnded}
				audioEnded={audioEnded}
				setAudioEnded={setAudioEnded}
			/> : null}
        </div>
    )
};

const NextButton = ({ index, setIndex, choice, updateChoice, audioRef_1, audioRef_2, audioRef_3, setRefEnded, setFirstEnded, setSecondEnded, navigation, shuffledData, files, responseList, setResponseList }) => {
    const { next } = navigation;
    const clickHandler = (index, setIndex, choice, updateChoice, audioRef_1, audioRef_2, audioRef_3, setRefEnded, setFirstEnded, setSecondEnded, next) => { 
        
        const resObj = { Files: files, OrderAsked: choice };
        responseList.push(resObj);
        setResponseList(responseList);
        
        if (index < 9) {
            setIndex(index + 1);
            const audioRefs = [audioRef_1, audioRef_2, audioRef_3];
            (index < shuffledData.length - 1) && audioRefs.map(audioRef => updateAudio(audioRef));
            if (index > -1 && index < shuffledData.length - 1) {
                updateChoice(-1);
                setRefEnded(false);
                setFirstEnded(false);
                setSecondEnded(false);
            }
        } else {
            next();
        }    
    }
    
    return (
        (choice !== -1) ? (
            <div className="section col-2 align-right">
                {<a href="#" className="button" onClick={() => clickHandler(index, setIndex, choice, updateChoice, audioRef_1, audioRef_2, audioRef_3, setRefEnded, setFirstEnded, setSecondEnded, next)}>Next</a>}
            </div>
        ) : <></>
    );
};

const Task = ({ index, setIndex, audioRef_1, audioRef_2, audioRef_3, refEnded, setRefEnded, firstEnded, setFirstEnded, secondEnded, setSecondEnded, navigation, shuffledData, response, responseList, setResponseList }) => {
    const [choice, setChoice] = useState(-1);

    const files = shuffledFiles(shuffledData[index]);

    const updateChoice = (val) => {
        setChoice(val);
    }

    return (
        <div className="container grid">
            <RefSection 
                index={index} 
                audioRef={audioRef_1} 
                refEnded={refEnded}
                setRefEnded={setRefEnded} 
                shuffledData={shuffledData}
            />
            <ABSection 
                choice={choice}
                updateChoice={updateChoice}
                audioRef_1={audioRef_1}
                audioRef_2={audioRef_2}
                audioRef_3={audioRef_3}
                refEnded={refEnded}
                firstEnded={firstEnded}
                setFirstEnded={setFirstEnded}
                secondEnded={secondEnded}
                setSecondEnded={setSecondEnded}
                files={files}
            />
            <NextButton 
                index={index} 
                setIndex={setIndex}
                choice={choice}
                updateChoice={updateChoice}
                audioRef_1={audioRef_1}
                audioRef_2={audioRef_2}
                audioRef_3={audioRef_3}
                setRefEnded={setRefEnded} 
                setFirstEnded={setFirstEnded} 
                setSecondEnded={setSecondEnded}
                navigation={navigation}
                shuffledData={shuffledData}
                files={files}
                responseList={responseList}
                setResponseList={setResponseList}
            />
        </div>
    );
};

export default Task;