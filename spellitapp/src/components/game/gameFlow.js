import React from 'react';
import { levels } from '../tts/wordlist.js';
import Progress from '../gui/progress.js';
import GuessWord from '../gui/guessWord.js';

class GameFlow extends React.Component {

    state = {
        currentWord: '',
        previousWord: '',
        currentPosition: 0,
        currentLevel: 0,
        currentLevelText: 'First level',
        maxPosition: '',
        trys: 3,
        msg: '',
        wordsList: []
    }

    componentDidMount(){
        //levels[0-lvl][eng-lang][0-word]
        let a = this.state.currentLevel;
        let b = this.props.language;
        this.setLevelInfo(levels[a][b]);
    }
    
    setLevelInfo = (currentList) => {
        let totalLenght = currentList.length-1;
        this.setState({wordsList: currentList, maxPosition: totalLenght, currentWord: currentList[0]})
    }

    updateLevelInfo = () => {
        const {currentLevel, currentPosition} = this.state;
        const {language} = this.props;
        this.setState({wordsList: levels[currentLevel][language], currentWord: levels[currentLevel][language][currentPosition]});
    }

    guessWord = (word) => {
        const {currentWord, trys} = this.state;
        let prevTry = trys -1;

        if(word === currentWord){
            this.setState({msg: `Good job! ${word} was the correct guess!`,previousWord: currentWord},() => this.nextWord(true));
        }
        else if(word !== currentWord && prevTry > 0){
            this.setState({trys: prevTry, msg: 'Sorry, try again!'});
        }
        else{
            this.nextWord(false, currentWord);
        }
    }

    nextWord = (correctGuess,failedWord) => {
        const {currentPosition, previousWord, wordsList,currentWord} = this.state;
        let tempPosition = currentPosition+1;
        let toBePrevWord = currentWord;

        let levelSwitch = this.shouldChangeLevel(tempPosition);
        if(!levelSwitch)
        {
            if(correctGuess)
            {
                this.setState({currentPosition: tempPosition, trys: 3, previousWord: toBePrevWord, currentWord: wordsList[tempPosition]})
            }
            else if(!correctGuess)
            {
                this.setState({msg: `Sorry, the correct word was ${failedWord}`, previousWord: failedWord, currentPosition: tempPosition, currentWord: wordsList[tempPosition], trys: 3});
            }
        }
        
        else {
            if(correctGuess)
            {
                this.setState({msg: 'Now onto the next level!'},() => this.changeLevel());
            }
            else if(!correctGuess)
            {
                this.setState({msg: `Sorry, the correct word was ${previousWord}`},() => this.changeLevel());
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
                this.setState({currentLevel: 1, currentLevelText: 'Second level', currentPosition: 0, trys: 3}, () => this.updateLevelInfo());
                
                break;
            case 1:
                this.setState({currentLevel: 2, currentLevelText:'Third level', currentPosition: 0, trys: 3}, () => this.updateLevelInfo());
                break;
            case 2:
                    this.setState({currentLevelText: ''}, () => this.props.isFinished());
                break;
          }
         
    }

    render(){
        const {currentWord, currentPosition, maxPosition, currentLevel,msg,currentLevelText, trys} = this.state;
        return(
            <div>
                <Progress levelText={currentLevelText} currentLevel={currentLevel} amountOfWords={maxPosition+1} currentWordPosition={currentPosition}/>
                {msg !== '' && <p>{msg}</p>}
                <GuessWord language={this.props.language} word={currentWord} guess={this.guessWord}/>
                <p>Trys left: {trys}/3</p>
            </div>
        )
    }
}

export default GameFlow;