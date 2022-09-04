import axios from 'axios';

axios.defaults.baseUrl = 'https://pixabay.com/api';
const options = {
    key: '29710513-88fdd381238e9ed6d5c0ddb9e',
    q: inputName,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
}



// export function fetchImages() { 
//     return axios.get(`${ENDPOINT}/?${API_KEY}`)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }


// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.