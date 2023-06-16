import axios from 'axios';

export async function fetchRandomProfile() {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const profile = response.data.results[0];
    const photoUrl = profile.picture.large;
    return photoUrl;
  } catch (error) {
    console.error('', error);
    return null;
  }
}