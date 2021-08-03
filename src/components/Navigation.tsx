import React, { FC } from 'react'

export interface NavigationProps {
  text: string
}
 
const Navigation: FC<NavigationProps> = ({ text }) => {
  return ( 
    <h2>{text}</h2> 
  );
}
 
export default Navigation;