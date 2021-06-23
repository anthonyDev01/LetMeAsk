import { Link } from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'

import { FormEvent, useState } from 'react'

import { database } from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logImg from '../assets/images/logo.svg'

import '../style/auth.scss'
import { Button } from '../components/Button'

export function NewRoom() {
    const { user } = useAuth()

    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if (newRoom.trim() === '') {
            return
        }

        const romRef = database.ref('rooms')

        const firebaseRoom = await romRef.push({
            title: newRoom,
            authorId: user?.id,
        })

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
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text" placeholder="Nome da sala" onChange={event => { setNewRoom(event.target.value) }} value={newRoom} />
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