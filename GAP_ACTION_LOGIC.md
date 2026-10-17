# From answers to improvement actions: logic and methodological notes

## How a gap is identified

The five criteria, the fourteen indicators, the 0 to 2 rubrics and the scoring are unchanged (see `app.js`). The "Priority gaps and improvement actions" section only reads the answer given for each indicator. It does not use any other input and it does not call any model.

| Answer | Listed as | Finding shown | Suggested action |
|---|---|---|---|
| 0 | Gap | The rubric text the user selected for that indicator | `act[0]` for that indicator in `guidance.js` |
| 1 | Partial | The rubric text the user selected | `act[1]` for that indicator |
| Unknown | To verify | "No information is available for this indicator yet. This is a gap in information, not evidence of weak performance." | "Obtain or verify this information before drawing conclusions." |
| 2 | Not listed | | |
| Not applicable | Not listed | | |

Every listed item also shows **Why it matters** and **Evidence needed**. Both are written once per indicator in `guidance.js` and are the same for every answer of that indicator. The 14 indicators × 3 answers (0, 1, Unknown) are all covered in English and Arabic, and the tests check this.

## Display order

Answers scored 0 first, then 1, then Unknown, and inside each group in indicator order (1.1 to 5.3). The page shows the first five items and the rest behind "Show all". This is a transparent provisional display order. It is not a validated ranking of impact or urgency, and the page says so.

## What the mapping does not do

- It does not state any fact about the site. The actions are general prompts.
- It does not treat Unknown as poor performance.
- It does not use assessment scores for climate-risk matching, applicability, impact or cost.
- It adds no weights, thresholds or scoring rules.

## Methodological observations (documented, not changed)

1. The combined score gives every indicator equal weight, so a criterion with fewer indicators (C4 has two) counts less in total than one with three. The combined score also mixes C1 (existing NBS integration) with C2 to C5 (enabling and implementation conditions). The page labels it as provisional, secondary and not a validated measure of NBS integration.
2. The assessment levels use provisional thresholds (below 30 %, 30 to 54 %, 55 to 79 %, 80 % and above). They are project design, not taken from any standard.
3. Indicator 1.2 combines coverage with an optional local target in one scored answer. The extra target and coverage questions do not change the score.
4. A criterion with one Unknown answer has no percentage at all. This is conservative and avoids false precision, but it hides the partial result. The page shows "2 of 3 indicators scored" and the lowest scored indicators instead.
5. Indicator 5.1 refers to "the planned NBS". It assumes that a plan exists.
6. The matching weights (0 to 3 for heatwaves, flooding and drought), the land and density adjustments and the technical complexity labels are provisional demo rules without PROMEA validation.
7. The ten PROMEA considerations are not separate criteria. The methodology table shows which are partly supported and which are pending (Climate Type, Evaluation).
