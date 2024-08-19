import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import Matter from 'matter-js';
import { Box, Button, Typography } from '@mui/material';
import './Plinkoboard.css'; // Import the CSS file
import { useTheme } from '@mui/system';

const PlinkoBoard = forwardRef((props, ref) => {
    const sceneRef = useRef(null);
    const theme = useTheme();
    const engineRef = useRef(Matter.Engine.create());
    const [isRunning, setIsRunning] = useState(false);
    const ballRef = useRef(null);
    const boxesRef = useRef([]);
    const pegsRef = useRef([]);
    const boxPositionsRef = useRef([]);

    useEffect(() => {
        const { Engine, Render, Runner, Bodies, Composite, MouseConstraint, Mouse, Events, World } = Matter;

        const engine = engineRef.current;
        const render = Render.create({
            element: sceneRef.current,
            engine,
            options: {
                width: 800,
                height: 650,
                wireframes: false,
                background: theme.palette.card.main
            }
        });

        const createPegs = () => {
            const rows = 12;
            const pegRadius = 4;
            const pegOffsetY = 45;
            const startX = 400;
            const startY = 50;

            const pegs = [];

            for (let row = 0; row < rows; row += 1) {
                const cols = row + 3;
                for (let col = 0; col < cols; col += 1) {
                    const x = startX + (col - (cols - 1) / 2) * 40;
                    const y = startY + row * pegOffsetY;
                    const peg = Bodies.circle(x, y, pegRadius, { isStatic: true, render: { fillStyle: '#FFFFFF' } });
                    pegs.push(peg);
                }
            }

            Composite.add(engine.world, pegs);
            pegsRef.current = pegs;
            return pegs;
        };

        const createBoxes = (pegs) => {
            const lastRowPegs = pegs.slice(-14); // Last row has 14 pegs (11 + 3), taking into account first 3 rows
            const boxes = [];
            const boxPositions = [];
            const boxWidth = 30;
            const boxHeight = 30;
            const colors = [
                '#ef362e',
                '#ef362e',
                '#f16d1c',
                '#f16d1c',
                '#eaa11c',
                '#eaa11c',
                '#eaa11c',
                '#eaa11c',
                '#eaa11c',
                '#f16d1c',
                '#f16d1c',
                '#ef362e',
                '#ef362e'
            ];
            const labels = ['170x', '24x', '8.1x', '2x', '0.7x', '0.2x', '0.2x', '0.2x', '0.7x', '2x', '8.1x', '24x', '170x'];

            for (let i = 0; i < lastRowPegs.length - 1; i += 1) {
                const pegA = lastRowPegs[i];
                const pegB = lastRowPegs[i + 1];
                const x = (pegA.position.x + pegB.position.x) / 2;
                const y = 580; // Adjust this value to move the boxes higher
                const box = Bodies.rectangle(x, y, boxWidth, boxHeight, {
                    isStatic: true,
                    render: { fillStyle: colors[i % colors.length] }
                });
                boxes.push(box);
                boxPositions.push({ x, y, label: labels[i % labels.length] });
            }

            boxesRef.current = boxes;
            boxPositionsRef.current = boxPositions;
            Composite.add(engine.world, boxes);
        };

        const animateBox = (box) => {
            const originalPosition = { ...box.position };

            // Move the box slightly down
            Matter.Body.setPosition(box, { x: box.position.x, y: box.position.y + 5 });

            // After a short delay, move the box back to its original position
            setTimeout(() => {
                Matter.Body.setPosition(box, originalPosition);
            }, 100);
        };

        const animatePeg = (peg) => {
            const pegElement = document.querySelector(`[data-peg-id="${peg.id}"]`);
            if (pegElement) {
                pegElement.classList.add('peg-animation');
                setTimeout(() => {
                    pegElement.classList.remove('peg-animation');
                }, 300); // Duration of the animation in milliseconds
            }
        };

        const pegs = createPegs();
        createBoxes(pegs);

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // Add event to detect ball position
        Events.on(engine, 'beforeUpdate', () => {
            if (ballRef.current && ballRef.current.position.y > 555) {
                World.remove(engine.world, ballRef.current);
                ballRef.current = null;
                setIsRunning(false);
            }
        });

        // Add event to detect collision with boxes
        Events.on(engine, 'collisionStart', (event) => {
            event.pairs.forEach((pair) => {
                if (boxesRef.current.includes(pair.bodyA) || boxesRef.current.includes(pair.bodyB)) {
                    const box = boxesRef.current.includes(pair.bodyA) ? pair.bodyA : pair.bodyB;
                    animateBox(box);
                }
                if (pegsRef.current.includes(pair.bodyA) || pegsRef.current.includes(pair.bodyB)) {
                    const peg = pegsRef.current.includes(pair.bodyA) ? pair.bodyA : pair.bodyB;
                    animatePeg(peg);
                }
            });
        });

        return () => {
            Render.stop(render);
            Composite.clear(engine.world);
            Engine.clear(engine);
            Runner.stop(runner);
        };
    }, []);

    const createBall = () => {
        const { Bodies, Composite } = Matter;
        const engine = engineRef.current;

        // Generate a random x-coordinate between 398.0 and 402.0, but not exactly 400
        let randomX = 398 + Math.random() * 4;
        if (randomX === 400) {
            randomX = 398 + (Math.random() < 0.5 ? -0.1 : 0.1);
        }

        const ball = Bodies.circle(randomX, 30, 10, {
            restitution: 0.5,
            render: { fillStyle: '#e74c3c' }
        });
        Composite.add(engine.world, ball);
        ballRef.current = ball;
    };

    const handleDropBall = () => {
        createBall();
        setIsRunning(true);
    };

    useImperativeHandle(ref, () => ({
        handleDropBall // Expose the handleDropBall function
    }));

    return (
        <Box sx={{ textAlign: 'center', marginTop: 2, position: 'relative' }}>
            <div ref={sceneRef} style={{ position: 'relative' }}>
                {boxPositionsRef.current.map((box, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: box.x - 15, // Center the text within the box
                            top: box.y - 10, // Adjust to be inside the box
                            width: '30px',
                            height: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            pointerEvents: 'none',
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 12
                        }}
                    >
                        {box.label}
                    </div>
                ))}
                {pegsRef.current.map((peg, index) => (
                    <div
                        key={index}
                        data-peg-id={peg.id}
                        className="peg"
                        style={{
                            position: 'absolute',
                            left: `${peg.position.x - 4}px`,
                            top: `${peg.position.y - 4}px`,
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#FFFFFF'
                        }}
                    />
                ))}
            </div>
        </Box>
    );
});

export default PlinkoBoard;
