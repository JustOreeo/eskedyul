import Link from "next/link";
import AuthStore from "../../../store/authStore";
import useTransactionController from "./transactionController";

const TransactionTable = () => {
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useTransactionController();

	const { data, isSuccess, isLoading } = controller.getTransaction(brgyId);

	return (
		<>
			<div className="relative w-full p-4">
				<table className="table w-full m-auto">
					<thead>
						<tr>
							<th className="sticky top-0 px-6 py-3">BENEFICIARY</th>
							<th className="sticky top-0 px-6 py-3">Program Name</th>
							<th className="sticky top-0 px-6 py-3">LOCATION</th>
							<th className="sticky top-0 px-6 py-3">Date</th>
							<th className="sticky top-0 px-6 py-3 w-[5rem]">time</th>
							<th className="sticky top-0 px-6 py-3 w-[8rem]">STATUS</th>
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
							data.data.map((transaction: any) => (
								<tr key={transaction.id}>
									<td className="">{`${transaction.residents.users.lname}, ${transaction.residents.users.fname} ${transaction.residents.users.mname}`}</td>
									<td className="w-[15rem] truncate">
										{transaction.program ? transaction.program.name : "Deleted"}
									</td>
									<td className="w-[15rem] truncate">
										{transaction.program ? transaction.schedule.location : "Deleted"}
									</td>
									<td className="">
										{transaction.schedule ? transaction.schedule.date : "Deleted"}
									</td>
									<td className="">
										{transaction.schedule
											? `${transaction.schedule.startTime}-${transaction.schedule.endTime}`
											: "Deleted"}
									</td>
									<td className="text-center">{transaction.status}</td>
									{transaction.program && (
										<td>
											<Link href={`/dashboard/transactions/edit/${transaction.id}`}>
												<a className="btn btn-ghost">Edit</a>
											</Link>
										</td>
									)}
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

export default TransactionTable;
