import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", dob: "" });
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUsers = [...users];
    if (editingIndex === -1) {
      newUsers.push(form);
    } else {
      newUsers[editingIndex] = form;
      setEditingIndex(-1);
    }
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    setForm({ name: "", age: "", dob: "" });
  };

  const handleEdit = (index) => {
    setForm(users[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  return (
    <div className="container mx-auto p-4 lg:max-w-[40%]">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {editingIndex === -1 ? "Add User" : "Update User"}
        </button>
      </form>
      <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Age</th>
            <th className="py-2 px-4">Date of Birth</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="bg-gray-100 border-b">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.age}</td>
              <td className="py-2 px-4">{user.dob}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
