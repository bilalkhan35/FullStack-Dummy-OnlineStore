export const apis = {
  // Use Vite build-time env variable when deployed (VITE_API_URL). Falls back to localhost for local dev.
  items: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/items`
    : "http://localhost:8000/items",
  //   users: "http://localhost:7878/users",
  //   categories: "http://localhost:7878/categories",
};
