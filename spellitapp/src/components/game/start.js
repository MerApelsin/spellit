import React from 'react';
import LanguageButton from '../gui/languageButtons.js';

//callback to set language to whatever ya press on
class Start extends React.Component {

    
    render(){
        const {setLanguage, hasStarted} = this.props;
        return(
            <div>
                <p>Pick the language you want to try to spell the spoken words!</p>
                <LanguageButton setLanguage={setLanguage}/>
                <button onClick={hasStarted}>Start game!</button>
            </div>
        )
    }
}

export default Start;