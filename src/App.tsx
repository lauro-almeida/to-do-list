import { ChangeEvent, FormEvent, useState } from 'react'

import { Header } from './components/Header'

import {PlusCircle} from 'phosphor-react'

import emptyListIcon from './assets/emptyList.svg'
import styles from './App.module.css'
import { Task } from './components/Task'

function App() {
  const [tasks, setTasks] = useState([
    {status: false, content: 'Terminar de escrever o TCC.'},
    {status: true, content: 'Desenvolver um projeto do tippo todo list para o portfólio.'},
  ])
  const [newTaskText, setNewTaskText] = useState('')

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value)  
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    setTasks([...tasks, {status: false, content: newTaskText}])
    setNewTaskText('')
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedeOne = tasks.filter(task => {
      return task.content !== taskToDelete
    })

    setTasks(tasksWithoutDeletedeOne)
  }

  function toogleTaskStatus(taskToChange: string) {
    const taskWithoutChangedOne = tasks.filter(task => {
      return task.content !== taskToChange
    })

    const [taskThatWillBeChanged] = tasks.filter(task => {
      return task.content === taskToChange
    })
    
    setTasks([...taskWithoutChangedOne, {status: !taskThatWillBeChanged.status, content: taskThatWillBeChanged.content}])
    
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.reduce((complete, task) => {
    if (task.status === true) {
      complete ++
    }
    return complete
  }, 0)
  const isNewTaskEmpty = newTaskText.length === 0
  const isTaskListEmpty = tasks.length === 0

  return (
    <div>  
        <Header />
        <div className={styles.wrapper}>
          <div className={styles.formWrapper}>
            <form onSubmit={handleCreateNewTask}>
              <div>
               <input 
                  type="text" 
                  placeholder='Adicione uma nova tarefa' 
                  value={newTaskText} 
                  onChange={handleNewTaskTextChange}
                />
              </div>
              <div>
                <button disabled={isNewTaskEmpty}>Criar <PlusCircle size={20} /></button>
              </div>
            </form>
          </div>
          <div className={styles.tasksListWrapper}>
            <div className={styles.tasksInfo}>
              <div>
                <p>Tarefas criadas</p> <span>{totalTasks}</span>
              </div>
              <div>
                <p>Concluídas</p> <span>{completedTasks}</span>
              </div>
            </div>
            { isTaskListEmpty 
                ?
                  <div className={styles.taskList}>
                    <img src={emptyListIcon} alt="" />
                    <p>Você ainda não tem tarefas cadastradas </p>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                  </div> 
                :
                  tasks
                    .sort((a, b) => {
                      if (a.status < b.status) {
                        return -1
                      }
                      if (a.status > b.status) {
                        return 1
                      }
                      return 0
                    })
                    .map(task => {
                      return (
                        <Task
                          key={task.content}
                          checked={task.status} 
                          content={task.content}
                          onDeleteTask={deleteTask}
                          onToogleTaskStatus={toogleTaskStatus}
                        />
                      )
                    })
              } 
          </div>
        </div>
    </div>
  )
}

export default App
