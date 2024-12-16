import React from 'react'
import './App.scss'
import RootRouter from "./router/RootRouter.jsx";
import Container from "./components/atoms/Container/Container.jsx";

function App() {
    return (
        <>
            <Container>
                <RootRouter/>
            </Container>

        </>
    )
}

export default App
