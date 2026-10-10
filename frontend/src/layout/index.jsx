import React from 'react'
import Header from './Header'
import Footer from './Footer'
import BottomNav from './BottomNav'

const PublicLayout = ({children}) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <BottomNav />
    </>
  )
}

export default PublicLayout