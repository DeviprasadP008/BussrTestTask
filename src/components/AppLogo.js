import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const AppLogo = () => {
    return (
        <>
          <View style={styles.parentimage}>
            <Image source={require('./../assets/images/img_androidlogo.png')} style={styles.applogoicon} />
          </View>
        </>
    );  
};

const styles = StyleSheet.create({
    parentimage: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    }, 
    applogoicon: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
});

export default AppLogo;
