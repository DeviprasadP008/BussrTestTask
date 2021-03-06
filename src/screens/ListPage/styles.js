import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    parent: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#4285F4',
        flexDirection: 'column',
    },
    pageparentcontent: {
        flex: 4,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    pagecontent: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    parentmain: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    parentsearch: {
        backgroundColor: '#f5f5f5',
        padding: 5,
        marginVertical: 10,
        borderRadius: 10,
        marginBottom: 50,
    },
    textsearch: {
        width: '100%',
        backgroundColor: '#fff', 
        paddingHorizontal: 20,
        borderRadius: 10, 
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'left',
        color: '#000',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto-Medium',
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
    listitemchecked: {
        width: '100%',
        padding: 5,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#cbe190',
        flexDirection: 'row',
        borderRadius: 10,
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
   textcontentparent: {
        flex: 3, 
        width: '100%', 
        height: '100%', 
        padding: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    checkboxcontentparent: {
        flex: 1, 
        width: '100%', 
        height: '100%', 
        padding: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    checkboxunchecked: {
        alignSelf: "center",
    },
    checkboxchecked: {
        alignSelf: "center",
    },
    contentparentouter: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 5,
      },
    cardcontainerinput: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 5,
        shadowColor: '#4285F4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        ...Platform.select({
          ios: {
            shadowRadius: 1,
            elevation: 2,
          },
          android: {
            shadowRadius: 2,
            elevation: 4,
          },
        }),
      },
    cardcontainercreate: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#4285F4',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: '#4285F4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        ...Platform.select({
            ios: {
                shadowRadius: 1,
                elevation: 2,
            },
            android: {
                shadowRadius: 2,
                elevation: 4,
            },
        }),
    },
    cardcontainerlogout: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FF0000',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: '#FF0000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        ...Platform.select({
            ios: {
                shadowRadius: 1,
                elevation: 2,
            },
            android: {
                shadowRadius: 2,
                elevation: 4,
            },
        }),
    },
    cardcreateinner: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    createbutton: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    parentflatlist: {
        flex: 5, 
        width: '100%', 
        height: '100%', 
        padding: 5,
    },
    parentflatlistinner: {
        flex: 1, 
        width: '100%'
    },
    parentbuttons: {
        flex: 1, 
        width: '100%', 
        height: '100%', 
        padding: 5, 
        flexDirection: 'row',
    },
    buttoninnerlayout: {
        flex: 2, 
        width: '100%', 
        height: '100%', 
        padding: 5, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
});