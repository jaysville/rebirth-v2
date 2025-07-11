import { Colors } from "@/types/colors";

export const lightMode: Colors = {
  primary: "",
  secondary: "",
  background: "",
  text: "",
  headers: "",
  accent: "",
};

export const darkMode: Colors = {
  primary: "",
  secondary: "",
  background: "",
  text: "",
  headers: "",
  accent: "",
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "Orange";
    case "Received":
      return "blue";
    case "Shipped":
      return "teal";
    case "Delivered":
      return "green";
    default:
      return "black"; // default color if status doesn't match any case
  }
};
