import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { Context } from '../@Core/Context/UserContext';
import { UserResponse } from '../@Core/Models/User';

export default function TransactionsScreen({ navigation }) {
    
    const { state, setUser }: { state: UserResponse, setUser: Function } = React.useContext(Context);

    if (!state) {
        console.log(state);
        
        // navigation.navigate('Login');    
    }

    return <View style={styles.container}>
        <Text>Helloo</Text>
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