const serverUrl: string =
  process.env.NODE_ENV === "production"
    ? (process.env.NEXT_PUBLIC_SERVER_URL as string)
    : "http://localhost:8080/api";

export default serverUrl;
