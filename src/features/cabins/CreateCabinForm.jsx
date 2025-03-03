import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm({ toEdit = {}, onCloseModal }) {
  //editing
  const { cabin_id: edit_id, ...editValues } = toEdit;
  const isEditing = Boolean(toEdit.cabin_id);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditing ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, editCabin } = useEditCabin();

  function onSubmit(data) {
    if (isEditing) {
      const id = toEdit.cabin_id;
      toEdit = Object.fromEntries(
        Object.entries(data).filter(
          ([key, val]) => key !== "cabin_id" && val !== toEdit[key]
        )
      );
      let image = undefined;
      if (typeof data.image[0] !== "string") image = data.image[0];
      editCabin(
        { cabin_id: id, ...toEdit, image },
        {
          onSuccess: () => onCloseModal?.(),
        }
      );
    } else
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: (data) => {
            onCloseModal?.();
            reset();
          },
        }
      );
  }
  if (isCreating || isUpdating) return <Spinner />;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required.",
          })}
        />
      </FormRow>
      <FormRow label="Maximum Capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("max_capacity", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "The capacity must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regular_price", {
            required: "This field is required.",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required.",
            validate: (value) =>
              value <= getValues().regular_price ||
              "The discount must be at most the regular price.",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required.",
          })}
        />
      </FormRow>

      <FormRow label="image" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditing ? false : "Please add an image.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button>{isEditing ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
