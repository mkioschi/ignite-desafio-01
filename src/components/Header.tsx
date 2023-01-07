import styles from './Header.module.css'

import logo from '../assets/logo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <figure className={styles.logo}>
        <img src={logo} alt="Logo ToDo List" />
      </figure>
    </header>
  );
}