import { useState, useEffect } from 'react'
import useDebounce from './debounce'

export default function useDruidWindowSize() {
    const [offsetHeight, setOffsetHeight] = useState(document.body.offsetHeight)

    useEffect(() => {
        window.onresize = () => updateSize()

        return () => {
            window.onresize = null
        }
    }, [])

    const updateSize = useDebounce(() => {
        setOffsetHeight(document.body.offsetHeight)
    }, 300)

    return offsetHeight
}
