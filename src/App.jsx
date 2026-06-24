import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Permission from "./pages/Permission";
import Dashboard from "./pages/Dashboard";
import EmergencyPage from "./pages/Emergency";
import Profile from "./pages/Profile";
import TermsOfService from "./pages/terms";
import Transcribe from "./pages/TranscribeMe";
import Translate from "./pages/TranslateMe";
import Dictionary from "./pages/Dictionary";
import DictionarySearch from "./pages/DictionarySearch";
import DictionaryCategory from "./pages/DictionaryCategory";
import DictionaryDetail from "./pages/DictionaryDetail";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route 
          path="/register" 
          element={<Register />} 
        />

        <Route 
          path="/dashboard" 
          element={<Dashboard />} 
        />

        <Route 
          path="/emergency" 
          element={<EmergencyPage />} 
        />

        <Route 
          path="/permission" 
          element={<Permission />} 
        />

        <Route 
          path="/profile" 
          element={<Profile />} 
        />
        {/* TERMS */}
        <Route path="/terms" element={<TermsOfService />} />

        <Route path="/transcribe" element={<Transcribe />} />
        <Route path="/translate" element={<Translate />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/dictionary/search" element={<DictionarySearch />} />
        <Route path="/dictionary/category/:categoryId" element={<DictionaryCategory />} />
        <Route path="/dictionary/word/:wordId" element={<DictionaryDetail />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
