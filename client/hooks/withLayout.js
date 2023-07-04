import React from "react"
import NavBar from "../components/NavBar"
import Head from 'next/head'

const withLayout = Component => props => {

    return (
      <div className="flex flex-col w-full bg-rose-50">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar/>
        <div className='flex flex-col p-6'>
            <Component {...props}/>
        </div>
        <footer className="p-4 bg-gray-400">Footer</footer>
      </div>
    )

}

export default withLayout

