# Better auth flow description

# DropForm – Authentication Flow (Behavior Description Only)

## Entry Points

The system exposes two user entry points:

- **Signup page** (email + password only)
- **Login page** (email + password, Google, GitHub)

OAuth providers are available **only on the login page**.
First-time OAuth users create their account through the login flow.

---

## Email Signup Flow

1. User signs up using email and password.
2. The system creates the user account.
3. User need to varify thier email first.
4. after Varification, login them from varify-email page.



---

## Email Verification Flow

1. User clicks the verification link received by email.
2. The system verifies the link.
3. The user’s email is marked as verified.
4. A welcome email is sent asynchronously (only once).
5. The user is redirected to the dashboard with **full access**.

---

## Email Login Flow

1. User logs in using email and password.
2. The system authenticates the user.
3. The user is logged in successfully.
4. If the email is verified:

   - The user gets full access.

5. If the email is not verified:

   - The user is logged in but access remains restricted.
   - The user is prompted to verify their email.

Login is never blocked due to missing email verification.

---

## OAuth Login Flow (Google / GitHub)

1. User selects Google or GitHub from the login page.
2. The system authenticates the user with the provider.
3. If the user already exists:

   - The user is logged in.

4. If the user does not exist:

   - A new user account is created automatically.

5. OAuth users are treated as email-verified by default.
6. The user is logged in and given full access.
7. A welcome email is sent asynchronously on first login only.

---

## Access Rules

- Authentication and access control are separate concerns.
- Unverified users:

  - Can log in
  - Cannot perform restricted actions

- Verified users:

  - Have full access to the platform

---

## Logout Flow

1. User logs out explicitly.
2. The system terminates the active session.
3. The user becomes unauthenticated immediately.

---

## Email Behavior Rules

- Verification emails are sent immediately after email signup.
- Welcome emails are sent only once:

  - After successful email verification
  - Or after first OAuth login

- Email delivery failures do not affect authentication or access.

---

## Design Guarantees

- All authentication methods map to a single user identity.
- Login never fails due to verification state.
- Email verification only affects access level, not authentication.
- Background email tasks never block user flows.

# Mermaid Diagram

flowchart TD
%% Entry
U[User] -->|Signup| SU[Signup Page<br/>Email + Password]
U -->|Login| LI[Login Page<br/>Email/Password<br/>Google<br/>GitHub]

    %% Email Signup Flow
    SU -->|Submit| CU[Create User<br/>emailVerified = false]
    CU --> CS1[Create Session]
    CS1 --> VE[Send Verification Email<br/>(Async)]
    CS1 --> RD1[Redirect to Dashboard<br/>(Restricted Access)]

    %% Verification Flow
    VE -->|User clicks link| VP[Verification Page]
    VP -->|Valid Token| EV[Mark Email Verified]
    EV -->|First Time Only| WE[Send Welcome Email<br/>(Async)]
    EV --> RD2[Dashboard<br/>(Full Access)]

    %% Login Flow (Email/Password)
    LI -->|Email + Password| AUTH1[Authenticate User]
    AUTH1 --> CS2[Create Session]
    CS2 --> CHK{Email Verified?}

    CHK -->|Yes| RD3[Dashboard<br/>(Full Access)]
    CHK -->|No| RD4[Dashboard<br/>(Restricted Access<br/>Prompt Verify Email)]

    %% OAuth Flow
    LI -->|Google / GitHub| OAuth[OAuth Callback]
    OAuth --> FU[Find or Create User]
    FU -->|New User| EV2[Mark Email Verified]
    FU --> CS3[Create Session]
    CS3 -->|First Login Only| WE2[Send Welcome Email<br/>(Async)]
    CS3 --> RD5[Dashboard<br/>(Full Access)]
