
import { createContext, useMemo, useContext, useState } from 'react';

const SelectionContext = createContext({});

export const RowSelectionProvider = (props) => {
  // for tanstack-table
  const [rowSelection, setRowSelection] = useState({});
  // for component browser, as sorts/filters may be applied
  const [selectedComponent, setSelectedComponent] = useState({});

  return (
    <SelectionContext.Provider 
      value={{rowSelection, setRowSelection, selectedComponent, setSelectedComponent}} 
      {...props} 
    />
  );
};

export const useRowSelection = () => {

  const context = useContext(SelectionContext)

  if (!context) {
    throw new Error('useRowSelection must be used within a RowSelectionProvider')
  }

  // return with types provided
  return context as {
    rowSelection: any;
    setRowSelection: any;
    selectedComponent: any;
    setSelectedComponent: any;
  };
};


// TODO: define Context for Annotation
