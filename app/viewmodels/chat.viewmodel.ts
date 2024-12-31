import { Observable } from '@nativescript/core';
import { Message } from '../models/message.model';
import { OpenAIService } from '../api/openai.service';

export class ChatViewModel extends Observable {
    private messages: Message[] = [];
    private openAIService: OpenAIService;

    constructor() {
        super();
        this.openAIService = new OpenAIService();
    }

    get messageList(): Message[] {
        return this.messages;
    }

    async sendMessage(content: string) {
        // Add user message
        this.addMessage(content, true);

        // Get AI response
        const response = await this.openAIService.sendMessage(content);
        this.addMessage(response, false);
    }

    private addMessage(content: string, isUser: boolean) {
        const message: Message = {
            id: Date.now().toString(),
            content,
            isUser,
            timestamp: new Date()
        };
        this.messages.push(message);
        this.notifyPropertyChange('messageList', this.messages);
    }
}