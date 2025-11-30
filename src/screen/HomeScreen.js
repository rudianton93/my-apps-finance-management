import React from "react";
import { View, Button, FlatList } from "react-native";
import { useTransactions } from "../context/TransactionContext";
import TransactionItem from "../components/TransactionItem";

export default function HomeScreen({ navigation }) {
 const { transactions, deleteTransaction } = useTransactions();

 return (
  <View style={{ flex: 1, padding: 20 }}>
   <Button title="Add Transaction" onPress={() => navigation.navigate("AddTransaction")} />
   <Button title="View Report" onPress={() => navigation.navigate("Report")} />

   <FlatList
    data={transactions}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
     <TransactionItem item={item} onDelete={deleteTransaction} />
    )}
   />
  </View>
 );
}
