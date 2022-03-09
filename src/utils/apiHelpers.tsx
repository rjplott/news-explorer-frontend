const checkResponse = (res: Response): Promise<any> => {
  return res.ok
    ? res.json()
    : Promise.reject(`${res.status} - ${res.statusText}`);
};

export default checkResponse;
