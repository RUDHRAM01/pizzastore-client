import React from 'react'
import Header from '../header/Header'
import Data from '../../common-data/Data.json'
import PizzaCard from './card/Card'

const LandingPage = () => {
    console.log(Data)
    return (
        <>
            <Header />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '10vh', width: '100%',flexDirection:''}}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '25px 200px', width: '80%'}}>
                  
                    {Data.map((item) => {
                        return <PizzaCard name={item.name} img={item.img} price={item.price} description={item.description} />
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default LandingPage