import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {FormEvent, useState} from 'react'

import {database} from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../style/auth.scss'
import { Button } from '../components/Button'


export function Home() {
    const history = useHistory()
    const { user, singInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom() {
        if (!user) {
            await singInWithGoogle()
        }
        history.push("/rooms/new")
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if (roomCode.trim() === ''){
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if (!roomRef.exists()){
            alert("Room does not exists")
            return
        }

        if(roomRef.val().endedAt){
            alert("Room already closed")
            return
        }

        history.push(`/rooms/${roomCode}`)

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"></img>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas da sua audiência em tempo-real</p>
            </aside>

            <main>

                <div className="main-content">
                    <div>
                        <img src={logImg} alt="Letmeask" />
                    </div>
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input type="text" placeholder="Digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)} value={roomCode}/>
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>

                </div>
            </main>
        </div>
    )
}