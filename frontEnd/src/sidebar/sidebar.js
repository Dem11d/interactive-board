import styles from './Sidebar.module.css'

export default function Sidebar({drawers=[{id: 1, name: "first"}, {name: 'second'}], onDrawerClick}) {
  return (
      <ul className={styles.list}>
        {drawers.map(drawer => <li><button className={styles.drawerButton} onClick={() => onDrawerClick(drawer.id)} > {drawer.name}</button></li>)}
      </ul>
  );
}