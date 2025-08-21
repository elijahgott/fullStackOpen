import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type){
        case 'SET':
            return action.message
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const useNotifications = () => {
    const contextAndDispatch = useContext(NotificationContext)
    return contextAndDispatch[0]
}

export const useNotificationsDispatch = () => {
    const contextAndDispatch = useContext(NotificationContext)
    return contextAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
    const [notifications, notificationsDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notifications, notificationsDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext