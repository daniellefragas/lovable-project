import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, Cpu } from "lucide-react";

/**
 * Animated AI terminal simulation.
 * Shows a Python file being edited while an AI assistant
 * suggests completions and explanations in a side panel.
 */

type Line =
  | { kind: "code"; text: string; tone?: "kw" | "fn" | "str" | "cm" | "var" | "num" | "op" }
  | { kind: "blank" };

// We render code as tokenized spans by parsing simple patterns
const CODE_LINES: { tokens: { t: string; c?: string }[] }[] = [
  { tokens: [{ t: "# pythonlab/agents/assistant.py", c: "cm" }] },
  { tokens: [{ t: "from", c: "kw" }, { t: " openai " }, { t: "import", c: "kw" }, { t: " OpenAI" }] },
  { tokens: [{ t: "import", c: "kw" }, { t: " json" }] },
  { tokens: [] },
  { tokens: [{ t: "def", c: "kw" }, { t: " ", }, { t: "summarize", c: "fn" }, { t: "(text: " }, { t: "str", c: "kw" }, { t: ") -> " }, { t: "str", c: "kw" }, { t: ":" }] },
  { tokens: [{ t: "    client = " }, { t: "OpenAI", c: "fn" }, { t: "()" }] },
  { tokens: [{ t: "    res = client.responses." }, { t: "create", c: "fn" }, { t: "(" }] },
  { tokens: [{ t: "        model=" }, { t: '"gpt-4.1-mini"', c: "str" }, { t: "," }] },
  { tokens: [{ t: "        input=" }, { t: "f\"Resume: {text}\"", c: "str" }, { t: "," }] },
  { tokens: [{ t: "    )" }] },
  { tokens: [{ t: "    return", c: "kw" }, { t: " res.output_text" }] },
];

const SUGGESTIONS = [
  {
    icon: Sparkles,
    title: "Sugestão da IA",
    body: "Use streaming para resposta em tempo real:",
    code: "client.responses.stream(...)",
  },
  {
    icon: Check,
    title: "Boa prática",
    body: "Adicione try/except para capturar RateLimitError do cliente.",
    code: null,
  },
  {
    icon: Cpu,
    title: "Refatoração",
    body: "Extraia o prompt para uma constante reutilizável.",
    code: 'PROMPT = "Resume: {text}"',
  },
];

const TONE: Record<string, string> = {
  kw: "text-py-yellow",
  fn: "text-py-teal",
  str: "text-emerald-300/90",
  cm: "text-white/35 italic",
};

export const AITerminal = () => {
  const [typedLines, setTypedLines] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [suggestionIdx, setSuggestionIdx] = useState(0);
  const [thinking, setThinking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Type out the code lines one by one, then loop
  useEffect(() => {
    if (typedLines >= CODE_LINES.length) {
      // pause then restart
      const t = setTimeout(() => {
        setTypedLines(0);
        setCharIndex(0);
      }, 3500);
      return () => clearTimeout(t);
    }

    const currentLine = CODE_LINES[typedLines];
    const fullText = currentLine.tokens.map((t) => t.t).join("");

    if (charIndex >= fullText.length) {
      const t = setTimeout(() => {
        setTypedLines((n) => n + 1);
        setCharIndex(0);
      }, 180);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setCharIndex((n) => n + 1), 22 + Math.random() * 35);
    return () => clearTimeout(t);
  }, [typedLines, charIndex]);

  // Cycle AI suggestions
  useEffect(() => {
    const interval = setInterval(() => {
      setThinking(true);
      setTimeout(() => {
        setSuggestionIdx((i) => (i + 1) % SUGGESTIONS.length);
        setThinking(false);
      }, 900);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal as lines fill
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [typedLines, charIndex]);

  const renderLine = (lineIdx: number) => {
    const line = CODE_LINES[lineIdx];
    if (!line) return null;
    if (line.tokens.length === 0) return <div key={lineIdx} className="h-[1.4em]" />;

    const isCurrent = lineIdx === typedLines;
    const fullText = line.tokens.map((t) => t.t).join("");
    const visible = isCurrent ? fullText.slice(0, charIndex) : fullText;

    // Re-tokenize visible portion
    const out: JSX.Element[] = [];
    let consumed = 0;
    line.tokens.forEach((tok, i) => {
      const remaining = visible.length - consumed;
      if (remaining <= 0) return;
      const slice = tok.t.slice(0, remaining);
      consumed += slice.length;
      out.push(
        <span key={i} className={tok.c ? TONE[tok.c] : "text-white/85"}>
          {slice}
        </span>
      );
    });

    return (
      <div key={lineIdx} className="flex gap-4 leading-[1.55]">
        <span className="select-none text-white/25 w-5 text-right shrink-0">{lineIdx + 1}</span>
        <span className="whitespace-pre">
          {out}
          {isCurrent && (
            <span className="inline-block w-[7px] h-[1em] bg-py-teal align-[-2px] ml-[1px] animate-pulse" />
          )}
        </span>
      </div>
    );
  };

  const Suggestion = SUGGESTIONS[suggestionIdx];
  const Icon = Suggestion.icon;

  return (
    <div className="relative w-full h-full grid place-items-center px-2">
      {/* Glow halos */}
      <div className="absolute h-[60%] w-[70%] rounded-full bg-py-teal/15 blur-3xl animate-pulse-glow" />
      <div className="absolute h-[35%] w-[35%] rounded-full bg-py-yellow/10 blur-3xl" />

      {/* Terminal window */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[540px] rounded-xl overflow-hidden border border-white/10 bg-py-dark-2/90 backdrop-blur-xl shadow-[0_25px_80px_-20px_hsl(var(--py-teal)/0.35)]"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/40">
            assistant.py — pythonlab
          </span>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-py-teal animate-pulse" />
            <span className="font-mono text-[10px] text-py-teal/80">AI</span>
          </div>
        </div>

        {/* Code area */}
        <div
          ref={containerRef}
          className="font-mono text-[12px] leading-relaxed px-4 py-4 h-[300px] overflow-hidden bg-gradient-to-b from-py-dark-2 to-black/60"
        >
          {Array.from({ length: Math.min(typedLines + 1, CODE_LINES.length) }).map((_, i) =>
            renderLine(i)
          )}
        </div>

        {/* AI suggestion panel */}
        <div className="border-t border-white/[0.06] bg-black/50 px-4 py-3 min-h-[92px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="grid place-items-center h-5 w-5 rounded-md bg-py-teal/15 border border-py-teal/30">
              <Sparkles className="h-3 w-3 text-py-teal" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-py-teal">
              PythonLab
            </span>
            {thinking && (
              <span className="ml-1 flex gap-1">
                <span className="h-1 w-1 rounded-full bg-py-teal animate-bounce [animation-delay:-0.2s]" />
                <span className="h-1 w-1 rounded-full bg-py-teal animate-bounce [animation-delay:-0.1s]" />
                <span className="h-1 w-1 rounded-full bg-py-teal animate-bounce" />
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!thinking && (
              <motion.div
                key={suggestionIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-2">
                  <Icon className="h-3.5 w-3.5 text-py-yellow mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] text-white/80">
                      <span className="text-white/95 font-semibold">{Suggestion.title}: </span>
                      {Suggestion.body}
                    </div>
                    {Suggestion.code && (
                      <div className="mt-1.5 inline-block px-2 py-1 rounded bg-py-teal/10 border border-py-teal/20 font-mono text-[10.5px] text-py-teal">
                        {Suggestion.code}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Corner labels */}
      <div className="absolute top-2 left-2 font-mono text-[10px] tracking-[0.2em] uppercase text-py-teal/50">
        SYS://PYTHONLAB
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[10px] tracking-[0.2em] uppercase text-py-teal/50">
        v2025.04
      </div>
    </div>
  );
};
