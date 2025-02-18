import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const {
    max_booking_length,
    min_booking_length,
    max_guest_per_booking,
    breakfast_price,
  } = settings?.setting ? settings?.setting : {};

  const { isUpdating, updateSettings } = useUpdateSettings();

  // using another method
  const handleChange = (e, field) => {
    const { value } = e.target;
    if (value && +value !== settings?.setting[field])
      updateSettings({ [field]: value });
  };
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={max_booking_length}
          onBlur={(e) => handleChange(e, "max_booking_length")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={min_booking_length}
          onBlur={(e) => handleChange(e, "min_booking_length")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={max_guest_per_booking}
          onBlur={(e) => handleChange(e, "max_guest_per_booking")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfast_price}
          onBlur={(e) => handleChange(e, "breakfast_price")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
