import { useEffect, useMemo, useState } from 'react';
import LinkForm from './components/LinkForm';
import LinkList from './components/LinkList';
import SearchBar from './components/SearchBar'
import type {LinkItem} from './types/Link';
import './App.css';

const LOCAL_STORAGE_KEY = 'linksVault';

function App() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [linkToEdit, setLinkToEdit] = useState<LinkItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setLinks(JSON.parse(stored));
    }  
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(links));
  }, [links]);

  const addLink = (newLink: Omit<LinkItem, 'id'>) => {
    const linkWithId: LinkItem = { ...newLink, id: Date.now() };
    setLinks([...links, linkWithId]);
  };
  
  const updateLink = (updated: LinkItem) => {
    const updatedLinks = links.map((link) => link.id === updated.id ? updated : link);
    setLinks(updatedLinks);
    setLinkToEdit(null); 
  }

  const deleteLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id));
    if (linkToEdit?.id === id) setLinkToEdit(null);
  };

  const handleEdit = (link: LinkItem) => {
    setLinkToEdit(link);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };  

  const filteredLinks = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return links.filter((link) => {
      return (
        link.title.toLowerCase().includes(term) ||
        link.url.toLowerCase().includes(term) ||
        (link.description?.toLowerCase().includes(term) ?? false) ||
        (link.tags?.some((tag) => tag.toLowerCase().includes(term)) ?? false)
      );
    });
  }, [searchTerm, links]);

  return (
     <div className="container">
      <h1>🔖 My Links Vault</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <LinkForm 
        onAdd={addLink} 
        onUpdate={updateLink}
        linkToEdit={linkToEdit}
      />
      <LinkList 
        links={filteredLinks} 
        onDelete={deleteLink} 
        onEdit={handleEdit}
      />
    </div>   
  );
}

export default App
