import React from 'react'
import type { ExtendedAppProps } from '~/components/types'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import WithAuth from '~/components/auth/WithAuth'
import { Metadata } from '../wesbitty/schemas/Metadata'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import '../styles/index.css'
import Head from 'next/head'
import { post } from '../wesbitty/lib/fetchWrapper'



export const queryClient = new QueryClient()

function MyApp({ Component, pageProps: { session, ...pageProps } }: ExtendedAppProps) {
  const router = useRouter()

  function telemetry() {
    return post(`https://wesbitty.com/platform/telemetry/page`, {
      referrer: document.referrer,
      title: document.title,
    })
  }

  useEffect(() => {
    if (!router.asPath.includes('?')) {
      telemetry()
    }
  }, [])

  useEffect(() => {
    function handleRouteChange() {
      telemetry()
    }

    // Listen for page changes after a navigation or when the query changes
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const Title = `${Metadata.Description} | ${Metadata.Name}`
  const { basePath } = useRouter()

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${basePath}/favicon/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${basePath}/favicon/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${basePath}/favicon/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${basePath}/favicon/site.webmanifest`} />
        <link rel="shortcut icon" href={`${basePath}/favicon/favicon.ico`} />
        <meta name="msapplication-TileColor" content="#1E1E1E" />
        <meta name="msapplication-config" content={`${basePath}/favicon/browserconfig.xml`} />
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/rss.xml`} />
        <link rel="icon" type="image/png" href={`${basePath}/favicon/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${basePath}/favicon/favicon.ico`} />
      </Head>
      <DefaultSeo
        title={Title}
        description={Metadata.Description}
        openGraph={{
          type: 'website',
          url: 'https://wesbitty.com/',
          site_name: 'Wesbitty Inc',
          images: [
            {
              url: `https://wesbitty.com${basePath}/logo/og/wesbitty-og.jpg`,
              width: 800,
              height: 600,
              alt: 'Wesbitty Og Image',
            },
          ],
        }}
        twitter={{
          handle: '@wesbitty',
          site: '@wesbitty',
          cardType: 'summary_large_image',
        }}
      />
      <SessionProvider session={session} refetchInterval={5 * 60} children={''}>
        <QueryClientProvider client={queryClient}>
          {Component.auth ? (
            <WithAuth options={Component.auth} children={''}>
              <Component {...pageProps} />
            </WithAuth>
          ) : (
            <Component {...pageProps} />
          )}
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp
