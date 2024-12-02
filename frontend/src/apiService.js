import axios from 'axios';

const BASE_URL = 'http://localhost:8080';  // Replace with your backend URL

export const addExpense = async (expense) => {
    try {
        const response = await axios.post(`${BASE_URL}/expense/add`, expense);
        return response.data;
    } catch (error) {
        console.error("Error adding expense", error);
    }
};

export const getAllExpenses = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/expense/all?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching expenses", error);
    }
};

export const addIncome = async (income) => {
    try {
        const response = await axios.post(`${BASE_URL}/income/add`, income);
        return response.data;
    } catch (error) {
        console.error("Error adding income", error);
    }
};

export const getAllIncomes = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/income/all?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching incomes", error);
    }
};
