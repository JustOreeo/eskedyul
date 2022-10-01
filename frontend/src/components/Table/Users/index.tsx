import Link from "next/link";
import AuthStore from "../../../store/authStore";
import useFormController from "../../Forms/Transaction/formController";
import useTransactionController from "./userController";

const UsersTable = () => {
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const userId = AuthStore((state) => state.userData.id);
	const controller = useTransactionController(brgyId);
	const userController = useFormController();

	const { data, isSuccess, isLoading } = userController.getUsers(brgyId);

	return (
		<>
			<div className="relative w-full p-4">
				<table className="table w-full m-auto">
					<thead>
						<tr>
							<th className="sticky top-0 px-6 py-3">NAME</th>
							<th className="sticky top-0 px-6 py-3">MOBILE NO.</th>
							<th className="sticky top-0 px-6 py-3">ROLE</th>
							<th className="sticky top-0 px-6 py-3 w-[2rem]">is activated</th>
							<th className="sticky top-0 px-6 py-3 w-6"></th>
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
						{isSuccess && data.data !== "No Data" ? (
							data.data.map((user: any) => (
								<tr key={user.id}>
									<td className="">{`${user.lname}, ${user.fname} ${user.mname}`}</td>
									<td className="w-[15rem] truncate">{user.mobileNo}</td>
									<td className="w-[15rem] truncate">{user.role}</td>
									<td className="text-center">
										<input
											type="checkbox"
											checked={user.status > 0 ? true : false}
											className="checkbox"
											onClick={() => controller.activateUser(user.id)}
											disabled={userId === user.id ? true : false}
										/>
									</td>

									<td>
										<Link href={`/dashboard/users/edit/${user.id}`}>
											<a className="btn btn-ghost">Edit</a>
										</Link>
									</td>
								</tr>
							))
						) : (
							<tr className="btn btn-ghost">No Data</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default UsersTable;
