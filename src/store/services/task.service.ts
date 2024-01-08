import { TaskDto } from "../models/task.dto";
import { apiSlice } from "../slices/api.slice";

export const taskAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<TaskDto[], void>({
            query: () => ({
                url: 'task/tasks',
                method: 'GET',
            }),
        }),
    })
})

export const { useGetTasksQuery } = taskAPI;