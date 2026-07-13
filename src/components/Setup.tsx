const gear = {
  os: [
    { name: 'Arch Linux', desc: { fr: 'Distribution Linux roulante, minimaliste', en: 'Rolling release, minimal Linux distro' } },
    { name: 'Proxmox VE', desc: { fr: 'Hyperviseur pour mon homelab', en: 'Hypervisor for my homelab' } },
  ],
  shell: [
    { name: 'Bash', desc: { fr: 'Shell principal, config sur mesure', en: 'Main shell, custom config' } },
    { name: 'Zsh', desc: { fr: 'Shell secondaire avec starship', en: 'Secondary shell with starship' } },
  ],
  wm: [
    { name: 'oxwm', desc: { fr: 'Window manager minimaliste en C', en: 'Minimalist window manager in C' } },
  ],
  editor: [
    { name: 'Neovim', desc: { fr: 'Éditeur principal, config from scratch', en: 'Main editor, built from scratch' } },
    { name: 'Zed', desc: { fr: 'Éditeur rapide pour le prototypage', en: 'Fast editor for prototyping' } },
  ],
  terminal: [
    { name: 'Kitty', desc: { fr: 'Terminal GPU-accelerated', en: 'GPU-accelerated terminal' } },
  ],
  hardware: [
    { name: 'HP ProDesk', desc: { fr: 'Mini PC — host Proxmox', en: 'Mini PC — Proxmox host' } },
    { name: 'LenovoEMC px4-400d', desc: { fr: 'NAS 4 baies pour le stockage', en: '4-bay NAS for storage' } },
    { name: 'VPS OVH', desc: { fr: 'Serveur dédié pour services auto-hébergés', en: 'Dedicated server for self-hosted services' } },
  ],
  tools: [
    { name: 'Git', desc: { fr: 'Gestion de versions', en: 'Version control' } },
    { name: 'Docker', desc: { fr: 'Conteneurisation', en: 'Containerization' } },
    { name: 'Tailscale', desc: { fr: 'Réseau maillé privé', en: 'Private mesh network' } },
    { name: 'Opencode', desc: { fr: 'Client IA pour le code en terminal', en: 'Terminal AI coding client' } },
  ],
};

const categories = [
  { key: 'os', icon: '🖥️', label: { fr: 'Système', en: 'OS' } },
  { key: 'shell', icon: '>_', label: { fr: 'Shell', en: 'Shell' } },
  { key: 'wm', icon: '🪟', label: { fr: 'Window Manager', en: 'Window Manager' } },
  { key: 'editor', icon: '✏️', label: { fr: 'Éditeur', en: 'Editor' } },
  { key: 'terminal', icon: '📟', label: { fr: 'Terminal', en: 'Terminal' } },
  { key: 'hardware', icon: '🔧', label: { fr: 'Matériel', en: 'Hardware' } },
  { key: 'tools', icon: '🧰', label: { fr: 'Outils', en: 'Tools' } },
] as const;

export default function Setup({ lang }: { lang: 'fr' | 'en' }) {
  return (
    <div className="setup-grid">
      {categories.map(cat => (
        <div key={cat.key} className="setup-card">
          <div className="setup-card-header">
            <span className="setup-icon">{cat.icon}</span>
            <h3 className="setup-category">{cat.label[lang]}</h3>
          </div>
          <div className="setup-items">
            {gear[cat.key as keyof typeof gear].map(item => (
              <div key={item.name} className="setup-item">
                <span className="setup-item-name">{item.name}</span>
                <span className="setup-item-desc">{item.desc[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
