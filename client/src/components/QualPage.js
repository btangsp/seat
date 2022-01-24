import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import text from '../json/text.json';

const appURL = window.location.protocol + "//" + window.location.host;

const Choice = ({ key_i, choice, setChoice, label }) => {
    return (
        <li className="grid">
            <input type="radio" name="" id={key_i} />
            <div className={`check col-1 ${key_i === choice ? "selected" : ""}`} onClick={() => setChoice(key_i)}>
                <div className="inside"></div>
            </div>
            <label htmlFor="" className="col-3" onClick={() => setChoice(key_i)}>{label}</label>
        </li>
    )
}

const MultipleChoice = ({ choice, setChoice, labels }) => {
    return (
        <ul className="MultipleChoice">
            {labels.map((item, key) => 
                <Choice key={key} key_i={key} choice={choice} setChoice={setChoice} label={item} />
            )}
        </ul>
    )
}

const NextButton = ({ clickHandler }) => {
    return (
        <div className="section col-2 align-right">
            <a href="#" className="button" onClick={() => clickHandler()}>Next</a>
        </div>
    )
}

const QualQuestion = ({ choice, setChoice, index }) => {
    return (
        <>
            <ReactMarkdown children={`**Question ${index + 1}.** ${text.qual_questions[index].question}`} />
            <MultipleChoice choice={choice} setChoice={setChoice} labels={text.qual_questions[index].labels} />
        </>
    )
}

const QualPage = ({ response, setResponse, navigation }) => {
    const [index, setIndex] = useState(0);
    const [choice, setChoice] = useState(-1);
    const { go, next } = navigation;

    const clickHandler = () => {
        if (index === 2) {
            response.participant['ListeningDevice'] = choice;
            setResponse({...response});
        }
        if (choice === text.qual_questions[index].answer) {
            if (index === 0) {
                response.participant['Is18'] = true;
            } else if (index === 1) {
                response.participant['IsHearing'] = true;
            } else if (index === 3) {                
                response.participant['IsQuietEnv'] = true;
            }
            setResponse({...response});
            if (index + 1 < text.qual_questions.length) {
                setIndex(index + 1);
                setChoice(-1);
            } else {
                next();
            }
        } else {
            fetch(appURL + '/api/participant', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Is18": response['participant']['Is18'],
                    "IsHearing": response['participant']['IsHearing'],
                    "ListeningDevice": response['participant']['ListeningDevice'],
                    "IsQuietEnv": response['participant']['IsQuietEnv']
                })
            })
            .catch((err) => {
                console.error(err);
            });
            go('end');
        }
    }

    return (
        <div className="container grid">
            <QualQuestion choice={choice} setChoice={setChoice} index={index} />
            {(choice !== -1) && <NextButton clickHandler={clickHandler} />}
        </div>
    )
}

export default QualPage;