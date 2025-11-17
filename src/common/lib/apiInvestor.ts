export async function fetchInvestors(page = 1, pageSize = 10) {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/investor?page=${page}&page_size=${pageSize}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include", // jika pakai cookie-based auth
    });

    if (!res.ok) throw new Error("Failed to fetch investors");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching investors:", error);
    return null;
  }
}

export async function createInvestor(payload: {
  investor_name: string;
  investor_type_id: number;
  website: string;
}) {
  try {
    const res = await fetch("http://localhost:8000/api/v1/investor/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to create investor");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating investor:", error);
    return null;
  }
}