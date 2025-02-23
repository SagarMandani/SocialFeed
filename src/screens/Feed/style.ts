import { StyleSheet } from 'react-native';

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    flexOne: {
      flex: 1,
    },
    moreLoadingView: {
      marginBottom: 30,
    },
    headerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 55,
      backgroundColor: theme.colors.background,
    },
    setting: {
      height: 25,
      width: 25,
      marginRight: 20,
      tintColor: theme.colors.text,
    },
    centerView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 14,
      textAlign: 'center',
    },
  });

export default getStyles;
