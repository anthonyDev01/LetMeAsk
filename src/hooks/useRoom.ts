import { useEffect, useState } from "react"
import { database } from "../services/firebase"

type FirebaseQuestion = Record<string, {
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isHighlighted: boolean,
  isAnswered: boolean,
}>


type QuestionType = {
  id: string,
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isHighlighted: boolean,
  isAnswered: boolean,
}

export function useRoom(roomId: string){
  const [question, setQuestion] = useState<QuestionType[]>([])
  const [title, setTitle] = useState()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestion = databaseRoom.question as FirebaseQuestion ?? {}

      const parsedQuestion = Object.entries(firebaseQuestion).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      })
      setTitle(databaseRoom.title)
      setQuestion(parsedQuestion)
    })
  }, [roomId])

  return {question, title}
}