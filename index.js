/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { app as appJson } from './app.json';

AppRegistry.registerComponent(appJson.name, () => App);
