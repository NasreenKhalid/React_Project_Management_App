import { useState } from "react";
import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectedId: undefined,
    projects: [],
    tasks:[]
  });

  function handleStartAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectedId: null,

      }
    })
  }


  function handleAddTask(text){
    setProjectsState(prevState => {
      const newTask = {
        text:text,
        projectId:prevState.selectedProjectedId,
        taskId: Math.random()
      }
      return {
        ...prevState,
        selectedProjectedId:undefined,
        tasks: [newTask,...prevState.tasks ]
      }
    })
  }

  function handleDeleteTask(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectedId: undefined,
        tasks:prevState.tasks.filter((task)=>task.id !== id)
  
      }
    })
  }

  function handleAddProject(projectData){
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      }
      return {
        ...prevState,
        selectedProjectedId:undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

function handleDeleteProject(){
  setProjectsState(prevState => {
    return {
      ...prevState,
      selectedProjectedId: undefined,
      projects:prevState.projects.filter((project)=>project.id !== prevState.selectedProjectedId)

    }
  })
}



// console.log(projectsState)

const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectedId)

  let content = <SelectedProject project={selectedProject}
  onDelete={handleDeleteProject}
  onAddTask={handleAddTask}
  onDeleteTask={handleDeleteTask}
  tasks={projectsState.tasks}
  />;

  if(projectsState.selectedProjectedId === null) {
    content = <NewProject onAdd={handleAddProject}
    onCancel={handleCancelAddProject}
    /> 
  } else if(projectsState.selectedProjectedId === undefined) {
    content =   <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  
function handleCancelAddProject(){
  setProjectsState(prevState => {

    return {
      ...prevState,
      selectedProjectedId:undefined,
    
    }
  })
}

function handleSelectProject(id){
  setProjectsState(prevState => {

    return {
      ...prevState,
      selectedProjectedId:id,
    
    }
  })
}

  return (
    <main className="h-screen my-8 flex gap-7">
      <ProjectsSidebar onStartAddProject={handleStartAddProject}
      projects={projectsState.projects}
      onSelectProject={handleSelectProject}
      />
      {content}
      
    </main>
  );
}

export default App;
