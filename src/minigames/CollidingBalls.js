import React, { useEffect, useRef, useState } from 'react'


export default function CollidingBalls() {
    const [canvas, setCanvas] = useState()
    const [ctx, setCtx] = useState()
    const [balls, setBalls] = useState([])
    const getCanvas = useRef()

    // let balls = []
    let color = ["red", "blue", "green", "purple"]
    const radius = 15;
    const numberOFballs = 100;
    const mathRandom = (min, max) => {
        let result;
        result = Math.random() * (max - min) + min
        return result
    }

    const clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    const measureDistance = (x1, y1, x2, y2) => {
        let result
        result = Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5)
        return result
    }
    function rotate(velocity, angle) {
        const rotatedVelocities = {
            x: velocity.dx * Math.cos(angle) - velocity.dy * Math.sin(angle),
            y: velocity.dx * Math.sin(angle) + velocity.dy * Math.cos(angle)
        };

        return rotatedVelocities;
    }
    const manageCollition = (tempArr, i, j) => {
        const angle = Math.tan(tempArr[j].dy - tempArr[i].dy / tempArr[j].dx - tempArr[i].dx)
        console.log(tempArr[j].dy - tempArr[i].dy / tempArr[j].dx - tempArr[i].dx)
        const u1 = rotate(tempArr[i], angle)
        const u2 = rotate(tempArr[j], angle)
        return { u1, u2 }

    }
    const checkCollisions = (tempArr, i) => {
        let returnArr = tempArr;
        for (let j = 0; j < tempArr.length; j++) {
            if (j === i) continue
            const distance = measureDistance(tempArr[i].x, tempArr[i].y, tempArr[j].x, tempArr[j].y) - 2 * radius
            const xVelocityDiff = tempArr[i].dx - tempArr[j].dx
            const yVelocityDiff = tempArr[i].dy - tempArr[j].dy
            const xDistance = tempArr[j].x - tempArr[i].x
            const yDistance = tempArr[j].y - tempArr[i].y
            if (distance <= 0) {
                if (xVelocityDiff * xDistance + yVelocityDiff * yDistance >= 0) {
                    const { u1, u2 } = manageCollition(tempArr, i, j)
                    returnArr = tempArr.map((element, index) => {
                        let newBall = element
                        if (index === i) {
                            newBall.dx = u1.x
                            newBall.dy = u1.y
                        }
                        if (index === j) {
                            newBall.dx = u2.x
                            newBall.dy = u2.y
                        }
                        return newBall
                    })
                }

            }
        }
        return returnArr
    }

    const moveball = (prop, arr) => {
        let ball = prop
        if (canvas.width - radius < ball.x || 0 + radius > ball.x) {
            ball.dx = -ball.dx
        }
        if (canvas.height - radius < ball.y || 0 + radius > ball.y) {
            ball.dy = -ball.dy
        }
        ball.x = ball.x + ball.dx
        ball.y = ball.y + ball.dy
        return prop

    }

    // drawBall 
    const drawBall = ({ x, y, radius, color, dx, dy }) => {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = color;
        ctx.strokeStyle = color
        // ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }

    // create balls 
    const createballs = () => {
        setBalls([])
        if (!canvas) return
        let tempArr = [];
        for (let i = 0; i < numberOFballs; i++) {
            let ball = {
                x: mathRandom(0 + radius, canvas.width - radius),
                y: mathRandom(0 + radius, canvas.height - radius),
                radius: radius,
                color: color[Math.round(mathRandom(0, 3))],
                dx: mathRandom(-0.05, 0.05),
                dy: mathRandom(-0.05, 0.05)
            }
            if (i !== 0) {
                for (let j = 0; j < tempArr.length; j++) {
                    const distance = measureDistance(ball.x, ball.y, tempArr[j].x, tempArr[j].y) - 2 * radius
                    if (distance <= 0) {
                        ball = {
                            x: mathRandom(0 + radius, canvas.width - radius),
                            y: mathRandom(0 + radius, canvas.height - radius),
                            radius: radius,
                            color: color[Math.round(mathRandom(0, 3))],
                            dx: mathRandom(-0.05, 0.05),
                            dy: mathRandom(-0.05, 0.05)
                        }
                        j = -1
                    }
                }
            }
            tempArr.push(ball)
        }
        setBalls(tempArr)
    }


    useEffect(() => {
        setCanvas(() => getCanvas.current)
        setCtx(() => getCanvas.current.getContext("2d"))
        createballs()
    }, [canvas])

    useEffect(() => {
        if (!canvas || balls.length === 0) return
        clearCanvas()
        let tempArr = balls
        for (let i = 0; i < tempArr.length; i++) {
            if (tempArr.length === 0) return
            drawBall(tempArr[i])
            tempArr = checkCollisions(tempArr, i)
            let ball = tempArr[i]
            ball = moveball(ball, tempArr)
            tempArr = tempArr.map((element, index) => {
                if (index === i) {
                    return ball
                } else {
                    return element
                }
            }
            )
        }
        setBalls(tempArr)
    })

    return (
        <div className='m-auto flex justify-center align-middle'>
            <canvas ref={getCanvas} height={600} width={1500} style={{ background: "black" }} tabIndex="0"></canvas>
        </div>
    )
}
