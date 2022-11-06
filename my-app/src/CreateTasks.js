import { useEffect, useState } from 'react' 

const CreateTasks = ({ createTask }) => {

  const [text, setText] = useState('')

  return ( 
    <>
      <h4>Create Task:</h4>
      <form onSubmit={ (e) => { e.preventDefault(); setText( '' ); createTask(text) } }>
        <input type='text' onChange={ (e) => { setText( e.target.value )}}></input>
        <input type="submit" />
      </form> <br/>
    </>
  )

}

export default CreateTasks