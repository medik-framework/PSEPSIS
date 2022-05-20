import { useForm } from "react-hook-form";

import { organsDT } from "./resources/DigitalTwinConfigReorganized";

import { FormSection } from "./components/FormSection";

const apiUrl = "http://localhost:5000/submit";

export const EvaluationForm = () => {
  const { handleSubmit, control, formState  } = useForm({});

  const onSubmit = (data) => {

    const body = JSON.stringify(data, (k, v) => v === undefined? null : v)
    console.log(body)

    fetch(apiUrl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: body
      });};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {organsDT.map((organDT) => (
        <FormSection control={control} organDT={organDT} key={organDT.name} />
      ))}
      <input type="submit" />
    </form>
  );
};
