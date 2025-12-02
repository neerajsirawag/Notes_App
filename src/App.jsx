import React, { useEffect, useState } from 'react'
import './index.css'

const FONT_CLASSES = {
  comfortaa: 'font-comfortaa',
  poppins: 'font-poppins',
  aladin: 'font-aladin',
  inter: 'font-inter',
  montserrat: 'font-montserrat',
  roboto: 'font-roboto',
  ubuntu:'font-ubuntu'
};

const App = () => {

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')

  const [task, setTask] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  // SAVE NOTE 
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(task));
  }, [task]);

  // THEME STATE
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  // FONT STATE
  const [font, setFont] = useState(() => {
    const saved = localStorage.getItem('font');
    return saved || 'comfortaa';
  });

  // APPLY THEME
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // APPLY FONT
  useEffect(() => {
    const body = document.body;
    Object.values(FONT_CLASSES).forEach(c => body.classList.remove(c));
    body.classList.add(FONT_CLASSES[font]);
    localStorage.setItem('font', font);
  }, [font]);
  
  return (
    <div className='min-h-screen w-screen flex flex-col bg-white text-black dark:bg-[#001213f9] dark:text-white font-comfortaas scrollbar-hide'>
    
      {/* HEADER */}
      <header className="flex items-center justify-between py-5 lg:px-10 px-4 mx-auto w-full">

        <div>
          <h1 className="text-4xl font-bold">Notes</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Fast & clean note-taking</p>
        </div>

        <div className="flex items-center gap-3">

          {/* Font Selector */}
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="py-1 px-2 rounded bg-white dark:bg-black border-none border-gray-300 dark:border-gray-700 text-black dark:text-white"
          >
            <option value="comfortaa">Comfortaa</option>
            <option value="poppins">Poppins</option>
            <option value="aladin">Aladin</option>
            <option value="inter">Inter</option>
            <option value="montserrat">Montserrat</option>
            <option value="roboto">Roboto</option>
            <option value="ubuntu">Ubuntu</option>
          </select>

          {/* Theme Toggle */}
          {/* <button
            onClick={() => setDarkMode(prev => !prev)}
            className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-white/10 text-black dark:text-white shadow active:scale-95"
          >
            {darkMode ? "Light" : "Dark"}
          </button> */}

        </div>
      </header>

      {/* MAIN */}

      <main className="flex flex-1 flex-col lg:flex-row gap-8 lg:px-10 px-5">

        <form onSubmit={(e)=>{
          e.preventDefault();
          
          //prevent adding empty notes
          if (!title.trim() && !note.trim()) return;

          setTask(prev => [...prev, { title: title.trim(), note: note.trim(), created: Date.now() }]);

          setTitle('');
          setNote('');
        }}
          className='w-full lg:w-1/2 flex flex-col gap-5'>

             <h2 className="text-2xl font-semibold">Add Note</h2>

            <input 
              type="text"
              className='py-2 px-4 border rounded-xl bg-white text-black border-gray-300 dark:bg-black/20 dark:text-white dark:border-gray-600 focus:shadow-[0_0_5px_#fff]'
              value={title} 
              onChange={(e)=>{
                setTitle(e.target.value)
              }}
              placeholder='Title' 
            />

            <textarea 
              type="text" 
              className="h-36 py-2 px-4 border rounded-xl bg-white text-black border-gray-300 dark:bg-black/20 dark:text-white dark:border-gray-600 resize-none focus:shadow-[0_0_5px_#ffff]"
              placeholder='Enter Note' 
              value={note}
              onChange={(e)=>{
                setNote(e.target.value)
              }}
            />

            <div className="flex gap-3 font-bold text-[16px]">
              <button
                type="submit"
                className=" bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg hover:shadow-[0_0_5px_#fff] transition active:scale-95 w-2/3"
              >
                Add
              </button>

              <button
                type="button"
                onClick={() => { setTitle(''); setNote(''); }}
                className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg hover:shadow-[0_0_5px_#e5e7eb] transition active:scale-95 w-1/3"
              >
                Clear
              </button>

            </div>

        </form>
        
        {/* NOTES */}
        <section className="w-full lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-3">Recent Notes</h2>

            {task.length === 0 ? (
              <div className="p-6 rounded-lg bg-gray-200 dark:bg-black/50">
                <p className="text-gray-600 dark:text-gray-300">No notes yet — add one to get started ✏️</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {task.map((t, idx) => (
                  <article
                    key={idx}
                    className="p-4 rounded-xl bg-gray-100 dark:bg-white/5 text-black dark:text-white shadow"
                  >
                    <h3 className="font-semibold text-lg break-all">{t.title || 'Untitled'}</h3>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 break-all">{t.note}</p>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={()=>{
                        const copyTask =[...task]
                        copyTask.splice(idx,1)
                        setTask(copyTask)
                      }}
                        className="bg-red-800 text-white px-3 py-1 rounded-lg hover:shadow-[0_0_10px_#9f0712] active:scale-95 text-sm"
                      >
                        Delete
                      </button>

                      <span className="text-xs text-gray-400 dark:text-gray-300 ml-auto pt-3">
                        {new Date(t.created).toLocaleString()}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

      </main>


      <footer className="w-full py-4 mt-10 text-center dark:text-gray-200 border-t border-gray-700">
        <p className="">
          Created with ❤️ by{" "}
          <a 
            href="https://github.com/neerajsirawag" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-500 hover:underline"
          >
            Neeraj Sirawag
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App