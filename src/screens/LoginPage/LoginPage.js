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
import ProgressDialogSpin from '../../components/ProgressDialogSpin';
import { Field, reduxForm } from 'redux-form';

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
            __isTheUserAuthenticated();    
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
        Alert.alert(
            'Exit App',
            'Do you want to exit this application?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => BackHandler.exitApp(),
                },
            ],
            {
                cancelable: false,
            },
        );
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

    const movetoSignUp = () =>{
        navigation.navigate('SignUpPage'); 
    }

    const login = () => {
        console.log('Validation result for email is : ' + validateemail(emailvalue));
        console.log('Validation result for password is : ' + validatepassword(passwordvalue));
        if (validateemail(emailvalue)) {
            if(validatepassword(passwordvalue)){
                setLoaderVisible(true);
                __doSigninUser(emailvalue, passwordvalue);
            }
        } 
    };

      const __doSigninUser = async (email, password) => {
        await auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            setLoaderVisible(false);
            console.log("Login Authentication successful : " + JSON.stringify(response));
            navigation.navigate('ListPage',{ userid: response.user.uid, email: response.user.providerData.email }); 
        })
        .catch(error => {
            setLoaderVisible(false);
            if (error.code === 'auth/user-not-found') {
                console.log('That email address not found!');
                erroralert("Authentication failure", "Email address not found. Please SignUp/Register");
                return
            }
            if(error.code === 'auth/wrong-password' ){
                console.log('Entered Password is invalid!');
                erroralert("Authentication failure", "Password invalid!");
                return
            }
            console.log("Login Authentication failure : " + error.message);
            erroralert("Authentication failure", error.message);
        });

      }

      const __isTheUserAuthenticated = async() => {
        let user = await auth().currentUser.uid;
        console.log('Current section user id is : ' + user);
        if(user != null && user != ''){
            navigation.navigate('ListPage',{ userid: '', email: '' });
        }
    };

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

    const renderUsername = () => {
        return (
          <View style={styles.inputrenderparent}>
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
          </View>
        );
      }

      const renderPassword = () => {
        return (
          <View style={styles.inputrenderparent}>
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
          </View>
        );
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
                                title="Logging in"
                                message="Please wait..."/>

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
                                    <TouchableNativeFeedback onPress={(e) => login()}>
                                        <View style={styles.loginbutton}>
                                            <ButtonText label={'Sign In'}/>                                      
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            </Card>

                            <Text style={styles.textsignup} onPress={movetoSignUp}>Sign Up / Register</Text>

                        </View>
                    </ScrollView>
                </View>
            </View>
        </>
    );
};


export default reduxForm({
    form: 'LoginPage'
})(LoginPage)
//export default LoginPage;

//  <Field name="email" component={renderUsername} />
//  <Field name="password" component={renderPassword} />

/*
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
*/

/*

               <ProgressDialogSpin title={'Logging in'} message={'Please wait...'} isloading={loader}/>

                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor="#4285F4"
                    translucent={true}
                />

*/

//<Text style={styles.buttontext}>Sign In</Text>
/*
if (!email) {
            setError("Email required *")
            setValid(false)
            return
          } else if (!password && password.trim() && password.length > 6) {
            setError("Weak password, minimum 5 chars")
            setValid(false)
            return
          } else if (!__isValidEmail(email)) {
            setError("Invalid Email")
            setValid(false)
            return
          }

*/

 /* firebase
            .auth()
            .signInWithEmailAndPassword(emailvalue, passwordvalue)
            .then(confirmResult => {
                setLoaderVisible(false);
                console.log("Authentication successful : " + JSON.stringify(confirmResult));
                navigation.navigate('ListPage',{ userid: confirmResult.user.uid, email: confirmResult.user.providerData.email });               
            })
            .catch(error => {
                setLoaderVisible(false);
                console.log("Authentication failure : " + error.message);
                erroralert("Authentication failure", error.message);
})*/

/*
try {
          let response = await auth().signInWithEmailAndPassword(email, password)
          if (response) {
             setLoaderVisible(false);
             console.log("Authentication successful : " + JSON.stringify(response));
             navigation.navigate('ListPage',{ userid: response.user.uid, email: response.user.providerData.email });  
          }
        } catch (error) {
          setLoaderVisible(false);
          console.log("Authentication failure : " + error.message);
          erroralert("Authentication failure", error.message);
        }
*/