// import axios from 'axios';

// axios.defaults.baseUrl = 'https://pixabay.com/api';
// const options = {
//     key: '29710513-88fdd381238e9ed6d5c0ddb9e',
//     q: inputName,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
// }

// async function fetchImages() {
//   try {
//     const response = await axios.get('/', {
//     params: {
//        key: '29710513-88fdd381238e9ed6d5c0ddb9e',
//         q: inputName,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//     }
//   });
//     console.log(response);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// export function fetchImages() { 
//     return axios.get(`${ENDPOINT}/?${API_KEY}`)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }




export default function fetchImages(inputName) { 
    return fetch(`https://pixabay.com/api/?key=29710513-88fdd381238e9ed6d5c0ddb9e&q=${inputName}&image_type=photo`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
