import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import JournalHome from "./pages/JournalHome";
import JournalEditor from "./pages/JournalEditor";
import JournalList from "./pages/JournalList";
import Todo from './components/Todo';
import GoalsBoard from './pages/GoalsBoard';
import GoalsCategory from "./pages/GoalsCategory";
import Quotes from "./pages/Quotes";
import Challenges from './pages/Challenges';
const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/journal" element={<JournalHome />} />
        <Route path="/journal/new" element={<JournalEditor />} />
        <Route path="/journal/list" element={<JournalList />} />
        <Route path="/journal/edit/:id" element={<JournalEditor />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/goals" element={<GoalsBoard />} />
        <Route path="/goals/:categoryKey" element={<GoalsCategory />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/challenges" element={<Challenges />} />
      </Routes>
  )
}

export default App
