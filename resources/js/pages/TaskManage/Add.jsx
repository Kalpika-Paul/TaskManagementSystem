import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

export default function AddTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    due_date: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.priority) {
      alert("Please fill required fields!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/task-manage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(res.data.message || "Task added successfully!");
      navigate("/task");
    } catch (error) {
      console.error(error.response || error);

      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors)
          .flat()
          .join("\n");
        alert(errors);
      } else {
        alert("Task creation failed!");
      }
    }
  };

  const priorityOptions = ["low", "medium", "high"];

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Add Task</h3>

        <Link to="/task" className="btn btn-dark d-flex align-items-center">
          <FaArrowLeft className="me-2" />
          Back to Task List
        </Link>
      </div>

      <Form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Title *</Form.Label>
              <Form.Control
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write task details..."
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Priority *</Form.Label>
              <Form.Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority</option>
                {priorityOptions.map((p, i) => (
                  <option key={i} value={p}>
                    {p}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="success" className="w-100">
          Add Task
        </Button>
      </Form>
    </Container>
  );
}