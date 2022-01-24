import React, { useState } from 'react';
import { useStep } from 'react-hooks-helper';

import '../css/components.css';

import WelcomePage from './WelcomePage';
import InstructionPage from './InstructionPage';
import TaskPage from './TaskPage';
import FeedbackPage from './FeedbackPage';
import EndPage from './EndPage';
import QualPage from './QualPage';

import data from '../json/abx.json';
import { shuffle } from '../utilities/data.js';

const steps = [
    { id: 'welcome' },
    { id: 'qualifications' },
    { id: 'instructions' },
    { id: 'tasks' },
    { id: 'feedback' },
    { id: 'end' }
];

const shuffledData = shuffle(data.filenames);

const MultiPageSurvey = () => {
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;
    const [response, setResponse] = useState({
        "participant": {
            "Is18": false,
            "IsHearing": false,
            "ListeningDevice": -1,
            "IsQuietEnv": false
        },
        "shuffled_data": shuffledData.slice(0,10)
    });
    const [responseList, setResponseList] = useState([]);

    switch (id) {
        case 'welcome':
            return <WelcomePage navigation={navigation} />;
        case 'qualifications':
            return <QualPage response={response} setResponse={setResponse} navigation={navigation} />;
        case 'instructions':
            return <InstructionPage navigation={navigation} />;
        case 'tasks':
            return <TaskPage response={response} responseList={responseList} setResponseList={setResponseList} navigation={navigation} />;
        case 'feedback':
            return <FeedbackPage response={response} responseList={responseList} setResponse={setResponse} navigation={navigation} />;
        case 'end':
            return <EndPage />;
    }
};

export default MultiPageSurvey;