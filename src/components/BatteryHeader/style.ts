import {StyleSheet} from 'react-native';

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      color: theme.colors.text,
    },
    sync: {
      tintColor: theme.colors.text,
      height: 20,
      width: 20,
      marginLeft: 10
    },
  });

export default getStyles;
