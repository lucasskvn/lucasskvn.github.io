const gear = {
  os: [
    { name: 'NixOS', desc: { fr: 'Distribution Linux immuable, reproductible', en: 'Reproducible, declarative Linux distro' } },
    { name: 'Proxmox VE', desc: { fr: 'Hyperviseur pour mon homelab', en: 'Hypervisor for my homelab' } },
  ],
  shell: [
    { name: 'Bash', desc: { fr: 'Shell principal, config sur mesure', en: 'Main shell, custom config' } },
    { name: 'Zsh', desc: { fr: 'Shell secondaire avec starship', en: 'Secondary shell with starship' } },
  ],
  editor: [
    { name: 'Neovim', desc: { fr: 'Éditeur principal, config from scratch', en: 'Main editor, built from scratch' } },
    { name: 'VS Code', desc: { fr: 'Pour le prototypage rapide', en: 'For quick prototyping' } },
  ],
  terminal: [
    { name: 'Kitty', desc: { fr: 'Terminal GPU-accelerated', en: 'GPU-accelerated terminal' } },
  ],
  hardware: [
    { name: 'Framework 13', desc: { fr: 'Laptop modulaire, AMD Ryzen 5', en: 'Modular laptop, AMD Ryzen 5' } },
    { name: 'VPS OVH', desc: { fr: 'Serveur dédié pour services auto-hébergés', en: 'Dedicated server for self-hosted services' } },
    { name: 'Proxmox Host', desc: { fr: 'Serveur maison pour homelab', en: 'Home server for homelab' } },
  ],
  tools: [
    { name: 'Git', desc: { fr: 'Gestion de versions', en: 'Version control' } },
    { name: 'Docker', desc: { fr: 'Conteneurisation', en: 'Containerization' } },
    { name: 'Nix', desc: { fr: 'Gestion de paquets déclarative', en: 'Declarative package management' } },
    { name: 'Tailscale', desc: { fr: 'Réseau maillé privé', en: 'Private mesh network' } },
  ],
};

const categories = [
  { key: 'os', icon: '🖥️', label: { fr: 'Système', en: 'OS' } },
  { key: 'shell', icon: '>_', label: { fr: 'Shell', en: 'Shell' } },
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
