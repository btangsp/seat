import React from 'react';
import Audio from './Audio';

import '../css/components.css';

const AudioRadioButton = ({ name, file, index, choice, updateChoice, audioRef, audioEnded, setAudioEnded }) => {
	const handleClick = val => {
		updateChoice(val);
	};
	
	let radioButton = <div className="col-1"></div>;
	if (audioEnded) {
		radioButton = (
            <div className={`check col-1 ${index === choice ? "selected" : ""}`} onClick={() => handleClick(index)}>
                <div className="inside"></div>
            </div>
        );
	}
	return (
		<li className="grid">
			<input type="radio" id={name} value="A" name={name}/>
			{radioButton}
			<label htmlFor={name} className="col-3"><Audio name={name} file={file} audioRef={audioRef} setAudioEnded={setAudioEnded}/></label>
		</li>
	);  
};

const AudioRadioButtonGroup = ({ name, files, choice, updateChoice, audioRefs, audioEnded, setAudioEnded }) => {
	const audioButton = files.map((item, key) => 
		<AudioRadioButton 
			name={name} 
			file={item} 
			key={key} 
			index={key} 
			choice={choice} 
			updateChoice={updateChoice}
			audioRef={audioRefs[key]}
			audioEnded={audioEnded}
			setAudioEnded={setAudioEnded}
		/>
	);
	return (
		<ul className="AudioRadioButtonGroup">
			{audioButton}
		</ul>
	);
};

export default AudioRadioButtonGroup;