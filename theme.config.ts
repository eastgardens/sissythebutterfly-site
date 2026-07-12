import { defineThemeConfig } from '@utils/defineThemeConfig'
import previewImage from '@assets/img/social-preview-image.png'
import logoImage from '@assets/img/logo.svg'

// Sissy the Butterfly — site identity (WEBSITE-BUILD-SPEC §1/§2; palette = the render brand).
// Logo + preview image are TEMPLATE placeholders until 2.3b (Jen's approved art).
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
    primary: '#724a9e', // the warm violet from Sissy’s card brand
    secondary: '#e8a33d', // nectar gold
    neutral: '#b9bec4',
    outline: '#ff4500',
  },
  navigation: {
    darkmode: true,
    items: [
      { type: 'link', label: 'Home', href: '/' },
      { type: 'link', label: 'Meet Sissy & Friends', href: '/meet-sissy/' },
      { type: 'link', label: 'Printables', href: '/printables/' },
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
      href: 'https://x.com/sissybutterfly',
      icon: 'lucide:twitter',
    },
  ],
})
