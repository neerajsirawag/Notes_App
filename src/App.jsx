import React, { useEffect, useState } from 'react'
import './index.css'

const App = () => {

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')

  // Load Notes if present
  const [task, setTask] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  // Save notes on every update 
  
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(task));
  }, [task]);


  return (
    <div className='min-h-screen h-fit bg-[#01161e] text-white '>
    
      <h1 className='flex items-center justify-center text-6xl pt-5 font-bold text-shadow-[4px_4px_5px_#6c757d]'>Your Notes</h1>

      <div className='flex flex-col lg:flex-row gap-10 flex-wrap p-10'>

        <form onSubmit={(e)=>{
          e.preventDefault();
          
          //prevent adding empty notes
          if (!title.trim() && !note.trim()) return;

          setTask(prev => [...prev, { title, note }]);

          setTitle('');
          setNote('');
        }}
          className='flex flex-col gap-5 w-full lg:w-[48%]'>

            <h1 className='text-4xl mb-2 font-bold text-shadow-[3px_3px_5px_#6c757d]'>Add Notes</h1>

            <input 
              type="text"
              className='py-2 px-5 w-full border-2 rounded-xl font-medium  outline-white'
              value={title} 
              onChange={(e)=>{
                setTitle(e.target.value)
              }}
              placeholder='Title' 
            />

            <textarea 
              type="text" 
              className=' h-30 py-2 px-5 w-full border-2 rounded-xl font-medium outline-white'
              placeholder='Enter Note' 
              value={note}
              onChange={(e)=>{
                setNote(e.target.value)
              }}
            />

            <button 
              className='w-full bg-white text-black px-5 py-2 rounded-xl transition-all duration-150 active:scale-97 active:bg-gray-800'
              type="submit"
              >
              Add
            </button>

        </form>

        <div className='lg:w-[48%] '>

          <h1 className='text-4xl font-bold mb-4 text-shadow-[3px_3px_5px_#6c757d]'>Recent Notes</h1>

          <div className='flex gap-5 flex-wrap overflow-auto scrollbar-hide'>

              {task.map(function(elem,idx){
                return <div key={idx}
                  className="flex flex-col items-start h-fit lg:min-w-[31%] min-w-fit rounded-xl text-black px-4 pb-2 bg-amber-100">

                    <div className='py-5'>

                      <h3 className='leading-tight text-lg font-bold break-all'>{elem.title}</h3>

                      <p className='mt-2 leading-tight text-xs font-semibold text-gray-600'>{elem.note}</p>

                    </div>

                    <button onClick={()=>{
                        const copyTask =[...task]
                        copyTask.splice(idx,1)
                        setTask(copyTask)
                      }}  

                      className='bg-red-700 w-full font-semibold text-[15px] px-2 py-1 rounded-lg active:scale-97 text-white'
                      >
                      Delete
                    </button>

                </div>

              })}

          </div>

        </div>
      </div>
    </div>
  )
}

export default App