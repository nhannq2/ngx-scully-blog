// ================================================================================
// Personal information

import { SocialLink } from '@model';

// Your first name
export const FIRST_NAME = 'Nhan';
// Your last name
export const LAST_NAME = 'Nguyen';
// Your email address.
export const EMAIL = 'nhanpublic@gmail.com';

export const SOCIAL_LINKS: SocialLink[] = [
  {
    title: 'Linkedin',
    url: 'https://linkedin.com/in/nhaancs',
    icon: ['fab', 'linkedin-in'],
    size: '1x',
  },
  {
    title: 'Github',
    url: 'https://github.com/nhaancs',
    icon: ['fab', 'github'],
    size: '1x',
  },
  {
    title: 'Twitter',
    url: 'https://twitter.com/nhaancs',
    icon: ['fab', 'twitter'],
    size: '1x',
  },
  {
    title: 'Facebook',
    url: 'https://facebook.com/nhaancs',
    icon: ['fab', 'facebook-f'],
    size: '1x',
  },
];

// Introduce who you are, what are you doing
export const SHORT_INTRODUCTION =
  "I'm a full-stack developer with the main focus on Golang and Angular.";

/**
 * Your profile image url. Should be a square image.
 *
 * You can provide an image link here, or add an image to
 * `ngx-scully-blog/src/assets/images` folder and provide a link as following format
 * `https://yourdomain.com/assets/images/your-image-name.jpg`. For example,
 * `https://yourdomain.com/assets/images/profile.jpg`
 */
export const PROFILE_IMAGE = 'assets/images/profile.jpg';

// ================================================================================
// Blog information

// Your root url. Normally, this url is: https://your-firebase-project-id.web.app
export const BLOG_ROOT_URL = 'https://ngx-scully-blog-demo.web.app';
export const BLOG_TITLE = 'Nhan Nguyen Blog';
// An description that is displayed in the preview section when home page is shared on social networks.
export const BLOG_DESCRIPTION =
  "Hi, my name is Nhan Nguyen (Nathan). I'm a full-stack developer with the main focus on Golang and Angular.";
export const BLOG_KEYWORDS =
  'programming, angular, golang, go, javascript, typescript';
/**
 * An image that is displayed in the preview section when you share your home page on social networks.
 *
 * You can provide an image link here, or add an image to
 * `ngx-scully-blog/src/assets/images` folder and provide a link as following format
 * `https://yourdomain.com/assets/images/your-image-name`. For example,
 * `https://yourdomain.com/assets/images/preview.jpg`
 */
export const BLOG_DEFAULT_COVER = 'assets/images/default_share_img.jpg';

//Your copyright text, in HTML format
export const BLOG_COPYRIGHT_CONTENT = `Copyright &copy; ${new Date().getFullYear()} ${BLOG_TITLE}. All Rights Reserved.`;
