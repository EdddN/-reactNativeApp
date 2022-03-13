/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import React, { useEffect } from 'react';
import { name as appName } from './app.json';

const Apps = () => {
        return <App />
}
AppRegistry.registerComponent(appName, () => Apps); 