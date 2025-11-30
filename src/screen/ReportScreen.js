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
   .then(data => setRates(data.rates));
 }, []);

 const month = new Date().getMonth();
 const filtered = transactions.filter(t => new Date(t.date).getMonth() === month);

 const income = filtered.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
 const expense = filtered.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

 const convert = (val) => rates[currency] ? (val * rates[currency]).toFixed(2) : val;

 return (
  <View style={{ padding: 20 }}>
   <Text>Monthly Report</Text>
   <Text>Total Income: {convert(income)} {currency}</Text>
   <Text>Total Expense: {convert(expense)} {currency}</Text>

   <Button title="Switch to USD" onPress={() => setCurrency("USD")} />
   <Button title="Switch to EUR" onPress={() => setCurrency("EUR")} />
  </View>
 );
}
