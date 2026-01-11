# Public Form Sharing & Submission Architecture

## Overview
This document outlines the technical approach for implementing public form access, sharing capabilities, and the submission flow.

## 1. Routing Strategy
We will create a dedicated public route group to isolate the public view from the authenticated dashboard layout.

- **Route Path**: `app/(public)/f/[formId]/page.tsx`
- **Layout**: `app/(public)/layout.tsx` (Minimal layout, centers content, handles theme injection based on form design).

### Access Logic
When a user visits `/f/[formId]`:
1.  **Fetch Form**: Retrieve form by ID.
2.  **Status Check**:
    - `published`: Render the `FormRenderer`.
    - `paused`: Render a "Temporarily Unavailable" placeholder.
    - `closed`: Render a "Form Closed" placeholder.
    - `draft` / Not Found: Render 404 Not Found to prevent leaking draft existence.

## 2. Submission Logic
We will verify submissions server-side to ensure integrity.

### Server Action: `submitResponse`
- **File**: `actions/form.ts`
- **Parameters**: `formId: string`, `formValues: Record<string, any>`
- **Workflow**:
    1.  **Validation**: Check if form exists and is `published`.
    2.  **Quota Check**:
        - Verify `User.responsesUsed` < `User.responseLimit` for the form owner.
        - If quota exceeded, reject submission (or handle gracefully).
    3.  **Persistence**: Create a new record in `Response` table.
    4.  **Updates**: Transactional update:
        - Increment `Form.totalResponses`.
        - Update `Form.lastResponseAt`.
        - Increment `User.responsesUsed` (Quota tracking).
    5.  **Return**: Success boolean or error message.

### Client-Side Validation
- We naturally rely on **HTML5 Native Validation** (`required`, `type="email"`, `min`, `max`, etc.) rendered by the `FormRenderer`.
- No heavy `react-hook-form` or `zod` schemas on the public client side to keep the bundle small and fast.

## 3. Sharing Specifications
Located in the Dashboard Header -> "Share" Button.

### Components
- **`ShareDialog`**: A modal presenting three sharing methods.

### Methods
1.  **Direct Link**
    - Display: `https://[app-url]/f/[formId]`
    - Action: Copy to clipboard.

2.  **Embed Code**
    - Code Snippet:
      ```html
      <div style="width:100%;height:100%;min-height:600px;">
        <iframe src="https://[app-url]/f/[formId]" style="width:100%;height:100%;border:none;border-radius:8px;"></iframe>
      </div>
      ```
    - Action: Copy code.

3.  **QR Code**
    - Generated client-side using a library (e.g., `react-qr-code`).
    - **Features**:
        - View on screen.
        - **Download/Share**: Button to download the QR code as an image (PNG/SVG) so it can be printed or shared on social media.

## 4. Component Adaptation
### `FormRenderer` Update
- Needs to support an `onSubmit` handler.
- Currently, it might be purely presentational. We need to wrap it in a `<form>` context (likely `react-hook-form` inside `PublicFormPage`) or ensure `FormRenderer` can handle interaction in "live" mode vs "preview" mode.

## 5. Security Note
- **Rate Limiting**: (Future) Prevent spam submissions from same IP.
- **Captchas**: (Future) Integration for bot protection.
- For now, we rely on the obscure URL ID (cuid) and Form Status.
