import { useParams } from 'react-router'

import logImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'



import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'



// import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'


import '../style/room.scss'

type RoomParams = {
  id: string,
}




export function AdminRoom() {
  // const { user } = useAuth()
  const params = useParams<RoomParams>()

  const roomId = params.id

  const { title, question } = useRoom(roomId)

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {question.length > 0 && <span>{question.length} pergunta(s)</span>}
        </div>


        <div className="question-list">
          {question.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            )
          })}
        </div>
      </main>
    </div>
  )

}