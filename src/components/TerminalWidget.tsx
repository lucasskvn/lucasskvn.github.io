import { useState, useEffect, useRef } from 'react';

const bootLines = [
  '[  OK  ] Tuning 108.0 MHz — carrier locked.',
  '[  OK  ] Signal path acquired — LAT 41.38 / LON -71.90.',
  '[  OK  ] Fog layer rendered at 100%.',
  '[ WARN ] Static burst on channel 2 — resampling…',
  '[  OK  ] lucasskvn.service online.',
  '',
  '  ██╗       ██╗   ██╗   ██████╗   █████╗    ██████╗   ██████╗  ██╗  ██╗  ██╗   ██╗  ███╗   ██╗',
  '  ██║       ██║   ██║  ██╔════╝  ██╔══██╗  ██╔════╝  ██╔════╝  ██║ ██╔╝  ██║   ██║  ████╗  ██║',
  '  ██║       ██║   ██║  ██║       ███████║  ███████╗  ███████╗  █████╔╝   ██║   ██║  ██╔██╗ ██║',
  '  ██║       ██║   ██║  ██║       ██╔══██║  ╚════██║  ╚════██║  ██╔═██╗   ╚██╗ ██╔╝  ██║╚██╗██║',
  '  ███████╗  ╚██████╔╝  ╚██████╗  ██║  ██║  ██████╔╝  ██████╔╝  ██║  ██╗   ╚████╔╝   ██║ ╚████║',
  '  ╚══════╝   ╚═════╝    ╚═════╝  ╚═╝  ╚═╝  ╚═════╝   ╚═════╝   ╚═╝  ╚═╝    ╚═══╝    ╚═╝  ╚═══╝',
  '',
  'lucasskvn@portfolio:~$ _',
];

const commands: Record<string, string[]> = {
  'help': [
    'Available commands:',
    '  help      — Show this message',
    '  whoami    — About me',
    '  skills    — My tech stack',
    '  projects  — List projects',
    '  music     — What I listen to',
    '  signal    — Signal status',
    '  da        — About the art direction',
    '  butterflynet — Private IRC',
    '  contact   — Get in touch',
    '  clear     — Clear terminal',
    '  neofetch  — System info',
  ],
  'whoami': [
    'Lucas Sangkhavongs',
    '20 years old — Lyon, France',
    'EPITECH Lyon — 2nd year',
    'Rust / C / Python / TypeScript',
    'Open source enthusiast',
  ],
  'skills': [
    'Languages:    Rust, C, C++, Python, TypeScript, Bash',
    'Tools:        Docker, Nix, Git, Neovim, Caddy',
    'Databases:    SQLite, PostgreSQL, Redis',
    'Cloud:        OVH, Proxmox, GitHub Actions',
    'Interests:    Systems programming, audio, automation',
  ],
  'projects': [
    '→ RMRF — Deduplicated backup tool (Rust)',
    '→ Staarscreaam.wav — Music app (Rust)',
    '→ FarmerMonkey — Discord tournament bot',
    '→ VirtualAngel — Conversational AI bot',
    '→ Wolf3D — Raycasting game engine (C)',
    '→ Minishell — Unix shell recreation (C)',
    'Type "help" for more commands.',
  ],
  'music': [
    'Last.fm: Snow3945KKK',
    'Top artists: onokami, LE SSERAFIM, Oliver Tree',
    'Genres: K-pop, R&B, rock, electronic',
    'Check /music for live data!',
  ],
  'contact': [
    'Email:    lucas.sangkhavongs@epitech.eu',
    'GitHub:   github.com/lucasskvn',
    'LinkedIn: linkedin.com/in/lucas-sangkhavongs',
    'Discord:  lucasskvn',
  ],
  'signal': [
    'FREQ 108.0 MHz — carrier locked.',
    'LAT 41.38 / LON -71.90 — coordinates found.',
    'If you hear static, you are not alone.',
  ],
  'da': [
    'Direction artistique :',
    'Deux mondes — Le Brouillard et L\u2019Autre Monde.',
    'Notes typewriter, brouillard, grain, signal.',
    'Bascule avec le bouton ☁ / ☽ (persisté).',
  ],
  'butterflynet': [
    'Serveur IRC privé et chiffré — invite only.',
    'Rejoindre : chat.2bananas4monkeys.org',
  ],
  'neofetch': [
    'OS: lucasskvnOS x86_64',
    'Host: Portfolio v3.0',
    'Kernel: React 19.1 + Vite 7.1',
    'Shell: bash 5.2',
    'Resolution: 1920x1080 (or whatever you\'re using)',
    'DE: Custom CSS Dark Theme',
    'CPU: Your device\'s CPU (0% used by this site)',
    'GPU: Handled by your browser',
    'Memory: Enough for this terminal',
  ],
};

function lineClass(line: string): string {
  if (!line) return '';
  if (line.startsWith('[  OK  ]')) return ' ok';
  if (line.startsWith('  ██') || line.startsWith('  ╚█') || line.startsWith('  ██')) return ' ascii';
  if (line.startsWith('lucasskvn@portfolio:~$')) return ' prompt';
  if (line.startsWith('bash:')) return ' error';
  if (line.startsWith('→')) return ' project';
  if (line.startsWith('Available') || line.startsWith('Type')) return ' info';
  if (line.includes(':')) return ' kv';
  return '';
}

export default function TerminalWidget() {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [bootDone, setBootDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines(prev => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setBootDone(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (endRef.current && endRef.current.parentElement) {
      endRef.current.parentElement.scrollTop = endRef.current.parentElement.scrollHeight;
    }
  }, [lines]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: string[] = [];

    if (trimmed === 'clear') {
      setLines([]);
      return;
    }

    if (trimmed === '') {
      return;
    }

    newLines.push(`lucasskvn@portfolio:~$ ${cmd}`);

    if (commands[trimmed]) {
      newLines.push(...commands[trimmed]);
    } else {
      newLines.push(`bash: ${trimmed}: command not found. Try 'help'.`);
    }

    setLines(prev => [...prev, ...newLines]);
    setHistory(prev => [...prev, trimmed]);
    setHistoryIdx(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx >= 0) {
        const newIdx = historyIdx + 1;
        if (newIdx >= history.length) {
          setHistoryIdx(-1);
          setInput('');
        } else {
          setHistoryIdx(newIdx);
          setInput(history[newIdx]);
        }
      }
    }
  };

  return (
    <div className="terminal-widget" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">lucasskvn@portfolio:~</span>
      </div>
      <div className="terminal-body">
        {lines.map((line, i) => (
          <div key={i} className={`terminal-line${lineClass(line)}`}>
            {line ?? ''}
          </div>
        ))}
        {bootDone && (
          <div className="terminal-input-line">
            <span className="terminal-prompt">lucasskvn@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
