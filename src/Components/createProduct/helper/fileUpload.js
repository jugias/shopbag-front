import axios from "axios";

export const fileUpload = async (file) => {
	const cloudUrl = "https://api.cloudinary.com/v1_1/dksz8cxlh/upload";
	const formData = new FormData();
	formData.append("upload_preset", "shopbag-img");
	formData.append("file", file);

	try {
		const resp = await axios
			.post(cloudUrl, formData)
			.then((data) => data.data);
		return resp.secure_url;
	} catch (error) {
		console.log(error);
	}
};
