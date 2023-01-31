import { useState, useEffect } from 'react'
import Navigation from '../Navigation/index'
import Footer from '../Footer/index'

type Props = {
  hideHeader?: boolean
  hideFooter?: boolean
  children: React.ReactNode
}

const DefaultLayout = (props: Props) => {
  const [mounted, setMounted] = useState(false)
  const { hideHeader = false, hideFooter = false, children } = props

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    <>
      {!hideHeader && <Navigation />}
      <div className="min-h-screen bg-white dark:bg-gray-800">
        <main>{children}</main>
      </div>
      {!hideFooter && <Footer />}
    </>
  )
}

export default DefaultLayout
function applyTheme(arg0: any) {
  throw new Error('Function not implemented.')
}
