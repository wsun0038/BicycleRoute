import React from 'react'
import css from './Hero.module.scss'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '../../utils/motion'
import { Link } from 'react-router-dom';


const Hero = () => {
    return (
        <section className={`paddings ${css.wrapper}`}>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
                className={`innerWidth ${css.container}`}>
                <div className={css.upperElements}>
                    <motion.span
                        variants={fadeIn("right", "tween", 0.2, 1)}
                        className="primaryText">
                        We Are <br /> BicycleRoute
                    </motion.span>

                    <motion.div
                        variants={fadeIn("left", "tween", 0.4, 1)}
                        className={css.leftside}>
                        <div className='primaryText'>Promote</div>
                        <div className='secondaryText'>
                            green transportation <br /> & safer urban
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    variants={fadeIn('up', 'tween', 0.6, 1)}
                    className={css.exploreMore}
                >
                    <Link to="/insight" className={css.primaryButton}>
                        Explore More
                    </Link>
                </motion.div>


                <motion.div
                    variants={fadeIn("up", "tween", 0.3, 1)}
                    className={css.bike}>
                    <img src="./bike1.png" alt="" />
                </motion.div>



                <div className={css.lowerElements}>
                    <motion.span
                        variants={fadeIn("right", "tween", 0.3, 1)}
                        className='secondaryText'>
                        Make Melbourne a Safer,
                        <br />
                        Greener Cycling City
                    </motion.span>
                    <motion.div
                        variants={fadeIn("left", "tween", 0.5, 1)}
                        className={css.rightside}>
                        <span className='secondaryText'>
                            planning through historical data
                            <br />
                            insights and route planning
                        </span>
                    </motion.div>

                </div>
            </motion.div>
        </section>
    )
}

export default Hero