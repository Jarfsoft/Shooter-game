const fetch = require('node-fetch');

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/SDrgsSDf3DFWdvsd/scores/'

const postData = async(uName, score) => {
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({user: uName, score})
  })

  try {
    const postRequest = await fetch(url, postData);
    const data = await postRequest.json();
    return data;
  } catch (error) {
    throw new Error(`The following error prevented the action: ${error}`);
  }
}

const getData = async () => {
  try {
    const req = await fetch(url);
    const data = await req.json();

    return data.result;
  } catch (error) {
    throw new Error(error);
  }
};

export default postData;