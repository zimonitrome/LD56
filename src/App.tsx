import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import Villain from './components/Villain';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <Villain />
      </header>
    </div>
  );
};

export default App;
