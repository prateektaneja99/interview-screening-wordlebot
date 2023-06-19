import { useEffect, useState } from "react";

const Palette = ({ isLoading, onPaletteSelection }) => {
    const [selectedBoxes, setSelectedBoxes] = useState(Array(5).fill(null));

    const clickHandler = (rowIndex, colIndex) => {
        if (!isLoading) {
            const updatedBoxes = [...selectedBoxes];
            updatedBoxes[colIndex] = rowIndex;
            setSelectedBoxes(updatedBoxes);
        }
    };

    useEffect(() => {
        onPaletteSelection(selectedBoxes);
    }, [selectedBoxes, onPaletteSelection]);

    useEffect(() => {
        if (!isLoading) {
            setSelectedBoxes(Array(5).fill(null));
        }
    }, [isLoading]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "10px",
            }}
        >
            {[0, 1, 2].map((rowIndex) => (
                <div key={rowIndex} style={{ display: "flex" }}>
                    {[0, 1, 2, 3, 4].map((colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            style={{
                                width: "40px",
                                height: "40px",
                                border: "1px solid #000",
                                textAlign: "center",
                                fontSize: "18px",
                                lineHeight: "40px",
                                margin: "5px",
                                background:
                                    rowIndex === 0 ? "green" : rowIndex === 1 ? "yellow" : rowIndex ===2 ? "white" : null,
                                opacity: selectedBoxes[colIndex] === rowIndex ? 1 : 0.5,
                            }}
                            onClick={() => clickHandler(rowIndex, colIndex)}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Palette;
