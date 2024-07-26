import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { FormArticlesField } from "./FormArticlesField";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArticleInterface } from "@/types/FormTypes";

interface Props {
  handleChangeArticle: (arg: ArticleInterface) => void;
  handleRemoveArticle: (arg: ArticleInterface) => void;
  articles: ArticleInterface[];
  control: any;
}

export const FormArticleComponent = ({
  handleChangeArticle,
  handleRemoveArticle,
  articles,
  control,
}: Props) => {
  const addArticle = () => {
    handleChangeArticle({
      nameItem: "",
      price: "",
      quantity: "",
      id: `${Math.random()}`,
    });
  };

  const removeArticle = (id: string) => {
    const articleToRemove = articles.find((e: ArticleInterface) => e.id === id);
    if (articleToRemove !== undefined) {
      handleRemoveArticle(articleToRemove);
    }
  };

  const updateArticle = (
    id: string,
    field: "nameItem" | "quantity" | "price",
    value: any
  ) => {
    const updatedArticle = articles.find((e: ArticleInterface) => e.id === id);
    if (updatedArticle !== undefined) {
      updatedArticle[field] = value;
      handleChangeArticle(updatedArticle);
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardContent>
          <div className="grid gap-4 mt-4">
            <div className="space-y-2">
              <Label>Artículos</Label>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre del artículo</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead className="w-[100px]" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map(
                      ({ nameItem, quantity, price, id }, index) => (
                        <TableRow key={id}>
                          <TableCell>
                            <FormArticlesField
                              type={"text"}
                              placeholder={"Item"}
                              name={"nameItem"}
                              value={nameItem}
                              error={undefined}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                updateArticle(id, "nameItem", e.target.value)
                              }
                              control={control}
                            />
                          </TableCell>
                          <TableCell>
                            <FormArticlesField
                              type={"number"}
                              placeholder={"10.99"}
                              name={"price"}
                              value={price}
                              error={undefined}
                              onChange={(e) =>
                                updateArticle(
                                  id,
                                  "price",
                                  Number(e.target.value)
                                )
                              }
                              control={control}
                            />
                          </TableCell>
                          <TableCell>
                            <FormArticlesField
                              type={"number"}
                              placeholder={"5"}
                              name={"quantity"}
                              value={quantity}
                              error={undefined}
                              onChange={(e) =>
                                updateArticle(
                                  id,
                                  "quantity",
                                  Number(e.target.value)
                                )
                              }
                              control={control}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeArticle(id)}
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault(), addArticle();
                }}
              >
                Añadir Artículo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
