import React from 'react';

import '../css/components.css';

export const updateAudio = (audioRef) => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.load();
    }
};

const Audio = ({ name, file, audioRef, setAudioEnded }) => {
	return (
		<audio 
			className={`audio-single`} 
			controls ref={audioRef} 
			controlsList="nodownload" 
			onEnded={() => {if (typeof(setAudioEnded) !== "undefined") {setAudioEnded(true);}}}>
			<source src={`user-studies/${name}/audio/${file}`} type='audio/mpeg'/>
		</audio>
	);
};

export default Audio;