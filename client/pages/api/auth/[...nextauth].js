import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                  label: 'email',
                  type: 'email',
                  placeholder: 'jsmith@example.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const payload = {
                    email: credentials.email,
                    password: credentials.password,
                }

                const res = await fetch('http://localhost:5000/api/authenticate', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const user = await res.json();
                if (!res.ok) {
                    throw new Error(user.exception);
                }
                
                if (res.ok && user) {
                    return user.data;
                }
          
                return null;
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
              return {
                ...token,
                accessToken: user.token,
                isAdmin: user.isAdmin,
                id: user.id
              };
            }
            return token;
          },
      
          async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user = {
                name: token.name,
                email: token.email,
                isAdmin: token.isAdmin,
                id: token.id
            }
      
            return session;
          },
    }
})