import React from 'react';

export default class Chord extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ 'chord ' + this.props.className} data-chord-name={ this.props.chordName } >
        { this.props.chordName }
      </div>
    );
  }

}

export function allChords() {
  return [
    'Am',
    'B7',
    'C',
    'C7',
    'D',
    'Dm',
    'E',
    'Em',
    'F',
    'Fm7',
    'G',
    'G7'
  ];
}

export function chordChoose(props) {

  let availableChords = props.availableChords.map((chord, index) => {
    return (
      <Chord
        key={ index + '_' + chord }
        chordName={ chord }
        className={ props.selectedChord == chord ? 'chord--selected' : '' } />
    );
  });

  return (
    <div className='chord-choose' onClick={ props.onClick } data-display-position={ props.displayPosition }>
    { availableChords }
    </div>
  );
}
