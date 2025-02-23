import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Image, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoreData, refreshData } from '../../redux/FeedAction';
import { BatteryHeader, Card } from '../../components';
import { Icons } from '../../common';
import { useTheme } from "../../context/ThemeProvider";
import getStyles from './style';
import { CardProps, ImageLoading } from '../../types';
import { refreshSuccess } from '../../redux/FeedSlice';

const Feed = (props) => {
    const dispatch = useDispatch();
    const { data, isLoading, isRefreshing, moreLoading } = useSelector(state => state.feed);
    const theme = useTheme();
    const styles = getStyles(theme);
    const [imageLoadState, setImageLoadState] = useState<ImageLoading | {}>({});

    useEffect(() => {
        dispatch(fetchMoreData(false)); // Load initial data
    }, [dispatch]);

    const handleLoad = (index: number, value: boolean) => {
        setImageLoadState({ ...imageLoadState, [index]: value });
    };

    const onPin = (item: CardProps, index: number) => {
        const updatedData = data.map((val, i) =>
            i === index ? { ...val, pin: !item.pin } : val
        );
        const pinList = updatedData?.filter(val => val.pin);
        const unPinList = updatedData?.filter(val => !val.pin);
        dispatch(refreshSuccess([...pinList, ...unPinList]));
    }

    const renderItem = (item: CardProps, index: number) => {
        return (
            <Card
                item={item}
                index={index}
                imageLoadState={imageLoadState}
                onPress={(data: CardProps, i: number) => onPin(data, i)}
                handleLoad={(i: number) => handleLoad(i, true)}
                handleError={(i: number) => handleLoad(i, false)}
            />
        )
    }

    const renderFooter = () => {
        if (moreLoading) {
            return (
                <View style={styles.moreLoadingView}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        return <View />;
    };

    const emptyView = () => {
        return (
            <View style={styles.centerView}>
                <Text style={styles.title}>No feeds available</Text>
            </View>
        )
    }

    return (
        <View style={styles.flexOne}>
            <View style={styles.headerStyle}>
                <View style={styles.flexOne}>
                    <BatteryHeader />
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
                    <Image source={Icons.setting} style={styles.setting} />
                </TouchableOpacity>
            </View>

            {
                isLoading ? <View style={styles.centerView}><ActivityIndicator size="large" /></View>
                    :
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => renderItem(item, index)}
                        onEndReached={() => dispatch(fetchMoreData(true))} // Load more when reaching bottom
                        onEndReachedThreshold={0.5}
                        refreshControl={
                            <RefreshControl refreshing={isRefreshing} onRefresh={() => dispatch(refreshData())} />
                        }
                        refreshing={isRefreshing}
                        ListFooterComponent={() => renderFooter()}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => emptyView()}
                    />
            }
        </View>
    );
};

export default Feed;
