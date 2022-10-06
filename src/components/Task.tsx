import { Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
    content: string;
    checked: boolean;
    onDeleteTask: (task: string) => void;
    onToogleTaskStatus: (task: string) => void;
}

export function Task({ content, checked, onDeleteTask, onToogleTaskStatus }: TaskProps) {

    function handleDeleteTask() {
        onDeleteTask(content)
        console.log(content)
    }

    function handleInputChange() {
        onToogleTaskStatus(content)
    }

    const labelClass = checked ? styles.labelChecked : styles.labelNotChecked

    return(
        <div className={styles.taskContainer}>
            <label className={labelClass}>
                {content}
                <input type="checkbox" checked={checked} onChange={handleInputChange}/>
                <span className={styles.checkmark}></span>
            </label>
            <button className={styles.deleteTask} onClick={handleDeleteTask}>
                <Trash size={20}/>
            </button>
        </div>
    )
}