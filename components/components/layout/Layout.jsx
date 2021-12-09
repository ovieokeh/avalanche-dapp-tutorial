import React, { useEffect } from 'react'
import Head from 'next/head'
import smoothscroll from 'smoothscroll-polyfill'

import Header from '../header/Header'
import Footer from '../footer/Footer'
import Error from '../error/Error'

import { useAuthContext } from '../../context/auth/authContext'
import { ACCOUNTS_ERROR } from '../../context/auth/authReducer'

import styles from './Layout.module.scss'

export default function Layout({
  children,
  pageImage,
  pageTitle,
  pageDescription,
}) {
  const imageUrl = pageImage || 'https://google.com'
  const { authState } = useAuthContext()

  useEffect(() => {
    smoothscroll.polyfill()
  }, [])

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child)
    }
    return child
  })

  const hasAccountError = authState.status === ACCOUNTS_ERROR || authState.error

  return (
    <div className={styles.layout}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta name="og:title" content={pageTitle} />
        <meta name="og:description" content={pageDescription} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />

      <main className={styles.layoutMain}>
        {hasAccountError ? <Error /> : childrenWithProps}
      </main>

      <Footer />
    </div>
  )
}
