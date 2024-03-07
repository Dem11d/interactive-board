import styles from './Sidebar.module.css'

export default function Sidebar({drawers=[{name: "first"}, {name: 'second'}]}) {
  return (
      <ul className={styles.list}>
        {drawers.map(drawer => <li><button className={styles.drawerButton} onClick={console.log(drawer.id)} > {drawer.name}</button></li>)}
      </ul>
  );
}