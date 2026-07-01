"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/lib/ChatContext";
import { streamChat, type ChatMessage } from "@/lib/chat";
import { restaurantInfo } from "@/lib/menu";
import { IconChat, IconClose, IconSend } from "./Icons";

const suggestions = [
  "What's your most popular dish?",
  "Are you open right now?",
  "Do you have vegetarian options?",
  "Can I book a table for 4 tonight?",
];

export default function ChatWidget() {
  const { isOpen, toggle, open } = useChat();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || streaming) return;
    setError(null);
    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      let acc = "";
      await streamChat(next, (delta) => {
        acc += delta;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      });
      if (!acc) {
        setMessages((prev) => prev.slice(0, -1));
        setError("The host didn't respond. Please try again.");
      }
    } catch (e) {
      setMessages((prev) => prev.slice(0, -1));
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      <button
        onClick={() => (isOpen ? toggle() : open())}
        aria-label={isOpen ? "Close chat" : "Chat with our AI host"}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-xl shadow-brand/30 transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <IconClose className="h-6 w-6" /> : <IconChat className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="animate-pop-in fixed inset-x-4 bottom-24 z-50 flex h-[70vh] max-h-[560px] flex-col rounded-3xl border border-neutral-200 bg-white shadow-2xl sm:inset-x-auto sm:right-5 sm:w-[380px]">
          <div className="flex items-center gap-3 border-b border-neutral-200 px-5 py-4">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white">🍽️</span>
            <div>
              <div className="text-sm font-bold">{restaurantInfo.name} Host</div>
              <div className="flex items-center gap-1 text-xs text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online now
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div>
                <p className="mb-3 text-sm text-neutral-600">
                  Ahlan! Ask me about the menu, hours, or reservations at {restaurantInfo.name}.
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:border-brand hover:text-brand"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-800"
                  }`}
                >
                  {m.content || (streaming && i === messages.length - 1 ? <TypingDots /> : "")}
                </div>
              </div>
            ))}
            {error && <p className="text-center text-xs text-red-500">{error}</p>}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-neutral-200 p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our menu..."
              disabled={streaming}
              className="flex-1 rounded-full border border-neutral-200 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              aria-label="Send"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white disabled:opacity-40"
            >
              <IconSend className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function TypingDots() {
  return (
    <span className="flex gap-1 py-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />
    </span>
  );
}
