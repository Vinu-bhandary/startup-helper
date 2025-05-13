
import React from 'react';
import AppSidebar from '@/components/AppSidebar';
import IdeaInput from '@/components/IdeaInput';

const Index = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden font-orbitron">
      <AppSidebar />
      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-udbhava-dark-purple to-udbhava-darker-purple">
        <div className="max-w-3xl w-full flex flex-col items-center space-y-12 animate-fade-in">
          <div className="text-center space-y-3">
            <h1 className="text-5xl font-bold tracking-wider text-white animate-pulse-slow">
              WELCOME TO UDBHAVA
            </h1>
            <p className="text-xl text-white/80 tracking-widest">
              WHERE IDEAS EARN THEIR WINGS
            </p>
          </div>
          
          <IdeaInput />
        </div>
      </main>
    </div>
  );
};

export default Index;
