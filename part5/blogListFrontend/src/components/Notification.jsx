const Notification = ({className, message}) => {
    const errorStyle = {
        width: "fit-content",
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: "lightgrey",
        border: "2px solid red",
        borderRadius: "8px",
        color: "red"
    }

    const successStyle = {
        width: "fit-content",
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: "lightgrey",
        border: "4px solid green",
        borderRadius: "8px",
        color: "green"
    }


    const messageStyle = {
        margin: "0 auto",
        fontSize: "24px",
        fontWeight: "bold"
    }

    if(message === null){
        return null;
    }
    return(
        <div className={className} style={className === 'error' ? errorStyle : successStyle}>
            <p style={messageStyle}>{message}</p>
        </div>
    )
}

export default Notification