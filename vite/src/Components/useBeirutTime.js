import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Beirut' })

// Current time in Beirut, e.g. "6:42 PM", refreshed every 15 seconds.
export default function useBeirutTime(){
    const [time, setTime] = useState(() => formatter.format(new Date()))

    useEffect(() => {
        const id = setInterval(() => setTime(formatter.format(new Date())), 15000)
        return () => clearInterval(id)
    }, [])

    return time
}
