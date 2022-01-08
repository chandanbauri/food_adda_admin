import Link from "next/link"
import * as React from "react"
import { useAuth } from "../components/context/auth"
import { Layout } from "../components/layout/secondary"

export default function Home() {
  const Auth = useAuth()
  return (
    <Layout title='Food Dhaba'>
      <div className='bg-white flex-1 flex justify-center items-center box-border h-screen w-screen'>
        <div className='flex flex-col items-center max-w-5xl'>
          <h1 className=' sm:text-2xl md:text-3xl font-bold text-green-600'>
            Wellcome to Food Dhaba
          </h1>
          <div className='flex flex-row items-center justify-between mt-5'>
            {Auth?.user ? (
              <Link href='/dashboard/dashboard'>
                <button
                  onClick={() => {
                    //"1")
                  }}>
                  <div className='box-border px-10 py-2 border-2 border-green-500 rounded-md shadow-lg mx-5'>
                    <span className='text-green-500'>Go to Dashboard</span>
                  </div>
                </button>
              </Link>
            ) : (
              <Link href='/auth/login'>
                <button>
                  <div className='box-border px-14 py-2 border-2 border-green-600 bg-green-600 rounded-md shadow-lg mx-5'>
                    <span className='text-white'>Log in</span>
                  </div>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
