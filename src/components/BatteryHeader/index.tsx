import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import getStyles from './style';
import { useTheme } from '../../context/ThemeProvider';
import useBattery from './UseBattery';
import { Icons } from '../../common';

const BatteryHeader: React.FC = () => {
    const { batteryLevel, batteryState, getBatteryLevel } = useBattery();
    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>🔋 Battery State: {batteryState}</Text>
                <Text style={styles.title}>🔋 Battery Level: {batteryLevel !== null ? `${batteryLevel}%` : 'Loading...'}</Text>
            </View>
            <Pressable onPress={() => getBatteryLevel()}>
                <Image source={Icons.sync} style={styles.sync} />
            </Pressable>
        </View>
    );
};

export default BatteryHeader;
