import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return <div>
    <h1>Home</h1>
    <img src={`${currentUser.avatar}`} alt="" />
  </div>;
}
