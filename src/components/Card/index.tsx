import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, LayoutAnimation, Image } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import getStyles from './style';
import { useTheme } from "../../context/ThemeProvider";
import { CardProps, ImageLoading } from "../../types";
import { Icons } from "../../common";

type Props = {
    item: CardProps;
    index: number;
    handleLoad: (i: number) => void;
    handleError: (i: number) => void;
    imageLoadState: ImageLoading | null;
    onPress: (data: CardProps, i: number) => void;
}

const Card: React.FC<Props> = ({ item, index, handleLoad, handleError, imageLoadState, onPress }) => {

    const [expanded, setExpanded] = useState(false);
    // const height = useSharedValue(100);
    const theme = useTheme();
    const styles = getStyles(theme);

    const toggleExpand = () => {
        // height.value = withTiming(expanded ? 100 : 150, { duration: 300 });
        setExpanded(!expanded);
        LayoutAnimation.configureNext({
            duration: 500,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            },
            delete: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            },
        });
    };

    // const animatedStyle = useAnimatedStyle(() => ({
    //     height: height.value,
    // }));

    return (
        <TouchableOpacity style={styles.container} onPress={toggleExpand} activeOpacity={1}>
            {/* <Animated.View style={animatedStyle}> */}
            <View style={styles.fRow}>
                <FastImage
                    style={styles.imageView}
                    source={{ uri: item.image }}
                    onLoadStart={() => handleLoad(index)}
                    onLoadEnd={() => handleError(index)}
                />
                {imageLoadState[index] &&
                    <ActivityIndicator style={styles.loaderStyle} color="white" />
                }
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => onPress(item, index)}>
                    <Image source={Icons.star} style={[styles.starStyle, { tintColor: item?.pin ? '#FFAA4A' : theme.colors.text }]} />
                </TouchableOpacity>

            </View>
            {expanded && <Text style={styles.des}>{item.description}</Text>}
            {/* </Animated.View> */}
        </TouchableOpacity>
    );
};

export default Card;
