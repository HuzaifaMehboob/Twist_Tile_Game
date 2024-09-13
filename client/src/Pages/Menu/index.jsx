import React from 'react'
import classes from './index.module.css'
import Button from '../../Components/Button/index.jsx'
import { useNavigate } from 'react-router-dom'
const Menu = () => {
  const navigate = useNavigate();

  const navigatePage =()=>{
    navigate('/play')
  }
  const navigateLogin=()=>{
    navigate('/Login')
  }
  return (
    <div className={classes.menu}>
       <div className={classes.heading}>
            <h1>Tropical Tile Twist</h1>
       </div>

       <div className={classes.start}>
          <Button 
            onClick={navigatePage} 
            label={"Lets Get Started"} 
            customStyle={{'padding':'20px 60px','backgroundColor':'aqua','border':'3px solid white','borderRadius':'15px'}} 
          />
           <Button 
            onClick={navigateLogin} 
            label={"Sign In"} 
            customStyle={{'padding':'20px 100px','backgroundColor':'white','border':'3px solid white','borderRadius':'15px'}} 
          />
         </div>
    </div>
  )
}

export default Menu