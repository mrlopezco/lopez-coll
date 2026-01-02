# PostHog UI Guide: Maximizing Analytics Benefits

This guide will help you effectively use the PostHog dashboard to analyze user behavior and maximize the value of your implemented tracking.

## Table of Contents

1. [Getting Started with PostHog Dashboard](#getting-started)
2. [Understanding Your Data](#understanding-your-data)
3. [Creating Insights and Trends](#creating-insights)
4. [Analyzing User Journeys with Funnels](#funnels)
5. [Session Replay Analysis](#session-replay)
6. [Cohorts and User Segmentation](#cohorts)
7. [Retention Analysis](#retention)
8. [Practical Analysis Examples](#practical-examples)
9. [Best Practices](#best-practices)

---

## Getting Started with PostHog Dashboard

### Accessing Your Dashboard

1. Navigate to your PostHog instance (e.g., `https://app.posthog.com` or your custom domain)
2. Log in with your credentials
3. You'll see the main dashboard with an overview of key metrics

### Key Dashboard Sections

- **Insights**: Create and view analytics queries
- **Session Replay**: Watch recorded user sessions
- **Feature Flags**: Manage feature rollouts (if enabled)
- **Experiments**: Run A/B tests (if enabled)
- **Persons**: View individual user profiles
- **Events**: Browse all captured events
- **Cohorts**: Create user segments

---

## Understanding Your Data

### Viewing Tracked Events

1. Go to **Events** in the left sidebar
2. You'll see all events being captured, including:
   - `$pageview` - Standard page views
   - `blog_post_viewed` - Blog post views
   - `newsletter_subscribed` - Newsletter subscriptions
   - `cv_downloaded` - CV downloads
   - `theme_toggled` - Theme changes
   - And all other custom events

### Event Properties

Click on any event to see:
- **Event count** - How many times it occurred
- **Properties** - All associated data (post_slug, source_page, etc.)
- **Users** - Who triggered the event
- **Trends** - Event frequency over time

### Filtering Events

Use filters to narrow down events:
- **Time range**: Last 24 hours, 7 days, 30 days, custom
- **Event type**: Select specific events
- **Properties**: Filter by post_slug, source_page, etc.
- **Users**: Filter by specific user properties

---

## Creating Insights and Trends

### Creating a Basic Insight

1. Go to **Insights** → **New insight**
2. Select **Trends** visualization
3. Choose an event (e.g., `blog_post_viewed`)
4. Click **Save** to create the insight

### Useful Insights for Your Blog

#### Most Popular Blog Posts

1. Create a **Trends** insight
2. Event: `blog_post_viewed`
3. Group by: `post_slug` property
4. Sort by: Count (descending)
5. This shows which posts get the most views

#### Blog Engagement Over Time

1. Create a **Trends** insight
2. Event: `blog_post_viewed`
3. Group by: Day/Week/Month
4. Shows how blog traffic changes over time

#### Content Performance by Tags

1. Create a **Trends** insight
2. Event: `blog_post_viewed`
3. Breakdown by: `post_tags` property
4. Shows which topics are most popular

#### Scroll Depth Analysis

1. Create a **Trends** insight
2. Event: `blog_scroll_depth`
3. Breakdown by: `depth` property (25, 50, 75, 100)
4. Shows how far users scroll in your posts

### Advanced Insights

#### Conversion Rate: Visitor to Reader

1. Create a **Trends** insight
2. Formula: `blog_post_viewed / $pageview`
3. Shows what percentage of visitors actually read blog posts

#### Newsletter Conversion Funnel

1. Create a **Funnel** insight (see Funnels section below)
2. Steps:
   - `$pageview` (any page)
   - `blog_post_viewed` (read a post)
   - `newsletter_subscribed` (converted)
3. Shows conversion rate from visitor to subscriber

---

## Analyzing User Journeys with Funnels

### Creating a Funnel

Funnels help you understand user conversion paths and identify drop-off points.

#### Blog Reading Funnel

**Steps:**
1. `$pageview` - User visits any page
2. `blog_post_viewed` - User views a blog post
3. `blog_scroll_depth` (depth = 50) - User scrolls halfway
4. `blog_scroll_depth` (depth = 100) - User reads entire post

**What to analyze:**
- How many visitors actually read posts?
- Where do users drop off?
- Which posts have the best completion rates?

#### Newsletter Subscription Funnel

**Steps:**
1. `$pageview` - User visits site
2. `blog_post_viewed` - User reads a post
3. `newsletter_subscribed` - User subscribes

**What to analyze:**
- Conversion rate from reader to subscriber
- Which blog posts drive the most subscriptions?
- Time to conversion (how long before users subscribe?)

#### Content Engagement Funnel

**Steps:**
1. `$pageview` - User visits homepage
2. `navigation_clicked` (destination = /blog) - User clicks blog link
3. `blog_post_viewed` - User views a post
4. `blog_post_navigation` - User reads another post

**What to analyze:**
- How many users discover your blog from homepage?
- Multi-post reading behavior
- Content discovery patterns

### Funnel Analysis Tips

- **Compare time periods**: See if conversion rates improve over time
- **Breakdown by properties**: Compare funnels by post tags, source pages, etc.
- **Set conversion windows**: Define how long users have to complete the funnel
- **Exclude internal users**: Use filters to remove your own visits

---

## Session Replay Analysis

### Accessing Session Replays

1. Go to **Session Replay** in the left sidebar
2. You'll see a list of recorded sessions
3. Click any session to watch the replay

### What to Look For

#### User Behavior Patterns

- **Navigation patterns**: How do users move through your site?
- **Scroll behavior**: Do users actually read your content?
- **Click patterns**: What do users click on?
- **Form interactions**: How do users interact with the newsletter form?

#### Identifying Issues

- **Confusion points**: Where do users seem lost?
- **Error patterns**: Do users encounter errors?
- **Performance issues**: Are pages loading slowly?
- **UX problems**: Are there usability issues?

### Filtering Sessions

Filter sessions by:
- **Event**: Sessions where specific events occurred
- **Duration**: Short vs. long sessions
- **User properties**: Specific user segments
- **Time range**: Recent sessions

### Example Use Cases

#### Analyzing Newsletter Subscription Flow

1. Filter sessions by event: `newsletter_subscribed`
2. Watch replays to see:
   - How users find the newsletter form
   - What content they read before subscribing
   - If there are any friction points

#### Understanding Blog Reading Behavior

1. Filter sessions by event: `blog_post_viewed`
2. Watch replays to see:
   - How users navigate to blog posts
   - Scroll patterns and reading behavior
   - What content keeps users engaged

---

## Cohorts and User Segmentation

### Creating Cohorts

Cohorts help you segment users based on behavior or properties.

#### Newsletter Subscribers Cohort

1. Go to **Cohorts** → **New cohort**
2. Condition: Event `newsletter_subscribed` occurred
3. Name: "Newsletter Subscribers"
4. Use this cohort to analyze subscriber behavior

#### Engaged Readers Cohort

1. Create a cohort with conditions:
   - Event `blog_post_viewed` occurred
   - Event `blog_scroll_depth` (depth = 100) occurred
2. Name: "Engaged Readers"
3. Analyze what makes engaged readers different

#### Multi-Post Readers Cohort

1. Create a cohort with condition:
   - Event `blog_post_viewed` occurred 2+ times
2. Name: "Multi-Post Readers"
3. Understand what drives repeat reading

### Using Cohorts in Analysis

- **Compare cohorts**: See how different user segments behave
- **Cohort retention**: Track if cohorts return over time
- **Cohort funnels**: Analyze conversion rates for specific cohorts
- **Cohort trends**: See how cohort sizes change over time

---

## Retention Analysis

### Understanding User Retention

Retention shows how many users return to your site over time.

#### Creating a Retention Analysis

1. Go to **Insights** → **New insight**
2. Select **Retention** visualization
3. Choose a target event (e.g., `$pageview`)
4. Set retention period (daily, weekly, monthly)

#### Key Metrics to Track

- **Day 1 retention**: Users who return the next day
- **Week 1 retention**: Users who return within a week
- **Month 1 retention**: Users who return within a month

#### Analyzing Retention by Cohort

1. Create retention analysis
2. Breakdown by cohort (e.g., "Newsletter Subscribers")
3. Compare retention rates:
   - Newsletter subscribers vs. non-subscribers
   - Engaged readers vs. casual visitors
   - Multi-post readers vs. single-post readers

---

## Practical Analysis Examples

### Example 1: Content Performance Analysis

**Goal**: Understand which blog posts perform best

**Steps:**
1. Create a **Trends** insight
2. Event: `blog_post_viewed`
3. Breakdown by: `post_slug`
4. Sort by: Count (descending)
5. Add filter: Last 30 days

**What to analyze:**
- Which posts get the most views?
- Which topics (tags) are most popular?
- Are newer posts performing better than older ones?

**Action items:**
- Write more content on popular topics
- Update or promote underperforming posts
- Analyze what makes top posts successful

### Example 2: Newsletter Conversion Analysis

**Goal**: Optimize newsletter subscription rate

**Steps:**
1. Create a **Funnel** insight
2. Steps:
   - `$pageview`
   - `blog_post_viewed`
   - `newsletter_subscribed`
3. Breakdown by: `source` property (from newsletter_subscribed event)

**What to analyze:**
- Which pages drive the most subscriptions?
- What's the conversion rate from reader to subscriber?
- Are there specific posts that convert better?

**Action items:**
- Place newsletter forms on high-converting pages
- A/B test newsletter form placement
- Create content that encourages subscriptions

### Example 3: User Engagement Deep Dive

**Goal**: Understand how engaged users behave

**Steps:**
1. Create cohort: "Engaged Users" (users with `blog_scroll_depth` = 100)
2. Create **Trends** insight filtered by this cohort
3. Analyze events: `blog_post_navigation`, `external_link_clicked`, `cv_downloaded`

**What to analyze:**
- Do engaged users read multiple posts?
- What actions do engaged users take?
- What content keeps users engaged?

**Action items:**
- Identify patterns in engaged user behavior
- Optimize content for engagement
- Create more content that drives engagement

### Example 4: Navigation and Discovery Analysis

**Goal**: Understand how users discover content

**Steps:**
1. Create **Trends** insight
2. Event: `navigation_clicked`
3. Breakdown by: `destination` property
4. Compare with: `blog_post_viewed` events

**What to analyze:**
- Which navigation links are most used?
- How do users discover blog posts?
- Are users finding content through navigation or other means?

**Action items:**
- Optimize navigation based on usage
- Improve content discoverability
- Test different navigation structures

### Example 5: Scroll Depth and Reading Behavior

**Goal**: Understand content consumption patterns

**Steps:**
1. Create **Trends** insight
2. Event: `blog_scroll_depth`
3. Breakdown by: `depth` property (25, 50, 75, 100)
4. Add breakdown by: `post_slug`

**What to analyze:**
- What percentage of readers finish posts?
- Which posts have the best completion rates?
- Are longer posts read less completely?

**Action items:**
- Optimize post length based on completion rates
- Improve content structure for better engagement
- Identify posts that need improvement

---

## Best Practices

### Regular Analysis Routine

**Weekly:**
- Review top performing blog posts
- Check newsletter subscription trends
- Monitor overall traffic patterns

**Monthly:**
- Analyze user retention
- Review funnel conversion rates
- Identify content performance trends
- Check for any anomalies or issues

**Quarterly:**
- Deep dive into user behavior patterns
- Analyze long-term trends
- Review and optimize tracking implementation
- Update insights and dashboards

### Creating Actionable Insights

1. **Set clear goals**: What do you want to learn?
2. **Ask specific questions**: Instead of "how are users behaving?", ask "which blog posts drive newsletter subscriptions?"
3. **Compare and contrast**: Compare different time periods, user segments, or content types
4. **Look for patterns**: Identify trends and anomalies
5. **Take action**: Use insights to make data-driven decisions

### Dashboard Organization

**Create Saved Insights:**
- Save frequently used insights for quick access
- Organize insights by category (Content, Engagement, Conversion)
- Share insights with team members

**Recommended Saved Insights:**
1. **Top Blog Posts** - Most viewed posts
2. **Newsletter Conversion Funnel** - Visitor to subscriber
3. **Content Engagement** - Scroll depth and reading time
4. **User Retention** - Returning visitor rates
5. **Traffic Sources** - How users discover content

### Data Quality Checks

**Regular Validation:**
- Verify events are firing correctly
- Check for missing or incorrect properties
- Monitor event volumes for anomalies
- Review session replays for data accuracy

**Common Issues to Watch For:**
- Duplicate events (should be fixed with our implementation)
- Missing properties
- Incorrect event names
- Internal user data (should be filtered)

### Privacy and Compliance

**GDPR Considerations:**
- Review what data is being collected
- Ensure user consent where required
- Use hashed email addresses (already implemented)
- Filter internal users (already implemented)

**Data Retention:**
- Review PostHog data retention settings
- Archive old data if needed
- Comply with data protection regulations

---

## Advanced Features

### Custom Dashboards

Create custom dashboards with multiple insights:
1. Go to **Dashboards** → **New dashboard**
2. Add saved insights to the dashboard
3. Organize insights by category
4. Share dashboards with team members

### Alerts and Notifications

Set up alerts for important metrics:
1. Go to **Insights** → Select an insight
2. Click **Set alert**
3. Configure conditions (e.g., "Alert if newsletter subscriptions drop below X")
4. Set notification channels (email, Slack, etc.)

### Exporting Data

Export insights and data for external analysis:
1. Open any insight
2. Click **Export** button
3. Choose format (CSV, JSON, etc.)
4. Use exported data for deeper analysis in Excel, Python, etc.

---

## Troubleshooting

### Events Not Appearing

**Check:**
1. Is PostHog initialized? Check browser console for errors
2. Are environment variables set correctly?
3. Is the event being tracked? Use `NEXT_PUBLIC_POSTHOG_FORCE_ENABLE=true` to see console logs
4. Are you filtering out internal users? Check internal user filters

### Incorrect Data

**Check:**
1. Event properties - Are they being sent correctly?
2. Event names - Are they consistent?
3. Time zones - Are timestamps correct?
4. Filters - Are you accidentally filtering out data?

### Performance Issues

**Optimize:**
1. Limit session replay sample rate
2. Filter out unnecessary events
3. Use PostHog's data sampling features
4. Review and optimize tracking implementation

---

## Next Steps

1. **Explore your data**: Start by viewing events and creating basic insights
2. **Set up key insights**: Create saved insights for metrics you care about
3. **Analyze user behavior**: Use session replays to understand user patterns
4. **Optimize based on data**: Make changes based on what you learn
5. **Iterate**: Regularly review and refine your analysis

---

## Resources

- **PostHog Documentation**: https://posthog.com/docs
- **PostHog Tutorials**: https://posthog.com/tutorials
- **PostHog Community**: https://posthog.com/questions
- **Your Event Documentation**: See `docs/posthog-events.md` for all tracked events

---

## Quick Reference: Key Events to Monitor

| Event | What It Tells You | Key Property |
|-------|------------------|--------------|
| `$pageview` | Overall traffic | `pathname` |
| `blog_post_viewed` | Content popularity | `post_slug`, `post_tags` |
| `blog_scroll_depth` | Content engagement | `depth` (25, 50, 75, 100) |
| `newsletter_subscribed` | Conversion rate | `source` |
| `cv_downloaded` | Interest in your work | `source_page` |
| `external_link_clicked` | Outbound link usage | `destination_url` |
| `social_link_clicked` | Social media engagement | `platform` |
| `navigation_clicked` | Navigation patterns | `destination` |
| `theme_toggled` | User preferences | `theme` |

---

## Summary

By following this guide, you'll be able to:

✅ Understand how users interact with your blog
✅ Identify your most popular content
✅ Optimize newsletter conversion rates
✅ Analyze user engagement patterns
✅ Make data-driven decisions to improve your site
✅ Track the impact of changes over time

Remember: The goal is not just to collect data, but to use it to improve your website and better serve your audience. Regularly review your analytics, ask questions, and take action based on what you learn.

