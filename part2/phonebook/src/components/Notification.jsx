const Notification = ({ message }) => {

    const confirmationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }


    if (message === null) {
      return null
    }
  
    return (
      <div style={confirmationStyle}>
        {message}
      </div>
    )
  }

export default Notification