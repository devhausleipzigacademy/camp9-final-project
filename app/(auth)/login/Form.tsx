'use client';

import React from 'react';
// import InputField from './InputField';
// import Button from './Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginSchema, LoginSchemaType } from './LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import { POST } from '@/app/api/route';

export default function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  // I would love to understand this line!
  const onSubmit: SubmitHandler<LoginSchemaType> = data => axios.post("/api", data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center"
    >
      <p>username</p>
      <input {...register('username')}></input>
      {errors.username?.message}
      <p>password</p>
      <input {...register('password')}></input>
      {errors.password?.message}
      <input type="submit" />
    </form>
  );
}