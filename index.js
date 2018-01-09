import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import './react-widgets-overrides.css';
import React from 'react';
import {Provider} from 'react-redux';
import AddTravel from './AddTravel';
import configureStore from './configureStore'; 

var store = configureStore()

React.render(<Provider store={store}>{() => <AddTravel/>}</Provider>, document.querySelector('#app'))
