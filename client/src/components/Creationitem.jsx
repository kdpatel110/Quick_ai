import React, { useState } from 'react'
import Markdown from 'react-markdown'

const Creationitem = ({ item }) => {
    if (!item) return null

    const [expanded, setExpanded] = useState(false)

    // helpful debug: check what `content` actually is at runtime
    // remove or disable this in production
    console.debug('Creationitem item:', item)

  return (
    <div onClick={() => setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer'>
        <div className='flex justify-between items-center gap-4'>
            <div>
                <h2>{item.prompt}</h2>
                <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
            </div>
            <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full'>{item.typr}</button>
        </div>
        {
            expanded && (
                <div>
                    {item.type === 'image' ? (
                        <div>
                            {/* ensure item.content is a valid URL/string */}
                            <img src={item.content || ''} alt="image" className='mt-3 w-full max-w-md' />
                        </div>
                    ) : (
                        <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-700'>
                            <div className='reset-tw'>
                                <Markdown>{String(item.content || '')}</Markdown>
                            </div>
                        </div>
                    )}   
                </div>
            )
        }
    </div>
  )
}

export default Creationitem
