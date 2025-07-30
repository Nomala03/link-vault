import type { LinkItem } from '../types/Link';

type Props = {
  links: LinkItem[];
  onDelete: (id: number) => void;
  onEdit: (link: LinkItem) => void;
};

function LinkList({ links, onDelete, onEdit }: Props) {
  if (links.length === 0) return <p>No links saved yet.</p>;

  return (
    <div>
      {links.map(link => (
        <div className="link-card" key={link.id}>
          <h3>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </h3>
          {link.description && <p>{link.description}</p>}
          {Array.isArray(link.tags) && link.tags.length > 0 && (
            <p><strong>Tags:</strong> {link.tags.join(', ')}</p>
          )}
          <button onClick={() => onEdit(link)}>✏️ Edit</button>
          <button onClick={() => onDelete(link.id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
}

export default LinkList;
