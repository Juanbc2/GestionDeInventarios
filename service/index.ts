const API_URL = "/api";

const API_SERVICES = {
  users: `${API_URL}/users`,
  roles: `${API_URL}/roles`,
  materials: `${API_URL}/materials`,
  inventory: `${API_URL}/inventory`,
  userById: (id: string) => `${API_URL}/users/${id}`,
  inventoryByMaterialId: (id: string) => `${API_URL}/inventory/${id}`,
  userIdByEmail: (email: string) => `${API_URL}/users/byEmail/${email}`,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export { API_SERVICES, fetcher };
