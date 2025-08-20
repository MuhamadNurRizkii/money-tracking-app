export const getDataTransaction = async (token) => {
  return await fetch(`${import.meta.env.VITE_URL_API}/users/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataProfile = async (token) => {
  return await fetch(
    `${import.meta.env.VITE_URL_API}/users/dashboard/profile`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
