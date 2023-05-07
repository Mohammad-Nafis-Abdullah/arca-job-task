import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Hierarchy } from "./components/Hierarchy";

function App() {
  const [dataArr, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/test5m23", {
        headers: {
          Authorization: "Bearer 1|FWItRXH5DCAN9rjBjIhfH9KMnprvKZweoK2Jfi5T",
        },
      })
      .then((res) => setData(res.data.data));
  }, []);

  return (
    <>
      <Hierarchy data={dataArr} />
    </>
  );
}

export default App;
