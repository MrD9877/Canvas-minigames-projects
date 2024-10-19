import React, { useEffect, useState } from 'react'

export default function Timer(props) {
    const [timercalled, setTimercalled] = useState()
    const [mSeconds, setMseconds] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const callback = () => {
        setMseconds((pre) => {
            let newMsec = pre + 1
            if (newMsec === 10) {
                setSeconds(pre => pre + 1)
                return 0
            }
            newMsec = pre + 1
            return newMsec
        })
    }
    const timer = () => {
        if (timercalled) clearInterval(timercalled)
        setTimercalled(setInterval(callback, 100))
    }

    const stop = () => {
        clearInterval(timercalled)
    }
    /* eslint-disable */

    useEffect(() => {
        if (props.gameEnd) {
            props.setScore(`${seconds}:${mSeconds}`)
            setMseconds(0)
            setSeconds(0)
        }
    }, [props.gameEnd])

    useEffect(() => {
        // stop timer 
        if (props.gameStart === false) stop()
        // start timer 
        if (props.gameStart) timer()
    }, [props.gameStart])

    return (
        <>
            <div className='flex justify-center align-middle w-12 items-center' >
                <span>{seconds}:0{mSeconds}</span>
            </div>
        </>
    )
}
