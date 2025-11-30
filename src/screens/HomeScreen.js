import React from "react";
import { View, Button, FlatList, Text } from "react-native";
import { useTransactions } from "../context/TransactionContext";
import TransactionItem from "../components/TransactionItem";

export default function HomeScreen({ navigation }) {
 const { transactions, deleteTransaction } = useTransactions();

 return (
  <View style={{ flex: 1, padding: 20 }}>
   <Button title="Add Transaction" onPress={() => navigation.navigate("AddTransaction")} />
   <View style={{ height: 8 }} />
   <Button title="View Report" onPress={() => navigation.navigate("Report")} />

   <FlatList
    data={transactions}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
     <TransactionItem item={item} onDelete={deleteTransaction} />
    )}
    ListEmptyComponent={
     <View style={{ padding: 20, alignItems: "center" }}>
      <Text style={{ color: "#888", fontSize: 16 }}>
       No transactions yet
      </Text>
     </View>
    }
   />
  </View>
 );
}
