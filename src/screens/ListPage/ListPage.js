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
    FlatList,
    RefreshControl,
    ActivityIndicator,
  } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import auth from "@react-native-firebase/auth";
import filter from 'lodash.filter';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { Card } from 'react-native-paper';
import styles from './styles';
import { db } from '../../firebase/config';
import ButtonText from '../../components/ButtonText';
import ListCells from '../../components/ListCells';
import StatusBarTop from '../../components/StatusBarTop';


const ListPage = ({ route, navigation }) => {
     const { userid, email } = route.params;
     const [error, setError] = useState(null);
     const [query, setQuery] = useState('');
     const [datadb, setdatadb] = useState([]);
     const [searchdatadb, setsearchdatadb] = useState([]);   
     const [loader, setLoading] = useState(true); 
     const [refreshing, setRefreshing] = React.useState(false);

      useFocusEffect(
        React.useCallback(() => {
          setError('');
          setQuery('');
          setdatadb([]);
          setsearchdatadb([]);
          setLoading(true);  
          getdatafromdb();
          setRefreshing(false);  
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

      const __isTheUserAuthenticated = async () => {
        let user = await auth().currentUser.uid;
        if (user) {
           console.log('User details are : ',  user);
        } else {
           console.log('No User details available');
        }
      };

     
      const getdatafromdb = () =>{ 
        setdatadb([]);
        setsearchdatadb([]);
        var index = 0;
        var items = [];     
        db.ref('/items').on('value', querySnapShot => {
          let data = querySnapShot.val() ? querySnapShot.val() : {};
          let keys = Object.keys(data);
          console.log('Key values are : ' + keys);
          console.log('Key value to check is : ' + JSON.stringify(querySnapShot));
          console.log('Data value is : ' + JSON.stringify(data));
         // const dbdatavalue = Object.keys(data).map(key => ({[key]: data[key]}));
          const dbdatavalue = Object.keys(data).map(key => (data[key]));
          querySnapShot.forEach((child) => { 
            items.push({ 
               uid: child.val().uid,
               title: child.val().title,
               isChecked: child.val().isChecked,
               keyvalue: keys[index],
            })
            index += 1
          })
          console.log('Temperory array is : ' + JSON.stringify(items));
          setdatadb(items);
          setsearchdatadb(items);
          setRefreshing(false);
          setLoading(false);
          console.log('Value from Firebase db are : ' + JSON.stringify(dbdatavalue));
        })
      }

      const changestatus = (itemid, itemtitle, itemstatus, itemkey) =>{
          console.log('Clicked item uid : ' + itemid);
          console.log('Clicked item title : ' + itemtitle);
          console.log('Clicked item status : ' + !itemstatus);
          console.log('Clicked item key value : ' + itemkey);
          db.ref('/items/'+itemkey).update({'isChecked': !itemstatus});
          getdatafromdb();
      }

      const handleSearch = (text) => {
        const formattedQuery = text.toLowerCase();
        console.log('Formated query is : ' + formattedQuery);
        const filteredData = filter(searchdatadb, user => {
          console.log('User filter is : ' + JSON.stringify(user));
          console.log('Contains result is : ' + contains(user, formattedQuery));
          return contains(user, formattedQuery);
        });
        console.log('Filtered data search is : ' + JSON.stringify(filteredData));
        console.log('Filtered text to search is : ' + text);
        setdatadb(filteredData);
        setQuery(text);
      };

      const contains = (usertitle, query) => {
        const { title } = usertitle;
        console.log('Query to search is : ' + query);
        console.log('title data is : ' + title);
        if ((title.toLowerCase()).includes(query)) {
          return true;
        }
        return false;
      };

      const fetchDataRefresh = React.useCallback(async () => {
         setRefreshing(true);
         getdatafromdb();
      }, [refreshing]);
      

      const logout = () =>{
        displaylogoutalert();
      }

      const displaylogoutalert = () => {
        Alert.alert(
          'Logout',
          'Do you want to Logout?',
          [
            {
              text: 'No',
              onPress: () => console.log('No Login Pressed'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => movetologinpage(),
            },
          ],
          {
            cancelable: false,
          },
        );
        return true;
      }

      const movetocreatepage = () =>{
        navigation.navigate('AddToListPage');
      }

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

     const movetologinpage = async() =>{
       console.log('Signout called');
       await auth()
       .signOut()
       .then((response) => {
        console.log("Logout successful : " + JSON.stringify(response));
        navigation.navigate('LoginPage'); 
       })
       .catch(error => {
        if (error.code === 'auth/no-current-user') {
           console.log('That email address is already in use!');
           erroralert("", "No active section found");
        } else{
           erroralert("Logout failure", error.message);
        }
      });
     }
    

      function renderHeader() {
        return (
          <View style={styles.parentsearch}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              value={query}
              onChangeText={queryText => handleSearch(queryText)}
              placeholder="Search"
              style={styles.textsearch}
            />
          </View>
        );
      }

    

        return (
           <>
              <View style={styles.parent}>
                <View style={styles.pageparentcontent}>

                  <StatusBarTop/>

                  <View style={styles.pagecontent}>
                        <View style={styles.parentflatlist}>

                           <ProgressDialog
                              visible={loader}
                              title="Loading"
                              message="Please wait..."
                            />

                          <FlatList
                              ListHeaderComponent={renderHeader}
                              contentContainerStyle={{ flexGrow: 1 }}
                              showsVerticalScrollIndicator={false}
                              showsHorizontalScrollIndicator={false}
                              data={datadb}
                              keyExtractor={item => item.uid}
                              numColumns={1}
                              refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={fetchDataRefresh} />
                              }
                              renderItem={({ item }) => (
                              <View style={styles.parentflatlistinner}>
                                {
                                  <View style={styles.contentparentouter}>
                                    <Card style={styles.cardcontainerinput}>
                                      <TouchableNativeFeedback onPress={() => changestatus(item.uid, item.title, item.isChecked, item.keyvalue)}>
                                        {
                                            item.isChecked ? 
                                              <View style={styles.listItem}>  
                                                  <View style={styles.textcontentparent}>
                                                    <Text style={styles.title}>{`${item.uid}  -   ${item.title}`}</Text>   
                                                  </View>   
                                                  <View style={styles.checkboxcontentparent}>
                                                    <CheckBox
                                                      disabled={true}
                                                      value={true}                                                                                             
                                                      style={styles.checkboxchecked}
                                                      tintColors={{ true: '#4285F4', false: '#808080' }}                                               
                                                    /> 
                                                  </View>                                                                                                                                  
                                              </View> 
                                            :
                                              <View style={styles.listItem}>   
                                                  <View style={styles.textcontentparent}>
                                                    <Text style={styles.title}>{`${item.uid}  -   ${item.title}`}</Text>  
                                                  </View>   
                                                  <View style={styles.checkboxcontentparent}>
                                                    <CheckBox
                                                      disabled={true}
                                                      value={false}                                              
                                                      style={styles.checkboxunchecked}
                                                      tintColors={{ true: '#4285F4', false: '#808080' }}                             
                                                    />   
                                                  </View>                                                                                 
                                              </View> 
                                          }                             
                                      </TouchableNativeFeedback>
                                    </Card>
                                  </View>
                                }
                              </View>
                              )}
                            />
                        </View>

                        <View style={styles.parentbuttons}>
                          <View style={styles.buttoninnerlayout}>
                             <Card style={styles.cardcontainerlogout}> 
                                  <View style={styles.cardcreateinner}>
                                      <TouchableNativeFeedback onPress={(e) => logout()}>
                                          <View style={styles.createbutton}>
                                             <ButtonText label={'Logout'}/> 
                                          </View>
                                      </TouchableNativeFeedback>
                                  </View>
                              </Card>
                          </View>
                          <View style={styles.buttoninnerlayout}>
                              <Card style={styles.cardcontainercreate}> 
                                  <View style={styles.cardcreateinner}>
                                      <TouchableNativeFeedback onPress={(e) => movetocreatepage()}>
                                          <View style={styles.createbutton}>                                           
                                            <ButtonText label={'Create Record'}/> 
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

export default ListPage;

