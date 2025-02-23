import {StyleSheet} from 'react-native';

const getStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      margin: 10,
      borderRadius: 10,
      elevation: 4,
      shadowRadius: 10,
      shadowColor: 'black',
      shadowOffset: {height: 2, width: 2},
    },
    fRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageView: {
      width: 100,
      height: 90,
      margin: 5,
      borderRadius: 10,
    },
    title: {
      flex: 1,
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: 10,
      color: theme.colors.text,
    },
    des: {
      fontSize: 12,
      fontWeight: 'bold',
      margin: 10,
      color: theme.colors.text,
    },
    loaderStyle: {
      position: 'absolute',
      left: 45,
    },
    starStyle: {
      height: 25,
      width: 25,
      marginHorizontal: 10,
    }
  });

export default getStyles;
