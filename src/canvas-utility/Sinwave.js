import React, { useEffect, useRef, useState } from 'react'
import { GUI } from 'dat.gui'


export default function Sinwave() {
    const [canvas, setCanvas] = useState()
    const [ctx, setCtx] = useState()
    const [line, setLine] = useState()
    let wave = {
        y: 400,
        length: 0.01,
        amplitude: 100,
        frequency: 0.01
    }
    let strokeColor = {
        h: 200,
        s: 50,
        l: 50,
    }
    let backgroundColor = {
        r: 0,
        g: 0,
        b: 0,
        a: 0.01,
    }
    const getCanvas = useRef()
    const gui = new GUI()
    gui.add(wave, 'y', 0, 800)
    gui.add(wave, 'length', 0.01, 0.05)
    gui.add(wave, 'amplitude', -300, 700)

    let increment = wave.frequency
    const draw = (prop) => {
        // color.h = color.h * Math.sin(wave.frequency)
        ctx.beginPath()
        ctx.lineWidth = 10
        ctx.moveTo(prop.last.x, prop.last.y)
        for (let i = 0; i < canvas.width; i++) {
            ctx.lineTo(i,
                wave.y + Math.sin(
                    i * wave.length + increment) * wave.amplitude * Math.sin(increment))
        }
        ctx.strokeStyle = `hsl(${strokeColor.h},${strokeColor.s}%,${strokeColor.l}%)`
        ctx.stroke()
        ctx.closePath()
    }

    const anime = () => {
        requestAnimationFrame(anime)
        ctx.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        draw(line)
        strokeColor.h = Math.abs(255 * Math.sin(increment))
        strokeColor.s = Math.abs(30 * Math.sin(increment)) + 20
        // strokeColor.l = Math.abs(100 * Math.sin(increment))
        increment += wave.frequency

    }
    useEffect(() => {
        if (!canvas) return
    }, [canvas])

    useEffect(() => {
        setCanvas(getCanvas.current)
        setCtx(getCanvas.current.getContext("2d"))
        if (!canvas) return
        setLine({
            x: 0,
            y: canvas.height / 2,
            color: "red",
            dx: 1,
            dy: 0,
            last: { x: 0, y: 300 }
        })
    }, [canvas])
    return (
        <div>
            <canvas ref={getCanvas} onClick={anime} height={800} width={1200}></canvas>
        </div>
    )
}
