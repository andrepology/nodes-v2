'use client'

import { useState } from 'react';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import NodeNavigator from '@/components/NodeNavigator'

import { RowSelectionProvider, useRowSelection } from '@/utils/app/context';



export default function Home() {

  let storage;
  try {
    storage = localStorage;
  } catch (error) {}

  const ComponentBrowser = () => {

    const { rowSelection, selectedComponent } = useRowSelection()

    // map over selectedComponet {} and render as a row
    const metadataFields = Object.entries(selectedComponent).map(([key, value]) => {
      // render as a row
      return (
        <div key={key} className="flex flex-row justify-between">
          <div className="text-sm font-medium text-gray-400">{key}</div>
          <div className="text-sm text-gray-400">{value}</div>
        </div>
      )
    })

    // an efficient way to check if an object is empty



    const componentView = Object.keys(selectedComponent).length ? (
      <>
          <div className='mx-auto max-w-md'>
            {metadataFields}
          </div>

          <button>Open Component</button>
      </>
    ) : (
      <div> Select a Component on the left to view its metadata and open it </div>
    )
    

  return (
    <div>
      Component Browser

      {componentView}
    </div>
  )
}



  return (
    <main className="w-screen h-screen">
      <RowSelectionProvider>
        <PanelGroup direction="horizontal" storage={storage} className='w-full h-full'>
          <Panel className='relative' collapsible={true}>
            <NodeNavigator
              className={"absolute bottom-20 right-4"}
            />
          </Panel>
          <PanelResizeHandle >
            <div className="w-1.5 h-16 rounded-full absolute bottom-28 bg-gray-500"></div>
          </PanelResizeHandle>
          <Panel minSize={25} className='rounded-md bg-slate-200/10 m-2 ml-6'>
            <ComponentBrowser />
          </Panel>
        </PanelGroup>    
      </RowSelectionProvider>
    </main>
  )
}
