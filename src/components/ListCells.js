import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import CheckBox from '@react-native-community/checkbox';


const ListCells = ({ itemid, itemtitle, itemchecked }) => {

    console.log('Is checked value for given id is : ' + itemchecked);

    return (
        <>
          <View style={styles.parentcell}>
            <View style={styles.listItem}>  
                <View style={styles.textcontentparent}>
                   <Text style={styles.title}>{`${itemid}  -   ${itemtitle}`}</Text>   
                </View>   
                <View style={styles.checkboxcontentparent}>
                    {
                        itemchecked? 
                            <CheckBox
                                disabled={true}
                                value={true}                                                                                             
                                style={styles.checkboxstyle}
                                tintColors={{ true: '#4285F4', false: '#808080' }}                                               
                            /> 
                        :
                        <CheckBox
                            disabled={true}
                            value={false}                                                                                             
                            style={styles.checkboxstyle}
                            tintColors={{ true: '#4285F4', false: '#808080' }}                                               
                        /> 
                    }
                </View>                                                                                                                                  
            </View> 
          </View>
        </>
    );  
};

const styles = StyleSheet.create({
    parentcell: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    }, 
    listItem: {
        width: '100%',
        padding: 5,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 10,
    },
    textcontentparent: {
        flex: 3, 
        width: '100%', 
        height: '100%', 
        padding: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    title: {
        textAlign: 'left',
        fontSize: 14,
        color: '#000',
        fontWeight: '600',
        padding: 10,
        width: '100%',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto-Medium',
    },
    checkboxcontentparent: {
        flex: 1, 
        width: '100%', 
        height: '100%', 
        padding: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    checkboxstyle: {
        alignSelf: "center",
    },
});

export default ListCells;




 