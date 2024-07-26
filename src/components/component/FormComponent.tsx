"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { FormField } from "./FormField";
import { useForm } from "react-hook-form";
import { formDynamicsSender, formDynamicsReceiver } from "@/json/formJson";
import { FormArticleComponent } from "./FormArticleComponent";
import { ArticleInterface } from "@/types/FormTypes";
import { useState } from "react";
import { InVoicePDF, InvoiceComponent } from "../pdf/InVoicePDF";

export const FormComponent = () => {
  const [screenDisplay, setScreenDisplay] = useState<Boolean>(false);

  const [formState, setformState] = useState({
    nameSender: "",
    emailSender: "",
    jobSender: "",
    streetSender: "",
    stateSender: "",
    citySender: "",
    countrySender: "",
    nameReceiver: "",
    emailReceiver: "",
    streetReceiver: "",
    stateReceiver: "",
    cityReceiver: "",
    countryReceiver: "",
    serviceDescription: "",
    articles: [],
  });

  const { handleSubmit, control, register, setValue, watch } = useForm<any>({
    defaultValues: {
      nameSender: "",
      emailSender: "",
      jobSender: "",
      streetSender: "",
      stateSender: "",
      citySender: "",
      countrySender: "",
      nameReceiver: "",
      emailReceiver: "",
      streetReceiver: "",
      stateReceiver: "",
      cityReceiver: "",
      countryReceiver: "",
      serviceDescription: "",
      articles: [{ id: "1", nameItem: "", quantity: "", price: "" }],
    },
  });

  const onSubmit = (data: any) => {
    // setScreenDisplay(true);
    setformState(data);
    console.log(formState);
  };

  const handleChangeArticle = (article: ArticleInterface) => {
    const articleExist =
      watch().articles.find((e: ArticleInterface) => e.id === article.id) !==
      undefined;
    if (articleExist) {
      setValue(
        "articles",
        watch().articles.map((e: ArticleInterface) =>
          e.id === article.id ? article : e
        )
      );
    } else {
      setValue("articles", [...watch().articles, article]);
    }
  };

  const handleRemoveArticle = (article: ArticleInterface) => {
    setValue(
      "articles",
      watch().articles.filter((e: ArticleInterface) => e.id !== article.id)
    );
  };
  const invoice = {
    date: "2024-07-26",
    number: "12345",
    items: [
      { name: "Example Item 1", quantity: 2, price: "$10.00", total: "$20.00" },
      { name: "Example Item 2", quantity: 1, price: "$15.00", total: "$15.00" },
      // Add more items as needed
    ],
    total: "$35.00",
  };

  return (
    <>
      {!screenDisplay ? (
        <div className="flex justify-center">
          <Card className="max-w-6xl w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Crear nota de entrega</CardTitle>
              <CardDescription>
                Llena el siguiente formulario debajo para seguir.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* DATOS DEL EMISOR */}
                <CardTitle className="text-xl">Datos del emisor</CardTitle>
                <div className="grid grid-cols-1 gap-6">
                  {formDynamicsSender.map((field, index) => (
                    <div key={index}>
                      <FormField {...field} control={control} />
                    </div>
                  ))}
                </div>

                {/* DATOS DEL RECEPTOR */}
                <CardTitle className="text-xl">Datos del receptor</CardTitle>
                <div className="grid grid-cols-1 gap-6">
                  {formDynamicsReceiver.map((field, index) => (
                    <div key={index}>
                      <FormField {...field} control={control} />
                    </div>
                  ))}
                </div>

                {/* DESCRIPCION */}
                <CardTitle className="text-xl">
                  Descripcion del servicio
                </CardTitle>
                <div className="space-y-2">
                  <Textarea
                    id="serviceDescription"
                    placeholder="Nuestro servicio de entrega rápida y segura garantiza que sus paquetes 
                    lleguen a su destino de manera eficiente y puntual. 
                    Ofrecemos soluciones personalizadas para envíos locales y nacionales, adaptándonos a sus necesidades específicas."
                    {...register("serviceDescription", {})}
                  />
                </div>

                {/* Artículos */}
                <CardTitle className="text-xl">Artículos</CardTitle>
                <FormArticleComponent
                  handleChangeArticle={handleChangeArticle}
                  handleRemoveArticle={handleRemoveArticle}
                  articles={watch().articles}
                  control={control}
                />

                <div className="mt-8">
                  <Button type="submit" className="w-full">
                    Enviar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <InVoicePDF invoice={invoice} />
      )}
    </>
  );
};
