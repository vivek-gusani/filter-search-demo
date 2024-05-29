import React, { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  clearFilterData,
  clearSingleFilter,
} from "../../../redux/ducks/allFilters";
import { dataSearch } from "../../../redux/sagas/actions";

const FilterChips = () => {
  const allFiltersReducer = useSelector((state) => state.allFiltersReducer);
  const dispatch = useDispatch();

  const [showClearFilter, setShowClearFilter] = useState(false);

  useEffect(() => {
    let selectedChipData = Object.keys(allFiltersReducer?.appliedFilters)?.find(
      (filter) => allFiltersReducer?.appliedFilters[filter].isApplied
    );

    if (selectedChipData) {
      setShowClearFilter(true);
    } else {
      setShowClearFilter(false);
    }
  }, [allFiltersReducer?.appliedFilters]);

  return (
    <div className="flex items-center justify-between w-full mx-5">
      <div className="flex justify-start items-center flex-wrap">
        {allFiltersReducer?.appliedFilters &&
          Object.keys(allFiltersReducer?.appliedFilters)?.map(
            (filter, index) => {
              return (
                allFiltersReducer?.appliedFilters[filter].isApplied && (
                  <Chip
                    key={index}
                    color="primary"
                    label={allFiltersReducer?.appliedFilters[filter].chipText}
                    deleteIcon={<CloseIcon className="!text-colorWhite" />}
                    onDelete={() => {
                      dispatch(clearSingleFilter({ key: filter }));
                    }}
                    className="!rounded-lg !bg-colorPrimary !m-1 !flex !justify-between !items-center"
                  />
                )
              );
            }
          )}
      </div>

      {showClearFilter && (
        <p
          className="text-colorPrimary underline cursor-pointer"
          onClick={() => {dispatch(clearFilterData()); dispatch(dataSearch(allFiltersReducer.searchBarData))}}
        >
          Clear
        </p>
      )}
    </div>
  );
};

export default FilterChips;
