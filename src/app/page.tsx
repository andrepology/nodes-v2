'use client'

import { useState } from 'react';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import NodeNavigator from '@/components/NodeNavigator'

import { RowSelectionProvider, useRowSelection } from '@/utils/app/context';


import Image from 'next/image';



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
    <div className='flex flex-col'>

      <div className='flex justify-between'>
        

        <div className=' bg-white/10 border border-white/5 flex gap-2 text-white grow max-w-md rounded-md'>
          <Image 
            src = "./dpid-logo.svg"
            width={18}
            height={18}
            alt = {"dpid"}
          />
          / 420 / {selectedComponent?.componentName}
        </div>
      </div>

      <div className="w-full">{componentView}</div>
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
            <div 
              style={{bottom: "88px"}}
              className="w-1.5 h-12 rounded-full absolute hover:shadow-lg hover:shadow-white/80 transition-bg duration-300 bg-gray-500 hover:bg-gray-400"
            />
          </PanelResizeHandle>
          <Panel minSize={25} className='rounded-md bg-slate-200/10 m-2 ml-6'>
            <ComponentBrowser />
          </Panel>
        </PanelGroup>    
      </RowSelectionProvider>
    </main>
  )
}
