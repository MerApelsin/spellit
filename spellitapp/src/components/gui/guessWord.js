import React from 'react';

class guessWord extends React.Component {

    state = {
        wordGuess: '',
    }

    onChange = (e) => { this.setState({[e.target.name]: e.target.value});}

    textToSpeech = () => {
        const { word } = this.props;
        window.responsiveVoice.speak(`${word}`,'US English Male');
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