import React from 'react'

interface Props {
    label: string,
}

function Button(props: Props) {
  return (
    <button type="submit" className='bg-slate-500 rounded-sm border-l p-3'>{props.label}</button>
  )
}

export default Button