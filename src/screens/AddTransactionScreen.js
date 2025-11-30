import React, { useState } from "react";
import {
 View,
 Text,
 TextInput,
 Button,
 StyleSheet,
 TouchableOpacity,
 Modal,
 FlatList,
} from "react-native";
import { useTransactions } from "../context/TransactionContext";

export default function AddTransactionScreen({ navigation }) {
 const { addTransaction } = useTransactions();

 const [type, setType] = useState("expense");
 const [category, setCategory] = useState("food");
 const [amount, setAmount] = useState("");
 const [date, setDate] = useState(new Date());
 const [description, setDescription] = useState("");

 const [showTypeDropdown, setShowTypeDropdown] = useState(false);
 const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

 const typeOptions = ["expense", "income"];
 const categoryOptions = ["food", "transport", "shopping", "bills", "salary", "other"];

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

 const renderOption = (options, onSelect) => (
  <FlatList
   data={options}
   keyExtractor={(item) => item}
   renderItem={({ item }) => (
    <TouchableOpacity
     style={styles.option}
     onPress={() => {
      onSelect(item);
      setShowTypeDropdown(false);
      setShowCategoryDropdown(false);
     }}
    >
     <Text>- {item}</Text>
    </TouchableOpacity>
   )}
  />
 );

 return (
  <View style={styles.container}>
   <Text style={styles.label}>Type (expense/income)</Text>
   <TouchableOpacity
    style={styles.dropdown}
    onPress={() => setShowTypeDropdown(true)}
   >
    <Text>{type}</Text>
   </TouchableOpacity>

   <Text style={styles.label}>Category</Text>
   <TouchableOpacity
    style={styles.dropdown}
    onPress={() => setShowCategoryDropdown(true)}
   >
    <Text>{category}</Text>
   </TouchableOpacity>

   <Text style={styles.label}>Amount</Text>
   <TextInput
    style={styles.input}
    keyboardType="numeric"
    value={amount}
    onChangeText={setAmount}
   />

   <Text style={styles.label}>Description</Text>
   <TextInput
    style={styles.input}
    value={description}
    onChangeText={setDescription}
   />

   <Button title="Save" onPress={handleSave} />

   {/* Modal for Type */}
   <Modal visible={showTypeDropdown} transparent animationType="slide">
    <View style={styles.modal}>
     <Text style={{ marginBottom: 16 }}>Pilih type</Text>
     {renderOption(typeOptions, setType)}
    </View>
   </Modal>

   {/* Modal for Category */}
   <Modal visible={showCategoryDropdown} transparent animationType="slide">
    <View style={styles.modal}>
     <Text>Pilih category</Text>
     {renderOption(categoryOptions, setCategory)}
    </View>
   </Modal>
  </View>
 );
}

const styles = StyleSheet.create({
 container: { padding: 20 },
 label: { marginBottom: 6, fontWeight: "600", fontSize: 14 },
 input: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 6,
  paddingHorizontal: 10,
  paddingVertical: 8,
  marginBottom: 15,
  fontSize: 14,
  backgroundColor: "#fff",
 },
 dropdown: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 6,
  padding: 10,
  marginBottom: 15,
  backgroundColor: "#fff",
 },
 modal: {
  flex: 1,
  justifyContent: "center",
  backgroundColor: "white",
  padding: 16,
 },
 option: {
  padding: 15,
  backgroundColor: "#fff",
  marginBottom: 10,
  borderRadius: 6,
 },
});
