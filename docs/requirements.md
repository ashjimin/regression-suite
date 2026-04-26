# Improved Requirements

## Ambiguity Report

### AUTH-01: Login identifier
- Original Statement: "Users log in with a username (or registered email) and password."
- Problem Type: Ambiguity
- Why it is problematic: It does not define which identifier format is accepted or whether email and username are interchangeable.
- Suggested clarification: Define the exact login identifier behavior and normalization rules, e.g., "System accepts either registered email or username; email matching is case-insensitive and username matching is case-sensitive."

### AUTH-02: Failed login threshold
- Original Statement: "After a number of consecutive failed login attempts, the account is locked..."
- Problem Type: Missing
- Why it is problematic: The threshold and lockout duration are required for testable behavior.
- Suggested clarification: Specify the threshold and lockout behavior, e.g., "Lock account after 5 failed attempts and require recovery after 30 minutes or customer support intervention."

### AUTH-03: Session timeout
- Original Statement: "Sessions automatically expire after a period of inactivity. The user receives a warning before the session ends."
- Problem Type: Ambiguity
- Why it is problematic: The actual timeout duration and warning interval are not defined.
- Suggested clarification: Set exact values, e.g., "Session expires after 15 minutes of inactivity and displays a 2-minute warning."

### AUTH-04: Unrecognized device verification
- Original Statement: "Users logging in from an unrecognized device are prompted for additional verification."
- Problem Type: Incomplete
- Why it is problematic: Detection rules and fallback behavior are undefined.
- Suggested clarification: Define device recognition rules and supported verification methods.

### DASH-01: Dashboard refresh
- Original Statement: "The dashboard refreshes automatically to reflect the latest balance."
- Problem Type: Ambiguity
- Why it is problematic: There is no interval or trigger specified.
- Suggested clarification: Specify automatic refresh frequency and user-triggered refresh option.

### DASH-02: Joint account permissions
- Original Statement: "Joint account holders see the same account information..."
- Problem Type: Incomplete
- Why it is problematic: It does not define transactions or action limitations for joint holders.
- Suggested clarification: Define display-only vs. action rights for joint holders.

### TRANS-01: Transfer verification threshold
- Original Statement: "For transfers above a certain amount, additional verification may be required."
- Problem Type: Ambiguity
- Why it is problematic: The threshold and verification type are not specified.
- Suggested clarification: Define the threshold and exact additional verification method.

### HIST-01: Transaction retention period
- Original Statement: "Transaction history is available going back a sufficient period of time."
- Problem Type: Ambiguity
- Why it is problematic: It is not testable without a defined retention window.
- Suggested clarification: Specify the retention period, e.g., 24 months.

### PERF-01: Performance expectations
- Original Statement: "All account data must load within a reasonable time..."
- Problem Type: Ambiguity
- Why it is problematic: "Reasonable" is not measurable.
- Suggested clarification: Define performance targets, e.g., "Account data loads within 3 seconds under standard load."

## Improved Requirements

### Feature: User Authentication & Session Management

#### AUTH-01: Login credentials
- Users may log in with either:
  - a registered email address; or
  - a registered username.
- Registered email matching is case-insensitive.
- Username matching is case-sensitive.

#### AUTH-02: MFA enforcement
**Scenario: Valid credentials with MFA enabled**
- Given a registered user with MFA enabled,
- When the user submits valid credentials,
- Then the system prompts for an MFA code via SMS or authenticator app,
- And the user is granted access only after entering the correct code.

#### AUTH-03: Failed login lockout
**Scenario: Account lockout after repeated failed logins**
- Given a user enters invalid credentials 5 times in a row,
- When the fifth failed attempt occurs,
- Then the account is locked for 30 minutes,
- And the user is shown an instruction to use account recovery or contact support.

#### AUTH-04: Session expiration warning
**Scenario: Session timeout warning and expiration**
- Given a user is inactive for 13 minutes,
- When the system detects inactivity,
- Then the user receives a warning that the session will expire in 2 minutes.
- Given the user remains inactive for 15 minutes total,
- When the timeout is reached,
- Then the session is terminated and the user is required to log in again.

#### AUTH-05: Unrecognized device verification
**Scenario: Login from a new device**
- Given a user attempts to log in from a device not previously registered,
- When valid credentials are entered,
- Then additional verification is required before access is granted,
- And the user may choose SMS OTP or an authenticator app challenge.

#### AUTH-06: Active session management
**Scenario: View and terminate active sessions**
- Given a logged-in user visits the security settings page,
- When the user views active sessions,
- Then all current sessions are displayed with device, location, and timestamp information,
- And the user may terminate any session except the current one.

### Feature: Account Overview Dashboard

#### DASH-01: Account summary display
- The dashboard displays all customer accounts, including checking, savings, and loans.
- Each account tile shows account type, masked account number, current balance, and available balance.

#### DASH-02: Account details navigation
**Scenario: View account details from dashboard**
- Given a user is on the dashboard,
- When the user selects an account tile,
- Then the system displays the account detail page and transaction history for that account.

#### DASH-03: Auto-refresh balance
**Scenario: Dashboard automatic refresh**
- Given the dashboard is open,
- When 60 seconds pass,
- Then the dashboard refreshes account balances automatically,
- And the user may also refresh manually.

#### DASH-04: Restricted account indicator
**Scenario: Display restricted account status**
- Given an account is frozen or pending review,
- When the user views the dashboard,
- Then that account shows a visible restricted status indicator,
- And balance data remains viewable.

#### DASH-05: Joint account visibility
- Joint account holders see the same account information as primary owners.
- Joint holder permissions and transaction capabilities are defined by account setup and must be documented separately.

### Feature: Funds Transfer

#### TRANS-01: Internal transfer timing
**Scenario: Immediate internal transfer**
- Given a user transfers funds between their own accounts,
- When the transfer is submitted,
- Then it is processed immediately and balances are updated.

#### TRANS-02: Platform transfer timing
**Scenario: Same-day transfer to another customer**
- Given a user transfers funds to another platform customer,
- When the transfer is completed,
- Then the funds are delivered within the same business day.

#### TRANS-03: External transfer processing
- External ACH transfers follow standard processing times.
- The system displays an estimated completion date before submission.

#### TRANS-04: Scheduled and recurring transfers
**Scenario: Schedule a future transfer**
- Given a user selects a future date,
- When the user schedules a transfer,
- Then the transfer is stored and executed on the chosen date.

#### TRANS-05: Transfer limits and notifications
- Daily and per-transaction limits apply.
- If a transfer exceeds a limit, the user is notified and prevented from submitting the transfer.
- Users may request a limit increase through the app.

#### TRANS-06: Large transfer verification
- Transfers above $5,000 require additional verification, such as OTP or biometric confirmation.

#### TRANS-07: Transfer confirmation step
**Scenario: Confirm transfer details**
- Given the user has entered transfer details,
- When the user submits the transfer request,
- Then the system displays a confirmation screen,
- And the transfer is executed only after explicit user confirmation.

#### TRANS-08: Transfer history access
- Transfer history is accessible from the account activity view and includes status, amount, and settlement date.

### Feature: Transaction History

#### HIST-01: Reverse chronological display
- Transactions are shown in reverse chronological order by default.

#### HIST-02: Transaction detail content
- Each transaction entry includes date, description, amount (debit or credit), and running balance.

#### HIST-03: Filtering and search
**Scenario: Filter transaction history**
- Given a user opens transaction history,
- When the user applies a date range, transaction type, or amount filter,
- Then the displayed transactions match the filter criteria.

#### HIST-04: Search by keyword
**Scenario: Search transaction history**
- Given a user enters a keyword or merchant name,
- When the user executes the search,
- Then matching transactions are displayed.

#### HIST-05: Export history
**Scenario: Export transaction history**
- Given a user chooses CSV or PDF export,
- When the export is generated,
- Then the exported file contains the filtered transaction history and downloads successfully.

#### HIST-06: Pending transaction marking
- Pending transactions are displayed separately or clearly labeled as pending.

#### HIST-07: Retention period
- Transaction history is retained for 24 months, subject to compliance confirmation.

### Feature: Profile & Security Settings

#### PROFILE-01: Update contact information
**Scenario: Update email and phone**
- Given a user updates email or phone number,
- When the user submits the change,
- Then the system triggers verification using the existing verified contact method.

#### PROFILE-02: Change password
- Users can change passwords.
- New passwords must meet current security standards and complexity rules.

#### PROFILE-03: Biometric login management
- Users may enable or disable biometric login if the device supports it.

#### PROFILE-04: MFA management
- Users may manage enrolled MFA methods from the security settings screen.

#### PROFILE-05: Notification preferences
- Users can configure notifications for events such as login alerts, transaction alerts, and transfer confirmations.

### Non-Functional Requirements

#### PERFORMANCE-01: Load time
- Account overview and detail pages must load within 3 seconds under normal production load.

#### PERFORMANCE-02: Transfer responsiveness
- Funds transfer submissions must complete in under 2 seconds for successful requests.

#### SECURITY-01: Encryption
- All data in transit must be encrypted using TLS 1.2 or later.
- Data at rest must be encrypted with industry-standard encryption.

#### SECURITY-02: Audit logging
- Audit logs must capture login, transfers, profile changes, and security setting updates.
- Logs must be retained and accessible per compliance requirements.

#### SECURITY-03: PII protection
- No PII may be logged in plain text.

#### RELIABILITY-01: High availability
- The platform must target 99.9% availability with scheduled maintenance windows communicated in advance.

#### ACCESSIBILITY-01: WCAG compliance
- The platform must meet WCAG 2.1 Level AA for all core flows.

#### COMPLIANCE-01: Regulatory adherence
- The product must comply with applicable KYC/AML requirements and regional privacy regulations.
