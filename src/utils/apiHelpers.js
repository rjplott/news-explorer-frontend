const checkResponse = (res) => {
  console.log(res);
  return res.ok
    ? res.json()
    : Promise.reject(`Error: ${res.status} - ${res.message}`);
};

export default checkResponse;