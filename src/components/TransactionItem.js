import React from "react";
import { View, Text, Button } from "react-native";

export default function TransactionItem({ item, onDelete }) {
 return (
  <View style={{ padding: 10, borderBottomWidth: 1 }}>
   <Text>{item.type} - {item.category} - {item.amount}</Text>
   <Text>{item.date}</Text>
   <Text>{item.description}</Text>
   <Button title="Delete" onPress={() => onDelete(item.id)} />
  </View>
 );
}
