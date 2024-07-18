import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { bfImageDTOType } from "../../../types/image.type.ts";
import axios from "axios";

export default function ImagePage() {
	const params = useParams<{ id: string }>();
	const [image, setImage] = useState<bfImageDTOType | null>(null);
	useMemo(() => {
		axios
			.get<bfImageDTOType>(`image/${params.id}`)
			.then((response) => setImage(response.data))
			.catch((e) => {
				console.error(e);
			});
	}, []);
	return <div>{image ? `Image ID: ${image.id}` : "waiting ..."}</div>;
}
