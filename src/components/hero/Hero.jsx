import React from 'react'
import css from './Hero.module.scss'

const Hero = () => {
  return (
    <section className={`paddings ${css.wrapper}`}>
            <div className={`innerWidth ${css.container}`}>
                <div className={css.upperElements}>
                    <span className="primaryText">
                        We Are <br /> BicycleRoute
                    </span>

                    <div className={css.leftside}>
                        <div className='primaryText'>Promote</div>
                        <div className='secondaryText'>
                        green transportation <br /> & safer urban
                        </div>
                    </div>

                    
                </div>


                <div className={css.bike}>
                    <img src="./bike1.png" alt="" />
                </div>



                <div className={css.lowerElements}>
                    <span className='secondaryText'>
                        Make Mel a Safer,
                        <br/>
                        Greener Cycling City
                    </span>
                    <div className={css.rightside}>
                    <span className='secondaryText'>
                        planing through historical data
                        <br/>
                        insights and route planning
                    </span>
                    </div>

                </div>
            </div>
    </section>
  )
}

export default Hero