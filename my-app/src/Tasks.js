import { useEffect, useState } from "react"


const Tasks = ({ task, completeTask }) => {

  return ( 
    <>
      <div>
        <h4>Current Tasks:</h4> <br/>
        <h5>On-going:</h5>
        <div>
        { task.map((e) => {if(!e.completed) { return (<><div key={ e.id }> <label><input 
                type='checkbox' 
                name={ e.id } 
                checked={ e.completed }
                onChange={ () => { completeTask(e.id) }} />
                {e.content}
          </label></div></>)}}) }
        </div>
        <h5>Completed:</h5>
        <div>
        { task.map((e) => {if(e.completed) { return (<><div key={ e.id }> <label><input 
                type='checkbox' 
                name={ e.id } 
                checked={ e.completed } 
                onChange={ () => { return false }}/>
                {e.content}
          </label></div></>)}}) }
        </div>
      </div>
    </>
  )

}

export default Tasks