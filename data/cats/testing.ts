import type { GuideCategory } from "@/types/guide";

export const testing: GuideCategory = {
  id: "testing",
  label: "Testing",
  skills: [
    {
      name: "Jest + React Testing Library",
      status: "have",
      priority: 2,
      why: "Testing is asked in virtually every technical interview. Being able to write good tests signals production maturity.",
      levels: [
        {
          label: "beginner",
          topics: [
            "<strong>Test structure:</strong> describe() for grouping, it()/test() for cases, beforeEach/afterEach for setup/teardown",
            "<strong>Matchers:</strong> toBe, toEqual (deep), toBeTruthy, toBeFalsy, toBeNull, toContain, toHaveLength, toThrow",
            "<strong>Async tests:</strong> async/await in tests, resolves/rejects matchers",
            "<strong>React Testing Library:</strong> render(), screen.getByRole(), screen.getByText(), screen.getByTestId()",
            "<strong>Queries:</strong> getBy (throws if not found), queryBy (returns null), findBy (async wait)",
            "<strong>User interactions:</strong> userEvent.click(), userEvent.type(), userEvent.clear()",
            "<strong>What to test:</strong> user behavior, not implementation — don't test internal state",
          ],
        },
        {
          label: "intermediate",
          topics: [
            "<strong>Mocking:</strong> jest.fn() for functions, jest.mock('module') for modules, jest.spyOn(obj, 'method')",
            "<strong>Mock implementations:</strong> mockReturnValue, mockResolvedValue, mockRejectedValue",
            "<strong>MSW (Mock Service Worker):</strong> intercept API calls at network level — better than mocking fetch",
            "<strong>Testing hooks:</strong> renderHook() from React Testing Library",
            "<strong>Testing with context:</strong> wrap render() in custom wrapper with providers",
            "<strong>waitFor:</strong> wait for async updates, assertions inside waitFor",
            "<strong>Coverage:</strong> jest --coverage, understand what to aim for vs what's waste",
          ],
        },
        {
          label: "advanced",
          topics: [
            "<strong>Integration tests:</strong> test entire feature flows, realistic data",
            "<strong>Testing Zustand/Redux:</strong> test store actions and selectors independently",
            "<strong>Snapshot testing:</strong> when it helps (stable UI) vs when it hurts (brittle noise)",
            "<strong>Performance testing:</strong> React profiler in tests",
          ],
        },
      ],
      resources: [
        {
          name: "Jest Official Docs",
          url: "https://jestjs.io/docs/getting-started",
          type: "Docs",
          desc: "Complete free reference. The 'Expect' API page is your most-used reference.",
          covers: "Covers: all matchers, mocking APIs, configuration, coverage",
        },
        {
          name: "Testing Library Docs + Guiding Principles",
          url: "https://testing-library.com/docs/react-testing-library/intro/",
          type: "Docs",
          desc: "Read the Guiding Principles page first — it changes how you think about testing.",
          covers: "Covers: queries, user-event, async utilities, accessibility-first testing",
        },
        {
          name: "Kent C. Dodds Testing Blog Posts (free)",
          url: "https://kentcdodds.com/blog?q=testing",
          type: "Blog",
          desc: "The creator of React Testing Library. Free blog posts on testing philosophy and practice.",
          covers: "Covers: avoid implementation details, common mistakes, integration testing strategies",
        },
        {
          name: "MSW (Mock Service Worker) Docs",
          url: "https://mswjs.io/docs/",
          type: "Docs",
          desc: "The modern way to mock APIs in tests. Free.",
          covers: "Covers: request handlers, REST handlers, integration with Jest and Playwright",
        },
      ],
    },
    {
      name: "Playwright",
      status: "have",
      priority: 2,
      why: "Playwright is in your Ghumakkad project. Add it to your skills section now — it's a real differentiator since most candidates only know unit testing.",
      levels: [
        {
          label: "beginner",
          topics: [
            "<strong>Setup:</strong> npx playwright install, playwright.config.ts, test runner",
            "<strong>Core commands:</strong> page.goto(url), page.click(selector), page.fill(selector, value), page.waitForURL()",
            "<strong>Locators (modern API):</strong> page.getByRole(), page.getByText(), page.getByLabel(), page.getByTestId()",
            "<strong>Assertions:</strong> expect(page).toHaveURL(), expect(locator).toBeVisible(), toHaveText(), toHaveValue()",
            "<strong>Test structure:</strong> test(), test.describe(), test.beforeEach() — same as Jest",
            "<strong>Running tests:</strong> npx playwright test, --ui mode (interactive), --headed (see browser)",
          ],
        },
        {
          label: "intermediate",
          topics: [
            "<strong>Page Object Model:</strong> encapsulate page selectors and actions in a class — maintainable tests",
            "<strong>API testing:</strong> request.get/post — test your API routes directly in Playwright",
            "<strong>Network interception:</strong> page.route(url, handler) — mock API responses in E2E tests",
            "<strong>Screenshots + videos:</strong> on failure, full page screenshots, video recording",
            "<strong>Multi-browser:</strong> chromium, firefox, webkit — run same tests across all three",
            "<strong>Authentication state:</strong> storageState to reuse logged-in sessions across tests",
          ],
        },
        {
          label: "advanced",
          topics: [
            "<strong>Playwright in GitHub Actions:</strong> install browsers, run tests, upload report as artifact",
            "<strong>Visual regression:</strong> expect(page).toHaveScreenshot() — pixel-by-pixel comparison",
            "<strong>Accessibility testing:</strong> @axe-core/playwright — automated a11y audit in E2E tests",
            "<strong>Sharding:</strong> split test suite across multiple CI runners for speed",
          ],
        },
      ],
      resources: [
        {
          name: "Playwright Official Docs",
          url: "https://playwright.dev/docs/intro",
          type: "Docs",
          desc: "Best Playwright resource. Includes codegen tool that writes tests by recording your clicks.",
          covers: "Covers: every API, locators, assertions, network, CI integration",
        },
        {
          name: "Playwright YouTube Channel",
          url: "https://www.youtube.com/@Playwrightdev",
          type: "YouTube",
          desc: "Official free tutorial videos from the Playwright team.",
          covers: "Covers: getting started, codegen, API testing, CI setup",
        },
      ],
      note: "ADD Playwright to your skills section immediately across all 3 resumes. You used it in Ghumakkad — it's already experience. This is a 2-minute resume win.",
    },
  ],
};
