import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { LinkItem } from '../types/Link';

type Props = {
  onAdd: (link: Omit<LinkItem, 'id'>) => void;
   onUpdate: (link: LinkItem) => void;
   linkToEdit: LinkItem | null;
};

function LinkForm({ onAdd, onUpdate, linkToEdit }: Props) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (linkToEdit) {
      setTitle(linkToEdit.title);
      setUrl(linkToEdit.url);
      setDescription(linkToEdit.description || '');
      setTags((linkToEdit.tags || []).join(', '));
      setIsEditing(true);
    } else {
      resetForm();
    }
   }, [linkToEdit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // if (!title || !url) return;
    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);

     if (isEditing && linkToEdit) {
      onUpdate({
        ...linkToEdit,
        title,
        url,
        description,
        tags: tagArray,
      });
    } else {
      onAdd({ title, url, description, tags: tagArray });
    }

    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setUrl('');
    setDescription('');
    setTags('');
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Link Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={e => setUrl(e.target.value)}
        required
      />
      <textarea
        placeholder="Short description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <button type="submit">
        {isEditing ? 'Update Link' : 'Add Link'}
      </button>
    </form>
  );
}

export default LinkForm;
