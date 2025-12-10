import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  BadgeIndianRupee,
} from "lucide-react";
import api from "../api/axios.js";

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "", // Only for signup
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const endpoint = isLogin ? "/auth/login" : "/auth/signup";
    
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { fullname: formData.name, email: formData.email, password: formData.password, confirmPassword: formData.password };

    const res = await api.post(endpoint, payload);

    // Save user + token
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    onAuthSuccess(res.data.user);
  } catch (error) {
    alert(error.response?.data?.message || "Authentication failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-emerald-50/30 to-cyan-50/20 p-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-in fade-in zoom-in duration-300">
        {/* Header Section */}
        <div className="px-8 pt-8 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-200 mb-4">
            <BadgeIndianRupee size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
            Artha
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            {isLogin
              ? "Welcome back! Please enter your details."
              : "Create an account to start tracking wealth."}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="px-8 mb-6">
          <div className="p-1 bg-slate-100 rounded-xl flex relative">
            {/* Sliding Background */}
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out ${
                isLogin ? "left-1" : "left-[calc(50%+0px)]"
              }`}
            ></div>

            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 relative z-10 py-2 text-sm font-semibold transition-colors duration-300 ${
                isLogin
                  ? "text-slate-800"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 relative z-10 py-2 text-sm font-semibold transition-colors duration-300 ${
                !isLogin
                  ? "text-slate-800"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          {/* Name Input (Sign Up Only) */}
          {!isLogin && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-400"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-400"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-400 font-sans"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          {isLogin && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative overflow-hidden group bg-linear-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
            {/* Shine Effect */}
            {!isLoading && (
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
            )}
          </button>

          {/* Footer Text */}
          <p className="text-center text-xs text-slate-400 mt-6">
            By continuing, you agree to our
            <a href="#" className="text-slate-600 hover:text-cyan-600 ml-1">
              Terms of Service
            </a>{" "}
            and
            <a href="#" className="text-slate-600 hover:text-cyan-600 ml-1">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;