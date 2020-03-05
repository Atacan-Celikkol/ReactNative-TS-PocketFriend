import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import { Theme, ThemeProvider } from 'react-native-elements';
import { Provider as UserProvider } from './src/@Core/Context/UserContext';
import { navigationRef } from './src/@Core/Helpers/RootNavigation';
import LoginScreen, { navigationOptions as LoginScreenNavigationOptions } from './src/Screens/LoginScreen';
import TransactionsScreen, { navigationOptions as TransactionsScreenNavigationOptions } from './src/Screens/TransactionsScreen';

const Stack = createStackNavigator();

export default function App() {
    const theme: Theme = {
        Divider: {
            style: {
                height: 2,
                marginVertical: 3
            }
        },
        Input: {
            style: {
                marginVertical: 5
            },
            containerStyle: {
                marginBottom: 10,
                paddingHorizontal: 0
            },
            inputContainerStyle: {
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 3
            },
            leftIconContainerStyle: {
                marginLeft: 0,
                marginRight: 5,
                paddingHorizontal: 5,
                backgroundColor: '#ddd'
            },
            leftIcon: {
                iconStyle: { fontSize: 35, color: '#555' },
                name: ''
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <NavigationContainer ref={navigationRef}>
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={LoginScreen} options={LoginScreenNavigationOptions} />
                        <Stack.Screen name="Transactions" component={TransactionsScreen} options={TransactionsScreenNavigationOptions} />
                    </Stack.Navigator>
                </NavigationContainer>
            </UserProvider>
        </ThemeProvider>
    );
}