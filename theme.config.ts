import { defineThemeConfig } from '@utils/defineThemeConfig'
import previewImage from '@assets/img/social-preview-image.png'
import logoImage from '@assets/img/sissy-logo.png'

// Sissy the Butterfly — site identity (WEBSITE-BUILD-SPEC §1/§2).
// 2.3b: logo/preview/hero/favicon all cut from Jen's REAL book art (operator-cleared interim
// use 2026-07-10; rights signature chase continues in parallel). Palette sampled from the art.
export default defineThemeConfig({
  name: 'Sissy the Butterfly',
  id: 'sissythebutterfly',
  logo: logoImage,
  seo: {
    title: 'Sissy the Butterfly — gentle adventures, free printables, and read-aloud moments',
    description:
      'Teacher-created children’s stories, free printables, and read-aloud moments for parents and caregivers, from the world of Sissy the Butterfly.',
    author: 'Jen — teacher, mom, and author',
    image: previewImage,
  },
  colors: {
    primary: '#400c9f', // Sissy’s deep wing violet (sampled from the book art; AA on light)
    secondary: '#e8a33d', // nectar gold (accent; _root.scss is the twin — keep in sync)
    neutral: '#b9bec4',
    outline: '#ff4500',
  },
  navigation: {
    darkmode: true,
    items: [
      { type: 'link', label: 'Home', href: '/' },
      { type: 'link', label: 'Meet Sissy & Friends', href: '/meet-sissy/' },
      {
        type: 'dropdown',
        label: 'Printables',
        items: [
          { label: 'All printables', href: '/printables/' },
          { label: 'Coloring', href: '/printables/coloring/' },
          { label: 'Crafts', href: '/printables/crafts/' },
          { label: 'Puzzles', href: '/printables/puzzles/' },
          { label: 'Activities', href: '/printables/activities/' },
          { label: 'Teaching Guides', href: '/printables/teaching-guides/' },
          { label: 'Make Your Own', href: '/printables/make-your-own/' },
          { label: 'Music & Songs', href: '/printables/music/' },
        ],
      },
      {
        type: 'dropdown',
        label: 'Guides',
        items: [
          { label: 'Butterfly life cycle activities', href: '/butterfly-life-cycle-activities/' },
          { label: 'Butterfly crafts for kids', href: '/butterfly-crafts-for-kids/' },
          { label: 'Screen-free activities', href: '/screen-free-activities-for-kids/' },
        ],
      },
      { type: 'link', label: 'Meet Jen', href: '/meet-jen/' },
      { type: 'link', label: 'For Parents', href: '/parents/' },
      { type: 'link', label: 'The Book', href: '/book/' },
    ],
  },
  socials: [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61591753294464',
      icon: 'lucide:facebook',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/sissythebutterfly/',
      icon: 'lucide:instagram',
    },
    {
      label: 'Pinterest',
      href: 'https://www.pinterest.com/sissythebutterfly/',
      icon: 'lucide:image',
    },
    {
      label: 'X',
      href: 'https://x.com/sissybutterfly3',
      icon: 'lucide:twitter',
    },
  ],
})
