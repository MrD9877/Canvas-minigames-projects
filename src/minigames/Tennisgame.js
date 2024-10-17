import React, { useEffect, useRef, useState } from 'react'
import ReactPopover from './ReactPopover'
import Timer from './Timer'

export default function Tennisgame(props) {
    const c = useRef()
    let speedPlayer = 0.1
    const playerSpeed = 10
    const [playerY, setplayerY] = useState(30)
    const [ballX, setBallX] = useState()
    const [ballY, setBallY] = useState()
    const [vectorX, setVetorX] = useState(true)
    const [vectorY, setVetorY] = useState(true)
    const [vectorPlayer, setVetorPlayer] = useState(null)
    const [gameStart, setGameStart] = useState(false)
    const [gameEnd, setGameEnd] = useState(false)
    const [ballSpeed, setBallSpeed] = useState(0)
    const [canvas, setCanvas] = useState()
    const [ctx, setCtx] = useState()
    const [i, setI] = useState(2)
    const [score, setScore] = useState('00:00')

    const randomVectorGenerator = () => {
        const num = Math.random()
        if (num >= 0.5) {
            return true
        }
        if (num < 0.5) {
            return false
        }
    }

    const clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    const setBallPath = () => {
        // if canvas preventing to set ball when canvas in not loaded yet 
        if (canvas) {
            // i = 2 is preventing double refresh of restartgame to reseting ball coordinates 
            if (i === 2) {
                setBallX(() => {
                    const cw = canvas.width
                    let xOfball;
                    const randomNumber = Math.random()
                    xOfball = cw / 2 * randomNumber + cw / 4;
                    return xOfball
                }
                )

                setBallY(() => ((0.6 * canvas.height) * Math.random()) + canvas.height / 6)
                setVetorX(() => {
                    let v = randomVectorGenerator()
                    return v;
                })
                setVetorY(() => {
                    let v = randomVectorGenerator()
                    return v;
                })
            }
        }
    }

    const handleKeys = (e) => {
        // move player 
        switch (e.key) {
            case "S":
            case "s":
                setVetorPlayer(true)
                if (playerY < canvas.height - props.playerHeight) {
                    setplayerY(pre => pre + playerSpeed)
                }

                break;
            case "W":
            case "w":
                setVetorPlayer(false)
                if (playerY > 0) {
                    setplayerY(pre => pre - playerSpeed)
                }
                break;
            default:
                break;
        }
    }

    const animateball = () => {
        // ball out of bound 

        if (ballX < 0) {
            stopGame()
            setGameEnd(true)
            // restartGame(canvas)
            return
        }

        // bounce ball 
        if (ballX >= canvas.width - props.ballRaidus) {
            setBallSpeed(pre => pre * 1.01)
            setVetorX(() => false)
        }
        if (ballY >= canvas.height - props.ballRaidus) {
            setBallSpeed(pre => pre * 1.01)
            setVetorY(() => false)
        }
        if (ballY <= 0 + props.ballRaidus) {
            setBallSpeed(pre => pre * 1.01)
            setVetorY(() => true)
        }
        if (ballX - props.ballRaidus >= props.playerX + props.playerWidth - 1 && ballX - props.ballRaidus <= props.playerX + props.playerWidth) {
            if (ballY >= playerY && ballY < playerY + props.playerHeight) {
                setBallSpeed(pre => pre * 1.01)
                setVetorX(() => true)
            }
        }
        // move ball 
        if (!gameStart) return
        setBallX(() => {
            if (vectorX) return ballX + ballSpeed;
            if (!vectorX) return ballX - ballSpeed;
        })

        setBallY((pre) => {
            if (vectorY) return pre + ballSpeed;
            if (!vectorY) return pre - ballSpeed;
        })
    }

    const darwBall = () => {
        ctx.beginPath()
        ctx.arc(ballX, ballY, props.ballRaidus, 0, Math.PI * 2)
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "black"
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }

    const darwPlayer = () => {
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath()
        ctx.fillRect(props.playerX, playerY, props.playerWidth, props.playerHeight);
        ctx.fill()
    }

    const drawCanvas = () => {
        darwBall()
        darwPlayer()
    }
    const startGame = () => {
        setGameStart(true)
        setGameEnd(false)
        setI(2)
        setBallSpeed(0.2)
    }

    const stopGame = () => {
        setGameStart(false)
    }

    const restartGame = async () => {
        stopGame()
        setGameEnd(true)
        clearCanvas()
        setplayerY(canvas.height / 2 - props.playerHeight / 2)
        setBallPath()
        drawCanvas()
        // loop to re render restartGame for strict mode 
        if (i !== 0) {
            setI(pre => pre - 1)
        }
    }

    // setting canvas and ctx 
    useEffect(() => {
        setCanvas(() => c.current)
        setCtx(() => c.current.getContext("2d"))
    }, [])

    /* eslint-disable */

    // set ball coodinates for 1st game 
    useEffect(() => {
        setBallPath()
    }, [canvas])

    // refresh when restart 
    useEffect(() => {
        if (i === 1) {
            setI((pre) => pre - 1)
            restartGame()
        }
    }, [i])

    // animate 
    useEffect(() => {
        if (!gameStart) return

        clearCanvas()

        drawCanvas()

        animateball()
    }, [playerY, ballX, ballY, gameStart, vectorPlayer])
    return (
        <>
            <div className='flex flex-col m-auto p-48 justify-center align-middle items-center' style={{ background: "#212121" }}>
                {score}
                <div className='flex  justify-between w-2/5'>
                    <div className='flex w-1/5 justify-evenly align-middle'>
                        <ReactPopover
                            content={
                                <p>Pause</p>
                            }
                        >
                            <button onClick={stopGame} className='ho'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/aklfruoc.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                >
                                </lord-icon>
                            </button>
                        </ReactPopover>
                        <ReactPopover
                            content={
                                <p>Restart</p>
                            }
                        >
                            <button onClick={restartGame}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/rsbokaso.json"
                                    trigger="hover"
                                    colors="primary:#ffffff"
                                >
                                </lord-icon>
                            </button>
                        </ReactPopover>
                    </div>
                    <div> </div>
                    <Timer gameStart={gameStart} setScore={setScore} gameEnd={gameEnd} />
                </div>
                <canvas tabIndex="0" onClick={startGame} style={{ background: "#424242" }} onKeyDown={handleKeys} ref={c} height={props.canvasHeight} width={props.canvasWidth}> </canvas>
            </div>
        </>
    )
}
