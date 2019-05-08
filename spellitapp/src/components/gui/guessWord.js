import React from 'react';

class guessWord extends React.Component {

    state = {
        wordGuess: '',
    }

    componentDidUpdate(prevProp){
        if(prevProp.word !== this.props.word){
            this.setState({wordGuess: ''});
        }
    }

    onChange = (e) => { this.setState({[e.target.name]: e.target.value});}

    textToSpeech = () => {
        const { word, language } = this.props;
        if(language === 'english'){
            window.responsiveVoice.speak(`${word}`,'US English Male');
        }
        else {
            window.responsiveVoice.speak(`${word}`,'Swedish Male');
        }
        
    }

    render(){
        const { guess } = this.props;
        return(
            <div>
                <button onClick={this.textToSpeech}>Listen</button>
                <div>
                    <input type="text" name="wordGuess" onChange={this.onChange} value={this.state.wordGuess}/>
                    <button onClick={() => guess(this.state.wordGuess)}>Go</button>
                </div>
            </div>
        );
    } 
}

export default guessWord;