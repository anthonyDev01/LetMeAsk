import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type FirebaseQuestion = Record<string, {
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isHighlighted: boolean,
  isAnswered: boolean,
  likes: Record<string, {
    authorId: string;
  }>
}>

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  }

  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount: number
  likeId: string | undefined
}

export function useRoom(roomId: string) {
  const { user } = useAuth()
  const [questions, setQuestion] = useState<QuestionType[]>([])
  const [title, setTitle] = useState()

  useEffect(() => {

    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestion = databaseRoom.questions as FirebaseQuestion ?? {}

      const parsedQuestion = Object.entries(firebaseQuestion).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      })
      setTitle(databaseRoom.title)
      setQuestion(parsedQuestion)

    })

    return () => {
      roomRef.off('value')
    }
    
  }, [roomId, user?.id])

  return { questions, title }
}