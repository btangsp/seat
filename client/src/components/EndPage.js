import ReactMarkdown from "react-markdown";
import cryptoRandomString from 'crypto-random-string'

const EndPage = () => {
    return (
        <div className="container grid">
            <div className="section col-all">
                <ReactMarkdown children={`Thank you for your participation. 
					Please copy and paste the following code into the HIT:`} />
                <h1>{cryptoRandomString({length: 10, type: 'alphanumeric'})}</h1>
            </div>
        </div>
    )    
}

export default EndPage;