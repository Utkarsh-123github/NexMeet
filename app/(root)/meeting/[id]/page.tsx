'use client'
import Loader from '@/components/Loader';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/ui/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import React, {  useState } from 'react'



const Meeting = () => {
  const {isLoaded} = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const param = useParams()
  const callId = param.id as string
  
  const {call,isCallLoading} = useGetCallById(callId)
  if(!isLoaded || isCallLoading)return <Loader />
  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete = {setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting