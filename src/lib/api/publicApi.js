export const userLogin = async ({ username, password }) => {
  return await fetch(`${import.meta.env.VITE_URL_API}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

export const userRegister = async ({
  first_name,
  last_name,
  username,
  password,
}) => {
  return await fetch(`${import.meta.env.VITE_URL_API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first_name, last_name, username, password }),
  });
};
