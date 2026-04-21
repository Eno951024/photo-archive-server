export async function getPhotos() {
  const res = await fetch('http://localhost:3001/photos');
  
  if (!res.ok) {
    throw new Error('API request failed');
  }

  return await res.json();
}