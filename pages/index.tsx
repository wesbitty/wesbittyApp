import AppLayout from '~/components/Layouts/AppLayout'
import Image from 'next/image'

const Page = () => {
  return (
    <>
      <AppLayout>
        {/* <blockquote> */}
        <h1>Welcome to the Wesbitty Inc</h1>
        <p>
          This is an example site to demonstrate how to use{' '}
          <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication with PlanetScale
          and Prisma.
        </p>
        <blockquote>
          <p>
            You can find how to get started{' '}
            <a href={`https://github.com/wesbitty/wesbittyapp`}>here</a>.
          </p>
        </blockquote>
      </AppLayout>
    </>
  )
}

export default Page
