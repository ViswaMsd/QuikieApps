import { useSelector } from "react-redux";
import useTable from "./useTable";

function StockDetailsTable() {
  const records = useSelector((s) => s.coins);
  const headCells = [
    "Name",
    "Symbol",
    "Market_Cap",
    "Current_Price",
    "Actions",
  ];

  const { TblContainer, TblHead, TblBody, TblPagination } = useTable(
    records,
    headCells
  );

  return (
    <TblContainer>
      <TblHead />
      <TblBody />
      <TblPagination />
    </TblContainer>
  );
}

export default StockDetailsTable;
