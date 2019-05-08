import React from 'react';

const Filler = (props) =>  {
  let amount = (props.currentWord/props.wordCount)*100;
  return (<div style={{width:`${amount}`}}/>);
}

//Does this even need to be a class?
class ProgressBar extends React.Component {
  render() {
    const { wordCount, currentWord } = this.props;
    return (
      <div>
        <Filler wordCount={wordCount} currentWord={currentWord}/>
        <p>{currentWord}/{wordCount}</p>
      </div>
    );
  }
}

export default ProgressBar;
//https://medium.com/@ItsMeDannyZ/how-to-build-a-progress-bar-with-react-8c5e79731d1f