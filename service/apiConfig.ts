const SERVER_URL = "/api";

const API_ROUTES = {
  users: `${SERVER_URL}/users`,
  roles: `${SERVER_URL}/roles`,
  lots: `${SERVER_URL}/lots`,
  collections: `${SERVER_URL}/collections`,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export { SERVER_URL, API_ROUTES, fetcher };
