import React from 'react';
import ReactDOM from 'react-dom';
import AnnotablePicture from './components/AnnotablePicture';
import './index.css';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

import DevTools from './containers/DevTools.js';

const EXAMPLE_DATA = {
  //http://res.cloudinary.com/dex67pc5x/image/upload/v1480412158/bXonQgc_dgjo24.png
  picture: "https://i.imgur.com/kNF49qS.png",
  notes: {
    notes:  [{
      id: 1,
      x: 445,
      y: 30,
      height: 450,
      width: 100,
      text: "I'm very disappointed in you all!!"
    }],
    selectedNoteId: null
  }
};

const store = configureStore(EXAMPLE_DATA);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <AnnotablePicture />
    </Provider>
    <DevTools store={store}/>
  </div>,
  document.getElementById('root')
);
