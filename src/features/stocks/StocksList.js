import { Table } from "react-bootstrap";
const StocksList = () => {
  return (
    <Table strip bordered hover>
      <thead>
        <tr>
          <th>Barcode No.</th>
          <th>Name</th>
          <th>Category</th>
          <th>Brand</th>
          <th>density {`(g/cm²)`}</th>
          <th>price/unit {`(THB)`}</th>
          <th>quantity</th>
          <th>unit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>click id to see properties</td>
          <td>name</td>
          <td>category</td>
          <td>brand</td>
          <td>{`show how to measure when click at "?"`}</td>
          <td>price</td>
          <td>quantity</td>
          <td>unit</td>
        </tr>
      </tbody>
    </Table>
  );
};
export default StocksList;
