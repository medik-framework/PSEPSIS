import { TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import { organsDT } from "./resources/DigitalTwinConfigReorganized";

import { FormSection } from "./components/FormSection";

const apiUrl = "https://psepsis.heroku.app/submit";

export const EvaluationForm = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      checkbox: false,
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="checkbox"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField {...field} />}
      />
      {organsDT.map((organDT) => (
        <FormSection control={control} organDT={organDT} key={organDT.name} />
      ))}
      <input type="submit" />
    </form>
  );
};
