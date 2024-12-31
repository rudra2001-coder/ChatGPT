import axios from 'axios';

export class OpenAIService {
    private apiKey: string = 'YOUR_OPENAI_API_KEY'; // Replace with your API key
    private baseURL: string = 'https://api.openai.com/v1/chat/completions';

    async sendMessage(message: string): Promise<string> {
        try {
            const response = await axios.post(
                this.baseURL,
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: message }],
                    temperature: 0.7
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling OpenAI:', error);
            return 'Sorry, I encountered an error processing your request.';
        }
    }
}