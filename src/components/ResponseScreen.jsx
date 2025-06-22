import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ResponseScreen = ({ playerAnswer, onSubmitAnswer, score }) => {
  return (

    <div>

      <div className='flex w-full max-w-sm items-center gap-2'>

        <Input type="Digit" placeholder="Digit" />
        <Button onClick={onSubmitAnswer} type="submit" variant="outline">
          Submit
        </Button>

      </div>

    </div>

  )
}

export default ResponseScreen