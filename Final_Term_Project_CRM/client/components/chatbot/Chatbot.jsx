'use client';

import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { X, Send, Bot, MessageCircle } from 'lucide-react';
import api from '@/lib/axios';

const QUICK_COMMANDS = [
  'Show Customers',
  'Add Customer',
  'Generate Invoice',
  'Help',
];

export default function Chatbot({ isOpen, onClose, onOpen }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hello! I'm your CRM Assistant. Type 'help' to see what I can do.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const addBotMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { role: 'bot', text, timestamp: new Date() },
    ]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', text, timestamp: new Date() },
    ]);
  };

  const processCommand = async (text) => {
    const normalized = text.toLowerCase().trim();

    if (normalized.includes('show customers') || normalized.includes('list customers')) {
      try {
        const { data } = await api.get('/api/customers');
        const names = data.map((c) => c.name).join(', ');
        addBotMessage(
          names
            ? `Here are your customers: ${names}`
            : 'You have no customers yet.'
        );
      } catch {
        addBotMessage('Sorry, I could not fetch customers right now.');
      }
      return;
    }

    if (normalized.includes('add customer') || normalized.includes('new customer')) {
      addBotMessage('Navigating to Add Customer...');
      router.push('/dashboard/customers/add');
      return;
    }

    if (normalized.includes('generate invoice') || normalized.includes('new invoice')) {
      addBotMessage('Opening Invoice Generator...');
      router.push('/dashboard/invoices/generate');
      return;
    }

    if (normalized.includes('help') || normalized.includes('commands')) {
      addBotMessage(
        `Available commands:\n• "show customers" — List all customers\n• "add customer" — Go to add customer page\n• "generate invoice" — Open invoice generator\n• "help" — Show this list\n• "hello" — Greet the assistant`
      );
      return;
    }

    if (normalized.includes('hello') || normalized.includes('hi')) {
      addBotMessage(
        "Hello! I'm your CRM Assistant. Type 'help' to see what I can do."
      );
      return;
    }

    addBotMessage(
      "I don't understand that command. Type 'help' to see available commands."
    );
  };

  const handleSubmit = async (text) => {
    const message = text || input;
    if (!message.trim()) return;

    addUserMessage(message);
    setInput('');
    await processCommand(message);
  };

  if (!mounted) return null;

  const fab = (
    <button
      onClick={onOpen}
      className="fixed bottom-[4.75rem] right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95 md:bottom-6"
      aria-label="Open chatbot"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );

  if (!isOpen) {
    return createPortal(fab, document.body);
  }

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[90] bg-neutral-900/30 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed z-[100] flex flex-col overflow-hidden border border-neutral-200 bg-surface shadow-lg
          inset-x-0 bottom-0 max-h-[min(75dvh,calc(100dvh-4.5rem))] rounded-t-2xl
          md:inset-x-auto md:bottom-6 md:right-4 md:left-auto md:h-[min(480px,calc(100vh-3rem))] md:w-full md:max-w-sm md:rounded-2xl md:max-h-[calc(100vh-3rem)]
          animate-slide-up md:animate-scale-in"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-primary px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-white">CRM Assistant</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 hover:bg-white/20"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* drag handle on mobile */}
        <div className="mx-auto mt-1.5 h-1 w-10 shrink-0 rounded-full bg-neutral-200 md:hidden" />

        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-3 py-2 text-body-md ${
                  msg.role === 'user'
                    ? 'rounded-br-none bg-primary text-white'
                    : 'rounded-bl-none border border-neutral-200 bg-neutral-50 text-on-surface'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="shrink-0 border-t border-neutral-200 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => handleSubmit(cmd)}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-body-sm text-primary hover:bg-primary-fixed"
              >
                {cmd}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command..."
              className="flex-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-body-md outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-dark"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}

Chatbot.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};
