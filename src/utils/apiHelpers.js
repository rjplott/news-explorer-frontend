const checkResponse = (res) => {
  console.log(res);
  return res.ok
    ? res.json()
    : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
};

export default checkResponse;