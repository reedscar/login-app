import { useEffect } from "react";
import { useState } from 'react'
import { supabase } from "./supabaseClient";

function Counter({ user }){
    const [counter, setCounter] = useState(null);

    // get the user's counter from the database when mounting
    useEffect(() => {
    const fetchCounter = async () => {
        const { data, error } = await supabase
            .from('user_counters')
            .select('counter')
            .eq('user_id', user.id)
            .maybeSingle(); // <-- use maybeSingle instead of single

        if (error) {
            console.error('Error fetching counter:', error.message);
            return;
        }

        if (data) {
            setCounter(data.counter);
        } else {
            // If no counter exists, insert a new row for this user
            const { error: insertError } = await supabase
                .from('user_counters')
                .insert({ user_id: user.id, counter: 0 });

            if (insertError) {
                console.error('Error inserting new counter row:', insertError.message);
            }
        }
    };

    fetchCounter();
    }, [user.id]);


    // Update counter in the database and locally
    const incrementCounter = async () => {
        const { error } = await supabase
            .from('user_counters')
            .update({ counter: counter + 1 })
            .eq('user_id', user.id)
        
        if (!error) {
            setCounter(prev => prev + 1)
        }
    }

    return (
        <div>
            <h2>Welcome, {user.email}</h2>
            <p>Counter: {counter}</p>
            <button onClick={incrementCounter}>Increment</button>
        </div>
    )
}

export default Counter
 