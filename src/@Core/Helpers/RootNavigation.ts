import { NavigationHelpers } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef: any = React.createRef();

type Navigation = {
    current: NavigationHelpers<any>;
};
const navigation: Navigation = navigationRef;

export function navigate(name, params: object = undefined) {
    navigation.current?.navigate(name, params);
}
