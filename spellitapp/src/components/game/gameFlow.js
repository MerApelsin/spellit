import React from 'react';
import { levels } from '../tts/wordlist.js';
import GuessWord from '../gui/guessWord.js';

class GameFlow extends React.Component {

    state = {
        currentWord: '',
        previousWord: '',
        currentPosition: '',
        currentLevel: 0,
        maxPosition: '',
        wordCount: '',
        trys: 3,
        msg: '',
    }

    componentDidMount(){
        //levels[0-lvl][eng-lang][0-word]
        let a = this.state.currentLevel;
        let b = this.props.language;

        console.log(levels[a][b]);
    }
    
    setLevelInfo = (...info) => {
    }

    guessWord = (word) => {
        const {currentWord, trys} = this.state;

        if(word === currentWord){
            this.setState({msg: `Good job! ${word} was the correct guess!`,previousWord: currentWord},() => this.nextWord(true));
        }
        else if(word !== currentWord && trys > 0){
            this.setState({trys: trys-1, msg: 'Sorry, try again!'});
        }
        else{
            this.nextWord(false, currentWord);
        }
    }

    nextWord = (correctGuess,failedWord) => {
        const {currentPosition, previousWord} = this.state;
        let tempPosition = currentPosition+1;

        let levelSwitch = this.shouldChangeLevel(tempPosition);
        if(!levelSwitch)
        {
            if(correctGuess)
            {
                this.setState({currentPosition: tempPosition, trys: 3})
            }
            else if(!correctGuess)
            {
                this.setState({msg: `Sorry, the correct word was ${failedWord}`,previousWord: failedWord, currentPosition: tempPosition, trys: 3});
            }
        }
        
        else {
            if(correctGuess)
            {
                this.setState({currentPosition: 0, trys: 3},() => this.changeLevel());
            }
            else if(!correctGuess)
            {
                this.setState({msg: `Sorry, the correct word was ${previousWord}`, currentPosition: 0, trys: 3},() => this.changeLevel());
            }
        }  
    }

    shouldChangeLevel = (toBeCurrent) => {
        const {maxPosition} = this.state;
        return toBeCurrent <= maxPosition ? false : true;
    }

    changeLevel = () => {
        let currentLevel = this.state.currentLevel;
        switch(currentLevel) {
            case 0:
                this.setState({currentLevel: 1});
                break;
            case 1:
                this.setState({currentLevel: 2});
                break;
            case 2:
                    this.props.isFinished();
                break;
          } 
    }

    render(){
        const {currentWord} = this.state;
        return(
            <div>
               <GuessWord word={currentWord} guess={this.guessWord}/>
            </div>
        )
    }
}

export default GameFlow;