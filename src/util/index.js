import axios from 'axios';

const baseURL = 'https://ffprac-team3-back.onrender.com/api/v1';
const registerUserRoute = 'users/register';
const loginUserRoute = 'users/loginUser';
const updateUserRoute = 'users/updateUser';

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

const updateUser = async (user) => {
  const config = {
    method: 'patch',
    url: `${baseURL}/${updateUserRoute}`,
    data: { ...user },
  };

  try {
    const response = await axios(config);
    console.log(response, 'You have successfully updated user information!');
    return response;
  } catch (error) {
    const msg = error.response.data.msg;
    return msg;
  }
};

// * || PET DATA *

// note: not used, but could be used with GET with params
const getAllPetData = async (url) => {
  const config = {
    method: 'get',
    url: `${baseURL}/pets/getAllPets`,
  };

  try {
    const response = await axios(config);
    return response.data.petData;
  } catch (error) {
    const msg = error.response.data.msg;
    return msg;
  }
};

export { registerUser, loginUser, updateUser, getAllPetData };
