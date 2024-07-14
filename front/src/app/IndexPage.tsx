import React, { useCallback, useRef } from "react";
import { ImgLoadBodyBFType } from "../../types/img.type.ts";

const IndexPage: React.FC = () => {
	const urlRef = useRef<HTMLInputElement>(null);
	const onSubmit = useCallback(async () => {
		if (urlRef.current) {
			alert(urlRef.current.value);

			const data: ImgLoadBodyBFType = { url: urlRef.current.value };
			alert(data);
		}
	}, []);

	return (
		<form
			className='row row-cols-lg-auto g-3 align-items-center'
			onSubmit={onSubmit}
		>
			<div className='col-12'>
				<input type='text' className='form-control' id='url' ref={urlRef} />
			</div>
			<div className='col-12'>
				<button className='btn btn-primary' type='submit'>
					Загрузить
				</button>
			</div>
		</form>
	);
};

export default IndexPage;
