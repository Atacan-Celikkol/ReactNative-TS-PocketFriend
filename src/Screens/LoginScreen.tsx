import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { AsyncStorage, StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { Context } from '../@Core/Context/UserContext';
import { UserResponse } from '../@Core/Models/User';
import { LoginAsync } from "../@Core/Services/UserService";

export default function LoginScreen({ navigation }) {

    const { user, setUser }: { user: UserResponse, setUser: Function } = React.useContext(Context);
    const [isLoading, setIsLoading] = React.useState(false);
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState(null);

    if (user === undefined) {
        AsyncStorage.getItem('user').then(x => setUser(x));
    }

    const loginUser = () => {
        LoginAsync({ login, password })
            .then(x => {
                x.message && setErrorMessage(x.message);
                if (x['user-token']) {
                    setUser(x);
                    setErrorMessage(null);
                    navigation.replace('Transactions');
                };
                setIsLoading(false);
            });
    }

    return <View style={styles.container}>
        <Input
            placeholder='Email'
            leftIcon={{ type: 'evilicon', name: 'envelope' }}
            onChangeText={x => setLogin(x)}
            disabled={isLoading}
        />
        <Input
            placeholder='Password'
            leftIcon={{ type: 'evilicon', name: 'lock' }}
            onChangeText={x => setPassword(x)}
            secureTextEntry={true}
            disabled={isLoading}
            errorMessage={errorMessage}

        />
        <Button title="Login" onPress={() => { setIsLoading(true); loginUser() }} disabled={isLoading} loading={isLoading} />
    </View>
}

export const navigationOptions = ({ navigation }): StackNavigationOptions => {
    return {
        headerShown: false,
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