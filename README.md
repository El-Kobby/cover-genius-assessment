# Cover Genius Assessment – Playwright Test Suite

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Supported Browsers**: Chrome, Firefox, Safari (Playwright will install browser binaries automatically)

## Setup Steps

1. **Clone the repository**
   ```sh
   git clone https://github.com/El-Kobby/cover-genius-assessment.git
   cd cover-genius-assessment
   ```

2. **Install Playwright**
   ```sh
   npm init playwright@latest
   ```

3. **Run the test suite**
   ```sh
   npx playwright test
   ```

4. **View HTML test report**
   After running tests, open the report:
   ```sh
   npx playwright show-report
   ```

## Assumptions Made
- The base URL for tests is set to `http://www.rentalcover.com/`.
- The application under test is stable and accessible at the above URL.
- Test IDs (`data-test-id`) are present and unique for key elements, but some headings share the same test ID.
- The test suite is designed for desktop browsers but should work for mobile as well

## Issues Found
- **Non-unique `data-test-id` attributes**: Multiple headings share the same `data-test-id="Heading-title"`, causing strict mode locator violations. Workarounds using `nth()` are implemented.
- **Element overlays**: Some input fields are covered by placeholder elements, requiring clicks on parent containers instead of direct input fields.
- **Timeouts**: Occasionally, elements take longer to become interactable, so generous timeouts are configured.
- **Accessibility**: Some elements lack unique roles or labels, making them harder to target reliably.
