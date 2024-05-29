import { SET_DATA, SET_LOADING } from "../sagas/actionTypes";
export const CHANGE_APPLIED_FILTERS = "CHANGE_APPLIED_FILTERS";
export const CHANGE_SEARCHBAR_DATA = "CHANGE_SEARCHBAR_DATA";

export const CLEAR_SINGLE_FILTER = "CLEAR_SINGLE_FILTER";
export const CLEAR_FILTER_DATA = "CLEAR_FILTER_DATA";

export const changeAppliedFilters = (filter) => ({
  type: CHANGE_APPLIED_FILTERS,
  payload: filter,
});

export const changeSearchBarData = (filter) => ({
  type: CHANGE_SEARCHBAR_DATA,
  payload: filter,
});

export const clearSingleFilter = (filter) => ({
  type: CLEAR_SINGLE_FILTER,
  payload: filter,
});

export const clearFilterData = () => ({
  type: CLEAR_FILTER_DATA,
});

const initialState = {
  loading: false,
  appliedFilters: {
    FileName: {
      selectedValue: "",
      chipText: "",
      isApplied: false,
    },
    Party: {
      selectedValue: "",
      chipText: "",
      isApplied: false,
    },
    People: {
      selectedValue: "",
      chipText: "",
      isApplied: false,
    },
    Date: {
      startDate: 0,
      endDate: 0,
      chipText: "",
      isApplied: false,
    },
    Percentage: {
      startPercentage: 0,
      endPercentage: 0,
      chipText: "",
      isApplied: false,
    },
    Currency: {
      startCurrency: 0,
      endCurrency: 0,
      chipText: "",
      isApplied: false,
    },
    County: {
      selectedValue: "",
      chipText: "",
      isApplied: false,
    },
    State: {
      selectedValue: "",
      chipText: "",
      isApplied: false,
    },
    Country: {
      selectedValue: "",
      chipText: "",
      isApplied: false,
    },
  },
  searchBarData: "",
  searchData:{},
};

const allFiltersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_APPLIED_FILTERS:
      return {
        ...state,
        appliedFilters: {
          ...state.appliedFilters,
          [`${action.payload.key}`]: {
            ...action?.payload.value,
          },
        },
      };

    case CHANGE_SEARCHBAR_DATA:
      return {
        ...state,
        [`${action.payload.key}`]: `${action.payload.value}`,
      };

    case CLEAR_SINGLE_FILTER:
      console.log(">>>", action.payload.key);
      switch (action.payload.key) {
        case "FileName":
        case "Party":
        case "People":
        case "County":
        case "State":
        case "Country":
          return {
            ...state,
            appliedFilters: {
              ...state.appliedFilters,
              [`${action.payload.key}`]: {
                selectedValue: "",
                chipText: "",
                isApplied: false,
              },
            },
          };
        case "Date": {
          return {
            ...state,
            appliedFilters: {
              ...state.appliedFilters,
              [`${action.payload.key}`]: {
                startDate: 0,
                endDate: 0,
                chipText: "",
                isApplied: false,
              },
            },
          };
        }

        case "Percentage": {
          return {
            ...state,
            appliedFilters: {
              ...state.appliedFilters,
              [`${action.payload.key}`]: {
                startPercentage: 0,
                endPercentage: 0,
                chipText: "",
                isApplied: false,
              },
            },
          };
        }

        case "Currency": {
          return {
            ...state,
            appliedFilters: {
              ...state.appliedFilters,
              [`${action.payload.key}`]: {
                startCurrency: 0,
                endCurrency: 0,
                chipText: "",
                isApplied: false,
              },
            },
          };
        }
        default:
          return state;
      }
    case CLEAR_FILTER_DATA:
      return {
        ...state,
        appliedFilters: {
          ...state.appliedFilters,
          FileName: {
            selectedValue: "",
            chipText: "",
            isApplied: false,
          },
          Party: {
            selectedValue: "",
            chipText: "",
            isApplied: false,
          },
          People: {
            selectedValue: "",
            chipText: "",
            isApplied: false,
          },
          Date: {
            startDate: 0,
            endDate: 0,
            chipText: "",
            isApplied: false,
          },
          Percentage: {
            startPercentage: 0,
            endPercentage: 0,
            chipText: "",
            isApplied: false,
          },
          Currency: {
            startCurrency: 0,
            endCurrency: 0,
            chipText: "",
            isApplied: false,
          },
          County: {
            selectedValue: "",
            chipText: "",
            isApplied: false,
          },
          State: {
            selectedValue: "",
            chipText: "",
            isApplied: false,
          },
          Country: {
            selectedValue: "",
            chipText: "",
            isApplied: false,
          },
        },
      };
    case SET_DATA:
        return ({...state, searchData: action.payload});   
    case SET_LOADING:
      return ({...state, loading: action.payload});     
    default:
      return state;
  }
};

export default allFiltersReducer;
