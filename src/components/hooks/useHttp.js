import React, {useCallback, useEffect, useState} from 'react';

const sendHttpRequest = async (url, config) => {

    const response = await fetch(url, config);

    const resData = await response.json();

    if(!response.ok) {
        throw new Error(
            resData.message || 'Something went wrong, failed to send request.'
        );
    }

    return resData;

}

const UseHttp = (url, config, initialData) => {

    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const clearData = () => {
        setData(initialData)
    }

    const sendRequest = useCallback(async(data) => {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, { ...config, body: data });
            setData(resData);
        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, [url, config]);


    useEffect(() => {
        //GET 요청일때만
        if(config && (config.method === 'GET'  || !config.method)) {
            sendRequest();
        }

    }, [config, sendRequest]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }

}

export default UseHttp;