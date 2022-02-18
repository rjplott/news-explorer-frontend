const checkResponse = (res) => {
  console.log(res);
  return res.ok ? res.json() : Promise.reject(`${res.status} - ${res.statusText}`)
};

export default checkResponse;