import AuthStore from "../../../store/authStore";
import useProgramController from "./programController";

const ProgramsTable = () => {
	const controller = useProgramController();
	const brgyId = AuthStore((state) => state.userData.brgyId);

	const { data, isSuccess, isLoading } = controller.getPrograms(brgyId);

	return (
		<>
			<div className="overflow-x-auto max-h-[20rem] min-h-[20rem] relative w-full p-4">
				<table className="table w-full m-auto">
					<thead>
						<tr>
							<th className="sticky top-0 px-6 py-3">NAME</th>
							<th className="sticky top-0 px-6 py-3">DETAILS</th>
							<th className="sticky top-0 px-6 py-3">QUALIFICATIONS</th>
							<th className="sticky top-0 px-6 py-3 w-[8rem]">VIEW</th>
							<th className="sticky top-0 px-6 py-3 w-[10rem]">status</th>
						</tr>
					</thead>
					<tbody>
						{isLoading && (
							<tr>
								<td>Loading...</td>
								<td></td>
								<td className="text-center"></td>
							</tr>
						)}
						{isSuccess &&
							data.data.map((program: any) => (
								<tr key={program.id}>
									<td className="">{program.name}</td>
									<td className="w-[15rem] truncate">{program.details}</td>
									<td className="">{program.qualification}</td>
									<td className="">{program.view}</td>
									<td className="text-center">{program.status}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ProgramsTable;
