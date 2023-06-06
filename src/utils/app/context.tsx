
import { createContext, useMemo, useContext, useState, Dispatch } from 'react';

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

const searchContext = createContext({});
export const SearchProvider = (props) => {
  const [search, setSearch] = useState('');
  const [columnFilters, setColumnFilters] = useState([]);

  return (
    <searchContext.Provider value={{search, setSearch, columnFilters, setColumnFilters}} {...props} />
  );
};

export const useSearch = () => {
  const context = useContext(searchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context as {
    search: string;
    setSearch: Dispatch<string>;
    columnFilters: Array<any>;
    setColumnFilters: any;
  };
};

// TODO: define Context for Annotation
