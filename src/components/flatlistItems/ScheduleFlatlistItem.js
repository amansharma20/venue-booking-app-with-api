/* eslint-disable prettier/prettier */
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Responsive } from '../../../constants/Layout';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, images, SIZES } from '../../../constants';
import { format } from "date-fns";

const ScheduleFlatlistItem = (props) => {
    const Bookings = props.bookings

    const navigation = useNavigation();
    const isToday = false;
    const isCancelled = false;
    const even = props.index % 2;
    const leftBackgroundColor = (even === 0) ? '#7E0027' : '#273575';
    const rightBackgroundColor = (even === 0) ? '#DB3E6F' : '#7B91F8';
    const item = props.item;

    var bookingTime = new Date(Bookings.item.BookingDateTime);
    var bookingDate = new Date(Bookings.item.BookingDateTime);

    var formattedDate = format(bookingDate, "dd MMM");
    var formattedTime = format(bookingTime, "H:mm a");

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ paddingRight: 15 }}>
                    <Text style={{ fontSize: SIZES.h5, fontFamily: FONTS.satoshi900, color: COLORS.white, textAlign: 'center' }}>
                        {formattedDate}
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ScheduleBookingDetails',
                        {
                            bookingDetails: Bookings
                        })}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} colors={[leftBackgroundColor, rightBackgroundColor]} style={styles.linearGradient}>
                        <View style={styles.leftContainer}>
                            {/* <View>
                                {
                                    isToday === true
                                        ?
                                        <Text style={styles.upcomingActivityText}>
                                            Upcoming activity
                                        </Text>
                                        :
                                        <Text style={styles.upcomingActivityText}>
                                            Today’s Activity
                                        </Text>
                                }

                            </View> */}
                            <View>
                                <Text style={styles.venueText}>
                                    {Bookings.item.ActivityArena.Arena.Name}
                                </Text>
                                <Text style={styles.upcomingActivityText}>
                                    {Bookings.item.ActivityArena.Activity.Name}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.upcomingActivityText}>
                                    {formattedTime}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image source={images.cardImage} style={styles.imageSize} />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: SIZES.padding6,
    },
    linearGradient: {
        width: Responsive.width(289),
        height: Responsive.height(131),
        borderRadius: 15,
        flexDirection: 'row',
        padding: 16,
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    imageContainer: { justifyContent: 'center' },
    imageSize: { width: 80, height: 80 },
    upcomingActivityText: {
        color: COLORS.white,
        fontSize: 12,
        fontFamily: FONTS.satoshi700,
    },
    venueText: {
        fontFamily: FONTS.satoshi900,
        fontSize: 18,
        color: COLORS.white,
    }

});

export default ScheduleFlatlistItem;
