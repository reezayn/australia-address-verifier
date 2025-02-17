# Australia Address Validator

## Overview

This project is an address validation application using modern web technologies including Next.js 15 (with the new App Router), React, TypeScript, Tailwind CSS, and Apollo (Client & Server) to create a secure, robust solution. The application features a user-friendly form that captures a postcode, suburb, and state and validates the address by querying the Australia Post API through a GraphQL proxy.

![image](https://github.com/user-attachments/assets/2f9b4442-fc1f-4249-a9eb-9f6abb866e2f)


## Installation and Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/reezayn/australia-address-verifier.git
   cd australia-address-verifier
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a file named `.env.local` in the project root and add:

   ```bash
   API_BEARER_TOKEN={'your-api-bearer-token'}
   ```

4. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **UI Form:**
  - Navigate to the home page.
  - Enter a postcode, suburb, and state.
  - Upon submission, the form sends a GraphQL mutation to the backend.
  - The backend calls the Australia Post API, validates the input, and returns an appropriate message:
    - **Valid Input Example:**
      - State: `NSW`
      - Suburb: `Broadway`
      - Postcode: `2007`  
        → _"The postcode, suburb, and state input are valid."_
    - **Error Example:**
      - If the postcode does not match or the suburb isn’t found in the state, detailed error messages are displayed.

## Running Tests

- **Run All Tests:**

  ```bash
  npm run test
  ```

This will run every test case from Appendix B.

## Security Considerations

- **Environment Variables:**
  - Sensitive API keys are stored in `.env.local` and are not committed to version control.
- **Server-Side Operations:**
  - The Australia Post API is called from the backend GraphQL proxy, keeping the API key secure.
- **CORS and OPTIONS Handling:**
  - The API route supports OPTIONS requests for CORS preflight, ensuring proper API access.
- **Input Validation:**
  - Both client-side and server-side validations are implemented.

## Technologies Used

- **Frontend:** Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **Backend/GraphQL:** Apollo Client, @apollo/server, @as-integrations/next
- **Testing:** Jest
- **Tooling:** ESLint, Prettier
