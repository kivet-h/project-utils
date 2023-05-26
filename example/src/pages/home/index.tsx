import { DrRegExp } from '@@/index-utils'
import React from 'react'
import './index.less'

const Home = () => {
    React.useEffect(() => {
        console.log(DrRegExp.PhoneNumber.test('000 239 0293 2123'))
    }, [])

    return (
        <div className="home">
            <div id="home-map" />
        </div>
    )
}

export default Home
