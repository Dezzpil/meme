import { Route, Routes } from "react-router-dom";
import Layout from "./Layout.tsx";
import ImagePage from "./image/ImagePage.tsx";
import IndexPage from "./index/IndexPage.tsx";

export default function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<IndexPage />} />
				<Route path='image/:id' element={<ImagePage />} />
			</Route>
		</Routes>
	);
}
