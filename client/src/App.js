import React, { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`
      );
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken]);

  // sort by dates
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {authToken ? (
        <>
          <ListHeader listName="Holiday Tick List" getData={getData} />
          <p className="user-email">Welcome back {userEmail}</p>
          <ul>
            {sortedTasks?.map((item) => (
              <ListItem key={item.id} task={item} getData={getData} />
            ))}
          </ul>
        </>
      ) : (
        <Auth />
      )}
      <p className="copyright"> Copyright Danish Wadhwa</p>
    </div>
  );
};

export default App;
