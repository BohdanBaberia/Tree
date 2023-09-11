import React, {useState,useEffect} from "react";
import BranchItem from "./branchItem";

function MyTree() {
  const [branch, setBranch] = useState({ });
  const [root,setRoot] = useState(true)

    useEffect(()=>{ //checking on data from previous visit
       const data = localStorage.getItem("tree")
       if(data){
        setBranch(JSON.parse(data))
       }
       
    },[])

    const saveToLocalStor = (data) => {
        localStorage.setItem('tree', JSON.stringify(data))
      };

  const onAddChild = (parent, childName) => {

    

    if( parent){ 
        const newChild = { name: childName, id: Date.now(), children: [] }
        setBranch({newChild});
        saveToLocalStor(branch)
        setRoot(false)
    }
    else {
        const newChild = { name: childName, id: Date.now(), children: [] }
        parent.children.push(newChild);
        setBranch({ ...branch });
        saveToLocalStor(branch)
    }
       
    
  };

  const onDelete = (child) => {
        deleteChild(branch, child.id);
        setBranch({ ...branch });
        saveToLocalStor(branch);  
    
   
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



  const handleToggle = (node) => {
    node.isExpanded = !node.isExpanded;
    setBranch({ ...branch });
  };

 


  return (
    <div>
        { root ? <button onClick={() => onAddChild(branch, 'root')}>Create root</button> :
      <BranchItem branch={branch} onAddChild={onAddChild} onDelete={onDelete} onToggle={handleToggle} />
    }
    </div>
  );

}

export default MyTree;
