
/**
 * @format
 */

 import * as React from 'react';
 import AppNavigator from './navigation/AppNavigator';
 import { StyleSheet, View, Text, Platform } from 'react-native';
 import {connect} from 'react-redux';
 import StatusBarTop from './components/StatusBarTop';


 
 const Main = () => {

   React.useEffect(() => {
   
   }, []);
 
   return (
      <View style={styles.container}>
          <StatusBarTop/>
          <AppNavigator />  
      </View>
   )

 };

 const styles = StyleSheet.create({
    container: {
      flex: 1,
    }, 
});
 
 export default connect(null, null)(Main);

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 