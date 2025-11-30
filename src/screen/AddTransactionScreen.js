import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useTransactions } from "../context/TransactionContext";

export default function AddTransactionScreen({ navigation }) {
 const { addTransaction } = useTransactions();

 const [type, setType] = useState("expense");
 const [category, setCategory] = useState("food");
 const [amount, setAmount] = useState("");
 const [date, setDate] = useState(new Date());
 const [description, setDescription] = useState("");

 const handleSave = () => {
  addTransaction({
   type,
   category,
   amount: parseFloat(amount),
   date: date.toISOString(),
   description,
  });
  navigation.goBack();
 };

 return (
  <View style={{ padding: 20 }}>
   <Text>Type (expense/income)</Text>
   <TextInput value={type} onChangeText={setType} />
   <Text>Category</Text>
   <TextInput value={category} onChangeText={setCategory} />
   <Text>Amount</Text>
   <TextInput keyboardType="numeric" value={amount} onChangeText={setAmount} />
   <Text>Description</Text>
   <TextInput value={description} onChangeText={setDescription} />
   <Button title="Save" onPress={handleSave} />
  </View>
 );
}
