import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const HidePasswordIcon = () => {
    return (
        <>
          <View style={styles.parentimage}>
             <Image source={require('./../assets/images/img_hidepassword.png')} style={styles.passwordshowicon} />
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
    passwordshowicon: {
      height: 20,
      width: 20,
      padding: 2,
      marginBottom: 5,
      resizeMode: 'contain',
    },
});

export default HidePasswordIcon;