import { useForm } from "react-hook-form";

import { organsDT } from "./resources/DigitalTwinConfigReorganized";

import { FormSection } from "./components/FormSection";

const apiUrl = "https://psepsis.heroku.app/submit";

export const EvaluationForm = () => {
  const { handleSubmit, control, formState  } = useForm({});

  const onSubmit = (data) => {console.log(data)

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
        body: JSON.stringify(data) // body data type must match "Content-Type" header
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
