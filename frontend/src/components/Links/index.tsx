import Link from "next/link";
import { useRouter } from "next/router";

const Links = () => {
	const router = useRouter();
	return (
		<div className="flex flex-col items-end justify-center text-lg gap-4">
			<Link href="/dashboard/programs">
				<a
					className={`${
						router.pathname === "/dashboard/programs" ? "font-bold" : "font-light"
					} transition all`}
				>
					Programs
				</a>
			</Link>
		</div>
	);
};

export default Links;
