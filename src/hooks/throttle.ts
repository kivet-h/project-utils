import React from 'react'

export default function useDruidThrottle(fn: (...args: any) => void, delay: number, dep = []) {
    const { current } = React.useRef<any>({ fn, timer: null })

    React.useEffect(() => {
        current.fn = fn
    }, [fn])

    return React.useCallback(function f(...args: any[]) {
        if (!current.timer) {
            current.timer = setTimeout(() => {
                delete current.timer
            }, delay)
            current.fn(...args)
        }
    }, dep)
}
