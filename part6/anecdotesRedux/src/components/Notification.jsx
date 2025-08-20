import { useSelector } from "react-redux"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notifications = useSelector(state => state.notifications)

  if(notifications.length === 0) return
  return (
    <div style={style}>
      {notifications.map(x => <div key={x.id}>{x.msg}</div>)}
    </div>
  )
}

export default Notification