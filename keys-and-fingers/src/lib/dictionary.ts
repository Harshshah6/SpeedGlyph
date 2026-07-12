export const words = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
];

export const quotes = [
  "Meditation has been practiced for thousands of years and modern research confirms its benefits for reducing stress, improving focus, and promoting overall mental well being.",
  "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. Never give in except to convictions of honor and good sense.",
  "In three words I can sum up everything I've learned about life: it goes on. You can't connect the dots looking forward; you can only connect them looking backwards.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
  "Design is not just what it looks like and feels like. Design is how it works.",
  "Innovation distinguishes between a leader and a follower.",
  "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma - which is living with the results of other people's thinking.",
  "Stay hungry. Stay foolish.",
];

export function getRandomWords(count: number): string {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result.join(" ");
}

export function getRandomQuote(): string {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
