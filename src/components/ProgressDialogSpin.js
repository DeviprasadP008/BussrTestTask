import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ProgressDialog } from 'react-native-simple-dialogs';

const ProgressDialogSpin = ( title, message, isloading ) => {
    return (
        <>
          <View>
               <ProgressDialog
                 visible={isloading}
                 title={title}
                 message={message}
              />
          </View>
        </>
    );  
};

const styles = StyleSheet.create({
    parentdialog: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    }, 
   
});

export default ProgressDialogSpin;
