import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { api } from "../tools/api.ts";
import {
	bfImageCreateDTO,
	bfImageCreateDTOType,
	bfImageDTOType,
} from "../../../types/image.type.ts";

interface IndexFormProps {
	onSuccess: (image: bfImageDTOType) => void;
}

export default function IndexForm({ onSuccess }: IndexFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<bfImageCreateDTOType>({
		resolver: zodResolver(bfImageCreateDTO),
	});
	const [error, setError] = useState<string | null>();
	const [submitting, setSubmitting] = useState<boolean>(false);
	const onSubmit = handleSubmit(async (data) => {
		setError(null);
		setSubmitting(true);
		try {
			const response = await api.post<bfImageDTOType>("/image", data);
			console.log(response.data);
			onSuccess(response.data);
		} catch (e) {
			setError(e instanceof Error ? e.message : String(e));
		}
		setSubmitting(false);
	});

	return (
		<>
			<form className='row g-3 align-items-top' onSubmit={onSubmit}>
				<div className='col'>
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
					<button
						className='btn btn-primary'
						type='submit'
						disabled={submitting}
					>
						Загрузить
					</button>
				</div>
			</form>
			{error && <div className='alert alert-error'>{error}</div>}
		</>
	);
}
