import {
  Divider,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAppliedFilters } from "../../redux/ducks/allFilters";
import CardInteractive from "./card-interactive/CardInteractive";
import { dataFilter } from "../../redux/sagas/actions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Filters = () => {
  const dispatch = useDispatch();
  const allFiltersReducer = useSelector((state) => state.allFiltersReducer);
  const filter = useSelector((state) => state.allFiltersReducer);


  console.log("allFiltersReducer:::", allFiltersReducer);
  const [fileName, setFileName] = useState("");
  const [party, setParty] = useState("");
  const [people, setPeople] = useState("");
  const [county, setCounty] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [governing, setGoverning] = useState("");
  const [execution, setExecution] = useState("");
  const [termination, setTermination] = useState("");

  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [date, setDate] = useState([startDate, endDate]);

  const [startPercentage, setStartPercentage] = useState(0);
  const [endPercentage, setEndPercentage] = useState(0);

  const [percentage, setPercentage] = useState([
    startPercentage,
    endPercentage,
  ]);

  const [startCurrency, setStartCurrency] = useState(0);
  const [endCurrency, setEndCurrency] = useState(0);
  const [currency, setCurrency] = useState([startCurrency, endCurrency]);

  const filterdata = filter?.searchBarData;
  const file_list = filter?.searchData?.hits?.hits?.map((data)=>data?._source?.file_name);
  const stat = filter?.searchData?.aggregations?.state_agg?.buckets;
  const county_list = filter?.searchData?.aggregations?.county_agg?.buckets;
  const country_list = filter?.searchData?.aggregations?.country_agg?.buckets;
  const parties_list = filter?.searchData?.aggregations?.parties_agg?.buckets;
  const people_list = filter?.searchData?.aggregations?.people_agg?.buckets;
  const jurisdiction_list = filter?.searchData?.aggregations?.jurisdiction_agg?.buckets;
  const governing_list = filter?.searchData?.aggregations?.governing_law_agg?.buckets;
  const execution_list = filter?.searchData?.aggregations?.execution_date_agg?.buckets;
  const termination_list = filter?.searchData?.aggregations?.termination_date_agg?.buckets;
  
  const date_list = filter?.searchData?.aggregations?.dates_agg?.buckets;
  const f_date = date_list?.map((data)=>data?.key_as_string.split("/"));
  const n_data = f_date?.map((a)=>+a[2]);
  const rmDuplicate = n_data?.filter((item, index)=>n_data.indexOf(item) === index);
  const max_date = rmDuplicate?.length && Math.max(...rmDuplicate);
  const min_date = rmDuplicate?.length && Math.min(...rmDuplicate);

  const pr_list = filter?.searchData?.aggregations?.percentages_agg?.buckets;
  const p_list = pr_list?.map((data)=>data?.key.split("."));
  const per = p_list?.map((a)=>+a[0]);
  const max_per = per?.length && Math.max(...per);
  const min_per = per?.length && Math.min(...per);

  useEffect(() => {
    setDate([startDate, endDate]);
  }, [startDate, endDate]);

  useEffect(() => {
    setPercentage([startPercentage, endPercentage]);
  }, [startPercentage, endPercentage]);

  useEffect(() => {
    setCurrency([startCurrency, endCurrency]);
  }, [endCurrency, startCurrency]);

  const changeFilters = () => {
    fileName &&
      dispatch(
        changeAppliedFilters({
          key: "FileName",
          value: {
            selectedValue: fileName,
            chipText: fileName,
            isApplied: true,
          },
        })
      );

    party &&
      dispatch(
        changeAppliedFilters({
          key: "Party",
          value: { selectedValue: party, chipText: party, isApplied: true },
        })
      );

    people &&
      dispatch(
        changeAppliedFilters({
          key: "People",
          value: { selectedValue: people, chipText: people, isApplied: true },
        })
      );
    state &&
      dispatch(
        changeAppliedFilters({
          key: "State",
          value: { selectedValue: state, chipText: state, isApplied: true },
        })
      );
    county &&
      dispatch(
        changeAppliedFilters({
          key: "County",
          value: { selectedValue: county, chipText: county, isApplied: true },
        })
      );

    country &&
      dispatch(
        changeAppliedFilters({
          key: "Country",
          value: { selectedValue: country, chipText: country, isApplied: true },
        })
      );

    startDate &&
      endDate &&
      dispatch(
        changeAppliedFilters({
          key: "Date",
          value: {
            startDate: startDate,
            endDate: endDate,
            chipText: `${startDate} - ${endDate}`,
            isApplied: true,
          },
        })
      );

    startPercentage &&
      endPercentage &&
      dispatch(
        changeAppliedFilters({
          key: "Percentage",
          value: {
            startPercentage: startPercentage,
            endPercentage: endPercentage,
            chipText: `${startPercentage}% - ${endPercentage}%`,
            isApplied: true,
          },
        })
      );

    startCurrency &&
      endCurrency &&
      dispatch(
        changeAppliedFilters({
          key: "Currency",
          value: {
            startCurrency: startCurrency,
            endCurrency: endCurrency,
            chipText: `$${startCurrency} - $${endCurrency}`,
            isApplied: true,
          },
        })
      );
  };

  useEffect(() => {
    allFiltersReducer?.appliedFilters &&
      setFileName(
        allFiltersReducer?.appliedFilters["FileName"]["selectedValue"]
      );
    setParty(allFiltersReducer?.appliedFilters["Party"].selectedValue);
    setPeople(allFiltersReducer?.appliedFilters["People"].selectedValue);
    setCounty(allFiltersReducer?.appliedFilters["County"].selectedValue);
    setState(allFiltersReducer?.appliedFilters["State"].selectedValue);
    setCountry(allFiltersReducer?.appliedFilters["Country"].selectedValue);

    setStartDate(allFiltersReducer?.appliedFilters["Date"].startDate);
    setEndDate(allFiltersReducer?.appliedFilters["Date"].endDate);

    setStartPercentage(
      allFiltersReducer?.appliedFilters["Percentage"].startPercentage
    );
    setEndPercentage(
      allFiltersReducer?.appliedFilters["Percentage"].endPercentage
    );

    setStartCurrency(
      allFiltersReducer?.appliedFilters["Currency"].startCurrency
    );
    setEndCurrency(allFiltersReducer?.appliedFilters["Currency"].endCurrency);
  }, [allFiltersReducer?.appliedFilters]);

  return (
    <div className="flex flex-col space-y-3 ">
      <CardInteractive
        cardTitle="File Name"
        bottomComponent={
          <Select
            className="w-full"
            displayEmpty
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            input={<OutlinedInput size="small" />}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>File Name</em>;
              }

              return selected;
            }}
          >
            <MenuItem disabled value="">
              <em>File Name</em>
            </MenuItem>
            {file_list?.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <Divider className="!mx-2 !mt-3" />
      <CardInteractive
        cardTitle="Party"
        bottomComponent={
          <Select
            className="w-full"
            displayEmpty
            value={party}
            onChange={(e) => setParty(e.target.value)}
            input={<OutlinedInput size="small" />}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Party</em>;
              }

              return selected;
            }}
          >
            <MenuItem disabled value="">
              <em>Party</em>
            </MenuItem>
            {parties_list?.map((name) => (
              <MenuItem key={name?.key} value={name?.key}>
                {name.key}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <Divider className="!mx-2 !mt-3" />
      <CardInteractive
        cardTitle="People"
        bottomComponent={
          <Select
            className="w-full"
            displayEmpty
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            input={<OutlinedInput size="small" />}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>People</em>;
              }

              return selected;
            }}
          >
            <MenuItem disabled value="">
              <em>People</em>
            </MenuItem>
            {people_list?.map((name) => (
              <MenuItem key={name?.key} value={name?.key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <Divider className="!mx-2 !mt-3" />
      <CardInteractive
        cardTitle="Date"
        bottomComponent={
          <>
            <div className="flex items-center justify-between my-4">
              <OutlinedInput
                size="small"
                className="w-20"
                type="number"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                inputProps={{
                  step: 1,
                  min: {min_date},
                  max: {max_date},
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
              <OutlinedInput
                size="small"
                className="w-20"
                type="number"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                inputProps={{
                  step: 1,
                  min: {min_date},
                  max: {max_date},
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </div>
            <Slider
              size="small"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setStartDate(e.target.value[0]);
                setEndDate(e.target.value[1]);
              }}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={min_date}
              max={max_date}
            />
          </>
        }
      />
      <Divider className="!mx-2 !mt-3" />
      <CardInteractive
        cardTitle="Percentage"
        bottomComponent={
          <>
            <div className="flex items-center justify-between my-4">
              <OutlinedInput
                size="small"
                className="w-20"
                type="number"
                value={startPercentage}
                onChange={(e) => setStartPercentage(e.target.value)}
                inputProps={{
                  step: 1,
                  min: {min_per},
                  max: {max_per},
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
              <OutlinedInput
                size="small"
                className="w-20"
                type="number"
                value={endPercentage}
                onChange={(e) => setEndPercentage(e.target.value)}
                inputProps={{
                  step: 1,
                  min: {min_per},
                  max: {max_per},
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </div>
            <Slider
              size="small"
              value={percentage}
              onChange={(e) => {
                setPercentage(e.target.value);
                setStartPercentage(e.target.value[0]);
                setEndPercentage(e.target.value[1]);
              }}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={min_per}
              max={max_per}
            />
          </>
        }
      />
      <Divider className="!mx-2 !mt-3" />
      <CardInteractive
        cardTitle="Currency"
        bottomComponent={
          <>
            <div className="flex items-center justify-between my-4">
              <OutlinedInput
                size="small"
                className="w-20"
                type="number"
                value={startCurrency}
                onChange={(e) => setStartCurrency(e.target.value)}
                inputProps={{
                  step: 100,
                  min: 1,
                  max: 25000,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
              <OutlinedInput
                size="small"
                className="w-20"
                type="number"
                value={endCurrency}
                onChange={(e) => setEndCurrency(e.target.value)}
                inputProps={{
                  step: 100,
                  min: 1,
                  max: 25000,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </div>
            <Slider
              size="small"
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
                setStartCurrency(e.target.value[0]);
                setEndCurrency(e.target.value[1]);
              }}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={1}
              max={25000}
            />
          </>
        }
      />
      <Divider className="!mx-2 !mt-3" />
      <CardInteractive
        cardTitle="County"
        bottomComponent={
          <Select
            className="w-full"
            displayEmpty
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            input={<OutlinedInput size="small" />}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>County</em>;
              }

              return selected;
            }}
          >
            <MenuItem disabled value="">
              <em>County</em>
            </MenuItem>
            {county_list?.map((name) => (
              <MenuItem key={name.key} value={name.key}>
                {name.key}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <Divider className="!mx-2 !mt-3" />
      <CardInteractive
        cardTitle="State"
        bottomComponent={
          <Select
            className="w-full"
            displayEmpty
            value={state}
            onChange={(e) => setState(e.target.value)}
            input={<OutlinedInput size="small" />}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>State</em>;
              }

              return selected;
            }}
          >
            <MenuItem disabled value="">
              <em>State</em>
            </MenuItem>
            {stat?.map((name) => (
              <MenuItem key={name?.key} value={name?.key}>
                {name?.key}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <Divider className="!mx-2 !mt-3" />
      <CardInteractive
        cardTitle="Country"
        bottomComponent={
          <Select
            className="w-full"
            displayEmpty
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            input={<OutlinedInput size="small" />}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Country</em>;
              }

              return selected;
            }}
          >
            <MenuItem disabled value="">
              <em>Country</em>
            </MenuItem>
            {country_list?.map((name) => (
              <MenuItem key={name?.key} value={name?.key}>
                {name?.key}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <Divider className="!mx-2 !mt-3" />
      <CardInteractive
        cardTitle="Jurisdiction"
        bottomComponent={
          <Select
            className="w-full"
            displayEmpty
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            input={<OutlinedInput size="small" />}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Jurisdiction</em>;
              }

              return selected;
            }}
          >
            <MenuItem disabled value="">
              <em>Jurisdiction</em>
            </MenuItem>
            {jurisdiction_list?.map((name) => (
              <MenuItem key={name?.key} value={name?.key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <Divider className="!mx-2 !mt-3" />
      <CardInteractive
        cardTitle="Governing Law"
        bottomComponent={
          <Select
            className="w-full"
            displayEmpty
            value={governing}
            onChange={(e) => setGoverning(e.target.value)}
            input={<OutlinedInput size="small" />}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Governing Law</em>;
              }

              return selected;
            }}
          >
            <MenuItem disabled value="">
              <em>Governing Law</em>
            </MenuItem>
            {governing_list?.map((name) => (
              <MenuItem key={name?.key} value={name?.key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <Divider className="!mx-2 !mt-3" />
      <CardInteractive
        cardTitle="Execution Date"
        bottomComponent={
          <Select
            className="w-full"
            displayEmpty
            value={execution}
            onChange={(e) => setExecution(e.target.value)}
            input={<OutlinedInput size="small" />}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Execution Date</em>;
              }

              return selected;
            }}
          >
            <MenuItem disabled value="">
              <em>Execution Date</em>
            </MenuItem>
            {execution_list?.map((name) => (
              <MenuItem key={name?.key} value={name?.key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <Divider className="!mx-2 !mt-3" />
      <CardInteractive
        cardTitle="Termination Date"
        bottomComponent={
          <Select
            className="w-full"
            displayEmpty
            value={termination}
            onChange={(e) => setTermination(e.target.value)}
            input={<OutlinedInput size="small" />}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Termination Date</em>;
              }

              return selected;
            }}
          >
            <MenuItem disabled value="">
              <em>Termination Date</em>
            </MenuItem>
            {termination_list?.map((name) => (
              <MenuItem key={name?.key} value={name?.key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <Divider className="!mx-2 !mt-3" />
      <div className="flex items-center justify-center pb-5">
        <button
          className="py-2 px-6 rounded border text-colorBlack font-semibold bg-colorGrey"
          onClick={()=>{changeFilters(); dispatch(dataFilter({filterdata, fileName, state, county, country, party}));}}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filters;
