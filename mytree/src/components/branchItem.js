import { useState,} from 'react';
import Button from 'react-bootstrap/Button';



function BranchItem ({ branch, onAddChild, onDelete,  }) {
    const [isOpen, setIsOpen] = useState(true);
    
  
    const handleAddChild = () => {
      const childName =prompt("Write name for new child");
      if (childName) {
        onAddChild(branch, childName);
      }
    };
  
    const handleDelete = () => {
      onDelete(branch);
    };
  
    const handleOpen= () => {
      setIsOpen(!isOpen);
    };
  
    const IconsButton = (handleOpen) => {
      if(!isOpen){
        return (
        <>
        <button className='myButton'  onClick={handleOpen}>
          <i className="bi bi-caret-right"></i>
        </button>
        </>
        )
      }
      else {
        return (
        <>
        <button className='myButton'  onClick={handleOpen}>
          <i className="bi bi-caret-down"></i>
        </button>
        </>)
      }
    }

    return (
      <>
      <div className='ms-5'>
        <div className="d-flex flex-column justify-content-center align-items-start ">
          <div className='d-flex justify-content-center align-items-center'>
            { branch?.children?.length > 0 ?  IconsButton(handleOpen) : null }
             <p className="text-center text-light fw-bolder m-1">{branch.name}</p>

            <button className='myButton' onClick={handleAddChild}>
            <i className="bi bi-plus-circle-dotted"></i>
            </button>
            <button  className='myButton' onClick={handleDelete}>
            <i className="bi bi-dash-circle-dotted"></i>
            </button>
          </div>

          {isOpen && (
            <ul className="list-group d-flex  justify-content-start" >
              {branch?.children?.map((child) => (
                <li className="list-group-item p-1"  key={child.id}>
                <ul className="list-group"  >
                    <li className="list-group-item ms-5 " key={child.id + "deeper"}>
                      <BranchItem
                        branch={child}
                        onAddChild={onAddChild}
                        onDelete={onDelete}

                      />
                    </li>
                </ul>
                </li>))}
              
            </ul>
          )}
        </div>
      </div>
      </> );
  }

  export default BranchItem;