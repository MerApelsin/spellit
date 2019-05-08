import React from 'react';
import Start from './start.js';
import GameFlow from './gameFlow.js';

//callback to set language to whatever ya press on
 class GameComponent extends React.Component {
    state = {
        language: 'english',
        started: false,
        finished: false,
        finishedMsg: '',
    }

    hasStarted = () => this.setState({ started: true });
    setLanguage = (lang) => {
        if(this.state.language !== lang){
            this.setState({ language: lang })
        }
    }
    setFinished = () => {
        this.setState({ finished: true, finishedMsg: `You completed all the levels for ${this.state.language}!`, started:false });
    }

    render(){
        const {started,language, finishedMsg} =  this.state;
        return (
            <div>
                {finishedMsg !== '' && <p>{finishedMsg}</p>}
                {!started && <Start hasStarted={this.hasStarted} setLanguage={this.setLanguage}/>}
                {started && <GameFlow isFinished={this.setFinished} language={language}/>}
            </div>
        );
     }  
}

export default GameComponent;