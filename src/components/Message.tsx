import styles from './Message.module.css'

function Message({message}: {message: string}) {
  return (
    <p className={styles.messsage}>
        <span role='img'>💥</span>
        {message}
    </p>
  )
}

export default Message