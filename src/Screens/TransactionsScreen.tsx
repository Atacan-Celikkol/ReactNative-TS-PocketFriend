import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { Context } from '../@Core/Context/UserContext';
import { UserResponse } from '../@Core/Models/User';

export default function TransactionsScreen({ navigation }) {

    const { state, setUser }: { state: UserResponse, setUser: Function } = React.useContext(Context);

    if (state) {
        console.log(state);
    }

    if (!state) {
        navigation.navigate('Login');
    }

    return <View style={styles.container}>
        <TestComponent navigation={navigation} />
        <ListItem title="28/01/2020" rightTitle="₺55.66" rightSubtitle={
            <View style={{ flexDirection: 'row', backgroundColor: '#f330' }}>
                <Button icon={{ type: 'evilicon', name: 'trash', containerStyle: {}, color: 'white', size: 20 }}
                    buttonStyle={{ backgroundColor: 'salmon', padding: 0, borderRadius: 1000, height: 25, width: 25 }} />
                <Button icon={{ type: 'evilicon', name: 'pencil', containerStyle: {}, color: 'white', size: 20 }}
                    buttonStyle={{ backgroundColor: 'gray', padding: 0, borderRadius: 1000, height: 25, width: 25 }} />
            </View>
        } subtitle="Bim market alışverişi" bottomDivider />
        <ListItem title="28/01/2020" subtitle={null} bottomDivider rightAvatar={{editButton:{}}} />
        <ListItem title="28/01/2020" subtitle="Bim market alışverişi" bottomDivider />
    </View>
}

export const navigationOptions = ({ navigation }): StackNavigationOptions => {
    return {
        headerShown: true,
    };
};

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        margin: 15,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

function TestComponent({ navigation }) {

    const { state, setUser }: { state: UserResponse, setUser: Function } = React.useContext(Context);
    return <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button onPress={() => navigation.replace('Login')} title='Back' buttonStyle={{ backgroundColor: '#333', margin: 1 }} />
        <Button onPress={() => setUser(null)} title='Logout' buttonStyle={{ backgroundColor: '#f33e', margin: 1 }} />
    </View>
}