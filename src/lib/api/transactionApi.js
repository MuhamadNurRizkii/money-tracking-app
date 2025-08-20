export const fetchDetailTransaction = async (token, page, limit) => {
  const url = new URL(
    `${import.meta.env.VITE_URL_API}/users/dashboard/transactions`
  );
  url.searchParams.append("page", page);
  url.searchParams.append("limit", limit);

  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTransaction = async (token, title, amount, type) => {
  return await fetch(
    `${import.meta.env.VITE_URL_API}/users/dashboard/transactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, amount, type }),
    }
  );
};

export const fetchTransactionById = async (token, id) => {
  return await fetch(
    `${import.meta.env.VITE_URL_API}/users/dashboard/transactions/edit/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateTransactions = async (
  token,
  id,
  { title, amount, type }
) => {
  return await fetch(
    `${import.meta.env.VITE_URL_API}/users/dashboard/transactions/edit/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, amount, type }),
    }
  );
};

export const deleteTransaction = async (id, token) => {
  return await fetch(
    `${import.meta.env.VITE_URL_API}/users/dashboard/transactions/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const fetchTransactionsByDate = async (token, type) => {
  return await fetch(
    `${
      import.meta.env.VITE_URL_API
    }/users/dashboard/transactions/chart/${type}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
