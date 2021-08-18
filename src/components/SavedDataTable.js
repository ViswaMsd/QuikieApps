import { Button, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useTable from "./useTable";

const useStyles = makeStyles({
  paper: {
    padding: "20px",
  },
});

function SavedDataTable() {
  const history = useHistory();
  const classes = useStyles();
  const savedRecords = useSelector((s) => s.savedCoins);
  //   const headCells = ["Name", "Symbol", "Market_Cap", "Current_Price", "Actions"];
  const headCells = [
    { id: "name", label: "COMPANY NAME" },
    { id: "symbol", label: "SYMBOL" },
    { id: "market_cap", label: "MARKET CAP" },
    { id: "price", label: "CURRENT PRICE" },
    { id: "action", label: " " },
  ];

  const { TblContainer, TblHead, TblBody, TblPagination } = useTable(savedRecords, headCells);

  return (
    <Paper
      className={classes.paper}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TblContainer>
        <TblHead />
        <TblBody />
        <TblPagination />
      </TblContainer>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => {
          history.push("/stock-details");
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        Back
      </Button>
    </Paper>
  );
}

export default SavedDataTable;
