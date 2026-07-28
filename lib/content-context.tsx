'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface SiteContent {
  [key: string]: any;
}

const ContentContext = createContext<SiteContent>({});
const ContentUpdateContext = createContext<((content: SiteContent) => Promise<void>) | null>(null);

export function useContent() {
  return useContext(ContentContext);
}

export function useUpdateContent() {
  return useContext(ContentUpdateContext);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>({});

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then(setContent)
      .catch(() => {});
  }, []);

  const updateContent = async (newContent: SiteContent) => {
    setContent(newContent);
    await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContent),
    });
  };

  return (
    <ContentContext.Provider value={content}>
      <ContentUpdateContext.Provider value={updateContent}>
        {children}
      </ContentUpdateContext.Provider>
    </ContentContext.Provider>
  );
}