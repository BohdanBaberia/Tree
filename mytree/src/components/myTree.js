import React, {useState,useEffect} from "react";
import BranchItem from "./branchItem";
import Button from 'react-bootstrap/Button';

function MyTree() {
  const [branch, setBranch] = useState({ });
  const [active,setActive] = useState(true);

    useEffect(()=>{ //checking on data from previous visit
       const data = localStorage.getItem("tree")
       if(data){
        setBranch(JSON.parse(data))
        setActive(false)
       }
       
    },[])

    const saveToLocalStor = (data) => {
        localStorage.setItem('tree', JSON.stringify(data))
      };

    const deleteFromLocalStor = () =>{
      localStorage.removeItem("tree")
    }

  const onAddChild = (parent, childName) => {

    if( !parent.name){  // first creating a child
        const root = { name: childName, id: "base", children: [] }
        setBranch({...root});
        saveToLocalStor(branch)
        setActive(false)
    }
    else {
        const newChild = { name: childName, id: Date.now(), children: [] }
        parent.children.push(newChild);
        setBranch({ ...branch }); // it trigger re-render
        saveToLocalStor(branch)
    }
       
    
  };

  const onDelete = (child) => {
    if(child.id === branch.id){
      setBranch({});
      deleteFromLocalStor()
      setActive(true)
    
    }
    else {
      deleteChild(branch, child.id);
        setBranch({ ...branch });
        saveToLocalStor(branch); 
    }
         
  };

 const deleteChild = (parent, id) => {
    const index = parent.children.findIndex((child) => child.id === id)
      if (index !== -1) {
          parent.children.splice(index, 1)
        
      }
      else {
         parent.children.forEach( child => {
          deleteChild(child,id)
         }); 
       }
  
    
}
 


  return (
    <div className="layout">
      {  active ? <Button variant="outline-light" onClick={() => onAddChild(branch, 'root')}>Create root</Button> :
        <BranchItem branch={branch} onAddChild={onAddChild} onDelete={onDelete}  />
      }
    </div>
  );

}

export default MyTree;
