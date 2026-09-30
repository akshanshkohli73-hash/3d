// Centralized Character Asset Resolver for TEYVAT AI
// Provides CDN image endpoints for Genshin character artwork, icons, splash art, elements, and weapons with robust fallbacks.

export interface CharacterAssets {
  icon: string;
  card: string;
  splash: string;
  elementIcon?: string;
}

const GENSHIN_DEV_BASE = 'https://genshin.dev/characters';

// Fallback high quality community/official URLs or SVG data URLs for elements
export const ELEMENT_ICONS: Record<string, string> = {
  Pyro: 'https://static.wikia.nocookie.net/gensin-impact/images/e/e8/Element_Pyro.svg',
  Hydro: 'https://static.wikia.nocookie.net/gensin-impact/images/8/80/Element_Hydro.svg',
  Anemo: 'https://static.wikia.nocookie.net/gensin-impact/images/a/a4/Element_Anemo.svg',
  Electro: 'https://static.wikia.nocookie.net/gensin-impact/images/7/73/Element_Electro.svg',
  Dendro: 'https://static.wikia.nocookie.net/gensin-impact/images/f/f4/Element_Dendro.svg',
  Cryo: 'https://static.wikia.nocookie.net/gensin-impact/images/8/88/Element_Cryo.svg',
  Geo: 'https://static.wikia.nocookie.net/gensin-impact/images/4/4a/Element_Geo.svg',
};

// Normalized Character ID Mapping to genshin.dev slug
const ID_SLUG_MAP: Record<string, string> = {
  hu_tao: 'hu-tao',
  raiden_shogun: 'raiden',
  furina: 'furina',
  neuvillette: 'neuvillette',
  kazuha: 'kazuha',
  xiangling: 'xiangling',
  bennett: 'bennett',
  xingqiu: 'xingqiu',
  nahida: 'nahida',
};

export class CharacterAssetResolver {
  /**
   * Resolves artwork URLs for a given character ID.
   */
  static getAssets(characterId: string): CharacterAssets {
    const slug = ID_SLUG_MAP[characterId] || characterId.toLowerCase().replace(/_/g, '-');
    // Primary URL using genshin.dev API with .png extensions
    return {
      icon: `${GENSHIN_DEV_BASE}/${slug}/icon.png`,
      card: `${GENSHIN_DEV_BASE}/${slug}/card.png`,
      splash: `${GENSHIN_DEV_BASE}/${slug}/gacha-splash.png`,
    };
  }

  /**
   * Returns backup high-res image URL if CDN response fails
   */
  static getFallbackImage(characterId: string): string {
    const normalized = characterId.toLowerCase();
    if (normalized.includes('hu_tao') || normalized.includes('hu-tao')) {
      return 'https://images.alphacoders.com/112/1128362.png';
    }
    if (normalized.includes('raiden')) {
      return 'https://images.alphacoders.com/116/1169123.jpg';
    }
    if (normalized.includes('furina')) {
      return 'https://images.alphacoders.com/133/1337482.png';
    }
    return `https://genshin.dev/characters/${normalized.replace(/_/g, '-')}/icon`;
  }

  /**
   * Returns fallback avatar gradient / initials if image fails to render.
   */
  static getFallbackStyle(element: string) {
    switch (element) {
      case 'Pyro':
        return 'from-rose-600/30 to-amber-600/30 text-rose-300 border-rose-500/40';
      case 'Hydro':
        return 'from-cyan-600/30 to-blue-600/30 text-cyan-300 border-cyan-500/40';
      case 'Anemo':
        return 'from-emerald-600/30 to-teal-600/30 text-emerald-300 border-emerald-500/40';
      case 'Electro':
        return 'from-purple-600/30 to-violet-600/30 text-purple-300 border-purple-500/40';
      case 'Dendro':
        return 'from-lime-600/30 to-emerald-600/30 text-lime-300 border-lime-500/40';
      case 'Cryo':
        return 'from-sky-600/30 to-cyan-600/30 text-sky-300 border-sky-500/40';
      case 'Geo':
        return 'from-amber-600/30 to-yellow-600/30 text-amber-300 border-amber-500/40';
      default:
        return 'from-slate-700 to-slate-800 text-slate-300 border-slate-700';
    }
  }
}
