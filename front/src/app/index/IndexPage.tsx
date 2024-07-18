import IndexForm from "./IndexForm.tsx";
import { useNavigate } from "react-router-dom";
import { bfImageDTOType } from "../../../types/image.type.ts";

export default function IndexPage() {
	const navigate = useNavigate();
	const onSuccess = (image: bfImageDTOType) => {
		navigate(`/image/${image.id}`);
	};
	return <IndexForm onSuccess={onSuccess} />;
}
