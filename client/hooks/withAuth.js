import React from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"

const withAuth = Component => props => {

    const router = useRouter()

    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated(){
        router.push('/login')
      }
    })

    const isUser = !!session?.user
    React.useEffect(() => {
      if (status === "loading") return
      if (!isUser) signIn()
    }, [isUser, status])
  
    if (isUser) {
      return <Component {...props}/>
    }

    return <div>Loading...</div>
}

export default withAuth

