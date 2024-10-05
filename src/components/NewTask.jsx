import React, { useState } from 'react'

const NewTask = ({onAdd}) => {
const [enteredTask,setEnteredTask]=useState('');

function handleChange(e){
setEnteredTask(e.target.value)
}

function handleClick(){
    if(enteredTask .trim() === ''){
        return
    }
    onAdd(enteredTask)
setEnteredTask('');

}

  return (
    <div className='flex items-center gap-4'>
        <input type='text' 
        onChange={handleChange}
        value={enteredTask}
        className='w-64 px-2 py-2 rounded-sm bg-stone-200'/>
        <button 
        onClick={handleClick}
        className='text-stone-700 hover:text-stone-950'>Add task</button>
      
    </div>
  )
}

export default NewTask
