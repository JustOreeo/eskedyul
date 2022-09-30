import { FormEvent, useEffect, useMemo, useState } from "react";
import handleChange from "../../../hooks/handleChange";
import useFormController from "./formController";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import AuthStore from "../../../store/authStore";
import progFormController from "../Programs/formController";
import programsController from "../../Table/Programs/programController";

const AddTransac = () => {
	const [transactionData, setTransactionData] = useState({
		residentId: "",
		scheduleId: "",
		programId: "",
	});
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useFormController();
	const progFormsController = progFormController(brgyId);
	const progController = programsController(brgyId);

	const { data: users, isSuccess: userSuccess } = controller.getUsers(brgyId);
	const { data: progData, isSuccess: progSuccess } = progController.getPrograms(brgyId);
	const { data: schedData, isSuccess: schedSuccess } = progFormsController.getProgramById(
		transactionData.programId
	);

	const names = useMemo(() => {
		if (userSuccess) {
			const residentFilter = users.data.filter((user: any) => {
				return user.role === "Resident";
			});

			const namesArr = residentFilter.map((user: any) => {
				return `${user.id}~${user.lname}, ${user.fname} ${user.mname}`;
			});

			return namesArr;
		}

		return [];
	}, [users, userSuccess]);

	function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		controller.postTransaction(transactionData);
	}

	return (
		<div className="card bg-base-100 shadow-xl p-5 w-[30rem] rounded-md ">
			<form className="w-full flex flex-col" onSubmit={submit}>
				<h1>Benfeciary:</h1>
				<ComboBox
					options={names}
					enableAutocomplete
					style={{ width: "100%" }}
					onSelect={(e) => setTransactionData((data) => ({ ...data, residentId: e.split("~")[0] }))}
				/>

				<h1>Programs:</h1>
				<select
					className="select select-bordered w-full "
					name="programId"
					value={transactionData.programId}
					onChange={(e) => handleChange(e, setTransactionData)}
				>
					<option value=""></option>
					{progSuccess && progData.data !== "No Data" ? (
						progData.data.map((prog: any) => (
							<option value={prog.id} key={prog.id}>
								{prog.name}
							</option>
						))
					) : (
						<option value=""></option>
					)}
				</select>

				<h1>Schedule:</h1>
				<select
					className="select select-bordered w-full"
					name="scheduleId"
					value={transactionData.scheduleId}
					onChange={(e) => handleChange(e, setTransactionData)}
				>
					<option value=""></option>
					{schedData && schedSuccess && schedData.data !== "No Data" ? (
						schedData.schedules.map((sched: any) => (
							<option value={sched.id} key={sched.id} className="flex flex-col h-max">
								{`Location: ${sched.location}   Date: ${sched.date}     Time: ${sched.startTime}-${sched.endTime}  `}
							</option>
						))
					) : (
						<option value=""></option>
					)}
				</select>

				<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddTransac;
