'use client'

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import NodeNavigator from '@/components/NodeNavigator'




export default function Home() {

  let storage;
  try {
    storage = localStorage;
  } catch (error) {}

  return (
    <main className="w-screen h-screen">
      <PanelGroup direction="horizontal" storage={storage} className='w-full h-full'>
        <Panel className='relative'>
          <NodeNavigator className = {"absolute bottom-20 right-4"} />
        </Panel>
        <PanelResizeHandle >
          <div className="w-1.5 h-16 rounded-full absolute bottom-28 bg-gray-500"></div>
        </PanelResizeHandle>
        <Panel minSize={25} className='rounded-md bg-slate-200/10 m-2 ml-6'>
          Component Browser 
        </Panel>
      </PanelGroup>    
    </main>
  )
}
