import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const joinWaitlist = (data) => {
  return API.post("/waitlist/join", data);
};