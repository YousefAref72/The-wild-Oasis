import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import CabinTableOperations from "../features/cabins/CabinTableOperations.jsx";
import CabinTable from "../features/cabins/CabinTable.jsx";

import AddCabin from "../features/cabins/AddCabin.jsx";
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <span>Sort/Filter</span>
        {/* <img src="https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" /> */}
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
