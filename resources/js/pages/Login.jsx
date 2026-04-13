import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Button,
  Container,
  InputGroup
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard", { replace: true });
    } catch (err) {
      alert(
        "Login failed: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-center px-3"
      style={{
        background:
          "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
      }}
    >
      <Card
        className="w-100 shadow-lg"
        style={{
          maxWidth: "500px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "white"
        }}
      >
        <Card.Body className="p-4 p-md-5">
          <Card.Title className="mb-4 text-center">
            <div className="fs-6 fs-md-5">WELCOME TO</div>
            <div className="fw-bold fs-4 fs-md-3">
              Task Management System
            </div>
          </Card.Title>

          <Form onSubmit={handleSubmit}>
  
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="py-2"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white"
                }}
              />
            </Form.Group>

    
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="py-2"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "white"
                  }}
                />

                <Button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "white"
                  }}
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-100 py-2 fw-semibold"
              style={{
                background:
                  "linear-gradient(135deg, #007bff, #00c6ff)",
                border: "none"
              }}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}