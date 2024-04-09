import axios from 'axios';

const baseURL = 'https://ffprac-team3-back.onrender.com/api/v1';
const registerUserRoute = 'users/register';
const loginUserRoute = 'users/loginUser';

// * || REGISTRATION AND USER LOGIN *

const registerUser = async (user) => {
  const config = {
    method: 'post',
    url: `${baseURL}/${registerUserRoute}`,
    data: { ...user },
  };

  try {
    const response = await axios(config);
    console.log(response, 'You have successfully registered! Please log-in');
    return response;
  } catch (error) {
    const msg = error.response.data.msg;
    return msg;
  }
};

const loginUser = async (user) => {
  const config = {
    method: 'post',
    url: `${baseURL}/${loginUserRoute}`,
    data: { ...user },
  };

  try {
    const response = await axios(config);
    console.log(response, 'You have successfully logged-in!');
    return response;
  } catch (error) {
    const msg = error.response.data.msg;
    return msg;
  }
};

// * || PET DATA *

// note: not used, but could be used with GET with params
const getData = async (url, params) => {
  try {
    let res = await axios.get(url, params);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getData in ${url} route`);
  }
};

const getAllData = async (url) => {
  try {
    let res = await axios.get(url);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getAllData in ${url} route`);
  }
};

export { registerUser, loginUser, getData, getAllData };
