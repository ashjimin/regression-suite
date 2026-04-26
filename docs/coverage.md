# Test Coverage Matrix

| Feature | Test Type | Scenario | Priority |
| ------- | --------- | -------- | -------- |
| Authentication | Functional | Valid login with username | High |
| Authentication | Functional | Valid login with email | High |
| Authentication | Negative | Invalid password | High |
| Authentication | Security | MFA code rejection | Critical |
| Authentication | Edge | Login from unrecognized device | High |
| Authentication | Boundary | Account lockout after 5 failures | Critical |
| Session Management | Functional | Session warning at 13 minutes | Medium |
| Session Management | Negative | Session expiration after inactivity | High |
| Dashboard | Functional | Display all account tiles | High |
| Dashboard | Functional | Navigate from dashboard to account detail | High |
| Dashboard | Edge | Restricted account indicator visible | Medium |
| Dashboard | Performance | Auto-refresh balances every 60 seconds | Medium |
| Funds Transfer | Functional | Internal transfer completes immediately | High |
| Funds Transfer | Functional | Platform transfer same day | High |
| Funds Transfer | Negative | Transfer exceeds limit | Critical |
| Funds Transfer | Security | Large transfer verification | Critical |
| Funds Transfer | Edge | Schedule a future transfer | Medium |
| Transaction History | Functional | Filter transaction history | High |
| Transaction History | Functional | Search by merchant name | High |
| Transaction History | Negative | Export with no matching records | Medium |
| Transaction History | Edge | Pending transactions are labeled | Medium |
| Profile Settings | Functional | Update phone with verification | Medium |
| Profile Settings | Functional | Enable biometric login | Medium |
| Profile Settings | Security | Change password with complexity rules | High |
| Non-Functional | Performance | Account data loads within 3 seconds | High |
| Non-Functional | Security | No plaintext PII logged | Critical |

# Risk-Based Prioritization

## Critical
- Authentication lockout and MFA enforcement
- Transfer limit enforcement and large transfer verification
- Data encryption and PII protection

## High
- Valid login and session expiration behaviors
- Dashboard account visibility and account detail access
- Transaction filtering/search and export
- Password change and security settings management

## Medium
- Joint account visibility rules
- Scheduled transfers and recurring transfer behavior
- Session timeout warning display
- Dashboard auto-refresh performance

## Low
- Notification preference configuration
- Accessibility WCAG 2.1 Level AA compliance validation (core flow checks)
