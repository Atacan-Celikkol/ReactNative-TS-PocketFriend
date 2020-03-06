import createDataContext from "../Helpers/CreateDataContext";
import { UserResponse } from '../Models/User';

function userReducer(state: UserResponse, action: { type: string, payload: any; callback: Function }) {
   switch (action.type) {

      case 'setUser':
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

