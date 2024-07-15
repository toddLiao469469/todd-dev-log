import type { Site } from '$lib/types/site';
import type { Giscus } from '$lib/types/giscus';
import type { DD } from '$lib/types/dd';

import Avatar from '$assets/avatar.jpeg';
import Avatar_128 from '$assets/avatar.jpeg?w=128&h=128&format=avif;webp&imagetools';
import Avatar_48_PNG from '$assets/avatar.jpeg?w=48&h=48&imagetools';
import Avatar_96_PNG from '$assets/avatar.jpeg?w=96&h=96&imagetools';
import Avatar_192_PNG from '$assets/avatar.jpeg?w=192&h=192&imagetools';
import Avatar_512_PNG from '$assets/avatar.jpeg?w=512&h=512&imagetools';

import SiteCover from '$assets/qwer.webp';

export const siteConfig: Site.Config = {
  url: 'https://blog.toddliao.dev/',
  title: "Todd's Dev Logs",
  subtitle: '一個軟體工程師的學習筆記',
  description: '一個軟體工程師的學習筆記',
  lang: 'en',
  timeZone: 'Asia/Taipei',
  since: 2020,
  cover: SiteCover,
  author: {
    name: 'Todd Liao',
    status: '👾',
    statusTip:
      '<a href="https://github.com/kwchang0831/svelte-QWER" rel="external" style="color:#0F0" onMouseOver="this.style.color=\'#0FF\'" onMouseOut="this.style.color=\'#0F0\'" >QWER</a> is Awesome !',
    avatar: Avatar,
    avatar_128: Avatar_128,
    avatar_48_png: Avatar_48_PNG,
    avatar_96_png: Avatar_96_PNG,
    avatar_192_png: Avatar_192_PNG,
    avatar_512_png: Avatar_512_PNG,
    website: 'https://blog.toddliao.dev/',
    github: 'https://github.com/toddLiao469469',
    email: 'toddliao.dev@gmail.com',
    twitter: 'https://twitter.com/toddLiao469469',
    bio: `目前在 Ionex 擔任軟體工程師 <br/> 最近在研究 Haskell、Svelte 及 Rust`,
  },
};

export const headConfig: Site.Head = {
  // Used for IndieWeb
  me: ['https://github.com/toddLiao469469'],
  custom: ({ dev }) =>
    dev
      ? [
          // For Development Environment
        ]
      : [
          // For Production Environment
          // Replace the following with your own setting
        ],
};

export const dateConfig: Site.DateConfig = {
  toPublishedString: {
    locales: 'en-US',
    options: {
      year: 'numeric',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: `${siteConfig.timeZone}`,
    },
  },
  toUpdatedString: {
    locales: 'en-US',
    options: {
      year: 'numeric',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: `${siteConfig.timeZone}`,
    },
  },
};

// Replace with your own Giscus setting
// See https://giscus.app/
export const giscusConfig: Giscus.Config = {
  enable: true,
  id: 'giscus-comment',
  repo: 'toddliao469469/todd-dev-log',
  repoId: 'R_kgDOIoFQbw',
  category: 'General',
  categoryId: 'DIC_kwDOIoFQb84CgzZr',
  mapping: 'title',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  loading: 'lazy',
  lang: 'zh-TW',
  'data-strict': '0',
};

export const navConfig: (DD.Nav | DD.Link)[] = [
  {
    name: '關於我',
    url: '/about',
  },
];

export const mobilenavConfig: DD.Nav = {
  orientation: 2,
  links: [
    {
      name: '關於我',
      url: '/about',
    },
  ],
};
