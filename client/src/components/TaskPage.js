import React, { useState, useRef, useEffect } from 'react';
import Task from './Task';

import '../css/components.css';

const TaskPage = ({ response, responseList, setResponseList, navigation }) => {
    const [index, setIndex] = useState(0);
    const [refEnded, setRefEnded] = useState(false);
    const [firstEnded, setFirstEnded] = useState(false);
    const [secondEnded, setSecondEnded] = useState(false);

    const audioRef_1 = useRef();
    const audioRef_2 = useRef();
    const audioRef_3 = useRef();

    return (
        <>
            <Task 
                index={index} 
                setIndex={setIndex}
                audioRef_1={audioRef_1}
                audioRef_2={audioRef_2}
                audioRef_3={audioRef_3}
                refEnded={refEnded}
                setRefEnded={setRefEnded}
                firstEnded={firstEnded}
                setFirstEnded={setFirstEnded}
                secondEnded={secondEnded}
                setSecondEnded={setSecondEnded}
                navigation={navigation}
                shuffledData={response['shuffled_data']}
                response={response}
                responseList={responseList}
                setResponseList={setResponseList}
            />
        </>
    );
};

export default TaskPage;