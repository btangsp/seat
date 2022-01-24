import React from 'react';
import ReactMarkdown from 'react-markdown';

import '../css/components.css';
import text from '../json/text.json'

const WelcomePage = ({ navigation }) => {
    const { next } = navigation;

	return (
		<div className="container grid">
			<div className="section col-all">
				<ReactMarkdown children={text.welcome_txt.intro}/>
				<ReactMarkdown children={text.welcome_txt.description}/>
				<ReactMarkdown children={text.welcome_txt.privacy}/>
				<ReactMarkdown children={text.welcome_txt.consent}/>
				<ReactMarkdown children={text.welcome_txt.contact}/>
			</div>
			<div className='section col-2 align-right'>
				<a href="#" className="button" onClick={next}>I Agree</a>
			</div>
		</div>
	);
}

export default WelcomePage;