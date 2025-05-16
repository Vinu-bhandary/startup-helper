
// import React, { useState } from 'react';
// import AppSidebar from '@/components/AppSidebar';
// import IdeaInput from '@/components/IdeaInput';
// import { Input } from '@/components/ui/input';
// import { FileText, Gauge, LogOut, SendHorizontal, User } from 'lucide-react';

// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { validateIdea, analyzeRisks, planGuidance } from '../services/api';




// const Index = () => {

//   const navigate = useNavigate();
//     const [idea, setIdea] = useState('');
//     const [activeMode, setActiveMode] = useState<string | null>("validator");
//     const [showUserMenu, setShowUserMenu] = useState(false);
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     const userId = storedUser.id;
//         if (!storedUser) {
//           alert('User not logged in.');
//           navigate('/login'); // Redirect to login if user is not logged in
//         }
//     const handleSubmit = (e: React.FormEvent) => {
//       console.log('Hello');
//       const replyArea = document.getElementById('welcome');
//       e.preventDefault();
//       if (idea.trim()) {
//         const mode = localStorage.getItem('activeMode');
//         if (mode === 'validator') {
//           validateIdea(userId, idea)
//             .then((response) => {
//               console.log(response);
//               replyArea.innerHTML = response.reply;
//             })
//             .catch((error) => {
//               toast.error(`Error: ${error.message}`);
//             });
//         } else if (mode === 'risk') {
//           analyzeRisks(userId, idea)
//             .then((response) => {
//               replyArea.innerHTML = response.reply;
//             })
//             .catch((error) => {
//               toast.error(`Error: ${error.message}`);
//             });
//         } else if (mode === 'planner') {
//           planGuidance(userId, idea)
//             .then((response) => {
//               replyArea.innerHTML = response.reply;
//             })
//             .catch((error) => {
//               toast.error(`Error: ${error.message}`);
//             });
//         }
//         toast.success("Idea submitted successfully!");
//         setIdea('');
//       }
//     };
//   const handleModeClick = (mode: string) => {
//     localStorage.setItem('activeMode', mode);
//     setActiveMode(mode);
//     toast.info(`Switched to ${mode} mode`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     setShowUserMenu(false);
//     navigate('/login');
//     toast.info("Logged out successfully");
//   };
//   return (
//     <div className="flex h-screen w-full overflow-hidden font-orbitron">
//       <AppSidebar />
//       <main className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-udbhava-dark-purple to-udbhava-darker-purple">
//         <div className="max-w-3xl w-full flex flex-col items-center space-y-12 animate-fade-in">
//           <div className="text-center space-y-3" id="welcome">
//             <h1 className="text-5xl font-bold tracking-wider text-white animate-pulse-slow">
//               WELCOME TO UDBHAVA
//             </h1>
//             <p className="text-xl text-white/80 tracking-widest">
//               WHERE IDEAS EARN THEIR WINGS
//             </p>
//           </div>
          
//           <form 
//             onSubmit={handleSubmit} 
//             className="w-full max-w-2xl relative glass-morphism"
//           >
//             <Input
//               type="text"
//               value={idea}
//               onChange={(e) => setIdea(e.target.value)}
//               placeholder="Enter your idea here"
//               className="w-full px-4 py-3 bg-transparent text-white border-none outline-none rounded-md"
//             />
//             <Button
//               type="submit"
//               size="icon"
//               className="absolute right-2 top-1/2 -translate-y-1/2 bg-udbhava-purple text-white hover:bg-udbhava-purple/90 rounded-md"
//               disabled={!idea.trim()}
//             >
//               <SendHorizontal size={18} />
//             </Button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Index;




import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AppSidebar from '@/components/AppSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { validateIdea, analyzeRisks, planGuidance } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { SendHorizontal } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [idea, setIdea] = useState('');
  const [botReply, setBotReply] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<string>(
    localStorage.getItem('activeMode') || 'validator'
  );
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!storedUser) {
      alert('User not logged in.');
      navigate('/login');
    }
  }, [storedUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    try {
      let response;
      const userId = storedUser.id;
      if (activeMode === 'validator') {
        response = await validateIdea(userId, idea);
      } else if (activeMode === 'risk') {
        response = await analyzeRisks(userId, idea);
      } else {
        response = await planGuidance(userId, idea);
      }
      setBotReply(response.reply);
      toast.success('Idea submitted successfully!');
      setIdea('');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleModeClick = (mode: string) => {
    localStorage.setItem('activeMode', mode);
    setActiveMode(mode);
    toast.info(`Switched to ${mode} mode`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
    toast.info('Logged out successfully');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-orbitron">
      <AppSidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden p-8 bg-gradient-to-br from-udbhava-dark-purple to-udbhava-darker-purple">
      <div className="max-w-3xl w-full flex flex-col flex-1 min-h-0 space-y-4 animate-fade-in">
  <div className="flex-1 w-full overflow-y-auto pr-2 scrollbar-thin">
    {botReply ? (
      <div className="rounded-lg shadow prose prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {botReply}
        </ReactMarkdown>
      </div>
    ) : (
      <div className="text-center space-y-3" id="welcome">
        <h1 className="text-5xl font-bold tracking-wider text-white animate-pulse-slow">
          WELCOME TO UDBHAVA
        </h1>
        <p className="text-xl text-white/80 tracking-widest">
          WHERE IDEAS EARN THEIR WINGS
        </p>
      </div>
    )}
  </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl relative glass-morphism"
          >
            <Input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Enter your idea here"
              className="w-full px-4 py-3 bg-transparent text-white border-none outline-none rounded-md"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-udbhava-purple text-white hover:bg-udbhava-purple/90 rounded-md"
              disabled={!idea.trim()}
            >
              <SendHorizontal size={18} />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Index;
