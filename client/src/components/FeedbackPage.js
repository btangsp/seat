import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import text from '../json/text.json';

const appURL = window.location.protocol + "//" + window.location.host;

const checkInput = (input) => {
    if (!input.trim()) {
		alert('Please leave a response. If your listening environment has not changed, "N/A" and similar responses are acceptable.');
        return false;
	}
    return true;
};

const callAPI = async (response, responseList) => {

    await fetch(appURL + '/api/participant', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Is18": 1,
            "IsHearing": 1,
            "ListeningDevice": 0,
            "IsQuietEnv": 1
        })
    });

    let res;
    let data;
    let participantID;
    let surveyID;

    // gets participantID
    try {
        res = await fetch(appURL + '/api/id');
        data = await res.json();
        participantID = data[0]['LAST_INSERT_ID()'];
        console.log(participantID);
    } catch (err) {
        console.log(err);
    }

    await fetch(appURL + '/api/survey', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "participant_id": participantID
        })
    });

    // gets surveyID
    try {
        res = await fetch(appURL + '/api/id');
        data = await res.json();
        surveyID = data[0]['LAST_INSERT_ID()'];
        // console.log(surveyID);
    } catch (err) {
        console.log(err);
    }

    await Promise.all(response['shuffled_data'].map((value, key) => {
        // console.log(`value: ${value['reference'].replace(/\.[^/.]+$/, "")} key: ${key}`);
        fetch(appURL + '/api/question', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "TestGroupID": value['reference'].replace(/\.[^/.]+$/, ""),
                "SurveyID": surveyID,
                "OrderAsked": key
            })
        })
    }));

    let soundFileList = [];

    let files = responseList[0]['Files'];
    let orderAsked = responseList[0]['OrderAsked'];
    let file = files[orderAsked];
    console.log("files", files);
    console.log("orderAsked", orderAsked);

    try {
        res = await fetch(appURL + '/api/soundfile/' + file.replace(/^.*[\\\/]/, ''));
        console.log("res", res);
        data = await res.json();
        console.log("data", data[0]["ID"]);
        soundFileList.push(data[0]["ID"]);
    } catch (err) {
        console.log(err);
    }

    files = responseList[1]['Files'];
    orderAsked = responseList[1]['OrderAsked'];
    file = files[orderAsked];

    try {
        res = await fetch(appURL + '/api/soundfile/' + file.replace(/^.*[\\\/]/, ''));
        console.log("res", res);
        data = await res.json();
        console.log("data", data[0]["ID"]);
        soundFileList.push(data[0]["ID"]);
    } catch (err) {
        console.log(err);
    }

    files = responseList[2]['Files'];
    orderAsked = responseList[2]['OrderAsked'];
    file = files[orderAsked];

    try {
        res = await fetch(appURL + '/api/soundfile/' + file.replace(/^.*[\\\/]/, ''));
        console.log("res", res);
        data = await res.json();
        console.log("data", data[0]["ID"]);
        soundFileList.push(data[0]["ID"]);
    } catch (err) {
        console.log(err);
    }

    files = responseList[3]['Files'];
    orderAsked = responseList[3]['OrderAsked'];
    file = files[orderAsked];

    try {
        res = await fetch(appURL + '/api/soundfile/' + file.replace(/^.*[\\\/]/, ''));
        console.log("res", res);
        data = await res.json();
        console.log("data", data[0]["ID"]);
        soundFileList.push(data[0]["ID"]);
    } catch (err) {
        console.log(err);
    }

    files = responseList[4]['Files'];
    orderAsked = responseList[4]['OrderAsked'];
    file = files[orderAsked];

    try {
        res = await fetch(appURL + '/api/soundfile/' + file.replace(/^.*[\\\/]/, ''));
        console.log("res", res);
        data = await res.json();
        console.log("data", data[0]["ID"]);
        soundFileList.push(data[0]["ID"]);
    } catch (err) {
        console.log(err);
    }

    files = responseList[5]['Files'];
    orderAsked = responseList[5]['OrderAsked'];
    file = files[orderAsked];

    try {
        res = await fetch(appURL + '/api/soundfile/' + file.replace(/^.*[\\\/]/, ''));
        console.log("res", res);
        data = await res.json();
        console.log("data", data[0]["ID"]);
        soundFileList.push(data[0]["ID"]);
    } catch (err) {
        console.log(err);
    }

    files = responseList[6]['Files'];
    orderAsked = responseList[6]['OrderAsked'];
    file = files[orderAsked];

    try {
        res = await fetch(appURL + '/api/soundfile/' + file.replace(/^.*[\\\/]/, ''));
        console.log("res", res);
        data = await res.json();
        console.log("data", data[0]["ID"]);
        soundFileList.push(data[0]["ID"]);
    } catch (err) {
        console.log(err);
    }

    files = responseList[7]['Files'];
    orderAsked = responseList[7]['OrderAsked'];
    file = files[orderAsked];

    try {
        res = await fetch(appURL + '/api/soundfile/' + file.replace(/^.*[\\\/]/, ''));
        console.log("res", res);
        data = await res.json();
        console.log("data", data[0]["ID"]);
        soundFileList.push(data[0]["ID"]);
    } catch (err) {
        console.log(err);
    }

    files = responseList[8]['Files'];
    orderAsked = responseList[8]['OrderAsked'];
    file = files[orderAsked];

    try {
        res = await fetch(appURL + '/api/soundfile/' + file.replace(/^.*[\\\/]/, ''));
        console.log("res", res);
        data = await res.json();
        console.log("data", data[0]["ID"]);
        soundFileList.push(data[0]["ID"]);
    } catch (err) {
        console.log(err);
    }

    files = responseList[9]['Files'];
    orderAsked = responseList[9]['OrderAsked'];
    file = files[orderAsked];

    try {
        res = await fetch(appURL + '/api/soundfile/' + file.replace(/^.*[\\\/]/, ''));
        console.log("res", res);
        data = await res.json();
        console.log("data", data[0]["ID"]);
        soundFileList.push(data[0]["ID"]);
    } catch (err) {
        console.log(err);
    }


    // await Promise.all(responseList.map(obj => {
    //     const files = obj['Files'];
    //     const orderAsked = obj['OrderAsked'];
    //     soundFileList.push(fetchSoundFileIDs(files[orderAsked]));
    //     // console.log(files);
    //     // console.log(files[orderAsked].replace(/^.*[\\\/]/, ''));
        
    //     // soundFileList.push(data);
    // }));


    // console.log(soundFileList);

    // const whatsthis = await getSoundFileIDs(responseList);
    
    // console.log("whatsthis", whatsthis);

    await Promise.all(soundFileList.map((val, key) => {
        fetch(appURL + '/api/response', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "SoundFileID": val,
                "SurveyID": surveyID,
                "OrderAsked": responseList[key]['OrderAsked']
            })
        })
    }))

}

const clickHandler = (response, responseList, next) => {
    callAPI(response, responseList);
    next();
}

const FeedbackPage = ({ response, responseList, setResponse, navigation }) => {
    const [input, setInput] = useState('');
    const { next } = navigation;

    return (
        <div className="container grid">
            <ReactMarkdown children={`#### **Post-Evaluation Survey**\n ${text.post_eval} \n\n**NOTE:** Your answer will not affect your 
				compensation.`}/>
			<textarea rows="4" onChange={e => setInput(e.target.value)} placeholder="My neighbor started moving their lawn."></textarea>
            <div className="section col-2 align-right">
                <a href="#" className="button" onClick={() => {checkInput(input) && clickHandler(response, responseList, next)}}>Submit</a>
            </div>
        </div>
    )
}

export default FeedbackPage;