import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    types: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    merchant: {
      type: String,
      default: "",
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    date: {
      type: Date,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Salary",
        "Freelance",
        "Business Income",
        "Investments Income",
        "Gifts Received",
        "Refunds",
        "Other Income",

        "Groceries",
        "Food & Dining",
        "Housing",
        "Rent",
        "Utilities",
        "Transportation",
        "Healthcare",
        "Insurance",
        "Education",
        "Emergency",

        "Entertainment",
        "Shopping",
        "Travel",
        "Personal Care",
        "Fitness",
        "Subscriptions",
        "Pets",
        "Family & Kids",

        "Bills",
        "Loan EMI",
        "Credit Card Payment",
        "Savings",
        "Investments",
        "Charity",

        "Miscellaneous",
      ],
    },

    icon: {
      type: String,
      required: true,
      enum: [
        "Wallet",
        "Banknote",
        "TrendingUp",
        "Gift",
        "RefreshCcw",

        "ShoppingBag",
        "Utensils",
        "Home",
        "Plug",
        "Car",
        "HeartPulse",
        "ShieldCheck",
        "GraduationCap",
        "AlertTriangle",

        "Film",
        "ShoppingCart",
        "Plane",
        "Sparkles",
        "Dumbbell",
        "Dog",
        "Users",

        "CreditCard",
        "Receipt",
        "PiggyBank",
        "ChartBar",
        "Handshake",

        "CircleHelp",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
