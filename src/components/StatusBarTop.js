import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';

const StatusBarTop = () => {
    return (
        <>
          <View>
             <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor="#4285F4"
                translucent={true}
             />
          </View>
        </>
    );  
};

export default StatusBarTop;



 