import { Box, CssBaseline, makeStyles, Paper } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HeroCards from "./components/HeroCards";
import SavedDataTable from "./components/SavedDataTable";
import StockDetailsTable from "./components/StockDetailsTable";
import { coinActions } from "./redux-store/store";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "88vh",
    padding: "30px 60px",
    width: "800px",
    margin: "0px auto",
    [theme.breakpoints.down("xs")]: {
      width: "auto",
      padding: "30px 20px",
    },
  },
  paper: {},
}));

function App() {
  const location = useLocation();
  console.log(location);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    fetch(
      "https://api.nomics.com/v1/currencies/ticker?key=c692ca1e205a0d3f84ef917abe3168f7996588ff&per-page=20"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Data Not Fetched.");
        return res.json();
      })
      .then((data) => {
        data = data.map((obj) => {
          console.log("hi");
          return {
            name: obj.name,
            symbol: obj.symbol,
            market_cap: `${(parseInt(obj.market_cap) / 1000000).toFixed(2)}M$`,
            price: `${parseFloat(obj.price).toFixed(3)}$`,
            isSaved: false,
          };
        });
        dispatch(coinActions.pushCoins(data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch]);
  return (
    <>
      <CssBaseline />
      <Header />
      <Paper square style={{ width: "100vw" }}>
        <Box square elevation={0} className={classes.container}>
          <HeroCards />
          <Switch>
            <Route path="/" exact>
              <Redirect to="/stock-details" />
            </Route>
            <Route path="/stock-details">
              <StockDetailsTable />
            </Route>
            <Route path="/saved-details">
              <SavedDataTable />
            </Route>
            <Route path="*">
              <div>No Page Found...</div>
            </Route>
          </Switch>
        </Box>
      </Paper>
    </>
  );
}

export default App;
