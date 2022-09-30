import api from "./api";

export async function postProgram({ data, token }: { data: any; token: string }) {
	const res = await api.post("/program", data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
}

export async function getPrograms(id: string) {
	const res = await api.get("/program", { params: { brgy: id } });

	return res.data;
}

export async function updatePrograms({ data, token }: { data: any; token: string }) {
	const res = await api.put("/program", data, {
		params: { id: data.id },
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
}

export async function getSchedule(id: string) {
	const res = await api.get("/schedule", { params: { id: id } });

	return res.data;
}

export async function postSchedule({ data, token }: { data: any; token: string }) {
	const res = await api.post("/schedule", data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
}

export async function deleteSchedule({ id, token }: { id: string; token: string }) {
	const res = await api.delete("/schedule", {
		params: {
			id: id,
		},
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
}
