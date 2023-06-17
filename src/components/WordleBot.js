import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { fetchWordleResult } from "../api/api";
import Palette from "./Palette";
import "./WordleBot.css";

const WordleBot = () => {
    const [currentChance, setCurrentChance] = useState(0);
    const [guessWord, setGuessWord] = useState("SERAI");
    const [clueCode, setClueCode] = useState("");
    const [apiResult, setApiResult] = useState({ guess: "SERAI" });
    const [cardData, setCardData] = useState([]);

    const clueInputHandler = (event) => {
        setClueCode(event.target.value);
    };


    const cardDataHandler = () => {
      console.log(clueCode,"hi");
        const request = [
            {
                word: guessWord,
                clue: clueCode,
            },
        ];
        

        fetchWordleResult(request)
            .then((response) => {
                setApiResult(response);
                setCardData((prevData) => [
                    ...prevData,
                    {
                        guess: apiResult.guess.toLocaleUpperCase(),
                        clue: clueCode,
                        chanceNumber: currentChance,
                    },
                ]);
                setClueCode("");
                setCurrentChance((prevData) => prevData + 1);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handlePaletteSelection = (code) => {
      setClueCode(code);
    };

    // Sort cardData array based on chanceNumber
    const sortedCardData = cardData.sort((a, b) => a.chanceNumber - b.chanceNumber);

    return (
        <div>
            {/* Render initial card with default values */}

            {/* Render additional cards for API responses */}
            {sortedCardData.map((card, index) => (
                <Card key={index}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Guess #{card.chanceNumber + 1}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Word to Guess:
                            <input type="text" value={card.guess} readOnly />
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            What response did you get back?
                        </Typography>
                        <input type="text" value={card.clue} readOnly />
                    </CardContent>
                </Card>
            ))}
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Guess #{currentChance + 1}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Word to Guess:
                        <input type="text" value={apiResult.guess.toLocaleUpperCase()} readOnly />
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        What response did you get back?
                    </Typography>
                    <input type="text" value={clueCode} onChange={clueInputHandler} />
                    <Palette onPaletteSelection={handlePaletteSelection} />
                </CardContent>
            </Card>

            <Button onClick={cardDataHandler}>Submit</Button>
        </div>
    );
};

export default WordleBot;


