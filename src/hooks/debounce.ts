import React from 'react'

export default function useDruidDebounce(fn: (...args: any) => void, delay: number, dep = []) {
    const { current } = React.useRef<any>({ fn, timer: null })

    React.useEffect(
        function () {
            current.fn = fn
        },
        [fn]
    )

    return React.useCallback(function f(...args: any[]) {
        if (current.timer) {
            clearTimeout(current.timer)
        }

        current.timer = setTimeout(() => {
            current.fn(...args)
        }, delay)
    }, dep)
}
