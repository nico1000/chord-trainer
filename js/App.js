import React from 'react';

const dispStates = {
  PAIRS: 'PAIRS',
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispState: dispStates.PAIRS,
    };
  }
  render() {
    if (this.state.dispState == dispStates.PAIRS) {
      return (
        <Pairs />
      );
    } else {
      return (
        <span>nothing to display</span>
      );
    }
  }

}

class Pairs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPairs: this.getStoredPairs(),
    };
  }


  createNewPair(chordName1, chordName2) {
    let newPairs = this.state.currentPairs.slice();

    newPairs.push({
      'chord1': chordName1,
      'chord2': chordName2,
      'records': [],
    });

    this.setState({ currentPairs: newPairs });
  }

  getStoredPairs() {
    // default if no saved values available
    let defaultPairs = [
      {
        'chord1': 'Fm7',
        'chord2': 'G',
        'records': [26, 33, 49, 55, 56, 62],
      },
      {
        'chord1': 'Am',
        'chord2': 'C',
        'records': [24, 26, 33, 49, 55],
      },
      {
        'chord1': 'Fm7',
        'chord2': 'G',
        'records': [26, 33, 49, 55, 56, 62],
      },
    ];

    if (storageAvailable('localStorage')) {
      let storedPairs = window.localStorage.getItem('pairs');
      if (storedPairs) {
        return storedPairs;
      }
    }

    return defaultPairs;
  }

  render() {
    let storedPairs = this.state.currentPairs.map((currentPair, index) => {
      return (
        <Pair
          key={ index + '_' + currentPair.chord1 + currentPair.chord2 }
          chord1={ currentPair.chord1 }
          chord2={ currentPair.chord2 }
          records={ currentPair.records } />
      );
    });

    return (
      <div className="pairs">
        { storedPairs }
        <PairAdd onClick={ () => { this.createNewPair('Dsus2', 'Em'); } } />
      </div>
    );
  }

}

function Pair(props) {
  return (
    <div className="pair">
      <PairChords chord1={ props.chord1 } chord2={ props.chord2 } />
      <PairRecords records={ props.records }/>
    </div>
  );
}

function PairChords(props) {
  return (
    <div className="pair__chords">
      <PairChord chordName={ props.chord1 } />
      <PairChord chordName={ props.chord2 } />
    </div>
  );
}

function PairChord(props) {
  return (
    <div className="pair__chord">{ props.chordName }</div>
  )
}

function PairRecords(props) {
  let records = props.records.map((repetitions, index) => {
    return (
      <PairRecord key={ index } repetitions={ repetitions } />
    );
  });

  return (
    <div className="pair__records">
      { records }
    </div>
  );
}

function PairRecord(props) {
  return (
    <div className="pair__record">{ props.repetitions }</div>
  )
}

function PairAdd(props) {
  return (
    <div className="pair">
      <div className="pair__add" onClick={ props.onClick }>Add pair!</div>
    </div>
  )
}

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}
