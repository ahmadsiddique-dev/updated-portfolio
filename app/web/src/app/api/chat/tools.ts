import { z } from 'zod';

export const tools = {
    getInfoTool: {
        description: "",
        inputSchema: z.object({
            searchString: z.string().describe("")
        })
    }
}