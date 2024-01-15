import { useState, useEffect } from 'react';

function useSessionState() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch('/api/auth/session');
            const sessionData = await response.json();
            setSession(sessionData);
        };

        fetchSession();
    }, []);

    return session;
}

export default useSessionState;
