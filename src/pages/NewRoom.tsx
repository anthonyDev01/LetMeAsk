import { Link } from 'react-router-dom'
import { useContext } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logImg from '../assets/images/logo.svg'

import '../style/auth.scss'
import { Button } from '../components/Button'

import { TestContext } from '../App'

export function NewRoom() {
    const value = useContext(TestContext)

return (
    <div id="page-auth">
        <aside>
            <h1>{value}</h1>
            <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"></img>
            <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as duvidas da sua audiência em tempo-real</p>
        </aside>

        <main>
            <div className="main-content">
                <div>
                    <img src={logImg} alt="Letmeask" />
                </div>

                <h2>Crie uma nova sala</h2>
                <form>
                    <input type="text" placeholder="Nome da sala" />
                    <Button type="submit">
                        Criar sala
                    </Button>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>

                </form>

            </div>
        </main>
    </div>
)
}