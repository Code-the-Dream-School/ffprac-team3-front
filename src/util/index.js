import axios from 'axios';

const baseURL = 'https://ffprac-team3-back.onrender.com/api/v1';
const registerUserRoute = 'users/register';
const loginUserRoute = 'users/loginUser';
const url = 'http://localhost:8000/api/v1/pets'

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
const getData = async () => {
  try {
    // let res = await axios.get(url, params);
    let data = 'Hello world';
    return data;
  } catch (error) {
    console.log(error, `error - getData in ${url} route`);
  }
};

const getAllPetData = async (url) => {
  const config = {
    method: 'get',
    url: `http://localhost:8000/api/v1/pets/getAllPets`,
  };
  
  try {
    let response = await axios(config);
    return response;
  } catch (error) {
    // const msg = error.response?.data.msg;
    // return msg;
  }
};

const uploadPdf = async (_id, file) => {
  console.log(file)
  const formData = new FormData();
  formData.append('fileMedical', file);
  const config = {
    method: 'patch',
    url: `http://localhost:8000/api/v1/pets/medical/update/${_id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  }

  try {
    let response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
}

export { registerUser, loginUser, getData, getAllPetData, uploadPdf };
