import TopMenu from "./TopMenu.tsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className='container-xxl'>
			<nav className='navbar bg-body-tertiary  mb-4'>
				<div className='container-fluid'>
					<a className='navbar-brand' href='#'>
						😀 Meme
					</a>
					<TopMenu />
				</div>
			</nav>
			<Outlet />
		</div>
	);
}
