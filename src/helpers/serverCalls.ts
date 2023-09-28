import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../interfaces";

const API_URL = "https://eskinarockbarapi.hopto.org";

const fetchWithToken = async (
  url: string,
  method = "GET",
  body: any = null
) => {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${API_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (response.status === 401) {
    AsyncStorage.clear();
    return;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getCommands = async () => {
  return await fetchWithToken("/commands");
};

export const getCommandsById = async (id: string) => {
  const response = await fetch(`${API_URL}/commands/${id}`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const createOrder = async (id: string, value: string) => {
  return await fetchWithToken("/orders", "POST", {
    commandId: id,
    value: Number(value),
  });
};

export const updateCommandValue = async (id: string, value: number) => {
  return await fetchWithToken(`/commands/${id}?value=${value}`, "PUT");
};

export const getProductList = async () => {
  let url = "/products";
  return (await fetchWithToken(url)) as Promise<
    {
      id: number;
      name: string;
      price: number;
      qtd: number;
    }[]
  >;
};

interface productDebit {
  productid: number;
  quantity: number;
}

export const debitProductsFromCommand = async (
  commandId: string,
  products: productDebit[]
) => {
  return await fetchWithToken(`/commands/debit/${commandId}`, "PUT", products);
};

export const updateProduct = async (id: number, product: Partial<Product>) => {
  return await fetchWithToken(`/products/${id}`, "PUT", product);
};

export const createProduct = async (product: Partial<Product>) => {
  return await fetchWithToken("/products", "POST", product);
};

export const createCategory = async (name: string) => {
  return await fetchWithToken("/categories", "POST", { name });
};

export const deleteProduct = async (id: number) => {
  return await fetchWithToken(`/products/${id}`, "DELETE");
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(API_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = (await response.json()) as {
    token: string;
    role: string;
    id: string;
    message: string;
  };
  if (!response.ok) throw new Error(data.message);
  const { token, role, id } = data;
  return { token, role, id };
};

export const validateRole = async (requiredRole: "ADMIN" | "SELLER") => {
  const response = await fetchWithToken("/login/validate-role");
  const { role } = response;
  if (!(role === "ADMIN" || role === requiredRole)) {
    throw new Error("Não autorizado");
  }
  return role;
};

export const validateToken = async () => {
  const response = await fetchWithToken("/login/validate-role");
  return response.role;
};

export const getOrdersBySellerId = async () => {
  return await fetchWithToken("/command-orders");
};

export const getAdminUsers = async () => {
  return await fetchWithToken("/users/seller");
};

export const getCategories = async () => {
  return await fetchWithToken("/categories");
};

export const resetPassword = async (id: string, password: string) => {
  return await fetchWithToken("/users/" + id, "PUT", { password });
};

export const changeUserCategory = async (id: string, categoryId: number) => {
  return await fetchWithToken("/users/upcat/" + id, "PUT", { categoryId });
};

export const createSeller = async (userData: any) => {
  return await fetchWithToken("/users", "POST", userData);
};

export const cancelOrder = async (orderId: number) => {
  return fetchWithToken(`/command-orders/${orderId}`, "PUT");
};

export const getItemsSold = async () => {
  return fetchWithToken("/command-orders/total");
};
