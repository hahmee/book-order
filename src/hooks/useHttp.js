import {useCallback, useEffect, useState} from 'react';

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

    const sendRequest = useCallback(async(data) => { //새 함수 객체가 계속 생성되지 않게 useCallback
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, { ...config, body: data });
            setData(resData);
        } catch (error) {
            setError(error.message || '문제가 발생했습니다.');
        }
        setIsLoading(false);
    }, [url, config]);


    useEffect(() => {
        //GET 요청일때만
        if(config && (config.method === 'GET'  || !config.method)) {
            sendRequest();
        }

    }, [config, sendRequest]); //외부에서 정의된 것들 의존성

    const clearData = () => {
        setData(initialData)
    }

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }

}

export default UseHttp;