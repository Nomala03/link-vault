import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { LinkItem } from '../types/Link';

type Props = {
  onAdd: (link: Omit<LinkItem, 'id'>) => void;
  onUpdate: (link: LinkItem) => void;
  linkToEdit: LinkItem | null;
};

function LinkForm({ onAdd, onUpdate, linkToEdit }: Props) {
  const [form, setForm] = useState({
    title: '',
    url: '',
    description: '',
    tags: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const resetForm = () => {
    setForm({ title: '', url: '', description: '', tags: '' });
    setIsEditing(false);
  };
 
  //Used when an existing link is being edited, if not true, resets the form
  useEffect(() => {
    if (linkToEdit) {
      setForm({
        title: linkToEdit.title,
        url: linkToEdit.url,
        description: linkToEdit.description || '',
        tags: (linkToEdit.tags || []).join(', '),
      });
      setIsEditing(true);
    } else {
      resetForm();
    }
  }, [linkToEdit]);
 
  //Using the name attribute to handle changes in the the input/text area of the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const tagArray = form.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);
     
    if (isEditing && linkToEdit) {
      onUpdate({
        ...linkToEdit,
        ...form,
        tags: tagArray,
      });
    } else {
      onAdd({ ...form, tags: tagArray });
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Link Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="url"
        name="url"
        placeholder="https://example.com"
        value={form.url}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma-separated)"
        value={form.tags}
        onChange={handleChange}
      />
      <button type="submit" className='submit'>
        {isEditing ? 'Update Link' : 'Add Link'}
      </button>
    </form>
  );
}

export default LinkForm;
