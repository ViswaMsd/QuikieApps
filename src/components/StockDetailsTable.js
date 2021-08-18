import { makeStyles, Paper, TextField, InputAdornment, Button, Box } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useTable from "./useTable";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  search: {
    width: "75%",
    // height: "40px",
    marginBottom: "15px",
    "& input": {
      padding: "8px ",
    },
  },
  mobileView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

function StockDetailsTable() {
  console.log("StockDetails Page...");
  const classes = useStyles();
  const history = useHistory();

  let records = useSelector((s) => s.coins);

  //   const [recs, setRecords] = useState(records);
  const [searchInput, setSearchInput] = useState("");
  if (searchInput !== "")
    records = records.filter((rec) => rec.name.toLowerCase().includes(searchInput));

  //   console.log(recs);
  //   const headCells = ["COMPANY NAME", "SYMBOL", "MARKET CAP", "CURRENT PRICE", " "];
  const headCells = [
    { id: "name", label: "COMPANY NAME" },
    { id: "symbol", label: "SYMBOL" },
    { id: "market_cap", label: "MARKET CAP" },
    { id: "price", label: "CURRENT PRICE" },
    { id: "action", label: " " },
  ];
  const searchHandler = (e) => {
    const target = e.target;
    setSearchInput(target.value);
  };

  const { TblContainer, TblHead, TblBody, TblPagination } = useTable(
    records,
    headCells,
    searchHandler
  );

  return (
    <>
      <Paper className={classes.paper} elevation={3}>
        <TextField
          variant="outlined"
          label="search by Company Name"
          className={classes.search}
          onChange={searchHandler}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <TblContainer>
          <TblHead />
          <TblBody />
          <TblPagination />
        </TblContainer>
      </Paper>
      <Box className={classes.mobileView}>
        <Button variant="contained" color="primary" onClick={() => history.push("/saved-details")}>
          View Saved Data
        </Button>
      </Box>
    </>
  );
}

export default StockDetailsTable;
