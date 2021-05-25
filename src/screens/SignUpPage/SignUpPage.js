import React, { useState, useEffect, useRef } from 'react';
import {
    TextInput,
    Text,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    BackHandler,
    Alert,
    ScrollView,
    StatusBar,
    Image,
    Platform,
    ActivityIndicator,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { ProgressDialog } from 'react-native-simple-dialogs';
import auth from "@react-native-firebase/auth";
import styles from './styles';
import { ErrorAlertInvalidEmail, ErrorAlertInvalidPassword, ErrorAlertEmptyPassword, ErrorAlertShortPassword, ErrorAlertLongPassword, ErrorAlertPasswordNoAlphabetsandNumbers, ErrorAlertSpecialCharactersPassword } from '../../utilities/ErrorConstants';
import AppLogo from '../../components/AppLogo';
import ButtonText from '../../components/ButtonText';
import ShowPasswordIcon from '../../components/ShowPasswordIcon';
import HidePasswordIcon from '../../components/HidePasswordIcon';
import StatusBarTop from '../../components/StatusBarTop';


const LoginPage = ({ navigation }) => {
    const [loader, setLoaderVisible] = React.useState(false);
    const [showpassword, setShowPassword] = React.useState(false);
    const [emailvalue, setemail] = React.useState('');
    const [passwordvalue, setpassword] = React.useState('');
    const passworddetails = useRef();

    useFocusEffect(
        React.useCallback(() => {
            setLoaderVisible(false);
            setShowPassword(false);
            setemail('');
            setpassword('');
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
        navigation.navigate('LoginPage');
        return true;
    };

    const erroralert = (title, message) => {
        Alert.alert(
            title,
            message,
            [
              { text: "Ok", onPress: () => console.log('Ok pressed error') }
            ],
            { cancelable: false }
          );
    }

    const handlechangeemail = (email) => {
        console.log('Change in email : ' + email);
        setemail(email.trim())
    }

    const handlechangepassword = (password) => {
        console.log('Change in password : ' + password);
        setpassword(password.trim())
    }

    const onShowPassword = () => {
        setShowPassword(!showpassword);
    }

    const resgister = () => {
        console.log('Validation result for email is : ' + validateemail(emailvalue));
        console.log('Validation result for password is : ' + validatepassword(passwordvalue));
        if (validateemail(emailvalue)) {
            if(validatepassword(passwordvalue)){
                setLoaderVisible(true);
                __doCreateUser(emailvalue, passwordvalue);
            }
        } 
    };

     const __doCreateUser = async (email, password) => {
        await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            setLoaderVisible(false);
            console.log('User registration successfull : ' + JSON.stringify(response));
            navigation.navigate('ListPage',{ userid: response.user.uid, email: response.user.providerData.email }); 
        })
        .catch(error => {
            setLoaderVisible(false);
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                erroralert("Authentication failure", "Email address is already in use!. Please SignIn");
                return
            }
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                erroralert("Authentication failure", "Email address is invalid!");
                return
            }
              console.log("Authentication failure : " + error.message);
              erroralert("Authentication failure", error.message);
        });
      }

      const __isTheUserAuthenticated = async() => {
        let user = await auth().currentUser.uid;
        if (user) {
           console.log('User details are : ',  user);
        } else {
           console.log('No User details available');
        }
      };

      const movetoSignIn = () =>{
        navigation.navigate('LoginPage'); 
      }


    const validateemail = (email) => {
        if(!email && email.trim()){
          console.log('Email is empty');
          erroralert("Invalid email", ErrorAlertInvalidEmail);
          return
        }else{
          console.log('Email to match is : ' + email);
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
          return reg.test(email)
        }
    }

    const validatepassword = (password) => {
        console.log('Password to match is : ' + password);
        if (!password && password.trim() && password.length > 6) {
            console.log("Password too short");
            erroralert("", ErrorAlertShortPassword);          
            return
        } else if (password.length > 16) {
            console.log("Password too long");
            erroralert("", ErrorAlertLongPassword);     
            return
        } else if (password.search(/\d/) == -1) {
            console.log("Password do not contain any numbers");
            erroralert("", ErrorAlertPasswordNoAlphabetsandNumbers);    
            return
        } else if (password.search(/[a-zA-Z]/) == -1) {
            console.log("Password do not contain any alphabets");
            erroralert("", ErrorAlertPasswordNoAlphabetsandNumbers);    
            return
        } else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
            console.log("Password contains bad characters");
            erroralert("", ErrorAlertSpecialCharactersPassword);            
            return
        }
        return true
    }


    return (
        <>
            <View style={styles.parent}>

                <StatusBarTop/>

                <View style={styles.pagecontent}>
                    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        <View style={styles.parentmain}>

                            <ProgressDialog
                                visible={loader}
                                title="Signing up"
                                message="Please wait..."
                            />

                            <AppLogo/>
  
                            <TextInput
                                name={'email'}
                                placeholder={`Email`}
                                placeholderTextColor={'#000'}
                                autoCapitalize='none'
                                style={styles.inputfieldregular}
                                value={emailvalue}
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    passworddetails.current.focus();
                                }}
                                onChangeText={(text) => handlechangeemail(text)}
                            />

                            <View style={styles.viewparentpassword}>
                                <TextInput
                                    name={'password'}
                                    placeholder={`Password`}
                                    placeholderTextColor={'#000'}
                                    style={styles.inputfieldpassword}
                                    value={passwordvalue}
                                    secureTextEntry={false}
                                    returnKeyType={'next'}
                                    secureTextEntry={!showpassword}
                                    ref={passworddetails}     
                                    onChangeText={(text) => handlechangepassword(text)}
                                />
                                <TouchableOpacity style={styles.passwordshowiconparent} onPress={onShowPassword}>
                                    {
                                     showpassword ?
                                      <ShowPasswordIcon/>
                                      :
                                      <HidePasswordIcon/>
                                    }
                                </TouchableOpacity>
                            </View>


                            <Card style={styles.cardcontainerbasic}>
                                <View style={styles.cardlogininner}>
                                    <TouchableNativeFeedback onPress={(e) => resgister()}>
                                        <View style={styles.loginbutton}>
                                          <ButtonText label={'Sign Up/ Register'}/> 
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            </Card>

                            <Text style={styles.textsignin} onPress={movetoSignIn}>Sign In</Text>

                        </View>
                    </ScrollView>
                </View>
            </View>
        </>
    );
};




export default LoginPage;


