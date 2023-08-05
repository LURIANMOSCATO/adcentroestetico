import React, {useState} from "react";
import styles from './Agenda.module.css'

export const Tooltip = ({text, children}) => {

    const [ isVisible, setIsVisible] = useState(false);

    return (
        <div 
        className={styles.tooltip_container}
        onMouseEnter={()=> setIsVisible(true)}
        onMouseLeave={()=> setIsVisible(false)}
        >
            {children}

            {isVisible && <p className={styles.tooltip}>{text}</p>}

        </div>
    )
}