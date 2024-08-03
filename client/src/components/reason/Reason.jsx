import React from 'react'
import css from './Reason.module.scss'
import {motion} from 'framer-motion'
import { fadeIn, staggerContainer } from '../../utils/motion'

const Reason = () => {
    return (
        <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{once: false, amount: 0.3}}
        className={css.wrapper}>
            <div className={`paddings yPaddings flexCenter innerWidth ${css.container}`}>

                <motion.div 
                variants={fadeIn("left", "tween", 0.4,1)}
                className={css.leftside}>
                    <img src="./bike2.jpg" alt="" />
                </motion.div>



                <div className={css.rightside}>
                    <motion.span 
                    variants={fadeIn("right", "tween", 0.2,1)}
                    className={css.title}>
                        Why we do This?
                    </motion.span>

                    <motion.span 
                    variants={fadeIn("right", "tween", 0.4,1)}
                    className='secondaryText'>
                        The growing climate crisis and rising environmental awareness are driving a shift towards sustainable transportation in cities like Melbourne. There is a current need for the City of Melbourne to prosper urban planning that creates safe, affordable and resilient cities with green and environmental living conditions. While cycling offers a clean and healthy way to get around, concerns about safety due to heavy traffic and limited cycling infrastructure deter many commuters.
                    </motion.span>

                    <motion.span 
                    variants={fadeIn("right", "tween", 0.6,1)}
                    className={css.lastline}>
                        How can we encourage Victorians to embrace cycling as a safer and more eco-conscious commuting option?
                    </motion.span>
                </div>

            </div>

        </motion.section>
    )
}

export default Reason