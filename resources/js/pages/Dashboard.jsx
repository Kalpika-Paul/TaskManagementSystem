import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
        setPending(res.data.pending_tasks);
        setCompleted(res.data.completed_tasks);

        document.title = `Dashboard – ${res.data.user.name}`;
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="fw-bold mb-4">Dashboard</h2>

      {user && (
        <>
        
          <div className=" p-4 mb-4 ">
            <h5>Welcome back 👋</h5>
            <p>
              Hello <strong>{user.name}</strong>, nice to see you again.
            </p>
          </div>

     
          <Row>
            <Col md={6}>
              <Card className="shadow-sm border-0 p-4 text-center">
                <h6 className="text-muted">Pending Tasks</h6>
                <h2 className="fw-bold text-warning">{pending}</h2>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm border-0 p-4 text-center">
                <h6 className="text-muted">Completed Tasks</h6>
                <h2 className="fw-bold text-success">{completed}</h2>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}