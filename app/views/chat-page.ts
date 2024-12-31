import { EventData, Page } from '@nativescript/core';
import { ChatViewModel } from '../viewmodels/chat.viewmodel';

let viewModel: ChatViewModel;

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    viewModel = new ChatViewModel();
    page.bindingContext = viewModel;
}