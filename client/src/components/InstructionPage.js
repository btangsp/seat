import React from 'react';
import ReactMarkdown from 'react-markdown';

import '../css/components.css';

const InstructionPage = ({ navigation }) => {
    const { next } = navigation;

    return (
		<div className="container grid">
			<div className="section col-all">
				<ReactMarkdown children={`### **Instructions** \nIn this experiment, you will do a series of two-way 
					comparisons. In each comparison, you will first be presented a reference recording. 
					You will then be presented two time-stretched versions of the reference that either 
					increase or decrease its duration/speed. After listening to all three recordings, 
					you will be asked to choose the higher-quality (more natural, fewer audio artifacts) 
					time-stretched audio. \n\n**NOTE:** The time-stretched recordings will not have the 
					same duration as the original audio.`}/>
			</div>
			<div className='section col-2 align-right'>
				<a href="#" className="button" onClick={next}>Next</a>
			</div>
		</div>
	);
};

export default InstructionPage;