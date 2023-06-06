'use client'

import { SearchProvider } from "@/utils/app/context"

import { columns, researchComponents, ResearchComponent } from "@/components/ui/columns"
import { DataTable } from "@/components/ui/drive-table"

async function getData(): Promise<ResearchComponent[]> {
  // Fetch data from your API here.

  return researchComponents
}


const ChatInput = () => {
  return (  
    <div className = "flex text-center py-4 w-full bg-slate-50/20 rounded-md">
      Search or Chat with Research Object
    </div> 
  )
}


export default function NodeNavigator({ className,  } : { className: string}) {

  const data = researchComponents

  
  // expand up to 32px from left edge of screen
  
  return (

    <SearchProvider>
      <div 
        className={"mx-auto flex flex-col gap-4 " + className}
        style={{width: "calc(100% - 64px)", maxWidth: "800px"}}
      >

        <DataTable 
          columns={columns} 
          data={data} 
          
        />
      </div>
    </SearchProvider>
  )
}
