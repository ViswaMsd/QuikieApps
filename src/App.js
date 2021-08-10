import { useEffect } from "react";
import { useDispatch } from "react-redux";
import StockDetailsTable from "./components/StockDetailsTable";
// import TestTable from "./components/TestTable";
import { coinActions } from "./redux-store/store";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      "https://api.nomics.com/v1/currencies/ticker?key=c692ca1e205a0d3f84ef917abe3168f7996588ff&per-page=100"
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
            market_cap: obj.market_cap,
            price: parseFloat(obj.price).toFixed(3),
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
    <div>
      <StockDetailsTable />
    </div>
  );
}

export default App;
