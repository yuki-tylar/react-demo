import { Component } from "react";
import { useNavigate } from "react-router-dom";
import { GuardIfNotLoggedIn } from "../guards/guard-if-not-logged-in";

export function PostEditor() {
  const navigate = useNavigate();

  return (
    <GuardIfNotLoggedIn onGuard={() => { navigate('/login') }}>
      <h3>What is in your mind?</h3>
      <p>Not implemented yet</p>
    </GuardIfNotLoggedIn>
  );

}