import api from "./api";

export default async function loginUser(data: { mobileNo: string; password: string }) {
	const res = await api.post("/user/login", data);

	return res.data;
}

export async function getUsers(id: string) {
	const res = await api.get("/user", { params: { id: id } });

	return res.data;
}
