// import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getCabins } from "../services/apiCabins";
import { addCabin } from "../API/cabinsApi";
import CabinTable from "../features/cabins/CabinTable.jsx";
import Button from "../ui/Button.jsx";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm.jsx";
function Cabins() {
  async function handleClick() {
    const data = await addCabin({
      name: "001",
      discount: 0,
      regular_price: 400,
      max_capacity: 5,
      description: "a nice cabin to have",
      image: "none",
    });
    console.log(data);
  }
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <button onClick={handleClick}>add cabin</button>
        {/* <img src="https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" /> */}
      </Row>
      <Row>
        <CabinTable></CabinTable>
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin.
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
