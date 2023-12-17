import React, { useState } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({onDateChange}) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [text, setText] = useState('...');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let formattedDate = tempDate.toISOString().split('T')[0]; // Format tanggal ke 'yyyy-MM-dd'
        setText(formattedDate);

        if (onDateChange) {
            onDateChange(formattedDate); // Meneruskan nilai tanggal ke prop onDateChange
        }
    }

    const showPicker = () => {
        setShow(true);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.getDateTime}>{text}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title='Tanggal Pengiriman'
                    onPress={showPicker}
                />
            </View>

            {show &&
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    getDateTime: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonContainer: {
        margin: 20,
    }
});

export default DatePicker;
