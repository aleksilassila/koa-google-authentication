import Link from "next/link";
import config from "../config";

const Login = () => {
	return (
		<div>
			Login:{" "}
			<a href={config.ENDPOINT + "/auth/google"} target="_blank">
				Login with google{" "}
			</a>
			<a href={config.ENDPOINT + "/auth/logout"}>logout </a>
			<Link href="/">
				<a>Home </a>
			</Link>
			<Link href="/secret">
				<a>Secret</a>
			</Link>
		</div>
	);
};

export default Login;
