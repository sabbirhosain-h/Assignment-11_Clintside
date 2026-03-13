import axios from "axios";

const useImageUpload = () => {
    const uploadImage = async (imageFile, fallbackUrl = "") => {
        if (!imageFile) return fallbackUrl;

        const formData = new FormData();
        formData.append("image", imageFile);

        const imageBbAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImageBB}`;
        const imgRes = await axios.post(imageBbAPI, formData);
        return imgRes.data.data.display_url; 
    };

    return uploadImage;
};

export default useImageUpload;