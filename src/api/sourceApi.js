
import image2base64 from 'image-to-base64'
const baseUrl = "https://source.unsplash.com/random/400x400";

export async function getRandom() {
    return await fetch(baseUrl);
}

export async function searchImages(searchTerm) {
    return await fetch(baseUrl + "/?" + searchTerm);
}

export const toDataUrl = async (url) => {
    try {
        const response = await image2base64(url)
        return response;
    } catch (error) {
        console.log(error);
    }
}