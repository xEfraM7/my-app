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
import { formDynamicsReceiver } from "@/json/formJson";
import { FormArticleComponent } from "./FormArticleComponent";
import { useState } from "react";
import { Invoice, InVoicePDF } from "../pdf/InVoicePDF";
import useArticles from "@/hooks/useArticles";
import { useDate } from "@/hooks/useDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DataForm } from "@/types/FormTypes";
import saveAs from "file-saver";
import { pdf, PDFViewer } from "@react-pdf/renderer";

export const FormComponent = () => {
  const [screenDisplay, setScreenDisplay] = useState<Boolean>(false);
  const { formattedDate } = useDate();

  // const formValidation = z.object({
  //   nameSender: z.string(),
  //   emailSender: z.string().email("Debe ser un correo."),
  //   jobSender: z.string(),
  //   streetSender: z.string(),
  //   stateSender: z.string(),
  //   citySender: z.string(),
  //   countrySender: z.string(),
  //   nameReceiver: z.string(),
  //   emailReceiver: z.string(),
  //   streetReceiver: z.string(),
  //   stateReceiver: z.string(),
  //   cityReceiver: z.string(),
  //   countryReceiver: z.string(),
  //   serviceDescription: z.string(),
  //   totalAmount: z.number(),
  //   date: z.string().date(),
  //   // inVoiceNumber: generateRandomNumber(8),
  // });

  const [formState, setformState] = useState<Invoice>({
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
    totalAmount: 0,
    date: "",
    inVoiceNumber: "",
  });

  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    // formState: { errors },
  } = useForm<any>({
    defaultValues: {
      nameSender: "Efren Cabrera",
      emailSender: "efrecabrera64@gmail.com",
      jobSender: "Electricista",
      streetSender: "Urb. Desarrollo camburito",
      stateSender: "Portuguesa",
      citySender: "Araure",
      countrySender: "Venezuela",
      nameReceiver: "",
      emailReceiver: "",
      streetReceiver: "",
      stateReceiver: "",
      cityReceiver: "",
      countryReceiver: "",
      serviceDescription: "",
      articles: [],
    },
    // resolver: zodResolver(formValidation),
  });

  const handleReload = () => {
    location.reload();
  };

  const { handleChangeArticle, handleRemoveArticle } = useArticles(
    watch,
    setValue
  );

  const saveFile = (filename: string, state: Invoice) => {
    pdf(<InVoicePDF {...state} />)
      .toBlob()
      .then((blob) => saveAs(blob, `${filename}.pdf`));
  };

  const onSubmit = (data: Invoice) => {
    const elementArray: number[] = [];

    const arrayArticles = (data: Invoice) => {
      for (let index = 0; index < data.articles.length; index++) {
        let productPrice = Number(data.articles[index].price);
        let productQuantity = Number(data.articles[index].quantity);
        let totalAmount = productPrice * productQuantity;
        elementArray.push(totalAmount);
      }
    };

    arrayArticles(data);

    const totalAmountInvoice = elementArray.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );

    const generateRandomNumber = (length: number) => {
      const randomNumber = Math.floor(Math.random() * Math.pow(10, length));
      return String(randomNumber).padStart(length, "0");
    };

    const random8DigitNumber = generateRandomNumber(8);

    setScreenDisplay(true);
    setformState({
      ...data,
      totalAmount: totalAmountInvoice,
      date: formattedDate,
      inVoiceNumber: random8DigitNumber,
    });
    saveFile(formState.inVoiceNumber, {
      ...data,
      totalAmount: totalAmountInvoice,
      date: formattedDate,
      inVoiceNumber: random8DigitNumber,
    });
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
        <>
          <PDFViewer className="h-screen w-full hidden lg:flex">
            <InVoicePDF {...formState} />
          </PDFViewer>
          <Button onClick={handleReload} className="absolute top-0 left-0 bottom-0 right-0 m-auto w-1/2 lg:hidden">Recargar pagina!</Button>
        </>
      )}
    </>
  );
};
