import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:2400/api",
  headers: {
    "Content-type": "application/json"
  }
});