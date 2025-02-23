import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/ThemeSlice';
import { useTheme } from "../../context/ThemeProvider";
import getStyles from './style';
import { Icons } from '../../common';
import { useOfflineHandler, Button } from '../../components';

const SettingsScreen = (props) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = getStyles(theme);

    const { isConnected, saveDataOffline, getOfflineData } = useOfflineHandler();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                setLoading(true);
                if (isConnected) {
                    const fetchedData = { message: "Hello from API!" };
                    saveDataOffline('cachedData', fetchedData);
                    if (isMounted) setData(fetchedData);
                } else {
                    const offlineData = getOfflineData('cachedData');
                    if (isMounted) setData(offlineData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            console.log("Cleaning up effect...");
            isMounted = false; // Prevent state updates on unmounted components
        };
    }, [isConnected]);

    return (
        <View style={styles.flex}>
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Image
                        resizeMode="contain"
                        source={Icons.back}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Setting</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Toggle Dark/Light Mode
                </Text>
                <Switch
                    value={theme.mode === "dark"}
                    onValueChange={() => dispatch(toggleTheme())}
                />
            </View>
            {
                loading ? <ActivityIndicator size="large" color="blue" />
                    :
                    <View style={styles.bottomView}>
                        <Text style={styles.label}>Internet Status: {isConnected ? "Online" : "Offline"}</Text>
                        <Text style={styles.label}>Data: {data ? data.message : "No data available"}</Text>
                        <Button title="Check Offline Data" onPress={() => console.log(getOfflineData('cachedData'))} />
                    </View>
            }
        </View>
    );
};

export default SettingsScreen;
