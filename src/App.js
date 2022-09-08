import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [Tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [TaskComplete, setTaskComplete] = useState([]);

  const handleSubmit = () => {
    setLoading((val) => !val);
    console.log(setLoading);
    let arr = [];
    setInput("");
    if (Tasks.length === 0) {
      arr[0] = input;
    } else {
      arr = [...Tasks];
      arr.unshift(input);
    }

    setTasks([...arr]);
    localStorage.setItem("task", JSON.stringify(arr));
  };
  const handleReset = () => {
    setLoading((val) => !val);
    localStorage.clear();
  };

  const handleDelete = (index) => {
    let filterArray = Tasks.filter((val, ind) => ind !== index);
    setTasks([...filterArray]);
    localStorage.setItem("task", JSON.stringify(filterArray));
  };

  const handleComplete = (index) => {
    const taskToBeDone = Tasks[index];
    handleDelete(index);
    let array = [];
    if (TaskComplete.length === 0) {
      array[0] = taskToBeDone;
    } else {
      array = [...TaskComplete];
      array.push(taskToBeDone);
      setTaskComplete([...array]);
    }
    setTaskComplete([...array])
    localStorage.setItem("taskDone", JSON.stringify(array));
  };

  useEffect(() => {
    if (localStorage.getItem("task")) {
      let arr = JSON.parse(localStorage.getItem("task"));
      setTasks([...arr]);
    } else {
      setTasks([]);
    }
    if (localStorage.getItem("taskDone")) {
      let array = JSON.parse(localStorage.getItem("taskDone"));
      setTaskComplete([...array]);
    } else {
      setTaskComplete([]);
    }
  }, [loading]);

  return (
    <div className="App">
      <div className="reset">
        <button onClick={handleReset}>Clear</button>
        <h1> Plan Your Day ✌</h1>
      </div>
      <div className="container">
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="📝Add some task"
        />
        &nbsp;&nbsp;
        <button className="add-btn" onClick={handleSubmit}>
          {" "}
          Add{" "}
        </button>
        <h2> Task for today</h2>
        <div className="child">
          <h3>
            <u>Uncomplete Task⌛</u>
          </h3>
        </div>
        <div className="main">
          <ul style={{ margin: "0", padding: "0" }}>
            {Tasks.map((value, index) => (
              <li
                key={index}
                style={{
                  border: "1px solid",
                  margin: "10px 0px",
                  padding: "10px",
                  listStyle: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>{value}</div>
                <div>
                  <button
                    onClick={() => handleComplete(index)}
                    className="done-btn"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3>
            <u>Completed Task 🤗</u>
          </h3>
          <ul style={{padding:"0", margin:"0"}}>
            {TaskComplete.map((val, index) => (
              <li
                key={index}
                style={{
                  border: "1px solid",
                  margin: "10px 0px",
                  padding: "10px",
                  listStyle: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {val}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h3>✍made with love @d!t!😉</h3>
    </div>
  );
}

export default App;
