import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCabins } from "../../API/cabinsApi";
import toast from "react-hot-toast";
// import { HiPencil, HiTrash, HiSquare2Stack } from "react-icons/hi2";

// import Menus from "ui/Menus";
// import Modal from "ui/Modal";
// // import ConfirmDelete from 'ui/ConfirmDelete';
// import Table from "ui/Table";

// import { formatCurrency } from "utils/helpers";
// import { useDeleteCabin } from "./useDeleteCabin";
// import { useCreateCabin } from "./useCreateCabin";
// import CreateCabinForm from "./CreateCabinForm";

// v1
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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
  const {
    cabin_id,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
    description,
  } = cabin;
  //havin access to queryClient
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: removeCabins,
    onSuccess: () => {
      toast.success("the cabin was removed successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error("Coudn't delete the cabin"),
  });
  return (
    <TableRow>
      <Img
        src={`https://res.cloudinary.com/dhrdefqza/image/upload/v1739045551/hoi507fkbarragxca1r6.png`}
      />
      <Cabin>{name}</Cabin>
      <div>Fits up to {max_capacity} guests</div>
      <Price>{formatCurrency(regular_price)}</Price>
      <Discount>{discount ? formatCurrency(discount) : "--"}</Discount>
      <button onClick={() => mutate(cabin_id)} disabled={isPending}>
        Delete
      </button>
    </TableRow>
  );
}

export default CabinRow;
