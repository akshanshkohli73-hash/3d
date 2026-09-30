'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, UserArtifact, UserGoal } from '../types';
import { INITIAL_USER_ACCOUNT } from './mockAccount';

interface AccountContextType {
  account: UserAccount;
  updateAccount: (updater: (prev: UserAccount) => UserAccount) => void;
  updateResin: (newResin: number) => void;
  addGoal: (goal: Omit<UserGoal, 'id' | 'createdDate'>) => void;
  toggleArtifactLock: (artifactId: string) => void;
  addMemory: (key: string, value: string) => void;
  deleteMemory: (memoryId: string) => void;
  importSnapshotJSON: (jsonStr: string) => boolean;
  exportSnapshotJSON: () => string;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<UserAccount>(INITIAL_USER_ACCOUNT);

  useEffect(() => {
    const saved = localStorage.getItem('teyvat_ai_account');
    if (saved) {
      try {
        setAccount(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved account state', e);
      }
    }
  }, []);

  const saveAndSetAccount = (updater: (prev: UserAccount) => UserAccount) => {
    setAccount(prev => {
      const next = updater(prev);
      if (typeof window !== 'undefined') {
        localStorage.setItem('teyvat_ai_account', JSON.stringify(next));
      }
      return next;
    });
  };

  const updateResin = (newResin: number) => {
    saveAndSetAccount(prev => ({
      ...prev,
      resin: {
        ...prev.resin,
        current: Math.min(prev.resin.max, Math.max(0, newResin)),
        lastUpdated: new Date().toISOString()
      }
    }));
  };

  const addGoal = (goalData: Omit<UserGoal, 'id' | 'createdDate'>) => {
    const newGoal: UserGoal = {
      ...goalData,
      id: 'goal_' + Date.now(),
      createdDate: new Date().toISOString().split('T')[0]
    };
    saveAndSetAccount(prev => ({
      ...prev,
      goals: [newGoal, ...prev.goals]
    }));
  };

  const toggleArtifactLock = (artifactId: string) => {
    saveAndSetAccount(prev => ({
      ...prev,
      artifacts: prev.artifacts.map(a =>
        a.id === artifactId ? { ...a, locked: !a.locked } : a
      )
    }));
  };

  const addMemory = (key: string, value: string) => {
    const newMem = {
      id: 'mem_' + Date.now(),
      key,
      value,
      createdAt: new Date().toISOString()
    };
    saveAndSetAccount(prev => ({
      ...prev,
      aiMemories: [newMem, ...prev.aiMemories]
    }));
  };

  const deleteMemory = (memoryId: string) => {
    saveAndSetAccount(prev => ({
      ...prev,
      aiMemories: prev.aiMemories.filter(m => m.id !== memoryId)
    }));
  };

  const importSnapshotJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.uid && parsed.characters) {
        saveAndSetAccount(() => parsed);
        return true;
      }
    } catch (e) {
      console.error('Import failed', e);
    }
    return false;
  };

  const exportSnapshotJSON = (): string => {
    return JSON.stringify(account, null, 2);
  };

  return (
    <AccountContext.Provider
      value={{
        account,
        updateAccount: saveAndSetAccount,
        updateResin,
        addGoal,
        toggleArtifactLock,
        addMemory,
        deleteMemory,
        importSnapshotJSON,
        exportSnapshotJSON
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
