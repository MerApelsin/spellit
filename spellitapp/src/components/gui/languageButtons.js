import React from 'react'

//callback to set language to whatever ya press on
const LanguageButtons = (props) => {
    return(
        <div>
            <button onClick={() => {props.setLanguage('english')}}>[Image of eng flag]['English']</button>
            <button onClick={() => {props.setLanguage('swedish')}}>[Image of swe flag]['Swedish']</button>
        </div>
    )
}

export default LanguageButtons;