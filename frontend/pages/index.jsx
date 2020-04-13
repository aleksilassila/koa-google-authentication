import Link from "next/link";

const HomePage = () => {
	return (
		<div>
			Welcome to Next.js!
            <Link href="/login"><a>Login</a></Link>
			<Link href="/secret"><a>Secret</a></Link>
		</div>
	);
};

export default HomePage;
