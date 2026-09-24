# Security Specification: ContractorStack

## 1. Data Invariants
1. **Product Stats**: Can only increment or record valid counters (`views`, `clicks`) and metadata (`name`, `category`) bounded to 128 characters. No ghost fields or arbitrary keys allowed.
2. **Affiliate Clicks**: Every recorded click must include valid `productId`, `productName`, `conversionPath`, `referrer`, `placement`, and an immutable server timestamp matching `request.time`. Click records cannot be edited or deleted once written.
3. **Newsletter Subscribers**: Valid email address conforming to standard RFC regex; must not exceed 254 chars. Created with `request.time`. No modifications or bulk listings permitted.
4. **Leads**: Downloadable resource lead captures must have valid email, eventName, and server timestamp. No updates or deletes.
5. **Quiz Leads**: Contractor matchmaker quiz submissions must possess all required contractor profile fields (`industry`, `size`, `goal`, `email`, `recommendedProduct`, `createdAt`). Server timestamp strictly verified.
6. **Analytics Totals**: Running totals (`totalSubs`, `totalLeads`) must be non-negative integers.
7. **Document ID Protection**: Path variable IDs must be alphanumeric strings bounded to 128 characters (`^[a-zA-Z0-9_\-]+$`) to prevent path injection and ID poisoning attacks.

## 2. The Dirty Dozen Payloads (Targeting Exploits)
1. **Ghost Field in Product Stat**: `{ views: 1, name: "Jobber", ghostField: "injected" }` -> Rejected by strict key validation.
2. **Negative View Count**: `{ views: -100, name: "Jobber" }` -> Rejected by integer `>= 0` condition.
3. **Invalid Email in Newsletter**: `{ email: "not-an-email", createdAt: request.time }` -> Rejected by email regex check.
4. **Tampered Client Timestamp in Affiliate Click**: `{ productId: "jobber", ..., createdAt: "2020-01-01T00:00:00Z" }` -> Rejected by `createdAt == request.time`.
5. **Oversized String in Referrer**: `{ referrer: "A".repeat(501), ... }` -> Rejected by `.size() <= 500`.
6. **Malicious Document ID**: `/product_stats/../../../etc/passwd` -> Rejected by `isValidId()` pattern and length constraints.
7. **Tampering with Quiz Answers**: `{ industry: "HVAC", size: "1-10", goal: "Grow", email: "bob@example.com", adminOverride: true, createdAt: request.time }` -> Rejected by exact key count and `hasAll`.
8. **Unauthorized Update to Affiliate Clicks**: `update /affiliate_clicks/{id}` -> Rejected by `allow update: if false`.
9. **Unauthorized List of Newsletter Subscribers**: `list /newsletter_subscribers` -> Rejected by `allow list: if false`.
10. **Unauthorized Delete of Quiz Leads**: `delete /quiz_leads/{id}` -> Rejected by `allow delete: if false`.
11. **Type Poisoning in Analytics Totals**: `{ totalSubs: "one thousand" }` -> Rejected by `totalSubs is int`.
12. **Blind Overwrite of Unrelated Collections**: `write /users/admin` -> Denied by default-deny catch-all.
