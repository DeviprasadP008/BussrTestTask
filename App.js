
/**
 * @format
 */

 import * as React from 'react';
 import AppNavigator from './src/navigation/AppNavigator';
 import { Provider } from 'react-redux';
 import { PersistGate } from 'redux-persist/integration/react';

 import Main from './src/Main';
 import persist from './src/redux/config/store';


 const persistorStore = persist();
 
 const App = () => {

   React.useEffect(() => {
   
   }, []);
 
   return (
     <Provider store={persistorStore.store}>
        <PersistGate loading={null} persistor={persistorStore.persistor}>
          <Main />
        </PersistGate>
     </Provider>
   )

 };
 
 export default App;
 // <AppNavigator />

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 