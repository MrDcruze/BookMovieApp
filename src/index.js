import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import  App from './App';
import { hydrateLocalStorage } from './common/services/localStorageService';

hydrateLocalStorage();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
