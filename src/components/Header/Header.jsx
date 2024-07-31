import React, { useState } from 'react'
import css from './Header.module.scss'
import { BiCool, BiMenuAltRight } from "react-icons/bi"
import {motion} from 'framer-motion'
import {getMenuStyles, headerVariants} from '../../utils/motion'
import useHeaderShadow from '../../hooks/useHeaderShadow'


const Header = () => {
    
  const [menuOpened, setMenuOpened] = useState(false);
  const headerShadow = useHeaderShadow()


  return (
    <motion.div 
    initial="hidden"
    whileInView="show"
    variants={headerVariants}
    viewport={{once: false, amount: 0.3}}
    className={`paddings ${css.wrapper}`}
    style={{boxShadow: headerShadow}}>

        <div className={`flexCenter innerWidth ${css.container}`}>
            <div className={css.name}>
                BicycleRoute
            </div>

            <ul 
            style={getMenuStyles(menuOpened)}
            className={`flexCenter ${css.menu}`}>
                <li><a href="/">Home</a></li>
                <li><a href="/insight">Insight</a></li>
                <li><a href="/route">Route</a></li>
                <li className={`flexCenter ${css.group}`}>
                    <p>TP39</p>
                    <BiCool size={"40Px"}/>
                </li>
            </ul>

            {/* for medium and small screens */}
            <div 
            className={css.menuIcon}
            onClick={()=>setMenuOpened((prev)=>!prev)}
            >
                <BiMenuAltRight size={30}/>
            </div>
        </div>
    </motion.div>
  )
}

export default Header