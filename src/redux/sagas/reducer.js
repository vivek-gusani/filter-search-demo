import { fromJS } from 'immutable';
import {
    SET_DATA
} from './actionTypes';

const initialState = fromJS({
    SearchData: []
});

function approvalsReducer( state = initialState, action ) {
    switch ( action.type ) {
        case SET_DATA:
            return state.set( 'SearchData', fromJS( action.payload ) );
        case DEFAULT_ACTION:
            return state;
        default:
            return state;
    }
}

export default approvalsReducer;
