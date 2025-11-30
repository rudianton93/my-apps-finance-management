// context/TransactionContext.js
import React, { createContext, useContext, useState } from "react";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
 const [transactions, setTransactions] = useState([]);

 const addTransaction = (tx) => {
  setTransactions([...transactions, { ...tx, id: Date.now().toString() }]);
 };

 const editTransaction = (id, updated) => {
  setTransactions(transactions.map(t => t.id === id ? { ...t, ...updated } : t));
 };

 const deleteTransaction = (id) => {
  setTransactions(transactions.filter(t => t.id !== id));
 };

 return (
  <TransactionContext.Provider value={{ transactions, addTransaction, editTransaction, deleteTransaction }}>
   {children}
  </TransactionContext.Provider>
 );
}

export const useTransactions = () => useContext(TransactionContext);
