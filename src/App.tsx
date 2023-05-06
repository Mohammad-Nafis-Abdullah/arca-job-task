import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { objData } from "./utils/data";

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

  const treeMaking = (d: objData) => {
    const getChild = dataArr.filter((data: objData) => {
      return data.parentId === d.id;
    });
    if (getChild.length) {
      const childArray = getChild.map((c: objData, i) => {
        return (
          <li key={i}>
            <div className="box">
              <h3>{c.id}</h3>
              <h5>{c.name}</h5>
            </div>
            <ul>{treeMaking(c)}</ul>
          </li>
        );
      });
      return childArray;
    } else {
      return;
    }
  };

  const display = (arr: objData[]) => {
    const d = arr.map((d, i) => {
      if (d.type === "Category" && !d.parentId) {
        return (
          <li key={i} className="extra-gap">
            <span className="box">
              <h3>{d.id}</h3>
              <h5>{d.name}</h5>
            </span>
            <ul>{treeMaking(d)}</ul>
          </li>
        );
      } else if (d.type === "Course" && !d.parentId) {
        const uniqueCat = arr.filter((data: objData) => {
          return data.type === "Category" && data.category_id === d.category_id;
        });
        if (!uniqueCat.length) {
          return (
            <li key={i} className="extra-gap">
              <span className="box">
                <h3>{d.id}</h3>
                <h5>{d.name}</h5>
              </span>
              <ul>{treeMaking(d)}</ul>
            </li>
          );
        }
      }
    });
    const filtered = d.filter((d) => d);
    return filtered;
  };

  // console.log(display(dataArr));

  return <ul>{display(dataArr)}</ul>;
}

export default App;
