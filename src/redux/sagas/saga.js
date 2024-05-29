import { take, call, cancel, put, takeEvery } from "redux-saga/effects";
import { LOCATION_CHANGE } from "react-router-redux";
import { SEARCH, SET_DATA, FILTER, SET_LOADING } from "./actionTypes";
import { API } from "../../API";

export function* searchData({ payload }) {
  try {
    yield put({
      type: SET_LOADING,
      payload: true
    });
    const data = {
      "_source": ["file_name", "clause_number", "party", "currencies", "dates", "percentages", "counties", "states", "countries", "jurisdiction", "governing_law", "execution_date", "people", "termination_date"],
      "query": {
        "bool": {
          "must": {
            "intervals": {
              "clause.case_and_inflections": {
                "all_of": {
                  "ordered": payload.checked.order,
                  "max_gaps": -1,
                  "intervals": [
                    {
                      "match": {
                        "query": `${payload.searchBarValue}`,
                        "ordered": payload.checked.order,
                        "max_gaps": -1
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      },
      "sort": [
        { "clause_number": { "order": "asc" } }
      ],
      "highlight": {
        "fields": {
          "clause.case_and_inflections": {}
        },
        "pre_tags": "<em>",
        "post_tags": "</em>",
        "fragment_size": 200
      },
      "size": 10000,
      "aggs": {
        "state_agg": {
          "terms": {
            "field": "states"
          }
        },
        "county_agg": {
          "terms": {
            "field": "counties"
          }
        },
        "country_agg": {
          "terms": {
            "field": "countries"
          }
        },
        "dates_agg": {
          "terms": {
            "field": "dates"
          }
        },
        "percentages_agg": {
          "terms": {
            "field": "percentages"
          }
        },
        "parties_agg": {
          "terms": {
            "field": "party"
          }
        },
        "jurisdiction_agg": {
          "terms": {
            "field": "jurisdiction"
          }
        },
        "termination_date_agg": {
          "terms": {
            "field": "termination_date"
          }
        },
        "execution_date_agg": {
          "terms": {
            "field": "execution_date"
          }
        },
        "people_agg": {
          "terms": {
            "field": "people"
          }
        },
        "governing_law_agg": {
          "terms": {
            "field": "governing_law"
          }
        },
        "currency_agg": {
          "terms": {
            "field": "currencies.USD currencies.GBP"
          }
        }
      }
    };

    const insensitivity = {
      "_source": ["file_name", "clause_number", "party", "currencies", "dates", "percentages", "counties", "states", "countries", "jurisdiction", "governing_law", "execution_date", "people", "termination_date"],
      "query": {
        "bool": {
          "must": {
            "intervals": {
              "clause.case_insensitive": {
                "all_of": {
                  "ordered": payload.checked.order,
                  "max_gaps": -1,
                  "intervals": [
                    {
                      "match": {
                        "query": `${payload.searchBarValue}`,
                        "ordered": payload.checked.order,
                        "max_gaps": -1
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      },
      "sort": [
        { "clause_number": { "order": "asc" } }
      ],
      "highlight": {
        "fields": {
          "clause.case_insensitive": {}
        },
        "pre_tags": "<em>",
        "post_tags": "</em>",
        "fragment_size": 200
      },
      "size": 10000,
      "aggs": {
        "state_agg": {
          "terms": {
            "field": "states"
          }
        },
        "county_agg": {
          "terms": {
            "field": "counties"
          }
        },
        "country_agg": {
          "terms": {
            "field": "countries"
          }
        },
        "dates_agg": {
          "terms": {
            "field": "dates"
          }
        },
        "percentages_agg": {
          "terms": {
            "field": "percentages"
          }
        },
        "parties_agg": {
          "terms": {
            "field": "party"
          }
        },
        "jurisdiction_agg": {
          "terms": {
            "field": "jurisdiction"
          }
        },
        "termination_date_agg": {
          "terms": {
            "field": "termination_date"
          }
        },
        "execution_date_agg": {
          "terms": {
            "field": "execution_date"
          }
        },
        "people_agg": {
          "terms": {
            "field": "people"
          }
        },
        "governing_law_agg": {
          "terms": {
            "field": "governing_law"
          }
        },
        "currency_agg": {
          "terms": {
            "field": "currencies.USD currencies.GBP"
          }
        }
      }
    };

    const matchData = {
      "_source": ["file_name", "clause_number", "party", "currencies", "dates", "percentages", "counties", "states", "countries", "jurisdiction", "governing_law", "execution_date", "people", "termination_date"],
      "query": {
        "bool": {
          "must": {
            "intervals": {
              "clause.inflections": {
                "all_of": {
                  "ordered": payload.checked.order,
                  "max_gaps": payload.pick,
                  "intervals": [
                    {
                      "match": {
                        "query": `${payload.searchBarValue}`,
                        "ordered": payload.checked.order,
                        "max_gaps": payload.pick
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      },
      "sort": [
        { "clause_number": { "order": "asc" } }
      ],
      "highlight": {
        "fields": {
          "clause.inflections": {}
        },
        "pre_tags": "<em>",
        "post_tags": "</em>",
        "fragment_size": 200
      },
      "size": 10000,
      "aggs": {
        "state_agg": {
          "terms": {
            "field": "states"
          }
        },
        "county_agg": {
          "terms": {
            "field": "counties"
          }
        },
        "country_agg": {
          "terms": {
            "field": "countries"
          }
        },
        "dates_agg": {
          "terms": {
            "field": "dates"
          }
        },
        "percentages_agg": {
          "terms": {
            "field": "percentages"
          }
        },
        "parties_agg": {
          "terms": {
            "field": "party"
          }
        },
        "jurisdiction_agg": {
          "terms": {
            "field": "jurisdiction"
          }
        },
        "termination_date_agg": {
          "terms": {
            "field": "termination_date"
          }
        },
        "execution_date_agg": {
          "terms": {
            "field": "execution_date"
          }
        },
        "people_agg": {
          "terms": {
            "field": "people"
          }
        },
        "governing_law_agg": {
          "terms": {
            "field": "governing_law"
          }
        },
        "currency_agg": {
          "terms": {
            "field": "currencies.USD currencies.GBP"
          }
        }
      }
    };

    const matchNoInflections = {

      "_source": ["file_name", "clause_number", "party", "currencies", "dates", "percentages", "counties", "states", "countries", "jurisdiction", "governing_law", "execution_date", "people", "termination_date"],
      "query": {
        "bool": {
          "must": {
            "intervals": {
              "clause": {
                "all_of": {
                  "ordered": payload.checked.order,
                  "max_gaps": payload.pick,
                  "intervals": [
                    {
                      "match": {
                        "query": `${payload.searchBarValue}`,
                        "ordered": payload.checked.order,
                        "max_gaps": payload.pick,
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      },
      "sort": [
        { "clause_number": { "order": "asc" } }
      ],
      "highlight": {
        "fields": {
          "clause": {}
        },
        "pre_tags": "<em>",
        "post_tags": "</em>",
        "fragment_size": 200
      },
      "size": 10000,
      "aggs": {
        "state_agg": {
          "terms": {
            "field": "states"
          }
        },
        "county_agg": {
          "terms": {
            "field": "counties"
          }
        },
        "country_agg": {
          "terms": {
            "field": "countries"
          }
        },
        "dates_agg": {
          "terms": {
            "field": "dates"
          }
        },
        "percentages_agg": {
          "terms": {
            "field": "percentages"
          }
        },
        "parties_agg": {
          "terms": {
            "field": "party"
          }
        },
        "jurisdiction_agg": {
          "terms": {
            "field": "jurisdiction"
          }
        },
        "termination_date_agg": {
          "terms": {
            "field": "termination_date"
          }
        },
        "execution_date_agg": {
          "terms": {
            "field": "execution_date"
          }
        },
        "people_agg": {
          "terms": {
            "field": "people"
          }
        },
        "governing_law_agg": {
          "terms": {
            "field": "governing_law"
          }
        },
        "currency_agg": {
          "terms": {
            "field": "currencies.USD currencies.GBP"
          }
        }
      }
    };

    let finalData;
    payload.checked.match && payload.checked.inflections ?
      finalData = matchData :
      !payload.checked.match && !payload.checked.inflections ?
        finalData = insensitivity :
        payload.checked.match && !payload.checked.inflections ?
          finalData = matchNoInflections :
          !payload.checked.match && payload.checked.inflections ?
            finalData = data :
            finalData = data;

    const res = yield call(
      API,
      "https://search-legaleey-demo-test-contract-sdunrjwhfmocck46ysefijry2y.us-east-1.es.amazonaws.com/_search",
      {
        method: "POST",
        data: finalData,
        auth: {
          username: "admin",
          password: "Legaleey@123",
        },
      }
    );
    yield put({
      type: SET_DATA,
      payload: res.data,
    });
    yield put({
      type: SET_LOADING,
      payload: false
    });
  } catch (error) {
    console.log(error);
  } finally {
    yield put({
      type: SET_LOADING,
      payload: false
    });
  }
}

export function* filterData({ payload }) {
  try {
    let filterArr = [];
    payload.state !== "" && filterArr.push({ term: { states: payload.state } })
    payload.county !== "" && filterArr.push({ term: { counties: payload.county } })
    payload.party !== "" && filterArr.push({ term: { party: payload.party } })

    const data = {
      _source: ["file_name", "clause_number", "party", "currencies", "dates", "percentages", "counties", "states", "countries", "jurisdiction", "governing_law", "execution_date", "people", "termination_date"],
      query: {
        bool: {
          must: {
            intervals: {
              "clause.case_and_inflections": {
                all_of: {
                  ordered: true,
                  intervals: [
                    {
                      match: {
                        query: payload.filterdata,
                        max_gaps: 0,
                        ordered: true,
                      },
                    },
                  ],
                },
              },
            },
          },
          filter: filterArr,
        },
      },
      "sort": [
        { "clause_number": { "order": "asc" } }
      ],
      highlight: {
        fields: {
          "clause.case_and_inflections": {},
        },
        pre_tags: "<em>",
        post_tags: "</em>",
        fragment_size: 200,
        boundary_chars: ".,!? ",
      },
      "size": 10000,
      aggs: {
        state_agg: {
          terms: {
            field: "states",
          },
        },
        county_agg: {
          terms: {
            field: "counties",
          },
        },
        country_agg: {
          terms: {
            field: "countries",
          },
        },
        dates_agg: {
          terms: {
            field: "dates",
          },
        },
        percentages_agg: {
          terms: {
            field: "percentages",
          },
        },
        parties_agg: {
          terms: {
            field: "party",
          },
        },
        jurisdiction_agg: {
          terms: {
            field: "jurisdiction",
          },
        },
        termination_date_agg: {
          terms: {
            field: "termination_date",
          },
        },
        execution_date_agg: {
          terms: {
            field: "execution_date",
          },
        },
        people_agg: {
          terms: {
            field: "people",
          },
        },
        governing_law_agg: {
          terms: {
            field: "governing_law",
          },
        },
        currency_agg: {
          terms: {
            field: "currencies.USD currencies.GBP"
          }
        }
      },
    };

    const res = yield call(
      API,
      "https://search-legaleey-demo-test-contract-sdunrjwhfmocck46ysefijry2y.us-east-1.es.amazonaws.com/_search",
      {
        method: "POST",
        data: data,
        auth: {
          username: "admin",
          password: "Legaleey@123",
        },
      }
    );
    yield put({
      type: SET_DATA,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* watchForSearchData() {
  const watcher = yield takeEvery(SEARCH, searchData);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchForFilterData() {
  const watcher = yield takeEvery(FILTER, filterData);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
