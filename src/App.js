import React, { useState } from 'react';
import './App.css'; // Ensure you have your custom styles
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [priority, setPriority] = useState('Low'); // State for priority
  const [dueDate, setDueDate] = useState(''); // State for due date
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState(''); // State for search input

  const handleAddOrEdit = () => {
    if (isEditing) {
      setToDos(
        toDos.map((item) =>
          item.id === editId ? { ...item, text: toDo, priority, dueDate } : item
        )
      );
      setEditId(null);
      setIsEditing(false);
    } else {
      setToDos([...toDos, { id: Date.now(), text: toDo, priority, dueDate }]);
    }
    setToDo('');
    setPriority('Low'); // Reset priority
    setDueDate(''); // Reset due date
  };

  const handleEdit = (id, text, priority, dueDate) => {
    setToDo(text);
    setPriority(priority);
    setDueDate(dueDate);
    setEditId(id);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setToDos(toDos.filter((item) => item.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddOrEdit();
    }
  };

  // Filter toDos based on search input
  const filteredToDos = toDos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="🖊️ Add or Edit item..."
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>&nbsp;
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <i onClick={handleAddOrEdit} className="add-icon">
          {isEditing ? <FaEdit /> : <FaPlus />}
        </i>
      </div>
      
      {/* Search Input */}
      <div className="search" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search ToDo..."
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '2px solid #4caf50', // Green border
            borderRadius: '4px',
            width: '60%', // Full width
            outline: 'none',
            transition: 'all 0.3s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#388e3c')} // Darker green on focus
          onBlur={(e) => (e.target.style.borderColor = '#4caf50')} // Reset border color
        />
      </div>


      <table className="todo-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredToDos.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No ToDo items present
              </td>
            </tr>
          ) : (
            filteredToDos.map((obj, index) => (
              <tr key={obj.id} className="todo">
                <td>{index + 1}</td>
                <td>{obj.text}</td>
                <td>{obj.priority}</td>
                <td>{obj.dueDate || 'No Due Date'}</td>
                <td>
                  <i onClick={() => handleEdit(obj.id, obj.text, obj.priority, obj.dueDate)} className="edit-icon">
                    <FaEdit />
                  </i>
                  <i onClick={() => handleDelete(obj.id)} className="delete-icon">
                    <FaTrashAlt />
                  </i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
