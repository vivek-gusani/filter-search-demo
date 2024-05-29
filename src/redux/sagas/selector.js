import { createSelector } from 'reselect';

const getSearchDomain = () => ( state ) => state.get( 'searchData' );

const getSearchData = () => createSelector(
    getSearchDomain(),
    ( substate ) => substate.get( 'SearchData' )
);

export {
    getSearchData,
    getSearchDomain
};
