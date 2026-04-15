import type { GuideCategory } from "@/types/guide";

export const dsa: GuideCategory = {
  id: "dsa",
  label: "DSA / LeetCode",
  skills: [
    {
      name: "Data Structures & Algorithms",
      status: "need",
      priority: 1,
      hot: true,
      why: "DSA is tested in every technical interview. A strong resume gets you the interview — DSA knowledge gets you the offer.",
      levels: [
        {
          label: "tier 1 — highest frequency interview topics (do these first)",
          topics: [
            "<strong>Arrays — Two Pointers:</strong> sorted array, palindrome check, 3sum, remove duplicates",
            "<strong>Arrays — Sliding Window:</strong> max subarray sum, longest substring without repeat, minimum window substring",
            "<strong>Hash Maps:</strong> two sum, group anagrams, top K frequent, valid anagram, contains duplicate",
            "<strong>Stacks:</strong> valid parentheses, min stack, daily temperatures, largest rectangle in histogram",
            "<strong>Binary Search:</strong> classic sorted array search, search in rotated array, find minimum in rotated",
            "<strong>Linked Lists:</strong> reverse linked list, merge two sorted lists, detect cycle (Floyd's), find middle",
            "<strong>Trees — DFS:</strong> inorder/preorder/postorder, max depth, same tree, path sum, validate BST",
            "<strong>Trees — BFS:</strong> level order traversal, minimum depth, connect level pointers",
          ],
        },
        {
          label: "tier 2 — appear in medium-hard interviews",
          topics: [
            "<strong>Heap / Priority Queue:</strong> kth largest element, top K frequent, merge K sorted lists, find median from stream",
            "<strong>Graphs — BFS:</strong> number of islands, rotting oranges, shortest path in binary matrix, clone graph",
            "<strong>Graphs — DFS:</strong> course schedule (topological sort), number of connected components, Pacific Atlantic water flow",
            "<strong>Dynamic Programming:</strong> climbing stairs, house robber, coin change, longest common subsequence, 0/1 knapsack, longest increasing subsequence",
            "<strong>Backtracking:</strong> subsets, permutations, combination sum, letter combinations of phone number",
          ],
        },
        {
          label: "tier 3 — advanced (study after tier 1+2)",
          topics: [
            "<strong>Tries:</strong> implement trie, word search II, longest word in dictionary",
            "<strong>Union-Find (Disjoint Set):</strong> number of connected components, redundant connection",
            "<strong>Monotonic Stack:</strong> next greater element, trapping rain water",
            "<strong>Intervals:</strong> merge intervals, insert interval, meeting rooms",
            "<strong>Bit manipulation:</strong> single number, number of 1 bits, reverse bits, missing number",
          ],
        },
      ],
      resources: [
        {
          name: "NeetCode.io — NeetCode 150 (free)",
          url: "https://neetcode.io/practice",
          type: "Practice",
          desc: "The best curated free list. 150 problems organized by pattern. Covers 90% of what appears in interviews.",
          covers: "Covers: Arrays, Two Pointers, Sliding Window, Stack, Binary Search, Linked List, Trees, Heap, Graphs, DP — all organized",
        },
        {
          name: "NeetCode YouTube (free video solutions)",
          url: "https://www.youtube.com/@NeetCode",
          type: "YouTube",
          desc: "Free video solution for every NeetCode problem. Clear explanations with drawings.",
          covers: "Covers: solution walkthrough + time/space complexity analysis for every problem",
        },
        {
          name: "LeetCode (free tier)",
          url: "https://leetcode.com",
          type: "Practice",
          desc: "~2000 free problems. Use NeetCode list to choose which ones. Premium not required.",
          covers: "Covers: all patterns — use the 'Explore' cards for structured topic-by-topic practice",
        },
        {
          name: "Visualgo.net",
          url: "https://visualgo.net",
          type: "Tool",
          desc: "Free visual animations of sorting algorithms, graph traversal, data structures.",
          covers: "Covers: BFS/DFS, sorting, linked list, binary tree — see the algorithm run step by step",
        },
        {
          name: "Big-O Cheat Sheet",
          url: "https://www.bigocheatsheet.com",
          type: "Reference",
          desc: "Free quick reference for time and space complexity of common algorithms and data structures.",
          covers: "Covers: complexity of every operation on every data structure",
        },
        {
          name: "Blind 75 (free list)",
          url: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions",
          type: "Practice",
          desc: "Classic curated 75 problems. Subset of NeetCode 150 — start here if time is tight.",
          covers: "Covers: the essential 75 problems that appear most in FAANG and startup interviews",
        },
      ],
      note: "Strategy: 2 problems/day, always pick from NeetCode 150, write the solution then watch the video. Track your weak patterns. Tier 1 alone covers ~70% of interviews you'll face. After 4 weeks of consistent practice, you'll notice problems feeling familiar.",
    },
  ],
};
