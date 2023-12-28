import styles from './Button.module.css'
type props = {  
    children: React.ReactNode,
    onClick: (...params:any) => void,
    type: 'primary' | 'back' 
}

function Button({children,onClick, type}:props) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button