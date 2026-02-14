/**
 * Convert a Google Drive file URL to a thumbnail URL.
 * Input: https://drive.google.com/file/d/{FILE_ID}/... or similar
 * Output: https://lh3.googleusercontent.com/d/{FILE_ID}=w400
 */
export function driveUrlToThumbnail(url: string): string | null {
  if (!url) return null;

  // Extract file ID from various Google Drive URL formats
  const patterns = [
    /\/d\/([a-zA-Z0-9_-]+)/,         // /d/{ID}/
    /id=([a-zA-Z0-9_-]+)/,           // ?id={ID}
    /\/open\?id=([a-zA-Z0-9_-]+)/,   // /open?id={ID}
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}=w400`;
    }
  }

  // If it's already a direct image URL, return as-is
  if (url.startsWith("http") && !url.includes("drive.google.com")) {
    return url;
  }

  return null;
}

/** Gradient placeholders for resources without images */
const GRADIENTS = [
  "from-emerald-400 to-teal-500",
  "from-blue-400 to-indigo-500",
  "from-purple-400 to-pink-500",
  "from-amber-400 to-orange-500",
  "from-cyan-400 to-blue-500",
];

export function getPlaceholderGradient(index: number): string {
  return GRADIENTS[index % GRADIENTS.length];
}
