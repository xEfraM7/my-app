"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FormArticleComponent } from "./FormArticleComponent";

export const FormComponentReactHookForm = () => {
  const { handleSubmit } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button type="submit">Enviar</Button>
    </form>
  );
};
