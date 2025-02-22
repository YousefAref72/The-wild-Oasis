import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const {
    cabin_id,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    const newCabin = {
      name: `copy of ${name}`,
      max_capacity,
      regular_price,
      discount,
      image,
      description,
    };
    createCabin(newCabin);
  }
  return (
    <TableRow>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {max_capacity} guests</div>
      <Price>{formatCurrency(regular_price)}</Price>
      <Discount>{discount ? formatCurrency(discount) : "--"}</Discount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabin_id} />
            <Menus.List id={cabin_id}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            {/* modal windows */}
            <Modal.Window name="delete">
              <ConfirmDelete
                resource="Cabin"
                onConfirm={() => deleteCabin(cabin_id)}
                disabled={isDeleting}
              />
            </Modal.Window>
            <Modal.Window name="edit">
              <CreateCabinForm toEdit={cabin} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </TableRow>
  );
}

export default CabinRow;
