import React, { useEffect, useRef, useState } from 'react'

export default function Circle() {
    const [canvas, setCanvas] = useState()
    const [ctx, setCtx] = useState()
    const [circles, SetCircles] = useState([])
    const [mouse, setMouse] = useState({ x: 300, y: 400 })
    const fechCanvas = useRef()
    const numberofpartiles = 50

    const colors = [
        "#00dbff",
        "#4d39ce",
        "#088eff",
    ]

    const mathRandom = (min, max,) => {
        let result;
        result = Math.random() * (max - min) + min

        return result
    }
    const randomColor = (colors) => {
        const randomNumber = Math.floor(mathRandom(0, colors.length))
        return colors[randomNumber]
    }

    const handleMouseMovement = (e) => {
        setMouse({ x: e.clientX, y: e.clientY })
    }

    const draw = (prop) => {
        ctx.beginPath();
        ctx.strokeStyle = prop.color
        ctx.lineWidth = prop.radius
        ctx.fillStyle = prop.color
        ctx.moveTo(prop.lastCodinates.x, prop.lastCodinates.y)
        ctx.lineTo(prop.x, prop.y)
        ctx.stroke()
        ctx.closePath()
    }

    const createCircles = () => {
        if (!canvas) return
        let tempArr = []
        for (let i = 0; i < numberofpartiles; i++) {
            const circle = {
                x: 200,
                y: 300,
                lastCodinates: { x: 0, y: 0 },
                radius: mathRandom(1, 3),
                velocity: mathRandom(0.05, 0.09),
                radian: Math.random() * Math.PI * 2,
                color: randomColor(colors),
                distanceFromcenter: mathRandom(100, 200),
                lastMouse: { x: 200, y: 300 }
            }
            tempArr.push(circle)
        }
        SetCircles(tempArr)
    }
    const moveCircle = (prop) => {
        let temp = prop;
        // circular effect 
        temp.radian = temp.radian + temp.velocity
        // drag effect 
        temp.lastMouse = { x: temp.lastMouse.x + (mouse.x - temp.lastMouse.x) * 0.05, y: temp.lastMouse.y + (mouse.y - temp.lastMouse.y) * 0.05 }
        // lastCodinates for move to 
        temp.lastCodinates = { x: temp.x, y: temp.y }
        temp.x = temp.lastMouse.x + (Math.cos(temp.radian) * prop.distanceFromcenter)
        temp.y = temp.lastMouse.y + (Math.sin(temp.radian) * prop.distanceFromcenter)
        draw(temp)
        return temp
    }


    useEffect(() => {
        setCanvas(fechCanvas.current)
        setCtx(fechCanvas.current.getContext('2d'))
        createCircles()
        console.log(circles)
    }, [canvas])

    requestAnimationFrame(() => {
        if (!canvas || circles.length === 0) return
        ctx.fillStyle = "rgba(225,225,225,0.05)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        let tempArr = []
        for (const circle of circles) {
            tempArr.push(moveCircle(circle))
        }
        SetCircles(tempArr)
    })

    return (
        <div>
            <canvas height={900} width={1200} onMouseMove={handleMouseMovement} className='bg-slate-500' ref={fechCanvas}></canvas>
        </div>
    )
}
