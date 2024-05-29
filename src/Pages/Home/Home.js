import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  useRadioGroup,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

import SearchIcons from "@mui/icons-material/Search";
import Filters from "../../Components/Filters/Filters";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import FilterChips from "../../Components/Filters/filter-chips/FilterChips";
import { changeSearchBarData } from "../../redux/ducks/allFilters";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { dataSearch } from "../../redux/sagas/actions";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import "../../index.css";

const $ = require("jquery");
$.DataTable = require("datatables.net");

const columns = [
  { title: "File Name", data: "file_name", value: 0 },
  {
    title: "Search Results",
    data: "Seach_word_in_document",
    value: 1,
    className: "file_name",
  },
  { title: "Party", data: "party", value: 2, className: "party_name", },
  { title: "Clause Number", data: "Clause_Number", value: 3 },
  { title: "Jurisdiction", data: "Jurisdiction", value: 4 },
  { title: "Governing Law", data: "Governing_Law", value: 5 },
  { title: "Execution Date", data: "Execution_Date", value: 6 },
  { title: "Termination Date", data: "Termination_Date", value: 7 },
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "1200px",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: "12px",
  height: "auto",
};

const Home = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [searchBarValue, setSearchBarValue] = useState("");

  const [searchOptionOpen, setSearchOptionOpen] = useState(false);
  const [searchHelpOpen, setSearchHelpOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [data, setData] = useState("");
  const [checked, setChecked] = useState({
    match: false,
    inflections: true,
    order: false,
  });
  const [field, setField] = useState("clause.case_and_inflections");
  const [pick, setPick] = useState("-1");
  const [wordlength, setWordLength] = useState("50");


  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.allFiltersReducer?.loading);
  const usersInfo = useSelector(
    (state) => state?.allFiltersReducer?.searchData
  );
  const dataa = useSelector((state) => state?.allFiltersReducer?.searchBarData);

  let totalResult = [];
  usersInfo?.hits?.hits?.map((data) =>
    data?.highlight?.[`${field}`]?.map((val) => totalResult?.push(val))
  );
  const totalDoc = usersInfo?.hits?.hits;
  const result = usersInfo?.hits?.total?.value;

  const valLength = (str) => {
    let strn = str;
    let list = strn.split(' ');
    let number = list.indexOf(dataa);
    var animalString = "";
    for (var i = number; i < number+4; i++) {
      animalString += list[i] + " ";
    }
    let aaa = animalString.split("undefined")
    let final = aaa[0]===''? aaa[1] : aaa[0];


    return (strn.replace(dataa, `<mark>${dataa}</mark>`));
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const newData = [];
  usersInfo?.hits?.hits?.map((data) =>
    newData.push({
      file_name: data?._source?.file_name,
      Seach_word_in_document: data?.highlight?.[`${field}`]
        ?.map((val) => `<div><lable>${valLength(val.replace(/<[^>]+>/g, ''))}</lable></div></br>`)
        .join(""),
      party: data?._source?.party.map((data)=>`<div>${data}</div></br>`).join(""),
      Clause_Number: data?._source?.clause_number,
      Jurisdiction: !usersInfo?.aggregations?.jurisdiction_agg?.buckets?.length
        ? ""
        : usersInfo?.aggregations?.jurisdiction_agg?.buckets?.map((val) => val),
      Governing_Law: !usersInfo?.aggregations?.governing_law_agg?.buckets
        ?.length
        ? ""
        : usersInfo?.aggregations?.governing_law_agg?.buckets?.map(
            (val) => val
          ),
      Execution_Date: !usersInfo?.aggregations?.execution_date_agg?.buckets
        ?.length
        ? ""
        : usersInfo?.aggregations?.execution_date_agg?.buckets?.map(
            (val) => val
          ),
      Termination_Date: !usersInfo?.aggregations?.termination_date_agg?.buckets
        ?.length
        ? ""
        : usersInfo?.aggregations?.termination_date_agg?.buckets?.map(
            (val) => val
          ),
    })
  );

  const strLength = (str) => {
    let strn = str;
    let list = strn.split(' ');
    let number = list.indexOf(dataa);
    var animalString = "";
    for (var i = number; i < number+35; i++) {
      animalString += list[i] + " ";
    }
    let aaa = animalString.split("undefined")


    return (aaa[0]===''? aaa[1] : aaa[0]);
  }

  const [showHideColumn, setShowHideColumn] = useState([1, 2, 3, 4, 5, 6, 7]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setShowHideColumn(value);
  };

  useEffect(() => {
    $(document).ready(function () {
      var table = $("#dataTable").DataTable({
        data: !loading && newData,
        columns: columns,
        searching: false,
        bDestroy: true,
      });

      var totalColumn = [1, 2, 3, 4, 5, 6, 7];
      for (let index = 0; index < totalColumn.length; index++) {
        const element = totalColumn[index];

        var column = table.column(element);
        if (showHideColumn.includes(element)) {
          column.visible(true);
        } else {
          column = table.column(element);
          column.visible(false);
        }
      }
    });
    $(document).ready(function(){
      $("lable").click(function(){
        setSearchOpen(true);
        setData($(this).text());
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHideColumn, newData, searchOpen, data]);

  return (
    <div className="container">
      <div className="bg-colorWhite flex flex-col pb-4 pt-1 items-center top-0 left-0 sticky z-20">
        <OutlinedInput
          className="w-full mx-auto"
          placeholder="Enter Search Keyword or Phrase"
          value={searchBarValue}
          onChange={(e) => {
            setSearchBarValue(e.currentTarget.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              dispatch(
                changeSearchBarData({
                  key: "searchBarData",
                  value: searchBarValue,
                })
              );
              dispatch(dataSearch({ searchBarValue, checked, pick }));
            }
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  dispatch(
                    changeSearchBarData({
                      value: searchBarValue,
                      key: "searchBarData",
                    })
                  );
                  dispatch(dataSearch({ searchBarValue, checked, pick }));
                }}
              >
                <SearchIcons />
              </IconButton>
            </InputAdornment>
          }
        />

        <div className="mt-2 flex items-center ml-auto gap-5">
          <button className="font-semibold cursor-pointer px-5 py-3 bg-colorPale text-[#544E5D] hover:bg-[#ceced0] hover:scale-95 transition-all duration-300 text-sm rounded-2xl">
            Select Folder
          </button>
          <button
            className="font-semibold cursor-pointer px-5 py-3 bg-colorPrimary text-colorPale hover:bg-[#0257e2] hover:scale-95 transition-all duration-300 text-sm rounded-2xl"
            onClick={() => setSearchOptionOpen(true)}
          >
            Search Option
          </button>
        </div>

        <Modal
          open={searchOptionOpen}
          onClose={() => setSearchOptionOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="p-5 w-1/4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-xl w-full text-center">
                Search Options
              </p>
              <CloseIcon
                className="text-black cursor-pointer"
                onClick={() => setSearchOptionOpen(false)}
              />
            </div>

            <div className="w-11/12 mx-auto">
              <FormControl fullWidth>
                <FormGroup>
                  <FormControlLabel
                    className="text-colorBlack text-lg"
                    control={<Checkbox />}
                    label="Match Case"
                    checked={checked.match}
                    value={checked.match}
                    onChange={() =>
                      setChecked({ ...checked, match: !checked.match })
                    }
                  />
                  <FormControlLabel
                    className="text-colorBlack text-lg"
                    control={<Checkbox />}
                    label="Include Inflections"
                    checked={checked.inflections}
                    value={checked.inflections}
                    onChange={() =>
                      setChecked({
                        ...checked,
                        inflections: !checked.inflections,
                      })
                    }
                  />
                </FormGroup>
              </FormControl>

              <FormControl fullWidth>
                <FormGroup>
                  <FormControlLabel
                    className="text-colorBlack text-lg"
                    control={<Checkbox />}
                    label="Maintain Order between Words"
                    checked={checked.order}
                    value={checked.order}
                    onChange={() =>
                      setChecked({ ...checked, order: !checked.order })
                    }
                  />
                </FormGroup>
              </FormControl>

              <p className="text-colorBlack text-lg font-normal mt-5">
                Pick just one
              </p>

              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >                  
                  <div className="flex items-center custom_input">
                  <CustomFormControlLabel
                    key="Search words anywhere in document"
                    value="-1"
                    control={<Radio />}
                    checked={pick === "-1"}
                    onChange={(e) => setPick(e.target.value)}
                  />
                    <label className="text-black cursor-pointer">
                    Search words anywhere in document
                    </label>
                  </div>
                  <div className="flex items-center custom_input">
                    <CustomFormControlLabel
                      key="Search within 50 words"
                      value="50"
                      control={<Radio />}
                      checked={pick !== "-1"}
                      onChange={(e) => setPick(e.target.value)}
                    />
                    <label className="text-black cursor-pointer">
                      Search within <input placeholder="50" type='number' className="w-10 border-[1px] border-[#000] outline-none px-2" value={wordlength} onChange={(e)=>setWordLength(e.target.value)}/> 2-100 words
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            <div className="flex items-center justify-center mt-5">
              <p
                className="font-semibold  text-lg text-colorPrimary hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => setSearchHelpOpen(true)}
              >
                Search Help
              </p>
            </div>
            <div className="flex items-center justify-center mt-3">
              <button
                className="bg-[#ceced0] text-[#544E5D] hover:bg-[#ceced0] rounded-2xl py-3 px-5 font-semibold hover:scale-95 transition-all duration-300 text-sm md:text-base"
                onClick={() => {
                  setField(checked.match && checked.inflections ? "clause.inflections" : !checked.match && !checked.inflections ? "clause.case_insensitive" : checked.match && !checked.inflections ? "clause" :  "clause.case_and_inflections");
                  setSearchOptionOpen(false);
                  dispatch(dataSearch({ searchBarValue, checked, pick: pick === "-1" ? pick : wordlength }));
                }}
              >
                Apply
              </button>
            </div>
          </Box>
        </Modal>

        <Modal
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="p-5 w-2/6">
            <div className="flex items-center justify-end">
              <CloseIcon
                className="text-black cursor-pointer"
                onClick={() => setSearchOpen(false)}
              />
            </div>

            <div className="w-11/24 mx-auto">
              <p className="modal_data">
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[dataa]}
                autoEscape={true}
                textToHighlight={strLength(data)}
              />
              </p>
              <div className="text-end pt-[10px]">
                <a
                  href=" "
                  className="text-[#f6599a] font-[600]"
                >
                  Doc
                </a>
              </div>
            </div>
          </Box>
        </Modal>

        <Modal
          open={searchHelpOpen}
          onClose={() => setSearchHelpOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="p-5 w-[42.5%]">
            <div className="flex items-center">
              <p className="font-semibold text-xl w-full text-center">
                Search Help
              </p>
              <CloseIcon
                className="text-black cursor-pointer"
                onClick={() => setSearchHelpOpen(false)}
              />
            </div>

            <p className="mt-5 text-colorBlack text-base">
              Search is performed in each clause across all documents. 
              Search input can be one Keyword, multiple Keywords, one Phrase,
              multiple Phrases, or any combinations of these.
              Search supports 3 Boolean Operators: AND, OR, and EXCLUDE. If no
              boolean option is specified then AND is used by default. Keywords/Phrases
              are case insensitive by default unless Search Option "Match Case" is selected. 
	     Entering quotes around input "Keyword" and "Phrase" will automatically  
              search using options "Match Case" and Ordered
            </p>

            <ol className="list-decimal list-inside space-y-1	mt-5 ml-5 text-colorBlack text-base">
              <li>
                Search words anywhere in document = Multiple keywords any
                distance apart
              </li>
              <li>
                Search separated by words = Search Keywords separated by
                <b className="border p-1 mx-2">user_input</b> words apart
              </li>
              <li>"Search all words together" = Exact phrase matching case with Match Case and Order</li>
            </ol>

            <p className="font-semibold flex items-center text-lg mt-5">
              Examples
            </p>
            <ul className="list-disc list-inside space-y-1	mt-5 ml-5 text-colorBlack text-base">
              <li>"SeaRch thiS pHrase ExacTLY"</li>
              <li>"Phrase1" Keyword1 "Phrase2" in this order</li>
              <li>Keyword1 AND Keyword2 with no order</li>
              <li>"Phrase1" EXCLUDE Keyword1</li>
              <li>Find Keyword1 OR Keyword2 within 50 words   (Order not selected)</li>
              <li>Find Keyword1 "Phrase1" within 150 words    (Order selected) 
                  - Searches for Keyword1 then Phrase1 in that order within 150 words while
                  matching Phrase1 exactly</li>
            </ul>
          </Box>
        </Modal>
      </div>
      <div className="bg-colorWhite border w-full flex top-32 left-0 sticky z-20">
        <div
          className={`flex items-center justify-between w-full cursor-pointer py-2  ${
            showFilter
              ? "bg-[#666] w-[25%] text-colorWhite"
              : "bg-colorWhite w-[15%] text-colorBlack border-r hover:text-colorWhite hover:bg-[#666]"
          } transition-all duration-700`}
          onClick={() => setShowFilter(!showFilter)}
        >
          <div className="flex items-center gap-1 mx-[10%]">
            {showFilter ? <FilterAltIcon /> : <FilterAltOffIcon />}
            <h2
              className={`font-medium text-2xl  ${
                showFilter ? "text-colorWhite" : "text-colorBlack"
              }`}
            >
              Filters
            </h2>
          </div>
          {showFilter && <KeyboardArrowLeftIcon className="mx-[10%]" />}
        </div>
        <div
          className={`flex items-center  ${
            showFilter ? "w-[75%]" : "w-[85%]"
          } transition-all duration-700`}
        >
          <FilterChips />
        </div>
      </div>

      <div className="w-full flex">
        <div
          className={`${
            showFilter
              ? "w-[25%] border-x transition-all duration-700"
              : "hidden"
          } h-[72vh] overflow-y-scroll sticky top-[172px]`}
        >
          <div className="w-full">
            <Filters />
          </div>
        </div>

        <div
          className={`${
            showFilter ? "w-[75%]" : "w-full"
          } mt-5 transition-all duration-700`}
        >
          <div className="ml-5">
            <p>
              {dataa !== "" &&
                `Searched "${dataa}" with Search Options:
                ${checked.inflections === true ? "Include Inflections" : ""}
                ${checked.match === true ? ", Match Case" : ""}
                ${checked.order === true ? ", Order between Words" : ""}`}
            </p>
          </div>
          <div className="flex ml-5 justify-between items-center">
            <div style={{ display: "flex" }}>
              <p>
                {result !== undefined &&
                  `${result} result found in ${
                    !totalDoc?.length ? 0 : totalDoc?.length
                  } documents`}
              </p>
            </div>
            <div className="flex items-center">
              <div>
                <ReactHtmlTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button font-semibold cursor-pointer px-5 py-3 bg-colorPale text-[#544E5D] hover:bg-[#ceced0] hover:scale-95 transition-all duration-300 text-sm rounded-2xl"
                  table="dataTable"
                  filename="test"
                  sheet="tablexls"
                  buttonText="Download Excel"
                />
              </div>
              <p
                sx={{ fontWeight: 500, fontSize: "16px" }}
                className="font-semibold"
              >
                Show / Hide Column :
              </p>
              <FormControl sx={{ ml: 1, width: 40 }}>
                <Select
                  size="small"
                  multiple
                  value={showHideColumn}
                  onChange={handleChange}
                  renderValue={(selected) => ""}
                >
                  {columns.slice(1, 8).map((col, index) => (
                    <MenuItem key={col.value} value={col.value}>
                      <Checkbox
                        checked={showHideColumn.indexOf(col.value) > -1}
                      />
                      <ListItemText primary={col.title} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="ml-5">
            <table
              className="table display"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": {
    color: `${checked ? "#0364ff" : "#000000"}`,
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
  },
  ".MuiRadio-root": {
    color: "#000000",
  },
  ".MuiRadio-root.Mui-checked": {
    color: "#0364ff",
  },
}));

function CustomFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

CustomFormControlLabel.propTypes = {
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};
