import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BFImgLoadBody, BFImgLoadBodyType } from "../../../types/img.type.ts";
import classNames from "classnames";

const IndexForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<BFImgLoadBodyType>({
		resolver: zodResolver(BFImgLoadBody),
	});
	const onSubmit = handleSubmit(async (data) => {
		console.log(data);
		// TODO request to API + handleError + redirect to img card
	});

	return (
		<form
			className='row row-cols-lg-auto g-3 align-items-top'
			onSubmit={onSubmit}
		>
			<div className='col-12'>
				<input
					type='text'
					className={classNames("form-control", { "is-invalid": errors.url })}
					{...register("url", { required: true })}
				/>
				{errors.url && (
					<div className='invalid-feedback'>{errors.url.message}</div>
				)}
			</div>
			<div className='col-12'>
				<button className='btn btn-primary' type='submit'>
					Загрузить
				</button>
			</div>
		</form>
	);
};

export default IndexForm;
