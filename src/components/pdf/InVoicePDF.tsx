import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

export interface Article {
  id: string;
  nameItem: string;
  quantity: string;
  price: string;
}

export interface Invoice {
  nameSender: string;
  emailSender: string;
  jobSender: string;
  streetSender: string;
  stateSender: string;
  citySender: string;
  countrySender: string;
  nameReceiver: string;
  emailReceiver: string;
  streetReceiver: string;
  stateReceiver: string;
  cityReceiver: string;
  countryReceiver: string;
  serviceDescription: string;
  articles: Article[];
  totalAmount: number | string;
  date: string;
  inVoiceNumber: string;
}

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, lineHeight: 1.6 },
  header: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  section: { marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  column: { flexDirection: "column", flexBasis: "45%" },
  table: { display: "flex", width: "auto", marginTop: 20 },
  tableRow: {
    flexDirection: "row",
    border: "1px solid #000",
    padding: 5,
  },
  tableHeader: { backgroundColor: "#f3f3f3", fontWeight: "bold" },
  tableCol: { width: "20%", padding: 5 },
  footer: {
    borderTop: "1px solid #000",
    paddingTop: 10,
    textAlign: "center",
  },
  bold: { fontWeight: "bold" },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
  },
  margin: { marginHorizontal: "8px", marginTop: "8px" },
});

export const InVoicePDF = (invoice: Invoice) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Nota de entrega</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text>Fecha: {invoice.date}</Text>
          <Text>No. Invoice: {invoice.inVoiceNumber}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.bold}>Emite:</Text>
          <Text>Nombre : {invoice.nameSender}</Text>
          <Text>Email : {invoice.emailSender}</Text>
          <Text>Direccion : {invoice.streetSender}</Text>
          <Text>
            {invoice.stateSender}, {invoice.citySender},{invoice.countrySender}
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.bold}>Se entrega:</Text>
        <Text>Nombre : {invoice.nameReceiver}</Text>
        <Text>Email : {invoice.emailReceiver}</Text>
        <Text>Direccion : {invoice.streetReceiver}</Text>
        <Text>
          {invoice.stateReceiver}, {invoice.cityReceiver},
          {invoice.countryReceiver}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.bold}>Descripcion del servicio:</Text>
        <Text>{invoice.serviceDescription}</Text>
      </View>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCol}>Articulo</Text>
          <Text style={styles.tableCol}>Descripcion</Text>
          <Text style={styles.tableCol}>Precio</Text>
          <Text style={styles.tableCol}>Cantidad</Text>
          <Text style={styles.tableCol}>Total</Text>
        </View>
        {invoice.articles.map((article, index) => (
          <View style={styles.tableRow} key={article.id}>
            <Text style={styles.tableCol}>{index + 1}</Text>
            <Text style={styles.tableCol}>{article.nameItem}</Text>
            <Text style={styles.tableCol}>{article.price}</Text>
            <Text style={styles.tableCol}>{article.quantity}</Text>
            <Text style={styles.tableCol}>
              {(
                parseFloat(article.price) * parseFloat(article.quantity)
              ).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.row}>
        <Text style={styles.margin}>Monto total:</Text>
        <Text style={styles.margin}>{invoice.totalAmount}$</Text>
      </View>
      <Text style={styles.footer}>Gracias por preferirnos!</Text>
    </Page>
  </Document>
);
