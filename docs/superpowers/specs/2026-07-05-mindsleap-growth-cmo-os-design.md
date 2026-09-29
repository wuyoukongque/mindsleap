# MindsLeap Growth CMO OS Design

Date: 2026-07-05
Status: Design ready for review

## 1. Purpose

MindsLeap needs a Growth CMO Agent that can manage brand marketing, growth campaigns, and agent orchestration as one operating system.

The first version should not be a generic content assistant. It should help Lincoln translate a business growth goal into a monthly campaign, assign work to specialized agents and workflows, review the outputs, and feed performance learning back into the system.

The short-term business objective is service growth and high-value FDE pipeline. Long-term equity, joint venture, investment, or co-building opportunities may emerge from FDE work, but those are future strategic upside signals, not the primary operating goal of v1.

## 2. Primary Growth Ladder

The CMO OS is built around this service-led growth ladder:

```text
Short video / articles / livestream / member referral
-> 1999 RMB monthly entrepreneur event
-> 9800 RMB entrepreneur club
-> 39800 RMB AI light consulting + AI transformation training
-> 500k-1m+ RMB AI FDE service
```

The 1999, 9800, and 39800 offers are not the final business goal. They are trust-building, qualification, and diagnosis steps that help MindsLeap identify companies that may become high-value AI FDE service clients.

The v1 north star metric is:

```text
Qualified AI FDE Pipeline Value
```

Supporting metrics:

- Qualified entrepreneur leads
- 1999 event registrations
- Event attendance rate
- 9800 entrepreneur club intent
- 39800 consulting/training intent
- Qualified FDE opportunities
- Estimated FDE pipeline value
- Member referral contribution
- Channel-level lead quality

## 3. Target Customers

The v1 target customers are:

- Traditional business owners: manufacturing, trade, service, chain retail, consumer brands, and other established companies that do not yet know how AI should enter real business operations.
- Growth-stage CEOs: companies with teams and revenue that want to use AI to improve growth, sales, marketing, operations, knowledge work, and organizational efficiency.

The CMO OS should avoid optimizing for broad AI enthusiast traffic if that traffic does not convert into entrepreneur events, 39800 consulting intent, or FDE service opportunities.

## 4. Recommended Architecture

The selected approach is:

```text
Growth CMO OS = Brand OS + Growth OS + Campaign OS + Agent Orchestration + QA + Feedback Loop
```

### 4.1 Growth Strategy Layer

Owns the growth objective, target customer, offer ladder, monthly theme, and north star metric.

For each campaign, this layer answers:

- What business outcome are we optimizing for?
- Which stage of the growth ladder does this campaign serve?
- Which target customers matter most?
- What does success look like in pipeline terms?

### 4.2 Brand OS Layer

Upgrades the existing MindsLeap Design System at `https://www.mindsleap.ai/design-system` into an agent-readable Brand OS.

The Design System remains the source for visual and component rules. Brand OS extends it into:

- Brand narrative
- Standard MindsLeap descriptions
- Offer descriptions
- Voice and messaging rules
- Forbidden or risky claims
- GEO keywords and question maps
- Deck, website, content, and event expression guidelines
- Agent-readable quality rules

### 4.3 Campaign OS Layer

Runs monthly growth campaigns centered on the 1999 entrepreneur event.

Each campaign includes:

- Campaign theme
- Target audience
- Event offer and agenda
- Short video preheat plan
- Article and news plan
- Livestream plan
- Member referral copy
- Website/event landing page requirements
- Event deck requirements
- On-site conversion design
- Post-event follow-up and retrospective

### 4.4 Lead & Pipeline OS

Maintains a lightweight record of lead and pipeline status. v1 should not become a full CRM, but it needs enough structure for the CMO Agent to reason about pipeline quality.

It tracks:

- Lead source
- Company and role
- Pain point
- Event registration and attendance
- 9800 club intent
- 39800 consulting/training intent
- FDE potential
- Estimated project value range
- Recommended next action
- Long-term strategic upside notes

### 4.5 Agent Registry Layer

Maintains a machine-readable list of agents and workflows that the CMO Agent can assign tasks to.

Initial agents:

- CMO Agent: growth strategy, task routing, QA, retrospective
- Brand OS Agent or review function: brand consistency and expression rules
- Short Video Agent: short video angles, scripts, platform copy
- Livestream Agent: livestream theme, run of show, conversion points, clip plan
- News/Article Agent: news, AI Insights, Zhihu-style long-form content
- Website Agent: event landing page, SEO/GEO metadata, form requirements
- Deck Agent: event deck, sales deck, training deck
- Distribution Agent: channel-specific publishing plan and copy
- Lead Review Agent: lead scoring, pipeline snapshot, follow-up recommendations

Each registry entry defines:

- Agent id
- Workspace
- Capabilities
- Required inputs
- Deliverables
- Quality gates
- Output path

### 4.6 Handoff Protocol Layer

The system should use file-based manifests instead of relying on shared chat context.

The CMO Agent creates task packages. Sub-agents or workflows read the packages, execute, and write result manifests back to the campaign workspace.

This extends the existing `newsroom` handoff pattern to the whole marketing system.

## 5. Task Assignment Flow

The CMO Agent assigns work through this flow:

```text
Business goal
-> target customers
-> campaign theme
-> offer ladder stage
-> channel and content plan
-> agent selection
-> task manifest generation
-> sub-agent execution
-> result manifest
-> CMO QA
-> revision or approval
-> launch / handoff
-> performance feedback
```

Example task package set for a monthly campaign:

```text
campaigns/2026-08-ai-growth-private-session/
  campaign_manifest.json
  strategy.md
  tasks/
    short_video_preheat.json
    livestream_preheat.json
    article_series.json
    event_landing_page.json
    member_referral.json
    event_deck.json
    distribution_plan.json
    lead_review.json
  leads/
    lead_snapshot.json
  review/
    quality_review.md
    retrospective.md
```

## 6. Core Directory Structure

Recommended v1 structure:

```text
mindsleap/
  cmo-os/
    README.md
    CMO_AGENT.md

    brand-os/
      README.md
      brand_memory.md
      voice_and_messaging.md
      offers.md
      geo_keywords.md
      design_system_sources.json

    growth-os/
      README.md
      growth_ladder.md
      metrics.md
      target_customers.md
      offer_playbooks/
        1999_monthly_event.md
        9800_entrepreneur_club.md
        39800_ai_light_consulting.md
        fde_service.md

    agent-registry/
      README.md
      agents.json

    campaigns/
      example-ai-growth-private-session/
        campaign_manifest.json
        strategy.md
        tasks/
        leads/
        review/

    templates/
      campaign_manifest.template.json
      agent_task_manifest.template.json
      task_result_manifest.template.json
      lead_snapshot.template.json
      quality_review.template.md
      retrospective.template.md

    handoff/
      README.md
      schemas/
        campaign_manifest.schema.json
        agent_task_manifest.schema.json
        task_result_manifest.schema.json
        lead_snapshot.schema.json
```

v1 should create the core documents and templates first. Strict JSON schemas can be added after the first campaign runs.

## 7. Core Manifest Formats

### 7.1 Campaign Manifest

`campaign_manifest.json` is the campaign control file.

Required fields:

```json
{
  "manifest_version": "cmo_campaign/v1",
  "campaign_id": "2026-08-ai-growth-private-session",
  "status": "planning",
  "business_goal": {
    "primary_goal": "Get qualified entrepreneur registrations and create FDE service opportunities",
    "north_star_metric": "qualified_ai_fde_pipeline_value",
    "targets": {
      "qualified_leads": 60,
      "event_paid_registrations_1999": 30,
      "event_attendance": 24,
      "club_intents_9800": 8,
      "light_consulting_intents_39800": 5,
      "fde_opportunities": 2,
      "estimated_fde_pipeline_rmb": 800000
    }
  },
  "target_customers": ["traditional_business_owner", "growth_stage_ceo"],
  "growth_ladder": [
    "short_video_article_livestream_referral",
    "monthly_event_1999",
    "entrepreneur_club_9800",
    "ai_light_consulting_training_39800",
    "ai_fde_service_500k_plus"
  ],
  "campaign_theme": {
    "title": "Enterprise AI Growth Private Session",
    "core_thesis": "AI transformation should be led by the business owner and tied to growth, not treated as a tool purchase."
  },
  "channels": ["short_video", "article", "livestream", "member_referral", "website"],
  "tasks": [
    "tasks/short_video_preheat.json",
    "tasks/livestream_preheat.json",
    "tasks/article_series.json",
    "tasks/event_landing_page.json",
    "tasks/member_referral.json",
    "tasks/event_deck.json"
  ],
  "quality_gates": [
    "brand_consistency",
    "enterprise_relevance",
    "fde_pipeline_relevance",
    "fact_safety",
    "clear_next_action"
  ]
}
```

### 7.2 Agent Task Manifest

Each sub-agent receives one task manifest.

Required fields:

```json
{
  "manifest_version": "cmo_agent_task/v1",
  "task_id": "2026-08-short-video-preheat",
  "parent_campaign_id": "2026-08-ai-growth-private-session",
  "assigned_agent": "short_video_agent",
  "status": "ready",
  "objective": "Create short video topics and scripts to drive qualified registrations for the 1999 entrepreneur event.",
  "target_customer": ["traditional_business_owner", "growth_stage_ceo"],
  "offer_stage": "short_video_article_livestream_referral",
  "conversion_goal": "Drive qualified users to register for the 1999 monthly entrepreneur event.",
  "inputs": {
    "brand_os": "../../brand-os/",
    "growth_ladder": "../../growth-os/growth_ladder.md",
    "campaign_manifest": "../campaign_manifest.json"
  },
  "deliverables": [
    {
      "type": "short_video_script",
      "count": 12
    },
    {
      "type": "platform_copy",
      "platforms": ["video_account", "douyin", "xiaohongshu"]
    }
  ],
  "quality_gates": [
    "single_core_judgment",
    "enterprise_owner_relevance",
    "clear_event_cta",
    "brand_voice",
    "fact_safety"
  ],
  "output_path": "outputs/short_video_preheat/",
  "result_manifest": "outputs/short_video_preheat/result_manifest.json"
}
```

### 7.3 Task Result Manifest

Each sub-agent writes a result manifest after execution.

Required fields:

```json
{
  "manifest_version": "cmo_task_result/v1",
  "task_id": "2026-08-short-video-preheat",
  "status": "completed",
  "completed_at": "2026-08-10T18:30:00+08:00",
  "outputs": [
    {
      "type": "short_video_script_pack",
      "path": "outputs/short_video_preheat/scripts.md"
    }
  ],
  "self_review": {
    "brand_consistency": "pass",
    "target_customer_relevance": "pass",
    "clear_cta": "pass",
    "fact_safety": "needs_human_review"
  },
  "known_risks": [
    "Any industry data claim must be checked before publishing."
  ],
  "next_action": "CMO QA review"
}
```

### 7.4 Lead Snapshot

The lead snapshot supports lightweight pipeline review.

Required fields:

```json
{
  "manifest_version": "cmo_lead_snapshot/v1",
  "campaign_id": "2026-08-ai-growth-private-session",
  "summary": {
    "qualified_leads": 42,
    "paid_registrations_1999": 26,
    "attended": 21,
    "club_intents_9800": 7,
    "consulting_intents_39800": 4,
    "fde_opportunities": 2,
    "estimated_fde_pipeline_rmb": 650000
  },
  "lead_sources": {
    "short_video": 12,
    "article": 5,
    "livestream": 9,
    "member_referral": 10,
    "website": 6
  },
  "high_potential_accounts": [
    {
      "company": "Example Manufacturing Company",
      "role": "Founder",
      "source": "member_referral",
      "pain_point": "Wants to use AI to improve sales follow-up quality",
      "recommended_next_offer": "39800_ai_light_consulting_training",
      "fde_potential": "high",
      "estimated_project_range_rmb": "300000-800000",
      "notes": "Follow up within 7 days after the event."
    }
  ]
}
```

## 8. QA Mechanism

QA has two layers:

```text
Sub-agent self-review
-> CMO QA gate
```

### 8.1 Sub-Agent Self-Review

Every sub-agent result must include:

- Deliverables
- Self-review results
- Known risks
- Missing inputs
- Recommended next action

Self-review statuses:

- `pass`
- `needs_human_review`
- `needs_revision`
- `blocked`

### 8.2 CMO QA Gate

The CMO Agent reviews outputs across six dimensions:

1. Brand QA: fits MindsLeap Brand OS and Design System.
2. Growth QA: moves users to the next offer stage.
3. Customer QA: attracts traditional business owners and growth-stage CEOs.
4. Fact & Risk QA: avoids exaggerated claims, unsupported numbers, and unsafe case claims.
5. Channel QA: fits the target platform and format.
6. Pipeline QA: helps identify high-value 39800 and FDE opportunities.

CMO review statuses:

- `approved`
- `approved_with_minor_edits`
- `needs_revision`
- `blocked`

If the output needs revision, the CMO Agent creates a revision task:

```text
tasks/revisions/<task-id>-revision-round-1.json
```

The review is written to:

```text
campaigns/<campaign-id>/review/quality_review.md
```

## 9. Feedback Mechanism

Feedback flows into three places.

### 9.1 Campaign Feedback

Written inside the current campaign workspace:

```text
review/retrospective.md
leads/lead_snapshot.json
performance/channel_metrics.json
```

It records:

- Which channels created registrations
- Which channels created qualified leads
- Which content topics produced 39800 or FDE intent
- Which CTA worked
- Which leads need follow-up
- Which assumptions were wrong

### 9.2 Growth OS Feedback

Written back to:

```text
growth-os/offer_playbooks/
growth-os/metrics.md
growth-os/target_customers.md
```

Examples:

- Member referral leads are higher quality than cold short video leads.
- "AI growth system" attracts stronger FDE prospects than generic "AI efficiency".
- Manufacturing owners respond to sales and customer operations use cases.

### 9.3 Brand OS Feedback

Written back to:

```text
brand-os/voice_and_messaging.md
brand-os/offers.md
brand-os/geo_keywords.md
```

Examples:

- Terms that entrepreneurs understand.
- Terms that are too technical.
- Claims that create trust.
- Claims that attract the wrong audience.

## 10. Monthly Operating Rhythm

Recommended rhythm:

```text
T-21 days: CMO sets campaign theme and campaign manifest.
T-18 days: Sub-agents deliver first draft assets.
T-14 days: CMO QA and preheat launch.
T-7 days: CMO reviews registration quality and adjusts content/referral push.
T-1 day: CMO prepares event conversion brief and priority follow-up list.
T+1 day: Lead Review Agent drafts lead segmentation and next actions.
T+7 days: CMO reviews 1999 -> 9800 / 39800 / FDE conversion.
T+14 days: CMO updates Growth OS and recommends next month theme.
```

## 11. CMO Agent Behavior

The CMO Agent should operate in five modes.

### 11.1 Strategy Mode

Used when Lincoln is deciding the direction.

Outputs:

- Campaign theme options
- Target customer fit
- Offer fit
- 39800 and FDE conversion potential
- Recommended direction

### 11.2 Campaign Builder Mode

Used when a campaign should be created.

Outputs:

- Campaign folder
- `campaign_manifest.json`
- `strategy.md`
- Sub-agent task manifests
- QA plan
- Retrospective template

### 11.3 Task Router Mode

Used when work needs to be assigned to specialized agents.

Outputs:

- Agent selection
- Task objectives
- Inputs
- Deliverables
- Deadlines
- Quality gates
- Result paths

### 11.4 Review Mode

Used to audit deliverables.

Outputs:

- Review findings
- Approval status
- Revision tasks
- Risk notes
- Launch recommendation

### 11.5 Retrospective Mode

Used after events or campaign milestones.

Outputs:

- Channel performance summary
- Lead quality summary
- Pipeline update
- Follow-up priority list
- Growth OS updates
- Brand OS updates
- Next campaign recommendations

## 12. V1 Implementation Scope

V1 should create the system skeleton and a working example campaign.

Create:

- `cmo-os/README.md`
- `cmo-os/CMO_AGENT.md`
- `brand-os/brand_memory.md`
- `brand-os/voice_and_messaging.md`
- `brand-os/offers.md`
- `brand-os/design_system_sources.json`
- `growth-os/growth_ladder.md`
- `growth-os/metrics.md`
- `growth-os/target_customers.md`
- Offer playbooks for 1999, 9800, 39800, and FDE
- `agent-registry/agents.json`
- Manifest templates
- QA and retrospective templates
- One example campaign

Do not build in v1:

- Full CRM
- Automatic publishing
- Payment or registration backend integration
- Paid media budget optimization
- Investment/JV decision workflow
- Automated sales follow-up
- Rewritten versions of existing website, newsroom, short video, or interview workflows

## 13. V1 Success Criteria

V1 is successful when Lincoln can give the CMO Agent a goal like:

```text
Plan an August entrepreneur AI growth private session.
Target 30 paid 1999 registrations, 5 39800 consulting intents, and 2 qualified FDE opportunities.
```

The CMO Agent can then produce:

- A complete campaign workspace
- A human-readable strategy
- A machine-readable campaign manifest
- Task manifests for short video, livestream, article, website, referral, deck, distribution, and lead review
- QA standards
- A feedback and retrospective template

## 14. Implementation Assumptions

V1 uses these default decisions so implementation can begin without another architecture round:

- The CMO Agent should be implemented first as a Codex skill backed by the file-based `cmo-os/` workspace.
- Manifest templates should be created in v1; strict JSON schemas can follow after the first live campaign validates the fields.
- Lead snapshots should be maintained manually in v1, then connected to form, CRM, or payment exports later.
- The public MindsLeap Design System remains the source for visual rules; `brand-os/design_system_sources.json` records its online URL and any local source paths discovered during implementation.

These assumptions keep v1 focused on a usable file-based operating system and task protocol.
