import { useState, useEffect } from 'react';

function BranchItem ({ branch, onAddChild, onDelete, onToggle }) {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const handleAddChild = () => {
      const childName =prompt("S");
      if (childName) {
        onAddChild(branch, childName);
      }
    };
  
    const handleDelete = () => {
      onDelete(branch);
    };
  
    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };
  
    useEffect(() => {
      setIsExpanded(true);
    }, [branch]);
  
    return (
      <div>
        <span>
          <button onClick={handleToggle}>
            {isExpanded ? '-' : '+'}
          </button>
          {branch.name}
        </span>
        <button onClick={handleAddChild}>Додати </button>
        <button onClick={handleDelete}>Видалити</button>

        {isExpanded && (
          <ul>
            {branch.children.map((child) => (
              <li key={child.id}>
                <BranchItem
                  branch={child}
                  onAddChild={onAddChild}
                  onDelete={onDelete}
                  onToggle={onToggle}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  export default BranchItem;