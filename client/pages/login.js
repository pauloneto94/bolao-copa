import React from 'react'
import { getCsrfToken } from "next-auth/react"
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

const LogIn = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (values) => {
        signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: true,
            callbackUrl: `${window.location.origin}`
        })
    }

    return(
        <section className='h-screen'>
            <div className='px-6 h-full text-gray-800'>
                <div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
                    <div className='grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0'>
                        <img
                            src="logo.jpg"
                            className='w-full'
                            alt='Image'
                        />
                    </div>
                    <div className='xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-6'>
                                <input
                                    type='text'
                                    className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                        ${errors.email && 'border-red-400'}
                                    `}
                                    id='email'
                                    placeholder='Email'
                                    name='email'
                                    {...register('email', {required: true})}
                                />
                                {errors.email && <p className='text-sm text-red-600'>Email is required</p>}
                            </div>
                            <div className='mb-6'>
                                <input
                                    type='password'
                                    className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                        ${errors.password && 'border-red-400'}
                                    `}
                                    id='password'
                                    placeholder='Senha'
                                    name='password'
                                    {...register('password', {required: true})}
                                />
                                {errors.password && <p className='text-sm text-red-600'>Password is required</p>}
                            </div>
                            <div className='flex justify-between items-center mb-6'>
                            <button className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
                                    Entrar
                                </button>
                                <a className='text-gray-800' href='#!'>Esqueceu a senha?</a>
                            </div>
                            <div className='text-center lg:text-left'>
                                <p className='text-sm font-semibold mt-2 pt-1 mb-0'>
                                    Ainda não tem conta? 
                                    <a className='text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out' href='#!'> Registre-se</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default LogIn
