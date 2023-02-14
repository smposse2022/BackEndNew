import { useEffect, useState } from "react";

import "./App.css";
import { UsersTable } from "./components/UsersTable";
import { UserForm } from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:8080/users%22");
      const jsonResponse = await response.json();
      const data = jsonResponse.data;
      setUsers(data);
    };
    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <UserForm />
        <UsersTable users={users} />
      </header>
    </div>
  );
}

export default App;
