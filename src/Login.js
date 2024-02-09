import axios from "axios";
import { useEffect, useRef, useState } from "react";

function Login() {
  var [logstate, setLogstate] = useState(false);
  var [popup, setPopup] = useState(true);

  var [axiosdata, setAxiosdata] = useState([]);

  var name1 = useRef();
  var password1 = useRef();
  var new1 = useRef();
  var new2 = useRef();

  var newdataadd = () => {
    var data1 = new1.current.value;
    var data2 = new2.current.value;
    var obj = { name: data1, email: data2 };

    axiosdata.push(obj);
    console.log(axiosdata);
  };

  var LOG = () => {
    if ((name1.current.value = password1.current.value = "kumar")) {
      setLogstate(true);
    }
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log("Data Getting");
        setAxiosdata(res.data);
        console.log(...res.data);
      })
      .catch((err) => {
        console.log("Data getting fail");
      });
  }, []);

  return (
    <div>
      {logstate ? (
        <div>
          <h1>Axios Data</h1>
          {popup ? (
            <button
              onClick={() => {
                setPopup(!popup);
              }}
            >
              Add new
            </button>
          ) : (
            <div>
              <input ref={new1} type="text" placeholder=""></input>
              <br></br>
              <input ref={new2} type="text" placeholder=""></input>
              <br></br>
              <button onClick={newdataadd}>Add</button>
              <button
                onClick={() => {
                  setPopup(!popup);
                }}
              >
                Back
              </button>
            </div>
          )}
          <table style={{ border: "2px solid black" }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
            {axiosdata.map((ele) => {
              return (
                <tr>
                  <td style={{ border: "2px solid black" }}>{ele.name}</td>
                  <td style={{ border: "2px solid black" }}>{ele.email}</td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : (
        <div>
          UserName :
          <input type="text" placeholder="Enter your Name" ref={name1}></input>
          Password :
          <input
            type="password"
            placeholder="Enter your Password"
            ref={password1}
          ></input>
          <br></br>
          <button onClick={LOG}>Click</button>
        </div>
      )}
    </div>
  );
}
export default Login;
