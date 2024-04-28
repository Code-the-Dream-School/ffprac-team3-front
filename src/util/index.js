import axios from 'axios';

// local testing baseURL
// const baseURL = 'http://localhost:8000/api/v1';

const baseURL = 'https://ffprac-team3-back.onrender.com/api/v1';
const registerUserRoute = 'users/register';
const loginUserRoute = 'users/loginUser';
const getCurrentUserRoute = 'users/getCurrentUser';
const updateUserRoute = 'users/updateUser';

// * || REGISTRATION AND USER LOGIN *

const registerUser = async (userInformation) => {
  const config = {
    method: 'post',
    url: `${baseURL}/${registerUserRoute}`,
    data: { ...userInformation },
  };

  try {
    const response = await axios(config);
    console.log(response.msg);
    return response;
  } catch (error) {
    return error.msg;
  }
};

const loginUser = async (userCredentials) => {
  const config = {
    method: 'post',
    url: `${baseURL}/${loginUserRoute}`,
    data: { ...userCredentials },
  };

  try {
    const response = await axios(config);
    console.log('Successful logged-in!');
    return response;
  } catch (error) {
    return error.msg;
  }
};

const getCurrentUser = async () => {
  const jwtToken = localStorage.getItem('jwtToken');

  const config = {
    method: 'get',
    url: `${baseURL}/${getCurrentUserRoute}`,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error.msg;
  }
};

const updateUser = async (userInformation) => {
  const jwtToken = localStorage.getItem('jwtToken');

  const config = {
    method: 'patch',
    url: `${baseURL}/${updateUserRoute}`,
    data: { ...userInformation },
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  try {
    const response = await axios(config);
    console.log(response.data.msg);
    return response;
  } catch (error) {
    return error.msg;
  }
};

// * || PET DATA *

const getAllPetData = async (url) => {
  const config = {
    method: 'get',
    url: `http://localhost:8000/api/v1/pets/getAllPets`,
  };

  try {
    let response = await axios(config);
    return response;
  } catch (error) {
    const msg = error.response.data.msg;
    return msg;
  }
};

export {
  registerUser,
  loginUser,
  updateUser,
  getCurrentUser,
  getAllPetData,
  uploadPdf,
};
