import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { FaPlus, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "Task Management | Dashboard";
    fetchTasks();
  }, []);


  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/task-manage`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load tasks");
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/task-manage/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };


  const filtered = tasks.filter((t) =>
    `${t.title} ${t.description} ${t.status} ${t.priority}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTasks = filtered.slice(indexOfFirst, indexOfLast);


  const exportToExcel = () => {
    const excelData = filtered.map((t, index) => ({
      SL: index + 1,
      Title: t.title,
      Description: t.description,
      Status: t.status,
      Priority: t.priority,
      DueDate: t.due_date,
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tasks");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), "tasks.xlsx");
  };

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Task Management</h4>

        <div className="d-flex gap-2">
          <Link to="/task/add" className="btn btn-primary">
            <FaPlus /> Add
          </Link>

          <Button variant="success" onClick={exportToExcel}>
            <FaDownload /> Export
          </Button>
        </div>
      </div>


      <div className="card mb-3 p-3 shadow-sm">
        <InputGroup>
          <Form.Control
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Button variant="outline-secondary" onClick={() => setSearch("")}>
            Clear
          </Button>
        </InputGroup>
      </div>

   
      <div className="card shadow-sm">
        <Table striped hover responsive className="mb-0">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentTasks.length ? (
              currentTasks.map((t, i) => (
                <tr key={t.id}>
                  <td>{indexOfFirst + i + 1}</td>
                  <td>{t.title}</td>

                  <td>
                    <span
                      className={`badge ${
                        t.status === "completed"
                          ? "bg-success"
                          : "bg-warning"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        t.priority === "high"
                          ? "bg-danger"
                          : t.priority === "medium"
                          ? "bg-info"
                          : "bg-secondary"
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>

                  <td>{t.due_date || "-"}</td>

                  <td>
                    <Link
                      to={`/task/edit/${t.id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>


      <div className="d-flex justify-content-between mt-3">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </Button>

        <span>Page {currentPage} of {totalPages}</span>

        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}