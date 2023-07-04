import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const router = useRouter()

    const onSubmit = (values) => {
        console.log(values)
        axios.post(`${process.env.NEXT_PUBLIC_BOLAO_API || 'http://localhost:5000/'}api/users`, values)
            .then(response => router.push('/login'))
            .catch(err => console.log(err))
    }

    return(
        <section className='h-screen'>
            <div className='px-6 h-full text-gray-800'>
                <div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
                    <div className='xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-6'>
                                <input
                                    type='text'
                                    className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                        ${errors.name && 'border-red-400'}
                                    `}
                                    id='name'
                                    placeholder='Nome'
                                    name='name'
                                    {...register('name', {required: true})}
                                />
                                {errors.name && <p className='text-sm text-red-600'>Name is required</p>}
                            </div>
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
                                Cadastrar
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default SignUp
