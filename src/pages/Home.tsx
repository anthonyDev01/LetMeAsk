import {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {auth, firebase} from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../style/auth.scss'
import { Button } from '../components/Button'
import {TestContext} from '../App'

export function Home() {
    const history = useHistory()
    const value = useContext(TestContext)

    function handleCreateRoom(){
        const provider = new firebase.auth.GoogleAuthProvider()

        auth.signInWithPopup(provider)
        .then(result =>{
            console.log(result);
            history.push("/rooms/new")
            
        })
        

        
    }

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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form>
                        <input type="text" placeholder="Digite o código da sala" />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>

                </div>
            </main>
        </div>
    )
}