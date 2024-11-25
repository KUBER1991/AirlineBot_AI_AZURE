import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent {
  userInput: string = '';
  chatMessages: { type: string; text: string }[] = [];

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.userInput.trim() === '') return;

    // Add employee's message to chat
    this.chatMessages.push({ type: 'employee', text: this.userInput });

    const query = this.userInput;
    this.userInput = '';

    // Send query to backend for a response
    this.http
      .post<any>('http://localhost:3000/chat', { query })
      .subscribe((response) => {
        this.chatMessages.push({ type: 'bot', text: response.answer });
      });
  }
}
