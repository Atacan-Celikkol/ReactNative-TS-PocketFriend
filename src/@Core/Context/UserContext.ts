import { AsyncStorage } from "react-native";
import createDataContext from "../Helpers/CreateDataContext";
import { UserResponse } from '../Models/User';

function userReducer(state: UserResponse, action: { type: string, payload: any; callback: Function }) {
   switch (action.type) {

      case 'setUser':
         AsyncStorage.setItem('user-token', JSON.stringify(action.payload['user-token']));
         AsyncStorage.setItem('user', JSON.stringify(action.payload));
         return action.payload;

      default:
         return state;
   }
};

function setUser(dispatch) {
   return (user: UserResponse, callback) => {
      dispatch({ type: 'setUser', payload: user, callback });
   }
}

export const { Context, Provider } = createDataContext(userReducer, { setUser }, null);

