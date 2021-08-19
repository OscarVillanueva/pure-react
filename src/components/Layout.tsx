import React, { FC } from 'react'

const Layout: FC = ({ children }) => {
  return ( 
    <main className = "container mx-auto">
      { children }
    </main>
  );
}
 
export default Layout