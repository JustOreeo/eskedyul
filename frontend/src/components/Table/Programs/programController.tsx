import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getPrograms } from "../../../hooks/useProgramApi";

const useProgramController = () => {
	return {
		getPrograms(id: string) {
			return useQuery(["programs", id], () => getPrograms(id), {
				onError: (err: any) => {
					toast.error(err.message);
				},
			});
		},
	};
};

export default useProgramController;
