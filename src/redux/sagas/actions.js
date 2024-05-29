import { SEARCH, FILTER } from "./actionTypes";

export const dataSearch = (data) => {
    return {
      type: SEARCH,
      payload: data,
    };
  };

  export const dataFilter = (data) => {
    return {
      type: FILTER,
      payload: data,
    };
  };