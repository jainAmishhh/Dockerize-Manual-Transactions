import Transaction from "../models/transaction.model.js";

// Create Transaction
export const createTransaction = async (req, res) => {
  try {
    const { types, description, merchant, amount, date, category, icon } = req.body;

    if (!types || !description || !amount || !date || !category) {
      return res.status(400).json({
        success: false,
        message: "Type, description, amount, date & category are required!",
      });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive number",
      });
    }

    const newTransaction = await Transaction.create({
      userId: req.user._id,
      types,
      description,
      merchant,
      amount,
      date,
      category,
      icon: icon || "CircleHelp",
    });

    return res.status(201).json({
      success: true,
      message: "Transaction added successfully!",
      data: newTransaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
      error: error.message,
    });
  }
};

// Get All Transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Transactions fetched successfully!",
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};

// Filter Transactions
export const filterTransactions = async (req, res) => {
  try {
    const {
      search = "",
      types = "All",
      category = "All",
      range = "All",
    } = req.query;

    const query = { userId: req.user._id };

    // Search filter
    if (search) {
      query.$or = [
        { description: { $regex: search, $options: "i" } },
        { merchant: { $regex: search, $options: "i" } },
      ];
    }

    // Type filter
    if (types !== "All") query.types = types;

    // Category filter
    if (category !== "All") query.category = category;

    // Date Range Filter
    if (range !== "All") {
      const cutoff = new Date();
      cutoff.setHours(0, 0, 0, 0);

      if (range === "7 Days") {
        cutoff.setDate(cutoff.getDate() - 7);
      } else if (range === "30 Days") {
        cutoff.setDate(cutoff.getDate() - 30);
      }

      query.date = { $gte: cutoff };
    }

    const transactions = await Transaction.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Transactions filtered successfully!",
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to filter transactions",
      error: error.message,
    });
  }
};

// Update Transaction
export const updateTransaction = async (req, res) => {
  try {
    const id = req.params.id;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found!",
      });
    }

    if (transaction.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this transaction",
      });
    }

    const { types, description, merchant, amount, date, category, icon } =
      req.body;

    if (types !== undefined) transaction.types = types;
    if (description !== undefined) transaction.description = description;
    if (merchant !== undefined) transaction.merchant = merchant;
    if (amount !== undefined) transaction.amount = amount;
    if (date !== undefined) transaction.date = date;
    if (category !== undefined) transaction.category = category;
    if (icon !== undefined) transaction.icon = icon;

    await transaction.save();

    return res.status(200).json({
      success: true,
      message: "Transaction updated successfully!",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update transaction",
      error: error.message,
    });
  }
};

// Delete Transaction
export const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found!",
      });
    }

    if (transaction.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this transaction",
      });
    }

    await transaction.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete transaction",
      error: error.message,
    });
  }
};