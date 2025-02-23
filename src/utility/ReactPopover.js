import { useEffect, useRef, useState } from "react";

function ReactPopover({
    children,
    content,
    trigger = "hover"
}) {
    const [show, setShow] = useState(false);
    const wrapperRef = useRef(null);

    const handleMouseOver = () => {
        if (trigger === "hover") {
            setShow(true);
        };
    };

    const handleMouseLeft = () => {
        if (trigger === "hover") {
            setShow(false);
        };
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShow(false);
            }
        }

        if (show) {
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [show, wrapperRef]);

    return (
        <div
            ref={wrapperRef}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeft}
            className="w-fit h-fit relative flex justify-center">
            <div
                onClick={() => setShow(!show)}
            >
                {children}
            </div>
            <div
                hidden={!show}
                className="min-w-fit h-fit absolute bottom-[100%] z-50 transition-all">
                <div className="rounded text-white p-1 shadow-[10px_30px_150px_rgba(46,38,92,0.25)] mb-[8px]">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default ReactPopover;