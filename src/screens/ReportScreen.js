import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useTransactions } from "../context/TransactionContext";

export default function ReportScreen() {
  const { transactions } = useTransactions();
  const [currency, setCurrency] = useState("IDR");
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/IDR")
      .then(res => res.json())
      .then(data => setRates(data.rates))
      .catch(err => console.error("Rate fetch error:", err));
  }, []);

  const month = new Date().getMonth();

  // pastikan date valid
  const filtered = transactions.filter(t => {
    const d = new Date(t.date);
    return !isNaN(d) && d.getMonth() === month;
  });

  // pastikan type lowercase dan amount number
  const income = filtered
    .filter(t => t.type?.toLowerCase() === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expense = filtered
    .filter(t => t.type?.toLowerCase() === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  console.log("All transactions:", transactions);
  console.log("Filtered this month:", filtered);
  console.log("Income total:", income);

  const convert = (val) =>
    rates[currency] ? (val * rates[currency]).toFixed(2) : val;

  return (
    <View style={{ padding: 20 }}>
      <Text>Monthly Report</Text>
      <Text style={{ marginTop: 16, marginBottom: 8 }}>Total Income: {convert(income)} {currency}</Text>
      <Text style={{ marginBottom: 8 }}>Total Expense: {convert(expense)} {currency}</Text>

      <Button title="Switch to USD" onPress={() => setCurrency("USD")} />
      <View style={{ height: 8 }} />
      <Button title="Switch to EUR" onPress={() => setCurrency("EUR")} />
    </View>
  );
}
