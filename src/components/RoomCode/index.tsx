import copyImg from '../../assets/images/copy.svg';
import './style.scss'

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps){

  function copyRoomCodeToClipBoard(){
    navigator.clipboard.writeText(props.code)
  }

  return(
   <button className="room-code">
     <div>
       <img src={copyImg} alt="copy room code" onClick={copyRoomCodeToClipBoard}/>
     </div>

     <span>Sala #{props.code}</span>
   </button>
  )
}