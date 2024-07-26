"use client";

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  invoiceInfo: {
    fontSize: 12,
    marginBottom: 20,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  totalContainer: {
    marginTop: 20,
    textAlign: "right",
  },
  totalText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

// Create Document Component
export const InVoicePDF = ({ invoice }) => (
  <PDFViewer className="h-screen w-full">
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Invoice</Text>
        <View style={styles.invoiceInfo}>
          <Text>Date: {invoice.date}</Text>
          <Text>Invoice #: {invoice.number}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Item</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Quantity</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Price</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
          </View>
          {invoice.items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.price}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.total}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: {invoice.total}</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

// Main Component
const InvoiceComponent = () => {
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
    <div>
      <button onClick={() => console.log("Retroceder")}>Retroceder</button>
      <PDFDownloadLink
        document={<InVoicePDF invoice={invoice} />}
        fileName="invoice.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Invoice"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default InvoiceComponent;
