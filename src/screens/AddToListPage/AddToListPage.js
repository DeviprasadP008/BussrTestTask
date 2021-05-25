import React, { useState, useEffect, useRef } from 'react';
import {
    TextInput,
    Text,
    View,
    TouchableNativeFeedback,
    BackHandler,
    Alert,
    ScrollView,
    StatusBar,
    Platform,
    ActivityIndicator,
  } from 'react-native';
import { Card } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { ProgressDialog } from 'react-native-simple-dialogs';
import styles from './styles';
import { db } from '../../firebase/config';
import { ErrorAlertEmptyItem } from '../../utilities/ErrorConstants';
import ButtonText from '../../components/ButtonText';
import StatusBarTop from '../../components/StatusBarTop';


const AddToListPage = ({ navigation }) => {
     const [itemvalue, setitemdetails] = React.useState('');
     const [loader, setLoading] = useState(true); 

      useFocusEffect(
        React.useCallback(() => {
          setitemdetails('');
          setLoading(false);
        }, []),
      );

      useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
        return () => backHandler.remove();
      }, []);

      const backAction = () => {
         navigation.navigate('ListPage',{ userid: '', email: '' });
         return true;
      };

      const handlechangeitem = (itemdetails) => {
        console.log('Change in create item : ' + itemdetails);
        setitemdetails(itemdetails);
      }

      const create = () => {
         if (validateitem(itemvalue)){
            setLoading(true);
            addItem(itemvalue)
         }else{
           alertdisplay("", ErrorAlertEmptyItem);      
         }
      };


      const alertdisplay = (title, message) => {
        Alert.alert(
            title,
            message,
            [
              { text: "Ok", onPress: () => console.log('Ok pressed error') }
            ],
            { cancelable: false }
          );
       }


      const addItem = (itemname) => {
         //call db funtion here
         db.ref('/items').push({ uid: Math.floor(Math.random() * 1000) + 1, title: itemname, isChecked: false });
         console.log('Item saved successfully');
         setitemdetails('');
         setLoading(false);
         alertdisplay("", "Item created successfully. You can view this item details in List page");
      };

      const clear = () => {
        db.ref('/items').remove();
      }

      const update = (id) => {
        db.ref('/items').update({
          [id]: {
            isChecked: true,
          },
        });
      }

      const validateitem = (itemname) => {
        if(!itemname.trim()){
          console.log('Item is empty');
          return
        }
       return true;
      }

      const movebacktopreviouspage = () =>{
        navigation.navigate('ListPage',{ userid: "", email: "" });
      }

      return (
        <>
           <View style={styles.parent}>

              <StatusBarTop/>

              <View style={styles.pagecontent}>
                <View style={styles.parentmain}>

                      <ProgressDialog
                          visible={loader}
                          title="Creating"
                          message="Please wait..."
                      />

                      <View style={styles.parentinputfield}>
                        <TextInput
                              name={'item'}
                              placeholder={`Enter item`}
                              placeholderTextColor={'#000'}
                              autoCapitalize='none'
                              style={styles.inputfieldregular}
                              value={itemvalue}
                              returnKeyType={'next'}
                              onChangeText={(text) => handlechangeitem(text)}
                          />
                      </View>
                      <View style={styles.parentbuttons}>
                          <View style={styles.buttoninnerlayout}>
                            <Card style={styles.cardcontainerbasic}>
                              <View style={styles.cardlogininner}>
                                  <TouchableNativeFeedback onPress={(e) => movebacktopreviouspage()}>
                                      <View style={styles.loginbutton}>                                        
                                        <ButtonText label={'Move Back'}/> 
                                      </View>
                                  </TouchableNativeFeedback>
                              </View>
                            </Card>
                          </View>
                          <View style={styles.buttoninnerlayout}>
                            <Card style={styles.cardcontainerbasic}>
                              <View style={styles.cardlogininner}>
                                  <TouchableNativeFeedback onPress={(e) => create()}>
                                      <View style={styles.loginbutton}>
                                        <ButtonText label={'Create'}/> 
                                      </View>
                                  </TouchableNativeFeedback>
                              </View>
                            </Card>
                          </View>
                      </View>

                         
                         

                 </View>                
               </View>
            </View>
        </>
      );


};



export default AddToListPage;

