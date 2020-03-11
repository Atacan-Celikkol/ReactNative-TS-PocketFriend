import moment from 'moment';
import React from 'react';
import { StyleSheet, View } from "react-native";
import { Button, ListItem } from 'react-native-elements';
import { TransactionResponse } from '../@Core/Models/Transaction';

export default function TransactionListItem({ transaction, onDelete, onEdit }: { transaction: TransactionResponse, onDelete: (id: string) => void, onEdit: (id: string) => void }) {
    const DeleteButton = () => {
        return <Button icon={{ type: 'evilicon', name: 'trash', iconStyle: styles.buttonIcon, containerStyle: {} }}
            buttonStyle={styles.deleteButton} onPress={() =>prompt('Silem mi?', 'sil amq')} />
    };

    const EditButton = () => {
        return <Button icon={{ type: 'evilicon', name: 'pencil', iconStyle: styles.buttonIcon, containerStyle: {} }}
            buttonStyle={styles.editButton} onPress={() => onEdit(transaction.objectId)} />
    };

    const RightSubtitle =
        <View style={styles.rightSubtitle}>
            <DeleteButton />
            <EditButton />
        </View>;

    return (
        <ListItem
            title={moment(transaction.on_date).format('DD/MM/YYYY')}
            rightTitle={'₺' + transaction.amount}
            rightSubtitle={RightSubtitle}
            subtitle={transaction.description}
            bottomDivider
        />
    )
}

const styles = StyleSheet.create({
    rightSubtitle: {
        flexDirection: 'row',
        backgroundColor: '#f330'
    },
    deleteButton: {
        backgroundColor: 'salmon',
        padding: 0,
        borderRadius: 100,
        height: 22,
        width: 22,
        marginRight: 2.5
    },
    editButton: {
        backgroundColor: 'gray',
        padding: 0,
        borderRadius: 100,
        height: 22,
        width: 22
    },
    buttonIcon: {
        color: 'white',
        fontSize: 22,
    }
});