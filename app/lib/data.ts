export type Folder = { id: string; name: string };

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  description: string;
  folderId: string;
};

export const folders: Folder[] = [
  { id: "dev", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "news", name: "뉴스" },
  { id: "study", name: "학습" },
];

export const bookmarks: Bookmark[] = [
  { id: "1", title: "Next.js", url: "https://nextjs.org", description: "React 프레임워크 공식 문서", folderId: "dev" },
  { id: "2", title: "MDN Web Docs", url: "https://developer.mozilla.org", description: "웹 기술 레퍼런스", folderId: "dev" },
  { id: "3", title: "Tailwind CSS", url: "https://tailwindcss.com", description: "유틸리티 기반 CSS 프레임워크", folderId: "design" },
  { id: "4", title: "Dribbble", url: "https://dribbble.com", description: "디자인 영감 모음", folderId: "design" },
  { id: "5", title: "Hacker News", url: "https://news.ycombinator.com", description: "개발자 뉴스 커뮤니티", folderId: "news" },
  { id: "6", title: "Coursera", url: "https://www.coursera.org", description: "온라인 강의 플랫폼", folderId: "study" },
];
