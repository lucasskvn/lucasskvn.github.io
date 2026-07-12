import { useEffect, useState } from 'react';
import SEO from '../components/SEO';

const LASTFM_USER = 'Snow3945KKK';
const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const LASTFM_BASE = 'https://ws.audioscrobbler.com/2.0/';
interface Track {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  nowPlaying: boolean;
}

interface TopArtist {
  name: string;
  playcount: string;
  image: string;
  url: string;
}

export default function Music({ lang }: { lang: 'fr' | 'en' }) {
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<TopArtist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastfm = async () => {
      try {
        // Now playing + recent
        const recentRes = await fetch(
          `${LASTFM_BASE}?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=10`
        );
        const recentData = await recentRes.json();
        const tracks = recentData?.recenttracks?.track || [];

        const mapped: Track[] = tracks.map((t: any) => ({
          name: t.name,
          artist: t.artist['#text'],
          album: t.album['#text'],
          image: t.image?.find((i: any) => i.size === 'large')?.['#text'] || '',
          url: t.url,
          nowPlaying: t['@attr']?.nowplaying === 'true',
        }));

        const playing = mapped.find(t => t.nowPlaying) || null;
        setNowPlaying(playing);
        setRecentTracks(mapped.filter(t => !t.nowPlaying).slice(0, 9));

        // Top artists — fetch real images via artist.getinfo
        const topRes = await fetch(
          `${LASTFM_BASE}?method=user.gettopartists&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&period=1month&limit=8`
        );
        const topData = await topRes.json();
        const rawArtists = topData?.topartists?.artist || [];

        const DEEZER_BASE = 'https://api.deezer.com';

        const artists: TopArtist[] = await Promise.all(
          rawArtists.map(async (a: any) => {
            let img = '';

            // Try Deezer for real artist images (free, no API key needed)
            try {
              const deezerRes = await fetch(
                `${DEEZER_BASE}/search/artist?q=${encodeURIComponent(a.name)}&limit=1`
              );
              const deezerData = await deezerRes.json();
              const deezerArtist = deezerData?.data?.[0];
              if (deezerArtist) {
                img = deezerArtist.picture_xl || deezerArtist.picture_medium || '';
              }
            } catch {}

            // Fallback: Last.fm image if Deezer failed
            if (!img) {
              img = a.image?.find((i: any) => i.size === 'mega')?.['#text']
                || a.image?.find((i: any) => i.size === 'extralarge')?.['#text']
                || a.image?.find((i: any) => i.size === 'large')?.['#text']
                || '';
            }

            return {
              name: a.name,
              playcount: a.playcount,
              image: img,
              url: a.url,
            };
          })
        );
        setTopArtists(artists);
      } catch (e) {
        console.error('Last.fm fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchLastfm();
    const interval = setInterval(fetchLastfm, 30000);
    return () => clearInterval(interval);
  }, []);

  const t = {
    fr: { title: 'Musique', desc: 'Ce que j\'écoute en ce moment', now: 'En écoute', recent: 'Récemment écouté', top: 'Top artistes du mois', noData: 'Aucune donnée pour le moment' },
    en: { title: 'Music', desc: 'What I\'m listening to right now', now: 'Now Playing', recent: 'Recently Played', top: 'Top Artists This Month', noData: 'No data yet' },
  }[lang];

  return (
    <div className="page-container fade-in">
      <SEO title="Music" description="Ce que Lucas écoute en ce moment — Last.fm integration" path="/music" />

      <h1 className="title">{t.title}</h1>
      <p className="subtitle">{t.desc}</p>

      {loading ? (
        <div className="music-loading">
          <div className="skeleton skeleton-now" />
          <div className="skeleton skeleton-list" />
        </div>
      ) : (
        <>
          {/* Now Playing */}
          {nowPlaying && (
            <div className="now-playing-card">
              <div className="now-playing-bar" />
              <img
                src={nowPlaying.image || '/assets/placeholder.jpg'}
                alt={nowPlaying.album}
                className="now-playing-img"
              />
              <div className="now-playing-info">
                <span className="now-playing-badge">{t.now}</span>
                <a href={nowPlaying.url} target="_blank" rel="noopener noreferrer" className="now-playing-title">
                  {nowPlaying.name}
                </a>
                <span className="now-playing-artist">{nowPlaying.artist}</span>
                <span className="now-playing-album">{nowPlaying.album}</span>
              </div>
            </div>
          )}

          {/* Recent Tracks */}
          <section style={{ marginTop: '3rem' }}>
            <h2 className="section-title">{t.recent}</h2>
            <div className="recent-tracks">
              {recentTracks.length === 0 ? (
                <p className="empty-state">{t.noData}</p>
              ) : (
                recentTracks.map((track, i) => (
                  <a
                    key={i}
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="track-row"
                  >
                    <img src={track.image || '/assets/placeholder.jpg'} alt={track.album} className="track-img" />
                    <div className="track-info">
                      <span className="track-name">{track.name}</span>
                      <span className="track-artist">{track.artist}</span>
                    </div>
                  </a>
                ))
              )}
            </div>
          </section>

          {/* Top Artists */}
          <section style={{ marginTop: '3rem' }}>
            <h2 className="section-title">{t.top}</h2>
            <div className="top-artists-grid">
              {topArtists.length === 0 ? (
                <p className="empty-state">{t.noData}</p>
              ) : (
                topArtists.map((artist, i) => (
                  <a
                    key={i}
                    href={artist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="artist-card"
                  >
                    {artist.image ? (
                      <img src={artist.image} alt={artist.name} className="artist-img" />
                    ) : (
                      <div className="artist-img artist-img-fallback">
                        {artist.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="artist-name">{artist.name}</span>
                    <span className="artist-plays">{artist.playcount} plays</span>
                  </a>
                ))
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
