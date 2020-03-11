import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { Context } from '../@Core/Context/UserContext';
import { TransactionResponse } from '../@Core/Models/Transaction';
import { UserResponse } from '../@Core/Models/User';
import { GetExpensesAsync } from '../@Core/Services/ExpenseService';
import { GetIncomesAsync } from '../@Core/Services/IncomeService';
import TransactionListItem from '../Components/TransactionListItem';

export default function TransactionsScreen({ navigation }) {

    const { state, setUser }: { state: UserResponse, setUser: Function } = React.useContext(Context);

    const [incomes, setIncomes]: [TransactionResponse[], (incomes: TransactionResponse[]) => void] = React.useState(null);
    const [incomesLoading, setIncomesLoading]: [boolean, Function] = React.useState(true);
    const [incomesTotal, setIncomesTotal]: [number, (incomesTotal: number) => void] = React.useState(0);
    const [expenses, setExpenses]: [TransactionResponse[], (incomes: TransactionResponse[]) => void] = React.useState(null);
    const [expensesLoading, setExpensesLoading]: [boolean, Function] = React.useState(true);
    const [expensesTotal, setExpensesTotal]: [number, (incomesTotal: number) => void] = React.useState(0);

    if (!state) {
        navigation.navigate('Login');
    }

    const getTransactions = (dates) => {
        const dateItems = { startDate: new Date(dates.startDate).getTime(), endDate: new Date(dates.endDate).getTime() }

        getIncomesAsync(dateItems);
        getExpensesAsync(dateItems);
    }

    const getIncomesAsync = async (dates) => {
        setIncomes([]);
        setIncomesLoading(true);
        setIncomesTotal(0);

        GetIncomesAsync(dates, 'on_date desc,created desc', '').then(x => {
            setIncomes(x);
            setIncomesLoading(false);
        });
    }

    const getExpensesAsync = async (dates) => {
        setExpenses([]);
        setExpensesLoading(true);
        setExpensesTotal(0);

        console.log('GetExpensesStart', new Date().toLocaleTimeString());
        GetExpensesAsync(dates, 'on_date desc,created desc', '').then(x => {
            console.log('GetExpensesMiddle', new Date().toLocaleTimeString());
            setExpenses(x);
            setExpensesLoading(false);
        }).then(x => {
            console.log('GetExpensesEnd', new Date().toLocaleTimeString());
        });
    }

    React.useEffect(() => {
        getTransactions({ startDate: '2020-02-01', endDate: '2020-03-01' });
    }, []);

    return <View style={styles.mainContainer}>
        {/* <TestComponent navigation={navigation} /> */}
        <ScrollView style={styles.innerContainer}>
            <View style={styles.incomesContainer}>
                <Text style={styles.incomesTitle}>Incomes</Text>
                {
                    incomesLoading && <ActivityIndicator size={40} color='#3a3' style={{ flex: 1 }} />
                }
                {
                    !incomesLoading ? incomes.map((item, i) => {
                        return <TransactionListItem key={i} transaction={item} onDelete={(id: string) => { }} onEdit={(id: string) => { }} />
                    }) : null
                }
            </View>
        </ScrollView>
        <View style={styles.expensesContainer}>
            <Text style={styles.expensesTitle}>Expenses</Text>
            {
                expensesLoading && <ActivityIndicator size={40} color='#f33' style={{ flex: 1 }} />
            }
            {
                !expensesLoading ? <FlatList
                    data={expenses}
                    keyExtractor={x => x.objectId}
                    renderItem={({ item, index }) => <TransactionListItem transaction={item} onDelete={(id: string) => { }} onEdit={(id: string) => { }} />}
                /> : null
            }
        </View>
    </View>
}

export const navigationOptions = ({ navigation }): StackNavigationOptions => {

    // const { setUser }: { state: UserResponse, setUser: Function } = React.useContext(Context);

    return {
        headerShown: true,
        headerTitleAlign: "center",
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#222',
            shadowColor: 'red',
            shadowOpacity: 1
        },
        headerRight: () => <Button onPress={() => null} title='Logout' buttonStyle={{ backgroundColor: '#f33e' }} />,
        headerRightContainerStyle: {
            paddingRight: 7
        }

    };
};

const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 5,
        alignContent: 'center',
        justifyContent: 'center'
    },
    innerContainer: {
    },
    incomesContainer: {
        paddingHorizontal: 5,
        paddingBottom: 5,
        borderRadius: 5,
        marginVertical: 2.5
    },
    incomesTitle: {
        fontSize: 40,
        color: '#3a3',
    },
    expensesContainer: {
        paddingHorizontal: 5,
        paddingBottom: 5,
        borderRadius: 5,
        marginVertical: 2.5
    },
    expensesTitle: {
        fontSize: 40,
        color: '#f33',
    }
});

function TestComponent({ navigation }) {

    const { state, setUser }: { state: UserResponse, setUser: Function } = React.useContext(Context);
    return <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button onPress={() => navigation.replace('Login')} title='Back' buttonStyle={{ backgroundColor: '#333', margin: 1 }} />
        <Button onPress={() => setUser(null)} title='Logout' buttonStyle={{ backgroundColor: '#f33e', margin: 1 }} />
    </View>
}