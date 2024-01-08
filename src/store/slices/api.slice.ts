import { 
    type BaseQueryFn, 
    type FetchArgs, 
    type FetchBaseQueryError, 
} from '@reduxjs/toolkit/query';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://greattodo.onrender.com/',
})

const baseQueryWithReauth: 
    BaseQueryFn<string | FetchArgs, 
    unknown, 
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})