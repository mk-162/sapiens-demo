# Pricing Maths Explainer

This document explains the maths used inside the Sapiens Subscription Toolkit demo. It is written for stakeholders who need to understand the logic without reading code.

## Plain-English summary

The configurator uses **Gross Written Premium (GWP)** as a proxy for customer size and complexity.

A larger insurer usually has:

- more policy volume;
- more operational complexity;
- more environments and governance;
- more implementation and managed-service effort;
- more value at stake from Sapiens software.

The demo turns GWP into a multiplier called **F_scale**. That multiplier scales selected module prices before surcharges and first-year services are added.

## The formula

```text
F_scale = 1 + 0.25 × log10(GWP / $10M)
```

The output is clamped between:

- **Minimum:** `1.0`
- **Maximum:** `2.2`

So the demo never prices below the base anchor and never lets very large GWP values create unrealistic numbers.

## What each part means

### GWP

**Gross Written Premium** is the annual premium written by the insurer.

In the demo, it is not being used as an official Sapiens pricing input. It is a simple proxy for customer scale.

### $10M reference point

`$10M` is the reference GWP used by the formula.

At roughly this size, the multiplier sits around the base level. Larger books increase the multiplier.

### log10

`log10` means the scale grows slowly.

This is important because a customer with 10× the GWP should not automatically cost 10× more. Larger insurers are more complex, but software/platform economics do not scale in a straight line.

### 0.25

The `0.25` controls how aggressively the multiplier grows.

A higher number would make large insurers much more expensive. A lower number would flatten the curve.

## Worked examples

These are illustrative examples only.

### $100M GWP

```text
F_scale = 1 + 0.25 × log10($100M / $10M)
F_scale = 1 + 0.25 × log10(10)
F_scale = 1 + 0.25 × 1
F_scale = 1.25
```

A $100M book scales module anchors by roughly **1.25×**.

### $1B GWP

```text
F_scale = 1 + 0.25 × log10($1B / $10M)
F_scale = 1 + 0.25 × log10(100)
F_scale = 1 + 0.25 × 2
F_scale = 1.50
```

A $1B book scales module anchors by roughly **1.50×**.

### $5B GWP

```text
F_scale = 1 + 0.25 × log10($5B / $10M)
F_scale = 1 + 0.25 × log10(500)
F_scale ≈ 1 + 0.25 × 2.70
F_scale ≈ 1.67
```

A $5B book scales module anchors by roughly **1.67×** before any configured cap. The demo also has a hard cap of **2.2×** for extreme cases.

## How this flows into pricing

For each selected module:

```text
scaled module value = module base price × F_scale
```

Then the demo separates the totals into:

1. **Base platform ARR** — scaled value of selected non-AMS modules.
2. **Surcharge / add-on ARR** — additional block-level surcharge values.
3. **Managed cloud / AMS ops** — AMS/cloud modules shown separately.
4. **Annual recurring revenue** — base ARR + surcharge ARR + cloud/AMS ARR.
5. **Professional services (Y1)** — a one-time implementation estimate.
6. **First-year total** — annual recurring revenue + professional services.

## Professional services formula

The demo estimates first-year professional services as:

```text
$350,000 + $220,000 × (F_scale - 1)
```

Meaning:

- every deal has a base implementation/services anchor;
- larger/more complex books add extra first-year services effort;
- this remains a demo assumption, not an official services estimate.

## What this maths is good for

Use it to support demo conversations such as:

- “What happens if this is a $450M carrier instead of a $100M carrier?”
- “Why does a Tier 1 enterprise configuration cost more?”
- “How do add-on modules affect ARR?”
- “How does the first-year total differ from recurring ARR?”

## What this maths is not

This is **not**:

- an official Sapiens price book;
- a CPQ model;
- a finance-approved pricing calculator;
- a contractual quote engine;
- a validated source of Sapiens commercial terms.

It is a transparent demo mechanism so stakeholders can understand how the prototype behaves.
