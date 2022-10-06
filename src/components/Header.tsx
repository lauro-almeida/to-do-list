import logo from '../assets/logo.svg'

import styles from './Header.module.css'

export function Header() {
    return (
        <div className={styles.header}>
            <header>
                <img src={logo} alt="" />
            </header>
        </div>
    )
}