import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sigInStart,
  sigInSuccess,
  sigInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(sigInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(sigInFailure(data.message));
        return;
      }
      dispatch(sigInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(sigInFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg m-auto">
      <h1 className="text-[40px] text-center mb-5 text-slate-800">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "Sign in"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have in account ?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign-up</span>
        </Link>
      </div>
      <div>
        <p className="text-red-700">{error}</p>
      </div>
    </div>
  );
}
