import { set } from "astro:schema";
import { useEffect, useState } from "react";

export const ServerStatus = () => {
  const [status, setStatus] = useState("");
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.status));
  }, []);

  return (
    <div>
      <h2>Server Status:</h2>
      <p>{status ? status : "Loading..."}</p>
    </div>
  );
};
