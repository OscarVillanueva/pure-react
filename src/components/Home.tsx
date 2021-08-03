import React from 'react'
import Layout from './Layout';
import Navigation from './Navigation'

const Home = () => {
  return ( 
    <Layout>
      <h1>Hola desde Home</h1>
      
      <h2>Otra cosa</h2>

      <Navigation 
        text = "Soy una navegación"
      />
    </Layout>
  );
}
 
export default Home;