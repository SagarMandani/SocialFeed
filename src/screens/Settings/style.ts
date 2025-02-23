import { StyleSheet } from 'react-native';

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    flex: {
      flex: 1,
    },
    text: {
      fontSize: 18,
      marginBottom: 10,
      color: theme.colors.text,
    },
    headerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 55,
      backgroundColor: theme.colors.background,
    },
    backIcon: {
      height: 20,
      width: 20,
      marginHorizontal: 10,
      tintColor: theme.colors.text,
    },
    headerTitle: {
      fontSize: 16,
      color: theme.colors.text,
    },
    bottomView: {
      padding: 20,
    },
    label: {
      fontSize: 14,
      marginBottom: 5,
    },
  });

export default getStyles;
