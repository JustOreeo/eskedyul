import api from "./api";

export default async function loginUser(data: { mobileNo: string; password: string }) {
	const res = await api.post("/user/login", data);

	return res.data;
}
