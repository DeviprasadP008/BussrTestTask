import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';

const ButtonText = ({ label }) => {
    return (
        <>
          <View style={styles.parenttext}>
            <Text style={styles.buttontext}>{label}</Text>
          </View>
        </>
    );  
};

const styles = StyleSheet.create({
    parenttext: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    }, 
    buttontext: {
      width: '100%',
      textAlign: 'center',
      fontSize: 14,
      color: '#fff',
      fontWeight: '600',
      padding: 2,
      fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto-Medium',
    },
});

export default ButtonText;
