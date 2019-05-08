import React from 'react';
import './../../App.css';

const Filler = (props) =>  {
  let amount = (props.wordsDone/props.amount)*100;
  return (<div className='progress-filler' style={{width:`${amount}%`}}/>);
}

//amountOfWords currentWordPosition
//Does this even need to be a class?
const ProgressBar = (props) => {
    
    const { currentWordPosition, amountOfWords, levelText } = props;
    return (
        <React.Fragment>
            {levelText !== '' && <h4>{levelText}</h4>}
            <div className='progressBar'>
                <Filler amount={props.amountOfWords} wordsDone={props.currentWordPosition}/>
            </div>
            <p>{currentWordPosition}/{amountOfWords}</p>
        </React.Fragment>

    );
}

export default ProgressBar;
//https://medium.com/@ItsMeDannyZ/how-to-build-a-progress-bar-with-react-8c5e79731d1f